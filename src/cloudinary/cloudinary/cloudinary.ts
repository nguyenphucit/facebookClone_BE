// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dzszwex0h',
      api_key: '884562247879343',
      api_secret: 'JNPek6zSg1Jqf9l7a_ofU-OtGLg',
    });
  },
};
