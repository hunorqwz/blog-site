import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7, Home, Add } from "@mui/icons-material";
import Link from "next/link";
import FloatingParticles from "./FloatingParticles";

interface LayoutProps {
  children: React.ReactNode;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  toggleDarkMode,
  isDarkMode,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <FloatingParticles />
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#1f2937" : "#374151",
          color: theme.palette.mode === "dark" ? "#f9fafb" : "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              My Blog
            </Link>
          </Typography>

          <IconButton color="inherit" component={Link} href="/" title="Home">
            <Home />
          </IconButton>

          <IconButton
            color="inherit"
            component={Link}
            href="/new"
            title="New Post"
          >
            <Add />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
