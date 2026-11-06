import { randomBytes } from 'node:crypto';
import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { RegisterTouristDto } from './dto/register-tourist.dto';
import { AppleLoginDto, GoogleLoginDto } from './dto/social-login.dto';

export type AuthRole = 'tourist' | 'provider';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
};

export type AuthProfile = AuthUser & {
  mobileNumber: string;
  profilePicture: string | null;
  gender?: string;
  country?: string;
  passportNumber?: string | null;
  nic?: string | null;
};

const SALT_ROUNDS = 10;
// Used to keep login timing similar when the email is unknown.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', SALT_ROUNDS);

const APPLE_ISSUER = 'https://appleid.apple.com';
const appleKeys = createRemoteJWKSet(new URL(`${APPLE_ISSUER}/auth/keys`));

type SocialProfile = { email: string; name?: string; picture?: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async registerTourist(dto: RegisterTouristDto) {
    const email = dto.email.toLowerCase();
    await this.assertEmailNotUsedByProvider(email);
    const password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    try {
      const tourist = await this.prisma.tourist.create({
        data: {
          name: dto.name.trim(),
          email,
          gender: dto.gender,
          country: dto.country,
          mobileNumber: dto.mobileNumber,
          password,
        },
      });
      return this.issueToken({ id: tourist.touristId, name: tourist.name, email: tourist.email, role: 'tourist' });
    } catch (error) {
      this.rethrowDuplicate(error);
    }
  }

  async registerProvider(dto: RegisterProviderDto) {
    const email = dto.email.toLowerCase();
    await this.assertEmailNotUsedByTourist(email);
    const password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    try {
      const provider = await this.prisma.provider.create({
        data: {
          name: dto.name.trim(),
          email,
          mobileNumber: dto.mobileNumber,
          password,
        },
      });
      return this.issueToken({ id: provider.providerId, name: provider.name, email: provider.email, role: 'provider' });
    } catch (error) {
      this.rethrowDuplicate(error);
    }
  }

  async loginTourist(dto: LoginDto) {
    const tourist = await this.prisma.tourist.findUnique({ where: { email: dto.email.toLowerCase() } });
    await this.assertPassword(dto.password, tourist?.password);
    return this.issueToken({ id: tourist!.touristId, name: tourist!.name, email: tourist!.email, role: 'tourist' });
  }

  async loginTouristWithGoogle(dto: GoogleLoginDto) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new ServiceUnavailableException('Google sign-in is not configured');

    // The access token must have been issued to our own client, otherwise any app's token would be accepted.
    const tokenInfo = await this.fetchGoogle<{ aud?: string }>(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(dto.accessToken)}`,
    );
    if (tokenInfo.aud !== clientId) throw new UnauthorizedException('Invalid Google token');

    const profile = await this.fetchGoogle<{
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    }>('https://openidconnect.googleapis.com/v1/userinfo', dto.accessToken);
    if (!profile.email || profile.email_verified !== true) {
      throw new UnauthorizedException('Your Google email address is not verified');
    }
    return this.signInSocialTourist({ email: profile.email, name: profile.name, picture: profile.picture });
  }

  async loginTouristWithApple(dto: AppleLoginDto) {
    const clientId = process.env.APPLE_CLIENT_ID;
    if (!clientId) throw new ServiceUnavailableException('Apple sign-in is not configured');

    let claims: { email?: unknown; email_verified?: unknown };
    try {
      ({ payload: claims } = await jwtVerify(dto.idToken, appleKeys, { issuer: APPLE_ISSUER, audience: clientId }));
    } catch {
      throw new UnauthorizedException('Invalid Apple token');
    }
    const verified = claims.email_verified === true || claims.email_verified === 'true';
    if (typeof claims.email !== 'string' || !verified) {
      throw new UnauthorizedException('Your Apple email address is not verified');
    }
    return this.signInSocialTourist({ email: claims.email, name: dto.name });
  }

  async loginProvider(dto: LoginDto) {
    const provider = await this.prisma.provider.findUnique({ where: { email: dto.email.toLowerCase() } });
    await this.assertPassword(dto.password, provider?.password);
    return this.issueToken({ id: provider!.providerId, name: provider!.name, email: provider!.email, role: 'provider' });
  }

  async getProfile(id: number, role: AuthRole): Promise<AuthProfile> {
    if (role === 'tourist') {
      const tourist = await this.prisma.tourist.findUnique({ where: { touristId: id } });
      if (!tourist) throw new UnauthorizedException('Account no longer exists');
      return {
        id,
        name: tourist.name,
        email: tourist.email,
        role,
        mobileNumber: tourist.mobileNumber,
        profilePicture: tourist.profilePicture,
        gender: tourist.gender,
        country: tourist.country,
        passportNumber: tourist.passportNumber,
        nic: tourist.nic,
      };
    }

    const provider = await this.prisma.provider.findUnique({ where: { providerId: id } });
    if (!provider) throw new UnauthorizedException('Account no longer exists');
    return {
      id,
      name: provider.name,
      email: provider.email,
      role,
      mobileNumber: provider.mobileNumber,
      profilePicture: provider.profilePicture,
    };
  }

  // Tourist and provider live in separate tables, so cross-table uniqueness is enforced here.
  private async assertEmailNotUsedByProvider(email: string) {
    if (await this.prisma.provider.findUnique({ where: { email }, select: { providerId: true } })) {
      throw new ConflictException('This email is already registered as a provider account');
    }
  }

  private async assertEmailNotUsedByTourist(email: string) {
    if (await this.prisma.tourist.findUnique({ where: { email }, select: { touristId: true } })) {
      throw new ConflictException('This email is already registered as a tourist account');
    }
  }

  // Social accounts get a random password nobody knows; the missing tourist details can be filled in later.
  private async signInSocialTourist(profile: SocialProfile) {
    const email = profile.email.toLowerCase();
    let tourist = await this.prisma.tourist.findUnique({ where: { email } });
    if (!tourist) {
      await this.assertEmailNotUsedByProvider(email);
      try {
        tourist = await this.prisma.tourist.create({
          data: {
            name: profile.name?.trim() || email.split('@')[0],
            email,
            gender: '',
            country: '',
            mobileNumber: '',
            password: await bcrypt.hash(randomBytes(32).toString('hex'), SALT_ROUNDS),
            profilePicture: profile.picture,
          },
        });
      } catch (error) {
        this.rethrowDuplicate(error);
      }
    }
    return this.issueToken({ id: tourist.touristId, name: tourist.name, email: tourist.email, role: 'tourist' });
  }

  private async fetchGoogle<T>(url: string, bearer?: string): Promise<T> {
    let response: Response;
    try {
      response = await fetch(url, bearer ? { headers: { Authorization: `Bearer ${bearer}` } } : undefined);
    } catch {
      throw new ServiceUnavailableException('Could not reach Google. Please try again.');
    }
    if (!response.ok) throw new UnauthorizedException('Invalid Google token');
    return (await response.json()) as T;
  }

  private async assertPassword(password: string, hash?: string) {
    const valid = await bcrypt.compare(password, hash ?? DUMMY_HASH);
    if (!hash || !valid) throw new UnauthorizedException('Invalid email or password');
  }

  private async issueToken(user: AuthUser) {
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { token, user };
  }

  private rethrowDuplicate(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ConflictException('An account with this email already exists');
    }
    throw error;
  }
}
