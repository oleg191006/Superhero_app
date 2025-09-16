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
              display: "flex",
              alignItems: "center",
              minWidth: "250px",
              flexShrink: 0,
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
