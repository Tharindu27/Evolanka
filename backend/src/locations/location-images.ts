import { BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

export const MAX_GALLERY_PHOTOS = 10;
const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// One optional "cover" image and up to ten "gallery" images, each checked before anything is uploaded.
export const locationImages = () =>
  FileFieldsInterceptor(
    [
      { name: 'cover', maxCount: 1 },
      { name: 'gallery', maxCount: MAX_GALLERY_PHOTOS },
    ],
    {
      limits: { fileSize: IMAGE_MAX_BYTES, files: MAX_GALLERY_PHOTOS + 1 },
      fileFilter: (_req, file, callback) =>
        IMAGE_TYPES.includes(file.mimetype)
          ? callback(null, true)
          : callback(new BadRequestException('Photos must be JPG, PNG or WebP images'), false),
    },
  );
