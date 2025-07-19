import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

// CSS animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const Hero2D: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${
          theme.palette.mode === "dark"
            ? "rgba(16, 20, 40, 1) 0%, rgba(30, 35, 65, 1) 100%"
            : "rgba(240, 248, 255, 1) 0%, rgba(230, 240, 250, 1) 100%"
        })`,
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            theme.palette.mode === "dark"
              ? "rgba(79, 195, 247, 0.3)"
              : "rgba(25, 118, 210, 0.2)"
          } 0%, transparent 70%)`,
          animation: `${floatAnimation} 6s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            theme.palette.mode === "dark"
              ? "rgba(79, 195, 247, 0.2)"
              : "rgba(25, 118, 210, 0.15)"
          } 0%, transparent 70%)`,
          animation: `${pulseAnimation} 4s ease-in-out infinite`,
        }}
      />

      {/* Geometric shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "20%",
          width: "3px",
          height: "100px",
          background: theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
          transform: "rotate(45deg)",
          animation: `${floatAnimation} 8s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          left: "20%",
          width: "60px",
          height: "3px",
          background: theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
          transform: "rotate(-30deg)",
          animation: `${pulseAnimation} 5s ease-in-out infinite`,
        }}
      />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "50%",
            pr: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontWeight: 700,
              mb: 3,
              background: `linear-gradient(45deg, ${
                theme.palette.mode === "dark" ? "#ffffff" : "#1976d2"
              }, ${theme.palette.mode === "dark" ? "#4fc3f7" : "#42a5f5"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Welcome to
            <br />
            My Blog
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.7)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Exploring modern web development, sharing insights, and building
            amazing digital experiences.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                background: "linear-gradient(45deg, #4fc3f7, #29b6f6)",
                boxShadow: "0 8px 32px rgba(79, 195, 247, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #29b6f6, #03a9f4)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(79, 195, 247, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
              onClick={() =>
                document
                  .getElementById("blog-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Posts
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                borderColor:
                  theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
                color: theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
                "&:hover": {
                  borderColor:
                    theme.palette.mode === "dark" ? "#29b6f6" : "#1565c0",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(79, 195, 247, 0.1)"
                      : "rgba(25, 118, 210, 0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              About Me
            </Button>
          </Box>
        </Box>

        {/* Right side - Abstract design elements */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "50%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Central Circle */}
          <Box
            sx={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${
                theme.palette.mode === "dark"
                  ? "rgba(79, 195, 247, 0.3), rgba(79, 195, 247, 0.1), rgba(79, 195, 247, 0.3)"
                  : "rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.1), rgba(25, 118, 210, 0.3)"
              })`,
              animation: `${floatAnimation} 6s ease-in-out infinite`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(16, 20, 40, 0.8)"
                    : "rgba(240, 248, 255, 0.8)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
              }}
            >
              💻
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          animation: `${floatAnimation} 2s infinite`,
          cursor: "pointer",
        }}
        onClick={() =>
          document
            .getElementById("blog-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <Box
          sx={{
            width: "30px",
            height: "50px",
            border: `2px solid ${
              theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2"
            }`,
            borderRadius: "25px",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "10px",
              left: "50%",
              width: "4px",
              height: "10px",
              backgroundColor:
                theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
              borderRadius: "2px",
              transform: "translateX(-50%)",
              animation: `${pulseAnimation} 1.5s infinite`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero2D;
