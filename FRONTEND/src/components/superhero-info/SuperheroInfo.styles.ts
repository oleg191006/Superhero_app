import type { SxProps, Theme } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    alignItems: "flex-start",
  } as SxProps<Theme>,

  imageContainer: {
    flexShrink: 0,
    width: 250,
    height: 250,
    borderRadius: 8,
    border: "2px solid #1976d2",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  } as SxProps<Theme>,

  image: {
    width: "100%",
    height: "100%",
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
