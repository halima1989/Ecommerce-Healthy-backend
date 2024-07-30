// Exemple d'utilisation dans un service
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { SigninDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { ProductDto } from 'src/product/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  async signup(dto: SignupDto): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }

    const hash = await argon.hash(dto.password);
    const defaultRoleId = '3be1d42f-e8ff-4e4d-a629-fffb56fcde6b';

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
        name: dto.name,
        address: dto.address,
        roleId: defaultRoleId,
        isActive: false,
      },
    });

    const activationToken = await argon.hash(`${new Date()} + ${user.email}`);
    await this.prisma.activationToken.create({
      data: {
        userId: user.id,
        token: activationToken,
      },
    });

    await this.emailService.sendUserConfirmation(user, activationToken);

    return {
      message:
        'Signup successful. Please check your email to activate your account.',
    };
  }

  async activateAccount(token: string): Promise<{ message: string }> {
    const activationToken = await this.prisma.activationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!activationToken) {
      throw new ForbiddenException('Invalid or expired activation token');
    }

    await this.prisma.user.update({
      where: { id: activationToken.userId },
      data: { isActive: true },
    });

    await this.prisma.activationToken.delete({
      where: { token },
    });

    return { message: 'Account activated successfully' };
  }

  async signin(dto: SigninDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const isValidPassword = await argon.verify(user.hash, dto.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }
  private async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get<string>('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
