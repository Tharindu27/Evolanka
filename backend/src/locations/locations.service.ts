import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LocationStatus, LocationSubmitter, Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { AdminView } from '../admin/admin.service';
import type { AuthRole } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
import { CloudinaryService } from '../media/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { LocationInputDto } from './dto/location-input.dto';

export type LocationFiles = { cover?: Express.Multer.File[]; gallery?: Express.Multer.File[] };

type Owner = { id: number; role: AuthRole };

const withRelations = {
  photos: { orderBy: [{ isCover: 'desc' }, { position: 'asc' }] },
  reviewedBy: { select: { name: true } },
} satisfies Prisma.LocationInclude;

type LocationRecord = Prisma.LocationGetPayload<{ include: typeof withRelations }>;

const clean = (value?: string) => value?.trim() || null;
const cleanList = (values?: string[]) => (values ?? []).map((value) => value.trim()).filter(Boolean);

// What visitors see: the content only, never who submitted it or how it was reviewed.
const toPublicView = (location: LocationRecord) => ({
  id: location.locationId,
  name: location.name,
  province: location.province,
  district: location.district,
  nearestTown: location.nearestTown,
  categories: location.categories,
  description: location.description,
  highlights: location.highlights,
  bestTime: location.bestTime,
  openingDays: location.openingDays,
  freeEntry: location.freeEntry,
  localAdultPrice: location.localAdultPrice,
  localChildPrice: location.localChildPrice,
  foreignAdultPrice: location.foreignAdultPrice,
  foreignChildPrice: location.foreignChildPrice,
  ticketNote: location.ticketNote,
  address: location.address,
  latitude: location.latitude,
  longitude: location.longitude,
  travelTips: location.travelTips,
  photos: location.photos.map((photo) => ({ id: photo.photoId, url: photo.url, isCover: photo.isCover })),
});

const toView = (location: LocationRecord) => ({
  ...toPublicView(location),
  status: location.status,
  rejectionReason: location.rejectionReason,
  submitterType: location.submitterType,
  submitterName: location.submitterName,
  submittedAt: location.submittedAt,
  reviewedAt: location.reviewedAt,
  reviewedByName: location.reviewedBy?.name ?? null,
});

export type LocationView = ReturnType<typeof toView>;

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly mail: MailService,
  ) {}

  // ---- tourists and providers -------------------------------------------------

  async submit(owner: Owner, raw: string, files: LocationFiles) {
    const input = await this.parseInput(raw);
    const account =
      owner.role === 'tourist'
        ? await this.prisma.tourist.findUnique({ where: { touristId: owner.id }, select: { name: true } })
        : await this.prisma.provider.findUnique({ where: { providerId: owner.id }, select: { name: true } });
    if (!account) throw new ForbiddenException('This account no longer exists');

    const draft = input.draft === true;
    this.assertComplete(input, { draft, needsCover: !draft, files });
    if (!draft) await this.assertNameFree(input.name);

    return this.create(input, files, {
      status: draft ? LocationStatus.DRAFT : LocationStatus.PENDING,
      submitterType: owner.role === 'tourist' ? LocationSubmitter.TOURIST : LocationSubmitter.PROVIDER,
      submitterName: account.name,
      ...(owner.role === 'tourist' ? { touristId: owner.id } : { providerId: owner.id }),
    });
  }

  async listMine(owner: Owner) {
    const locations = await this.prisma.location.findMany({
      where: owner.role === 'tourist' ? { touristId: owner.id } : { providerId: owner.id },
      include: withRelations,
      orderBy: { updatedAt: 'desc' },
    });
    return locations.map(toView);
  }

  async withdraw(owner: Owner, id: number) {
    const { count } = await this.prisma.location.updateMany({
      where: { locationId: id, ...this.ownedBy(owner), status: LocationStatus.PENDING },
      data: { status: LocationStatus.DRAFT },
    });
    if (count === 0) {
      await this.assertOwned(owner, id);
      throw new ConflictException('Only a location that is waiting for review can be withdrawn');
    }
    return this.getView(id);
  }

  async removeMine(owner: Owner, id: number) {
    await this.assertOwned(owner, id);
    await this.destroy(id);
    return { message: 'Contribution deleted' };
  }

  // ---- visitors ---------------------------------------------------------------

  async listPublic() {
    const locations = await this.prisma.location.findMany({
      where: { status: LocationStatus.APPROVED },
      include: withRelations,
      orderBy: { reviewedAt: 'desc' },
    });
    return locations.map(toPublicView);
  }

  async getPublic(id: number) {
    const location = await this.prisma.location.findFirst({
      where: { locationId: id, status: LocationStatus.APPROVED },
      include: withRelations,
    });
    if (!location) throw new NotFoundException('Location not found');
    return toPublicView(location);
  }

  // ---- admins -----------------------------------------------------------------

  async listForAdmin() {
    const locations = await this.prisma.location.findMany({
      where: { status: { not: LocationStatus.DRAFT } },
      include: withRelations,
      orderBy: { submittedAt: 'desc' },
    });
    return locations.map(toView);
  }

  // Admin submissions skip the review queue and go live straight away.
  async createByAdmin(admin: AdminView, raw: string, files: LocationFiles) {
    const input = await this.parseInput(raw);
    this.assertComplete(input, { draft: false, needsCover: false, files });
    await this.assertNameFree(input.name);

    return this.create(input, files, {
      status: LocationStatus.APPROVED,
      submitterType: LocationSubmitter.ADMIN,
      submitterName: admin.name,
      adminId: admin.id,
      reviewedById: admin.id,
      reviewedAt: new Date(),
    });
  }

  async approve(admin: AdminView, id: number) {
    await this.transition(id, LocationStatus.PENDING, {
      status: LocationStatus.APPROVED,
      rejectionReason: null,
      reviewedAt: new Date(),
      reviewedById: admin.id,
    });
    return this.decisionResult(id, true);
  }

  async reject(admin: AdminView, id: number, reason?: string) {
    await this.transition(id, LocationStatus.PENDING, {
      status: LocationStatus.REJECTED,
      rejectionReason: clean(reason),
      reviewedAt: new Date(),
      reviewedById: admin.id,
    });
    return this.decisionResult(id, false);
  }

  // Undoes an approval: the location leaves the live list and waits for a fresh decision.
  async revise(id: number) {
    await this.transition(id, LocationStatus.APPROVED, {
      status: LocationStatus.PENDING,
      rejectionReason: null,
      reviewedAt: null,
      reviewedById: null,
    });
    return { location: await this.getView(id) };
  }

  // ---- helpers ----------------------------------------------------------------

  private ownedBy(owner: Owner): Prisma.LocationWhereInput {
    return owner.role === 'tourist' ? { touristId: owner.id } : { providerId: owner.id };
  }

  private async assertOwned(owner: Owner, id: number) {
    const found = await this.prisma.location.findFirst({ where: { locationId: id, ...this.ownedBy(owner) }, select: { locationId: true } });
    if (!found) throw new NotFoundException('Location not found');
  }

  private async getView(id: number) {
    const location = await this.prisma.location.findUnique({ where: { locationId: id }, include: withRelations });
    if (!location) throw new NotFoundException('Location not found');
    return toView(location);
  }

  // Moves a location from one status to another only if it is still in the expected one (guards against two admins racing).
  private async transition(id: number, from: LocationStatus, data: Prisma.LocationUncheckedUpdateManyInput) {
    const { count } = await this.prisma.location.updateMany({ where: { locationId: id, status: from }, data });
    if (count > 0) return;

    const current = await this.prisma.location.findUnique({ where: { locationId: id }, select: { status: true } });
    if (!current || current.status === LocationStatus.DRAFT) throw new NotFoundException('Location not found');
    throw new ConflictException(`This location is ${current.status.toLowerCase()}, so that action is no longer available`);
  }

  private async decisionResult(id: number, approved: boolean) {
    const location = await this.prisma.location.findUnique({
      where: { locationId: id },
      include: { ...withRelations, tourist: { select: { email: true, name: true } }, provider: { select: { email: true, name: true } } },
    });
    if (!location) throw new NotFoundException('Location not found');

    // Locations added by admins, or whose account was deleted, have nobody to notify.
    const recipient = location.tourist ?? location.provider;
    const role = location.tourist ? 'customer' : 'provider';
    let emailSent: boolean | null = null;
    if (recipient) {
      emailSent = await this.mail.sendLocationDecision({
        to: recipient.email,
        recipientName: recipient.name,
        locationName: location.name,
        approved,
        reason: location.rejectionReason,
        contributionsUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/${role}/profile/contributions`,
      });
    }
    return { location: toView(location), emailSent, recipientEmail: recipient?.email ?? null };
  }

  private async parseInput(raw: string): Promise<LocationInputDto> {
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Location details must be valid JSON');
    }
    if (typeof json !== 'object' || json === null || Array.isArray(json)) {
      throw new BadRequestException('Location details must be an object');
    }

    const input = plainToInstance(LocationInputDto, json);
    const errors = await validate(input, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      throw new BadRequestException(errors.flatMap((error) => Object.values(error.constraints ?? {})));
    }
    return input;
  }

  private assertComplete(input: LocationInputDto, { draft, needsCover, files }: { draft: boolean; needsCover: boolean; files: LocationFiles }) {
    if (!draft) {
      if (!clean(input.province)) throw new BadRequestException('Select a province');
      if (!clean(input.district)) throw new BadRequestException('Select a district');
      if (!clean(input.nearestTown)) throw new BadRequestException('Enter the nearest city or town');
      if (!clean(input.description)) throw new BadRequestException('Add a description of the location');
    }
    if (needsCover && !files.cover?.length) throw new BadRequestException('Upload a primary cover photo');
  }

  private async assertNameFree(name: string) {
    const existing = await this.prisma.location.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        status: { in: [LocationStatus.PENDING, LocationStatus.APPROVED] },
      },
      select: { locationId: true },
    });
    if (existing) throw new ConflictException('A location with this name already exists or is already awaiting review');
  }

  private async create(
    input: LocationInputDto,
    files: LocationFiles,
    meta: Pick<Prisma.LocationUncheckedCreateInput, 'status' | 'submitterType' | 'submitterName'> &
      Partial<Pick<Prisma.LocationUncheckedCreateInput, 'touristId' | 'providerId' | 'adminId' | 'reviewedById' | 'reviewedAt'>>,
  ) {
    // The cover is always first; the order of the gallery is kept.
    const ordered = [...(files.cover ?? []).slice(0, 1).map((file) => ({ file, isCover: true })), ...(files.gallery ?? []).map((file) => ({ file, isCover: false }))];

    const uploaded: { url: string; publicId: string; isCover: boolean }[] = [];
    try {
      const results = await Promise.allSettled(ordered.map(({ file }) => this.cloudinary.uploadLocationImage(file.buffer)));
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') uploaded.push({ ...result.value, isCover: ordered[index].isCover });
      });
      const failed = results.find((result) => result.status === 'rejected');
      if (failed) throw failed.reason;

      const location = await this.prisma.location.create({
        data: {
          ...meta,
          name: input.name.trim(),
          province: clean(input.province),
          district: clean(input.district),
          nearestTown: clean(input.nearestTown),
          categories: cleanList(input.categories),
          description: clean(input.description),
          highlights: cleanList(input.highlights),
          bestTime: clean(input.bestTime),
          openingDays: clean(input.openingDays),
          freeEntry: input.freeEntry ?? false,
          localAdultPrice: input.freeEntry ? null : clean(input.localAdultPrice),
          localChildPrice: input.freeEntry ? null : clean(input.localChildPrice),
          foreignAdultPrice: input.freeEntry ? null : clean(input.foreignAdultPrice),
          foreignChildPrice: input.freeEntry ? null : clean(input.foreignChildPrice),
          ticketNote: clean(input.ticketNote),
          address: clean(input.address),
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,
          travelTips: cleanList(input.travelTips),
          photos: { create: uploaded.map((photo, position) => ({ ...photo, position })) },
        },
        include: withRelations,
      });
      return toView(location);
    } catch (error) {
      // Do not leave orphaned images on Cloudinary when the location could not be saved.
      await this.cloudinary.deleteImages(uploaded.map((photo) => photo.publicId));
      throw error;
    }
  }

  private async destroy(id: number) {
    const photos = await this.prisma.locationPhoto.findMany({ where: { locationId: id }, select: { publicId: true } });
    await this.prisma.location.delete({ where: { locationId: id } });
    await this.cloudinary.deleteImages(photos.map((photo) => photo.publicId));
  }
}
