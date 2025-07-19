import React from "react";
import { Box, useTheme } from "@mui/material";

const FloatingParticles: React.FC = () => {
  const theme = useTheme();

  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 8 + 4, // 4-12s for twinkling
    animationType: ["twinkle", "twinkle2", "float"][
      Math.floor(Math.random() * 3)
    ],
    delay: Math.random() * 8, // 0-8s delay
    brightness: Math.random() * 0.4 + 0.3, // 0.3-0.7 brightness
  }));

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor:
              theme.palette.mode === "dark"
                ? `rgba(255, 255, 255, ${star.brightness})`
                : `rgba(99, 102, 241, ${star.brightness})`,
            borderRadius: "50%",
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 0 ${star.size * 2}px rgba(255, 255, 255, ${
                    star.brightness * 0.5
                  })`
                : `0 0 ${star.size * 2}px rgba(99, 102, 241, ${
                    star.brightness * 0.3
                  })`,
            animation: `${star.animationType} ${star.animationDuration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${star.size * 0.3}px`,
              height: `${star.size * 3}px`,
              backgroundColor: "inherit",
              transform: "translate(-50%, -50%)",
              borderRadius: "1px",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${star.size * 3}px`,
              height: `${star.size * 0.3}px`,
              backgroundColor: "inherit",
              transform: "translate(-50%, -50%)",
              borderRadius: "1px",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default FloatingParticles;
