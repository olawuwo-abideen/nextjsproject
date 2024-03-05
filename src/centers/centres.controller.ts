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
import { CentresService } from './centres.service';
import {
  CreateCentresDto,
  EditCentresDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('centres')
export class CentresController {
  constructor(
    private centresService: CentresService,
  ) {}

  @Get()
  getCentres(@GetUser('id') userId: number) {
    return this.centresService.getCentres(
      userId,
    );
  }

  @Get(':id')
  getCentresById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) centresId: number,
  ) {
    return this.centresService.getCentresById(
      userId,
      centresId,
    );
  }

  @Post()
  createCentres(
    @GetUser('id') userId: number,
    @Body() dto: CreateCentresDto,
  ) {
    return this.centresService.createCentres(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editCentresById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) centresId: number,
    @Body() dto: EditCentresDto,
  ) {
    return this.centresService.editCentresById(
      userId,
      centresId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCentresById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) centresId: number,
  ) {
    return this.centresService.deleteCentresById(
      userId,
      centresId,
    );
  }
}
