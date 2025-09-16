export const styles = {
  galleryContainer: {
    mt: 2,
  },
  galleryHeader: {
    gutterBottom: true,
  },
  imageGrid: {
    container: {
      spacing: 2,
    },
    item: {
      xs: 6,
      sm: 4,
      md: 3,
    },
  },
  imageBox: (isMainImage: boolean) => ({
    position: "relative",
    border: isMainImage ? "2px solid #1976d2" : "1px solid #ccc",
    borderRadius: 2,
    overflow: "hidden",
  }),
  galleryImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  setMainButton: {
    position: "absolute",
    bottom: 4,
    left: 4,
    fontSize: "0.7rem",
    padding: "4px 8px",
  },
};
