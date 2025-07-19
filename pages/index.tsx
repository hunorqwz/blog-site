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
} from "@mui/material";
import Link from "next/link";
import { prisma } from "../lib/prisma";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
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
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        Latest Posts
      </Typography>

      {posts.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No posts yet. <Link href="/new">Create your first post!</Link>
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {getExcerpt(post.content)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(post.createdAt)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    href={`/post/${post.id}`}
                  >
                    Read More
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

export default Home;
