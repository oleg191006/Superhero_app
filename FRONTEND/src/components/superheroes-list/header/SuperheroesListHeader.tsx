import { Typography, Button, Stack } from "@mui/material";

interface SuperheroesListHeaderProps {
  onOpenCreate: () => void;
}

export default function SuperheroesListHeader({
  onOpenCreate,
}: SuperheroesListHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 4, width: "100%" }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Superheroes
      </Typography>
      <Button variant="contained" size="large" onClick={onOpenCreate}>
        Add Superhero
      </Button>
    </Stack>
  );
}
