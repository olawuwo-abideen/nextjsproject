import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEventsDto,
  EditEventsDto,
} from './dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  getEvents(userId: number) {
    return this.prisma.events.findMany({
      where: {
        userId,
      },
    });
  }

  getEventsById(
    userId: number,
    eventsId: number,
  ) {
    return this.prisma.events.findFirst({
      where: {
        id: eventsId,
        userId,
      },
    });
  }

  async createEvents(
    userId: number,
    dto: CreateEventsDto,
  ) {
    const events =
      await this.prisma.events.create({
        data: {
          userId,
          ...dto,
        },
      });

    return events;
  }

  async editEventsById(
    userId: number,
    eventsId: number,
    dto: EditEventsDto,
  ) {
    // get the Events by id
    const events =
      await this.prisma.events.findUnique({
        where: {
          id: eventsId,
        },
      });

    // check if user owns the bookmark
    if (!events || events.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.events.update({
      where: {
        id: eventsId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEventsById(
    userId: number,
    eventsId: number,
  ) {
    const events =
      await this.prisma.events.findUnique({
        where: {
          id: eventsId,
        },
      });

    // check if user owns the bookmark
    if (!events || events.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.events.delete({
      where: {
        id: eventsId,
      },
    });
  }
}
