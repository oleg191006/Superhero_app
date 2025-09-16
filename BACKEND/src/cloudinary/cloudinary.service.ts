import { Injectable, BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse;

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File buffer is missing.');
    }

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'superheroes' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(
              new Error(error.message || 'Cloudinary upload failed.'),
            );
          }

          if (!result) {
            return reject(
              new Error('Cloudinary upload failed: No result received.'),
            );
          }

          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
