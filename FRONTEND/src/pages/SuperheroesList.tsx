import { useEffect, useState } from "react";
import {
  Pagination,
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import { superheroService } from "../services/superhero-service";
import type { Superhero } from "../types/superhero/superhero.interface";
import SuperheroCard from "../components/superhero-card/SuperheroCard";
import SuperheroFormModal from "../components/superhero-form/SuperheroForm";

export default function SuperheroesList() {
  const [allHeroes, setAllHeroes] = useState<Superhero[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [editingHero, setEditingHero] = useState<Superhero | null>(null);

  const totalPages = Math.ceil(allHeroes.length / perPage);
  const currentHeroes = allHeroes.slice((page - 1) * perPage, page * perPage);

  const fetchHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await superheroService.getAllSuperheroes(1, 1000);
      setAllHeroes(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

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
      setAllHeroes((prev) => prev.filter((hero) => hero.id !== id));
      const remainingHeroes = allHeroes.filter((hero) => hero.id !== id);
      const newTotalPages = Math.ceil(remainingHeroes.length / perPage);
      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4, width: "100%" }}
        >
          <Typography variant="h3" fontWeight="bold">
            Superheroes
          </Typography>
          <Button variant="contained" size="large" onClick={handleOpenCreate}>
            Add Superhero
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            overflowX: "auto",
            mt: 5,
            justifyContent: "center",
            width: "100%",
          }}
        >
          {currentHeroes.length > 0 ? (
            currentHeroes.map((hero) => (
              <Box
                key={hero.id}
                sx={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "250px",
                }}
              >
                <SuperheroCard hero={hero} onDelete={handleDeleteHero} />
              </Box>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              No superheroes found.
            </Typography>
          )}
        </Box>
        <Stack alignItems="center" sx={{ mt: 4, width: "100%" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            size="large"
            color="primary"
          />
        </Stack>
      </Paper>
      <SuperheroFormModal
        open={openModal}
        onClose={handleCloseModal}
        initialValues={editingHero}
        onSuccess={handleSuccess}
        title={editingHero ? "Edit Superhero" : "Create Superhero"}
      />
    </Container>
  );
}
