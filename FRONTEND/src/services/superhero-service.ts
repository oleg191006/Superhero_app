import { URLs } from "../constants/request";
import type { Superhero } from "../types/superhero/superhero.interface";
import type { SuperheroDTO } from "../types/superhero/superhero.type";
import { getFullUrl } from "../utils/get-full-url";
import { baseService } from "./base-service";

export const superheroService = {
  getSuperheroById: (id: string) => {
    return baseService.request<Superhero>({
      method: "GET",
      url: getFullUrl({
        pathname: URLs.superheroes.getById,
        parameters: { id },
      }),
    });
  },

  getAllSuperheroes: () => {
    return baseService.request<Superhero[]>({
      method: "GET",
      url: getFullUrl({
        pathname: URLs.superheroes.getAll,
      }),
    });
  },

  create: (dto: SuperheroDTO) => {
    return baseService.request<Superhero>({
      method: "POST",
      url: URLs.superheroes.create,
      data: dto,
    });
  },

  update: (id: string, dto: SuperheroDTO) => {
    return baseService.request<Superhero>({
      method: "PUT",
      url: getFullUrl({
        pathname: URLs.superheroes.update,
        parameters: { id },
      }),
      data: dto,
    });
  },

  delete: (id: string) => {
    return baseService.request<void>({
      method: "DELETE",
      url: getFullUrl({
        pathname: URLs.superheroes.delete,
        parameters: { id },
      }),
    });
  },
};
