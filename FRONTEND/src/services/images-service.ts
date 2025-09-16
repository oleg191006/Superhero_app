import { URLs } from "../constants/request";
import { getFullUrl } from "../utils/get-full-url";
import { baseService } from "./base-service";

export const imageService = {
  getImages: (superheroId: string) => {
    return baseService.request<{ id: string; url: string }[]>({
      method: "GET",
      url: getFullUrl({
        pathname: URLs.images.getBySuperheroId,
        parameters: { superheroId },
      }),
    });
  },

  uploadImage: (superheroId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append("superheroId", superheroId);

    return baseService.request({
      method: "POST",
      url: getFullUrl({ pathname: URLs.images.upload }),
      data: formData,
    });
  },

  deleteImage: (id: string) => {
    return baseService.request<void>({
      method: "DELETE",
      url: getFullUrl({
        pathname: URLs.images.delete,
        parameters: { id },
      }),
    });
  },
};
