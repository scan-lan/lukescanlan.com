import { ThemeOptions } from "@mui/material/styles";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#5c7b65",
    },
    secondary: {
      main: "#78909c",
    },
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible",
    h1: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 900,
      fontVariant: "small-caps",
    },
    h2: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 900,
      fontVariant: "small-caps",
      paddingBottom: "1.2rem",
    },
    h3: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 700,
      fontVariant: "small-caps",
      paddingTop: ".5rem",
      paddingBottom: "1rem",
    },
    h4: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 500,
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    h5: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 400,
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    h6: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 300,
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    body1: {
      fontSize: "1.4rem",
      lineHeight: 1.4,
    },
    caption: {
      fontSize: "16px",
      color: "#686868",
      lineHeight: 1,
    },
    button: {
      fontFamily: "Fraunces, Roboto Slab, Serif",
      fontWeight: 700,
      fontSize: "20px",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          border: "2px white dashed",
          textTransform: "none",
          borderRadius: 0,
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
};
