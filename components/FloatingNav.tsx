import React from "react";
import { Box, Fab, Tooltip, AppBar, Toolbar, Button } from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Home,
  Create,
  Article,
  Campaign,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";

interface FloatingNavProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const FloatingNav: React.FC<FloatingNavProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const handleHomeClick = () => {
    if (router.pathname === "/") {
      // If on homepage, scroll to blog section
      document
        .getElementById("blog-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to homepage with blog section anchor
      router.push("/#blog-section");
    }
  };

  return (
    <>
      {/* Floating Top Navigation */}
      <AppBar
        position="fixed"
        sx={{
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={handleHomeClick}
            startIcon={<Home />}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(79, 195, 247, 0.1)",
              },
            }}
          >
            Home
          </Button>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              href="/blog"
              startIcon={<Article />}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: "rgba(79, 195, 247, 0.1)",
                },
              }}
            >
              Blog
            </Button>
            <Button
              component={Link}
              href="/ads"
              startIcon={<Campaign />}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: "rgba(79, 195, 247, 0.1)",
                },
              }}
            >
              Ads
            </Button>
            <Button
              component={Link}
              href="/new"
              startIcon={<Create />}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: "rgba(79, 195, 247, 0.1)",
                },
              }}
            >
              Write
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Floating Dark Mode Toggle */}
      <Box
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
        }}
      >
        <Tooltip title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}>
          <Fab
            size="small"
            onClick={toggleDarkMode}
            sx={{
              width: 40,
              height: 40,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #4fc3f7, #29b6f6)"
                  : "linear-gradient(45deg, #1976d2, #42a5f5)",
              color: "white",
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #29b6f6, #03a9f4)"
                    : "linear-gradient(45deg, #1565c0, #1976d2)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0 6px 24px rgba(79, 195, 247, 0.3)",
            }}
          >
            {isDarkMode ? (
              <Brightness7 fontSize="small" />
            ) : (
              <Brightness4 fontSize="small" />
            )}
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
};

export default FloatingNav;
