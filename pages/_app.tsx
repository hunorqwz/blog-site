import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../lib/theme";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on client side
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }
  }, []);

  // Save theme preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
