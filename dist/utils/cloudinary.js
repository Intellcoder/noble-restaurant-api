"use strict";
// services/cloudinary.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const env_1 = require("../config/env");
/**
 * -----------------------------------------
 * CLOUDINARY CONFIG
 * -----------------------------------------
 */
cloudinary_1.v2.config({
    cloud_name: env_1.env.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.env.CLOUDINARY_API_KEY,
    api_secret: env_1.env.CLOUDINARY_API_SECRET,
});
/**
 * -----------------------------------------
 * UPLOAD IMAGE FUNCTION
 * -----------------------------------------
 */
class CloudinaryService {
    static async uploadImage(file, folder = "noble-restaurant") {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                resource_type: "image",
                transformation: [
                    {
                        width: 1200,
                        crop: "scale",
                        quality: "auto",
                    },
                ],
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                if (!result) {
                    reject(new Error("Image upload failed"));
                }
                resolve(result.secure_url);
            });
            streamifier_1.default.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    /**
     * -----------------------------------------
     * DELETE IMAGE
     * -----------------------------------------
     */
    static async deleteImage(publicId) {
        return cloudinary_1.v2.uploader.destroy(publicId);
    }
}
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.js.map