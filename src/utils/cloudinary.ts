// services/cloudinary.service.ts

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { env } from "../config/env";
/**
 * -----------------------------------------
 * CLOUDINARY CONFIG
 * -----------------------------------------
 */

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,

  api_key: env.CLOUDINARY_API_KEY,

  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * -----------------------------------------
 * UPLOAD IMAGE FUNCTION
 * -----------------------------------------
 */

export class CloudinaryService {
  static async uploadImage(
    file: Express.Multer.File,
    folder = "noble-restaurant",
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,

          resource_type: "image",

          transformation: [
            {
              width: 1200,
              crop: "scale",
              quality: "auto",
            },
          ],
        },

        (error, result) => {
          if (error) {
            reject(error);
          }

          if (!result) {
            reject(new Error("Image upload failed"));
          }

          resolve(result!.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * -----------------------------------------
   * DELETE IMAGE
   * -----------------------------------------
   */

  static async deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
