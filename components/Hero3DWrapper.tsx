import React from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Dynamically import Hero3D with SSR disabled
const Hero3DComponent = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(16, 20, 40, 1) 0%, rgba(30, 35, 65, 1) 100%)",
      }}
    >
      <Box textAlign="center">
        <CircularProgress size={60} sx={{ mb: 3, color: "#4fc3f7" }} />
        <Typography variant="h5" sx={{ color: "#4fc3f7" }}>
          Loading 3D Experience...
        </Typography>
      </Box>
    </Box>
  ),
});

const Hero3DWrapper: React.FC = () => {
  return <Hero3DComponent />;
};

export default Hero3DWrapper;
