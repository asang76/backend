import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name:"dmgvdf0ko",
  api_key: "953133351875644",
  api_secret: "KMxj4ylOH_jzqZoTv3C_hFKtsyI",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("Uploading:", localFilePath);
    console.log("File exists:", fs.existsSync(localFilePath));

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Uploaded:", response.url);

    // Delete file only if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;

  } catch (error) {
    console.log("Cloudinary error:", error.message);

    // Delete only if file exists
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
