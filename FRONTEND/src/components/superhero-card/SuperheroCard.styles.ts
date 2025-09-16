export const styles = {
  card: {
    minHeight: "250px",
    width: 250,
    borderRadius: 2,
    boxShadow: 3,
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-3px) scale(1.03)",
      boxShadow: 6,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    background: "background.paper",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
    p: 1.5,
  },

  subtitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "primary.main",
  },

  button: {
    borderRadius: 2,
    mt: 0.5,
    alignSelf: "center",
    px: 2,
    py: 0.5,
    fontSize: "0.8rem",
    textTransform: "none",
  },
};
