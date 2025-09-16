import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container, Paper, Box, CircularProgress, Alert } from "@mui/material";
import SuperheroFormModal from "@components/superhero-form/SuperheroForm";
import SuperheroInfo from "@components/superhero-info/SuperheroInfo";
import SuperheroGallery from "@components/superhero-galerry/SuperheroGallery";
import { useSuperheroDetails } from "@hooks/useSuperheroDetails";

export default function SuperheroDetails() {
  const { id } = useParams<{ id?: string }>();
  const { hero, loading, error, fetchHero, handleSetMainImage } =
    useSuperheroDetails(id);

  const [openModal, setOpenModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
