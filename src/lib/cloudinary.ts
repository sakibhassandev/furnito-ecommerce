const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset";
const CLOUDINARY_CLOUD_NAME = "your_cloud_name";

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};
