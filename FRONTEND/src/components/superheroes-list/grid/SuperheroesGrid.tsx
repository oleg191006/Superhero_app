import { Box, Typography } from "@mui/material";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import SuperheroCard from "@components/superhero-card/SuperheroCard";

interface SuperheroesGridProps {
  heroes: Superhero[];
  onDeleteHero: (id: string) => void;
}

export default function SuperheroesGrid({
  heroes,
  onDeleteHero,
}: SuperheroesGridProps) {
  return (
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
      {heroes.length > 0 ? (
        heroes.map((hero) => (
          <Box
            key={hero.id}
            sx={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              minWidth: "250px",
            }}
          >
            <SuperheroCard hero={hero} onDelete={onDeleteHero} />
          </Box>
        ))
      ) : (
        <Typography variant="h6" color="text.secondary">
          No superheroes found.
        </Typography>
      )}
    </Box>
  );
}
