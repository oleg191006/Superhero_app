import { useState } from "react";
import { Typography, Grid, Button, Box, CircularProgress } from "@mui/material";
import type { Superhero } from "../../types/superhero/superhero.interface";
import { styles } from "./SuperheroGallery.styles";

interface SuperheroGalleryProps {
  hero: Superhero;
  onSetMainImage: (imageId: string) => Promise<void>;
}

export default function SuperheroGallery({
  hero,
  onSetMainImage,
}: SuperheroGalleryProps) {
  const [savingImage, setSavingImage] = useState<boolean>(false);

  const handleSetMain = async (imageId: string) => {
    setSavingImage(true);
    await onSetMainImage(imageId);
    setSavingImage(false);
  };

  return (
    <Box sx={styles.galleryContainer}>
      <Typography variant="h6" sx={styles.galleryContainer}>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {hero.images.map((img, index) => (
          <Grid key={img.id}>
            <Box sx={styles.imageBox(img.id === hero.images[0].id)}>
              <img
                src={img.url}
                alt={`${hero.nickname}-${img.id}`}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
              {index !== 0 && (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={styles.setMainButton}
                  onClick={() => handleSetMain(img.id)}
                  disabled={savingImage}
                >
                  {savingImage ? <CircularProgress size={16} /> : "Set as Main"}
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
