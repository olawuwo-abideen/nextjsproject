import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCentresDto,
  EditCentresDto,
} from './dto';

@Injectable()
export class CentresService {
  constructor(private prisma: PrismaService) {}

  getCentres(userId: number) {
    return this.prisma.centres.findMany({
      where: {
        userId,
      },
    });
  }

  getCentresById(
    userId: number,
    centresId: number,
  ) {
    return this.prisma.centres.findFirst({
      where: {
        id: centresId,
        userId,
      },
    });
  }

  async createCentres(
    userId: number,
    dto: CreateCentresDto,
  ) {
    const centres =
      await this.prisma.centres.create({
        data: {
          userId,
          ...dto,
        },
      });

    return centres;
  }

  async editCentresById(
    userId: number,
    centresId: number,
    dto: EditCentresDto,
  ) {
    // get the Centres by id
    const centres =
      await this.prisma.centres.findUnique({
        where: {
          id: centresId,
        },
      });

    // check if user owns the Centres
    if (!centres || centres.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.centres.update({
      where: {
        id: centresId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCentresById(
    userId: number,
    centresId: number,
  ) {
    const centres =
      await this.prisma.centres.findUnique({
        where: {
          id: centresId,
        },
      });

    // check if user owns the bookmark
    if (!centres || centres.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.centres.delete({
      where: {
        id: centresId,
      },
    });
  }
}
