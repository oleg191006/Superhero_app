import type { Superhero } from "./superhero.interface";

export type SuperheroDTO = Omit<Superhero, "id">;
