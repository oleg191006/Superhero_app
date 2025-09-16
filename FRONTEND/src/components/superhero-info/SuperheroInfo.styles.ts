// src/components/SuperheroInfo.styles.ts
import type { SxProps, Theme } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    alignItems: "flex-start",
  } as SxProps<Theme>,

  // The main change is here: fixed width and height
  imageContainer: {
    flexShrink: 0,
    width: 250, // Fixed width
    height: 250, // Fixed height
    borderRadius: 8,
    border: "2px solid #1976d2",
    overflow: "hidden", // Ensures the image doesn't overflow
    display: "flex", // Centering the content
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // A simple grey placeholder background
  } as SxProps<Theme>,

  image: {
    width: "100%", // The image should fill its container
    height: "100%", // The image should fill its container
    objectFit: "cover",
  },

  infoBox: {
    flexGrow: 1,
  } as SxProps<Theme>,

  subtitle: {
    color: "text.secondary",
    gutterBottom: true,
  },

  text: {
    mt: 2,
  },

  catchPhrase: {
    mt: 2,
    fontStyle: "italic",
    color: "#555",
  },

  editButton: {
    mt: 3,
  },
};
