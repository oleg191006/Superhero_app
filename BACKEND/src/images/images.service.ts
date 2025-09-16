import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageDto } from './dto/images.dto';

@Injectable()
export class ImagesService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadImage(
    superheroId: string,
    file: Express.Multer.File,
  ): Promise<ImageDto> {
    const cloudinaryResult = await this.cloudinaryService.uploadImage(file);

    const image = await this.prismaService.image.create({
      data: {
        url: cloudinaryResult.secure_url,
        superhero: {
          connect: {
            id: superheroId,
          },
        },
      },
    });

    return image;
  }

  async getImages(superheroId: string): Promise<{ id: string; url: string }[]> {
    const images = await this.prismaService.image.findMany({
      where: { superheroId },
      select: { id: true, url: true },
    });

    return images;
  }

  async deleteImage(id: string): Promise<void> {
    const image = await this.prismaService.image.findUnique({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    await this.prismaService.image.delete({
      where: { id },
    });
  }
}
