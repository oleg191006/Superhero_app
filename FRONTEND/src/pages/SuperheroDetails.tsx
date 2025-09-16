import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Container, Paper, Box, CircularProgress, Alert } from "@mui/material";
import { superheroService } from "../services/superhero-service";
import type { Superhero } from "../types/superhero/superhero.interface";
import SuperheroFormModal from "../components/superhero-form/SuperheroForm";
import SuperheroInfo from "../components/superhero-info/SuperheroInfo";
import SuperheroGallery from "../components/superhero-galerry/SuperheroGallery";

export default function SuperheroDetails() {
  const { id } = useParams<{ id?: string }>();
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  console.log("SuperheroDetails render, hero:", hero);

  if (!id) return <p>No ID provided</p>;

  const handleEdit = () => {
    setOpenModal(true);
    setSubmitError(null);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSuccess = async () => {
    setSubmitError(null);
    await fetchHero();
    setOpenModal(false);
  };

  const handleSetMainImage = async (imageId: string) => {
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
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={80} />
      </Box>
    );

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
  if (!hero) return <p style={{ textAlign: "center" }}>No superhero found</p>;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "#f9f9f9",
          mb: 4,
        }}
      >
        <SuperheroInfo hero={hero} onEdit={handleEdit} />
      </Paper>

      {hero.images && hero.images.length > 1 && (
        <SuperheroGallery hero={hero} onSetMainImage={handleSetMainImage} />
      )}

      <SuperheroFormModal
        open={openModal}
        onClose={handleCloseModal}
        initialValues={hero}
        onSuccess={handleSuccess}
        title="Edit Superhero"
      />
    </Container>
  );
}
