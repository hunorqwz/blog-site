import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../lib/theme";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useAuthorStore, useAuthorName } from "../store/authorStore";
import FirstTimeVisitorDialog from "../components/FirstTimeVisitorDialog";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFirstTimeDialog, setShowFirstTimeDialog] = useState(false);
  const router = useRouter();

  const {
    isInitialized,
    hasAuthorName,
    hideWelcomeDialog,
    hasCompletedWelcome,
    _hasHydrated,
  } = useAuthorName();
  const { initializeAuthor } = useAuthorStore();

  useEffect(() => {
    initializeAuthor();
  }, [initializeAuthor]);

  useEffect(() => {
    if (
      _hasHydrated &&
      isInitialized &&
      !hasCompletedWelcome &&
      !hideWelcomeDialog
    ) {
      const timer = setTimeout(() => {
        setShowFirstTimeDialog(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [_hasHydrated, isInitialized, hasCompletedWelcome, hideWelcomeDialog]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const isHomePage = router.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overscroll-behavior: none;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1f2937" : "#f9fafb"};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "#4b5563" : "#d1d5db"};
          border-radius: 4px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "#6b7280" : "#9ca3af"};
          background-clip: padding-box;
          transform: scale(1.1);
        }

        ::-webkit-scrollbar-thumb:active {
          background: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          background-clip: padding-box;
        }

        ::-webkit-scrollbar-corner {
          background: ${isDarkMode ? "#1f2937" : "#f9fafb"};
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode
            ? "#4b5563 #1f2937"
            : "#d1d5db #f9fafb"};
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "#374151" : "#e5e7eb"};
          border-radius: 3px;
          transition: all 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "#4b5563" : "#d1d5db"};
          transform: scaleX(1.2);
        }
      `}</style>
      {isHomePage ? (
        <>
          <Component
            {...pageProps}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </>
      ) : (
        <Layout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </Layout>
      )}

      <FirstTimeVisitorDialog
        open={showFirstTimeDialog}
        onClose={() => {
          setShowFirstTimeDialog(false);
        }}
      />
    </ThemeProvider>
  );
}
