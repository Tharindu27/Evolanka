import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from '../media/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRole, AuthService } from './auth.service';
import { UpdateProviderProfileDto, UpdateTouristProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async updateTourist(id: number, dto: UpdateTouristProfileDto) {
    const data: Prisma.TouristUpdateInput = {
      name: dto.name?.trim(),
      gender: dto.gender?.trim(),
      country: dto.country?.trim(),
      mobileNumber: dto.mobileNumber?.trim(),
      // Optional identity documents: blank clears them.
      passportNumber: dto.passportNumber === undefined ? undefined : dto.passportNumber.trim() || null,
      nic: dto.nic === undefined ? undefined : dto.nic.trim() || null,
    };
    await this.apply(() => this.prisma.tourist.update({ where: { touristId: id }, data }), data);
    return this.auth.getProfile(id, 'tourist');
  }

  async updateProvider(id: number, dto: UpdateProviderProfileDto) {
    const data: Prisma.ProviderUpdateInput = {
      name: dto.name?.trim(),
      mobileNumber: dto.mobileNumber?.trim(),
    };
    await this.apply(() => this.prisma.provider.update({ where: { providerId: id }, data }), data);
    return this.auth.getProfile(id, 'provider');
  }

  async setPicture(id: number, role: AuthRole, file: Express.Multer.File | undefined) {
    if (!file) throw new BadRequestException('Choose an image to upload (field name "file")');

    const url = await this.cloudinary.uploadProfilePicture(file.buffer, `${role}-${id}`);
    await this.apply(
      () =>
        role === 'tourist'
          ? this.prisma.tourist.update({ where: { touristId: id }, data: { profilePicture: url } })
          : this.prisma.provider.update({ where: { providerId: id }, data: { profilePicture: url } }),
      { profilePicture: url },
    );
    return this.auth.getProfile(id, role);
  }

  private async apply(update: () => Promise<unknown>, data: Record<string, unknown>) {
    if (Object.values(data).every((value) => value === undefined)) {
      throw new BadRequestException('No changes provided');
    }
    try {
      await update();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Account no longer exists');
      }
      throw error;
    }
  }
}
