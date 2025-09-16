import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ImageDto } from './dto/images.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ImageDto,
  ): Promise<any> {
    const url = await this.imagesService.uploadImage(dto.superheroId, file);

    return { url };
  }

  @Get(':superheroId')
  async getImages(
    @Param('superheroId') superheroId: string,
  ): Promise<{ id: string; url: string }[]> {
    return this.imagesService.getImages(superheroId);
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string): Promise<void> {
    return this.imagesService.deleteImage(id);
  }
}
