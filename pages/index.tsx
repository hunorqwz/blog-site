import React, { useEffect, useRef } from "react";
import { GetStaticProps } from "next";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  Container,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import Hero2D from "../components/Hero2D";
import FloatingNav from "../components/FloatingNav";
import { useTheme } from "@mui/material/styles";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface HomeProps {
  posts: Post[];
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

const Home: React.FC<HomeProps> = ({ posts, toggleDarkMode, isDarkMode }) => {
  const theme = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formatExcerpt = (content: string, maxLength: number = 200) => {
    const plainText = content.replace(/^#+ /gm, "").replace(/\n+/g, " ");
    if (plainText.length <= maxLength) return plainText;
    return plainText.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleScroll = (e: WheelEvent) => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      const isAtVeryTop = scrollTop === 0;
      const isNearTopOfBlogSection =
        scrollTop > containerHeight * 0.8 && scrollTop <= containerHeight * 1.1;

      if (e.deltaY > 0 && isAtVeryTop && !isScrolling) {
        e.preventDefault();
        isScrolling = true;

        document.getElementById("blog-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          isScrolling = false;
        }, 500);
      } else if (e.deltaY < 0 && isNearTopOfBlogSection && !isScrolling) {
        e.preventDefault();
        isScrolling = true;

        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
    };

    container.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (content: string, maxLength = 200) => {
    // Remove markdown headers and get plain text
    const plainText = content.replace(/^#+ /gm, "").replace(/\n+/g, " ");
    if (plainText.length <= maxLength) return plainText;
    return plainText.slice(0, maxLength) + "...";
  };

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: "y proximity",
        scrollBehavior: "smooth",
      }}
    >
      {toggleDarkMode && (
        <FloatingNav
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode || false}
        />
      )}

      <Box
        sx={{
          scrollSnapAlign: "start",
          height: "100vh",
        }}
      >
        <Hero2D />
      </Box>

      {/* Blog Posts Section */}
      <Box
        id="blog-section"
        sx={{
          py: 8,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, rgba(16, 20, 40, 1) 0%, rgba(10, 15, 30, 1) 100%)"
              : "linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(245, 245, 245, 1) 100%)",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ height: "auto" }}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 600,
                mb: 2,
                background: `linear-gradient(45deg, ${
                  theme.palette.mode === "dark" ? "#ffffff" : "#1976d2"
                }, ${theme.palette.mode === "dark" ? "#4fc3f7" : "#42a5f5"})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Latest Posts
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "600px",
                mx: "auto",
                mb: 4,
              }}
            >
              Discover insights, tutorials, and thoughts on modern web
              development
            </Typography>
            <Divider
              sx={{
                width: "100px",
                height: "3px",
                bgcolor: theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
                mx: "auto",
                borderRadius: "2px",
              }}
            />
          </Box>

          {posts.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: theme.palette.text.secondary }}
              >
                No posts yet
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: theme.palette.text.secondary }}
              >
                Start your blogging journey by creating your first post!
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/new"
                sx={{
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(45deg, #4fc3f7, #29b6f6)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #29b6f6, #03a9f4)",
                  },
                }}
              >
                Create Your First Post
              </Button>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item xs={12} md={6} lg={4} key={post.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                          : "0 8px 32px rgba(0, 0, 0, 0.1)",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 60px rgba(79, 195, 247, 0.2)"
                            : "0 20px 60px rgba(25, 118, 210, 0.15)",
                        transform: "translateY(-8px)",
                        borderColor:
                          theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {getExcerpt(post.content)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        By {post.author} • {formatDate(post.createdAt)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        size="medium"
                        component={Link}
                        href={`/post/${post.id}`}
                        sx={{
                          borderRadius: "20px",
                          px: 3,
                          fontWeight: 600,
                          color:
                            theme.palette.mode === "dark"
                              ? "#4fc3f7"
                              : "#1976d2",
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(79, 195, 247, 0.1)"
                                : "rgba(25, 118, 210, 0.1)",
                          },
                        }}
                      >
                        Read More →
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      posts: posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
      })),
    },
    revalidate: 60,
  };
};

export default Home;
