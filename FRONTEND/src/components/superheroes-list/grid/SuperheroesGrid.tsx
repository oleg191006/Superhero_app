import { Box, Typography } from "@mui/material";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import SuperheroCard from "@components/superhero-card/SuperheroCard";
import { styles } from "./SuperheroeGrid.styles";

interface SuperheroesGridProps {
  heroes: Superhero[];
  onDeleteHero: (id: string) => void;
}

export default function SuperheroesGrid({
  heroes,
  onDeleteHero,
}: SuperheroesGridProps) {
  return (
    <Box sx={styles.container}>
      {heroes.length > 0 ? (
        heroes.map((hero) => (
          <Box key={hero.id} sx={styles.heroWrapper}>
            <SuperheroCard hero={hero} onDelete={onDeleteHero} />
          </Box>
        ))
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No superheroes found.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
