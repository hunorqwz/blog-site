import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../lib/theme";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

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

  // Check if we're on the home page - if so, don't apply layout wrapper
  const isHomePage = router.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }

        /* Improve scroll snap behavior */
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }

        /* Prevent scroll bounce on iOS */
        body {
          overscroll-behavior: none;
        }
      `}</style>
      {isHomePage ? (
        // Home page without layout wrapper for full-screen hero
        <>
          {/* Floating dark mode toggle for home page */}
          <Component
            {...pageProps}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </>
      ) : (
        // All other pages with layout
        <Layout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </Layout>
      )}
    </ThemeProvider>
  );
}
