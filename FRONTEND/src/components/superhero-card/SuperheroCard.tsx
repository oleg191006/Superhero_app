import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import { styles } from "./SuperheroCard.styles";
import { useState } from "react";

type Props = {
  hero: Superhero;
  onDelete?: (id: string) => void;
};

export default function SuperheroCard({ hero, onDelete }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDelete = () => {
    if (onDelete) onDelete(hero.id);
  };

  const imageUrl =
    hero.images && hero.images.length > 0
      ? hero.images[0].url
      : "https://picsum.photos/200/300";

  return (
    <Card sx={styles.card}>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={275}
          animation="wave"
        />
      )}
      <CardMedia
        component="img"
        src={imageUrl}
        alt={hero.nickname}
        sx={{
          objectFit: "cover",
          height: 275,
          display: imageLoaded ? "block" : "none",
        }}
        onLoad={() => setImageLoaded(true)}
      />
      <CardContent sx={styles.cardContent}>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          {hero.nickname}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            to={`/heroes/${hero.id}`}
            variant="contained"
            color="primary"
            sx={styles.button}
          >
            Details
          </Button>
          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={styles.button}
            >
              Delete
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
