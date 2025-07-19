import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#374151",
    },
    secondary: {
      main: "#6366f1",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#111827",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#111827",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#111827",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        },
        "@keyframes twinkle": {
          "0%": {
            opacity: 0.3,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 1,
            transform: "scale(1.2)",
          },
          "100%": {
            opacity: 0.3,
            transform: "scale(1)",
          },
        },
        "@keyframes twinkle2": {
          "0%": {
            opacity: 0.2,
            transform: "scale(0.8)",
          },
          "25%": {
            opacity: 0.8,
            transform: "scale(1.1)",
          },
          "75%": {
            opacity: 0.9,
            transform: "scale(1)",
          },
          "100%": {
            opacity: 0.2,
            transform: "scale(0.8)",
          },
        },
        "@keyframes float": {
          "0%": {
            transform: "translateY(0px)",
            opacity: 0.7,
          },
          "50%": {
            transform: "translateY(-10px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 0.7,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f3f4f6",
    },
    secondary: {
      main: "#818cf8",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#9ca3af",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#f9fafb",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#f9fafb",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#f9fafb",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#111827",
          position: "relative",
          overflow: "hidden",
        },
      },
    },
  },
});
