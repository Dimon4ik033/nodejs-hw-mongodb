import cloudinary from 'cloudinary';

import { getEnvVar } from './getEnvVar.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLODINARY_API_KEY'),
  api_secret: getEnvVar('CLODINARY_API_SECRET'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
