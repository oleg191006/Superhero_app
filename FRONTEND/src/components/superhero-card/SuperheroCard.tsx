import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Superhero } from "../../types/superhero/superhero.interface";
import { styles } from "./SuperheroCard.styles";

type Props = {
  hero: Superhero;
  onDelete?: (id: string) => void;
};

export default function SuperheroCard({ hero, onDelete }: Props) {
  const handleDelete = () => {
    if (onDelete) onDelete(hero.id);
  };

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        height="150"
        src={
          hero.images && hero.images.length > 0
            ? hero.images[0].url
            : "https://picsum.photos/200/300"
        }
        alt={hero.nickname}
        sx={{ objectFit: "cover" }}
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
