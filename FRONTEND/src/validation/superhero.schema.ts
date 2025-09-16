import { z } from "zod";

export const superheroSchema = z.object({
  nickname: z
    .string()
    .min(2, "Nickname must be at least 2 characters long")
    .nonempty("Nickname is required"),
  real_name: z.string().nonempty("Real name is required"),
  origin_description: z.string().nonempty("Origin description is required"),
  superpowers: z.string().nonempty("Superpowers are required"),
  catch_phrase: z.string().nonempty("Catch phrase is required"),
  images: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string(),
      superheroId: z.string().optional(),
    })
  ),
});
