import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const prisma = {
    tourist: { create: jest.fn(), findUnique: jest.fn() },
    provider: { create: jest.fn(), findUnique: jest.fn() },
  };
  const jwt = { signAsync: jest.fn().mockResolvedValue('signed-token') };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('hashes the password and returns a token on tourist register', async () => {
    prisma.tourist.create.mockImplementation(({ data }) => Promise.resolve({ touristId: 1, ...data }));

    const result = await service.registerTourist({
      name: 'Amaya',
      email: 'Amaya@Example.com',
      gender: 'female',
      country: 'Sri Lanka',
      mobileNumber: '0771234567',
      password: 'secret123',
    });

    const stored = prisma.tourist.create.mock.calls[0][0].data;
    expect(stored.email).toBe('amaya@example.com');
    expect(stored.password).not.toBe('secret123');
    expect(await bcrypt.compare('secret123', stored.password)).toBe(true);
    expect(result).toMatchObject({ token: 'signed-token', user: { id: 1, role: 'tourist' } });
  });

  it('maps a duplicate email to a conflict', async () => {
    prisma.provider.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('dup', { code: 'P2002', clientVersion: 'test' }),
    );

    await expect(
      service.registerProvider({ name: 'Hill Co', email: 'a@b.com', mobileNumber: '0711111111', password: 'secret123' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects a tourist register when the email belongs to a provider', async () => {
    prisma.provider.findUnique.mockResolvedValueOnce({ providerId: 9 });

    await expect(
      service.registerTourist({
        name: 'Amaya',
        email: 'Shared@Example.com',
        gender: 'female',
        country: 'Sri Lanka',
        mobileNumber: '0771234567',
        password: 'secret123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.tourist.create).not.toHaveBeenCalled();
  });

  it('rejects a provider register when the email belongs to a tourist', async () => {
    prisma.tourist.findUnique.mockResolvedValueOnce({ touristId: 3 });

    await expect(
      service.registerProvider({ name: 'Hill Co', email: 'shared@example.com', mobileNumber: '0711111111', password: 'secret123' }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.provider.create).not.toHaveBeenCalled();
  });

  it('rejects login for an unknown email or wrong password', async () => {
    prisma.tourist.findUnique.mockResolvedValueOnce(null);
    await expect(service.loginTourist({ email: 'x@y.com', password: 'secret123' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    prisma.tourist.findUnique.mockResolvedValueOnce({
      touristId: 2,
      name: 'Liam',
      email: 'liam@example.com',
      password: await bcrypt.hash('right-pass1', 4),
    });
    await expect(service.loginTourist({ email: 'liam@example.com', password: 'wrong-pass1' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('logs a provider in with the correct password', async () => {
    prisma.provider.findUnique.mockResolvedValue({
      providerId: 5,
      name: 'Lanka Wheels',
      email: 'lw@example.com',
      password: await bcrypt.hash('right-pass1', 4),
    });

    const result = await service.loginProvider({ email: 'lw@example.com', password: 'right-pass1' });
    expect(result).toMatchObject({ token: 'signed-token', user: { id: 5, role: 'provider' } });
  });
});
