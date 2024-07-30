import { ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export async function checkUserHasAccount(userId: string) {
  if (!userId) {
    throw new ForbiddenException('Access to resources denied no account');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.id) {
    throw new ForbiddenException('Access to resources denied');
  }
}

export async function checkUserIsAdmin(userId: string) {
  if (!userId) {
    throw new ForbiddenException('Access to resources denied(is admin) ');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });

  if (!user || !user.id) {
    throw new ForbiddenException('Access to resources denied');
  }

  if (user.role.name !== Roles.ADMIN) {
    throw new ForbiddenException('Access to resources denied');
  }
}
