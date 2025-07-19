import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Box, Typography, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as THREE from "three";

// Animated sphere component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#4fc3f7"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Floating particles component
function Particles() {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          Math.sin(state.clock.elapsedTime + i) * 10,
          Math.cos(state.clock.elapsedTime + i) * 10,
          Math.sin(state.clock.elapsedTime + i) * 5
        );
        dummy.scale.setScalar(
          Math.sin(state.clock.elapsedTime + i) * 0.1 + 0.05
        );
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05]} />
      <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
    </instancedMesh>
  );
}

const Hero3D: React.FC = () => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${
            theme.palette.mode === "dark"
              ? "rgba(16, 20, 40, 1) 0%, rgba(30, 35, 65, 1) 100%"
              : "rgba(240, 248, 255, 1) 0%, rgba(230, 240, 250, 1) 100%"
          })`,
        }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
          Loading...
        </Typography>
      </Box>
    );
  }

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
      {/* 3D Canvas Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Main animated sphere */}
          <AnimatedSphere />

          {/* Floating particles */}
          <Particles />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Box>

      {/* Overlay Content */}
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

        {/* Right side - space for 3D visualization */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "50%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Additional floating elements or content can go here */}
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
          animation: "bounce 2s infinite",
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
              animation: "scroll 1.5s infinite",
            },
          }}
        />
      </Box>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default Hero3D;
