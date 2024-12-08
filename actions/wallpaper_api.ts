import { pexels_api_key } from "@/api_key";
import axios from "axios";

export const pexel_wallpaper_api = async () => {
  try {
    const output = await axios.get(
      `https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait`,
      {
        headers: {
          Authorization: pexels_api_key,
        },
      }
    );
    return output;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
