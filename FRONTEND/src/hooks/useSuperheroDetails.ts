import { useState, useEffect, useCallback } from "react";
import { superheroService } from "@services/superhero-service";
import type { Superhero } from "../types/superhero/superhero.interface";

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
        const newImages = [...hero.images];
        const selectedImage = newImages.find((img) => img.id === imageId);
        if (selectedImage) {
          const remainingImages = newImages.filter((img) => img.id !== imageId);
          const updatedImages = [selectedImage, ...remainingImages];
          const updatedHero = { ...hero, images: updatedImages };
          await superheroService.update(hero.id, updatedHero);
          setHero(updatedHero);
        }
      } catch (err) {
        console.error("Failed to set main image:", err);
      }
    },
    [hero]
  );

  return { hero, loading, error, fetchHero, handleSetMainImage };
};
