import { Injectable, NotFoundException } from '@nestjs/common';

import { SuperheroDto } from './dto/superhero.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Superhero } from 'generated/prisma';

@Injectable()
export class SuperheroService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSuperheroById(id: string): Promise<Superhero> {
    const superhero = await this.prismaService.superhero.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!superhero)
      throw new NotFoundException(`Superhero with id ${id} not found`);

    return superhero;
  }

  async getAllSuperheroes() {
    const superheroes = await this.prismaService.superhero.findMany({
      select: {
        id: true,
        nickname: true,
        images: true,
      },
    });

    return superheroes;
  }

  async create(dto: SuperheroDto): Promise<Superhero> {
    const { images, ...superheroData } = dto;

    const superhero = this.prismaService.superhero.create({
      data: {
        ...superheroData,
        images: images
          ? {
              create: images.map((image) => ({ url: image.url })),
            }
          : undefined,
      },
      include: { images: true },
    });

    return superhero;
  }

  async update(id: string, dto: SuperheroDto): Promise<Superhero> {
    const { images, ...superheroData } = dto;

    return this.prismaService.superhero.update({
      where: { id },
      data: {
        ...superheroData,
        images: images
          ? {
              deleteMany: {},
              create: images.map((image) => ({ url: image.url })),
            }
          : undefined,
      },
      include: { images: true },
    });
  }

  async delete(id: string) {
    const superhero = await this.prismaService.superhero.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!superhero)
      throw new NotFoundException(`Superhero with id ${id} not found`);

    await this.prismaService.image.deleteMany({
      where: { superheroId: id },
    });

    return this.prismaService.superhero.delete({
      where: { id },
    });
  }
}
