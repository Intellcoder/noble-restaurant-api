/**
 * -----------------------------------------
 * UPLOAD IMAGE FUNCTION
 * -----------------------------------------
 */
export declare class CloudinaryService {
    static uploadImage(file: Express.Multer.File, folder?: string): Promise<string>;
    /**
     * -----------------------------------------
     * DELETE IMAGE
     * -----------------------------------------
     */
    static deleteImage(publicId: string): Promise<any>;
}
//# sourceMappingURL=cloudinary.d.ts.map