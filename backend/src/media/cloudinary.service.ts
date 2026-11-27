import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  // Re-uploading with the same publicId replaces the old image, so no orphaned files pile up.
  async uploadProfilePicture(buffer: Buffer, publicId: string): Promise<string> {
    const { cloud_name, api_key, api_secret } = cloudinary.config();
    if (!cloud_name || !api_key || !api_secret) {
      throw new ServiceUnavailableException('Image uploads are not configured');
    }

    try {
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'evolanka/profile-pictures',
              public_id: publicId,
              overwrite: true,
              invalidate: true,
              resource_type: 'image',
              allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
              transformation: [{ width: 512, height: 512, crop: 'fill', gravity: 'auto', quality: 'auto' }],
            },
            (error, uploaded) => (error || !uploaded ? reject(error) : resolve(uploaded)),
          )
          .end(buffer);
      });
      return result.secure_url;
    } catch (error) {
      this.logger.error(`Profile picture upload failed: ${(error as { message?: string })?.message ?? error}`);
      throw new ServiceUnavailableException('Could not upload the image. Please try again.');
    }
  }

  // Location photos are kept large enough for a gallery but capped so a huge original is not stored as-is.
  async uploadLocationImage(buffer: Buffer): Promise<{ url: string; publicId: string }> {
    const { cloud_name, api_key, api_secret } = cloudinary.config();
    if (!cloud_name || !api_key || !api_secret) {
      throw new ServiceUnavailableException('Image uploads are not configured');
    }

    try {
      const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'evolanka/locations',
              resource_type: 'image',
              allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
              transformation: [{ width: 1920, height: 1920, crop: 'limit', quality: 'auto' }],
            },
            (error, uploaded) => (error || !uploaded ? reject(error) : resolve(uploaded)),
          )
          .end(buffer);
      });
      return { url: result.secure_url, publicId: result.public_id };
    } catch (error) {
      this.logger.error(`Location image upload failed: ${(error as { message?: string })?.message ?? error}`);
      throw new ServiceUnavailableException('Could not upload the images. Please try again.');
    }
  }

  // Best effort: a failed clean-up must never fail the request that triggered it.
  async deleteImages(publicIds: string[]) {
    await Promise.all(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId, { invalidate: true }).catch((error: unknown) => {
          this.logger.warn(`Could not delete image ${publicId}: ${(error as { message?: string })?.message ?? error}`);
        }),
      ),
    );
  }
}
