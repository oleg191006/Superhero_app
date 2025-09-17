import { useState, useEffect, useCallback } from "react";
import { superheroService } from "@services/superhero-service";
import type { Superhero } from "@app-types/superhero/superhero.interface";

export const useSuperheroDetails = (id?: string) => {
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHero = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (id) {
        const data = await superheroService.getSuperheroById(id);
        setHero(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  const handleSetMainImage = useCallback(
    async (imageId: string) => {
      if (!hero) return;
      try {
        const selectedImage = hero.images.find((img) => img.id === imageId);
        if (selectedImage) {
          const remainingImages = hero.images.filter(
            (img) => img.id !== imageId
          );
          const updatedImages = [selectedImage, ...remainingImages];

          setHero({ ...hero, images: updatedImages });
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    },
    [hero]
  );

  return { hero, loading, error, fetchHero, handleSetMainImage };
};
