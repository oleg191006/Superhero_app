import { Typography, Button, Box } from "@mui/material";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import { styles } from "./SuperheroInfo.styles";

interface SuperheroInfoProps {
  hero: Superhero;
  onEdit: () => void;
}

export default function SuperheroInfo({ hero, onEdit }: SuperheroInfoProps) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageContainer}>
        {hero.images?.[0] ? (
          <img
            src={hero.images[0].url}
            alt={hero.nickname}
            style={styles.image as React.CSSProperties}
          />
        ) : (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            No main image available
          </Typography>
        )}
      </Box>
      <Box sx={styles.infoBox}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {hero.nickname}
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          {hero.real_name}
        </Typography>
        <Typography sx={styles.text}>{hero.origin_description}</Typography>
        <Typography sx={styles.text}>
          <b>Powers:</b> {hero.superpowers}
        </Typography>
        <Typography sx={styles.catchPhrase}>"{hero.catch_phrase}"</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.editButton}
          onClick={onEdit}
        >
          Edit Superhero
        </Button>
      </Box>
    </Box>
  );
}
