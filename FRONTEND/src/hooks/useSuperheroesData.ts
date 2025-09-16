import { useState, useEffect, useCallback } from "react";
import { superheroService } from "@services/superhero-service";
import type { Superhero } from "@app-types/superhero/superhero.interface";

type UseSuperheroesDataHook = {
  superheroes: Superhero[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useSuperheroesData = (): UseSuperheroesDataHook => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await superheroService.getAllSuperheroes(1, 1000);
      setSuperheroes(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  return { superheroes, loading, error, refetch: fetchHeroes };
};
