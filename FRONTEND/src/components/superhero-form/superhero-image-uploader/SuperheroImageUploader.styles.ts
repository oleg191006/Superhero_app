export const styles = {
  container: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    mt: 1,
  },
  imageBox: {
    position: "relative",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    bgcolor: "white",
    color: "red",
    "&:hover": {
      bgcolor: "rgba(255, 0, 0, 0.1)",
    },
    zIndex: 1,
  },

  addImageButton: {
    mt: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
    color: "primary.main",
    border: "1px dashed",
    borderColor: "grey.400",
    borderRadius: 1,
    p: 2,
    textTransform: "none",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: "primary.light",
      opacity: 0.8,
    },
    cursor: "pointer",
  },
};
