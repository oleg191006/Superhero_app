export const UPLOAD_ERRORS = {
  MISSING_FILE: 'File buffer is missing.',
  UPLOAD_FAILED_NO_RESULT: 'Cloudinary upload failed: No result received.',
  UPLOAD_FAILED_GENERIC: 'Cloudinary upload failed.',
};

export const ERROR_MESSAGES = {
  IMAGES: {
    NOT_FOUND: (id: string) => `Image with id ${id} not found`,
  },
  SUPERHEROES: {
    NOT_FOUND: (id: string) => `Superhero with id ${id} not found`,
  },
};
