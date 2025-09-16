import { Injectable, BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { UPLOAD_ERRORS } from 'src/constants/error-message';

export type CloudinaryResponse = UploadApiResponse;

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException(UPLOAD_ERRORS.MISSING_FILE);
    }

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'superheroes' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(
              new Error(error.message || UPLOAD_ERRORS.UPLOAD_FAILED_GENERIC),
            );
          }

          if (!result) {
            return reject(new Error(UPLOAD_ERRORS.UPLOAD_FAILED_NO_RESULT));
          }

          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
