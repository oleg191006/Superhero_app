import { useState } from "react";
import {
  Container,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

import { superheroService } from "@services/superhero-service";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import { useSuperheroesData } from "@hooks/useSuperheroesData";
import SuperheroesListHeader from "@components/superheroes-list/header/SuperheroesListHeader";
import SuperheroesGrid from "@components/superheroes-list/grid/SuperheroesGrid";
import SuperheroesPagination from "@components/superheroes-list/pagination/SuperheroesPagination";
import SuperheroFormModal from "@components/superhero-form/SuperheroForm";

export default function SuperheroesList() {
  const {
    superheroes: allHeroes,
    loading,
    error,
    refetch: fetchHeroes,
  } = useSuperheroesData();

  const [page, setPage] = useState(1);
  const perPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [editingHero, setEditingHero] = useState<Superhero | null>(null);

  const totalPages = Math.ceil(allHeroes.length / perPage);
  const currentHeroes = allHeroes.slice((page - 1) * perPage, page * perPage);

  const handleOpenCreate = () => {
    setEditingHero(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingHero(null);
  };

  const handleSuccess = async () => {
    await fetchHeroes();
  };

  const handleDeleteHero = async (id: string) => {
    try {
      await superheroService.delete(id);
      await fetchHeroes();
    } catch (err) {
      console.error("Failed to delete superhero:", err);
    }
  };

  if (loading) {
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
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">Failed to load superheroes: {error}</Alert>
        <Button variant="contained" onClick={fetchHeroes} sx={{ mt: 2 }}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ mt: 4, mb: 6, width: "1450px" }} maxWidth={false}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "#f9f9f9",
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SuperheroesListHeader onOpenCreate={handleOpenCreate} />

          <SuperheroesGrid
            heroes={currentHeroes}
            onDeleteHero={handleDeleteHero}
          />

          <SuperheroesPagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </Paper>
      </Container>

      <SuperheroFormModal
        open={openModal}
        onClose={handleCloseModal}
        initialValues={editingHero}
        onSuccess={handleSuccess}
        title={editingHero ? "Edit Superhero" : "Create Superhero"}
      />
    </>
  );
}
