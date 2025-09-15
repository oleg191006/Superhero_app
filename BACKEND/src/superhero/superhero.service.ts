import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSuperheroDto } from './dto/create-superhero.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Superhero } from 'generated/prisma';

@Injectable()
export class SuperheroService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSuperheroById(id: string): Promise<Superhero> {
    const superhero = await this.prismaService.superhero.findUnique({
      where: { id },
    });

    if (!superhero)
      throw new NotFoundException(`Superhero with id ${id} not found`);

    return superhero;
  }

  async getAllSuperheroes(page = 1, limit = 5) {
    const skip = (page - 1) * limit;

    const superheroes = await this.prismaService.superhero.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        nickname: true,
        images: true,
      },
    });

    return superheroes.map((hero) => ({
      ...hero,
      image: hero.images[0],
    }));
  }

  async create(dto: CreateSuperheroDto): Promise<Superhero> {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = dto;

    const superhero = await this.prismaService.superhero.create({
      data: {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images,
      },
    });

    return superhero;
  }

  async update(id: string, dto: CreateSuperheroDto): Promise<Superhero> {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = dto;

    const superhero = await this.prismaService.superhero.update({
      where: { id },
      data: {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images,
      },
    });

    return superhero;
  }

  async delete(id: string): Promise<void> {
    const superhero = await this.prismaService.superhero.findUnique({
      where: { id },
    });
    if (!superhero)
      throw new NotFoundException(`Superhero with id ${id} not found`);

    await this.prismaService.superhero.delete({ where: { id } });
  }
}
