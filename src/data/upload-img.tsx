import { generateUniqueString } from "./helper";

export const default_img_url =
  "https://img.drz.lazcdn.com/static/bd/p/f4a90ab802cab10f6ecebd7f4a0758b7.jpg_400x400q80.jpg_.webp";

export const uploadImgToCloude = async (
  file: File,
): Promise<{ secure_url: string; public_id: string }> => {
  await new Promise((resolve) => {
    file.arrayBuffer();
    setTimeout(resolve, 100);
  });
  return {
    public_id: generateUniqueString(),
    secure_url: default_img_url,
  };
};
