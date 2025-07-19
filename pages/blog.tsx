import React from "react";
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
} from "@mui/material";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import { useTheme } from "@mui/material/styles";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface BlogProps {
  posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const theme = useTheme();

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
    <Box sx={{ width: "100%", py: 4, minHeight: "100vh" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          textAlign: "center",
          background: `linear-gradient(45deg, ${
            theme.palette.mode === "dark" ? "#ffffff" : "#1976d2"
          }, ${theme.palette.mode === "dark" ? "#4fc3f7" : "#42a5f5"})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Blog Posts
      </Typography>

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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}
                    >
                      By {post.author} • {formatDate(post.createdAt)}
                    </Typography>
                  </Box>
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
                        theme.palette.mode === "dark" ? "#4fc3f7" : "#1976d2",
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
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default Blog;
