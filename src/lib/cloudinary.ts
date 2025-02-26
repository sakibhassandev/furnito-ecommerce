"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "./prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResponse> => {
  if (!file) {
    throw new Error("No file found in form data");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "furnito/products",
          timeout: 60000, // 1 minute timeout
        },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            reject(new Error(error?.message || "Upload failed with no result"));
            return;
          }

          console.log("Cloudinary upload successful:", result.public_id);
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error preparing file for upload:", error);
    throw new Error(
      `Upload preparation failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error("Cloudinary delete failed:", error);
        throw error;
      }
      console.log("Cloudinary delete successful:", result);
    });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};
