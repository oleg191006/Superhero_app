import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get(':id')
  getSuperheroById(@Param('id') id: string) {
    return this.superheroService.getSuperheroById(id);
  }

  @Get()
  getAllSuperheroes() {
    return this.superheroService.getAllSuperheroes();
  }

  @Post()
  create(@Body() dto: CreateSuperheroDto) {
    return this.superheroService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateSuperheroDto) {
    return this.superheroService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.superheroService.delete(id);
  }
}
