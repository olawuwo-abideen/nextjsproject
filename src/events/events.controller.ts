import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EventsService } from './events.service';
import {
  CreateEventsDto,
  EditEventsDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
  ) {}

  @Get()
  getEvents(@GetUser('id') userId: number) {
    return this.eventsService.getEvents(
      userId,
    );
  }

  @Get(':id')
  getEventsById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventsId: number,
  ) {
    return this.eventsService.getEventsById(
      userId,
      eventsId,
    );
  }

  @Post()
  createEvents(
    @GetUser('id') userId: number,
    @Body() dto: CreateEventsDto,
  ) {
    return this.eventsService.createEvents(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editEventsById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventsId: number,
    @Body() dto: EditEventsDto,
  ) {
    return this.eventsService.editEventsById(
      userId,
      eventsId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEventsById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) eventsId: number,
  ) {
    return this.eventsService.deleteEventsById(
      userId,
      eventsId,
    );
  }
}
