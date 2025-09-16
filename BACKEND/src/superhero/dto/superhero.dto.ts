import { IsNotEmpty, IsString } from 'class-validator';
import { Image } from 'generated/prisma';

export class SuperheroDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  real_name: string;

  @IsNotEmpty()
  @IsString()
  origin_description: string;

  @IsNotEmpty()
  @IsString()
  superpowers: string;

  @IsNotEmpty()
  @IsString()
  catch_phrase: string;

  images: Image[];
}
