import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Typography, Paper, Box, Button, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const router = useRouter();

  const handleBackToPosts = () => {
    router.push("/#blog-section");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <Typography
            key={index}
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {line.slice(2)}
          </Typography>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <Typography
            key={index}
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ mt: 2, mb: 1 }}
          >
            {line.slice(3)}
          </Typography>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <Typography
            key={index}
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 1 }}
          >
            {line.slice(4)}
          </Typography>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <Typography
            key={index}
            variant="body1"
            component="li"
            sx={{ ml: 2, mb: 0.5 }}
          >
            {line.slice(2)}
          </Typography>
        );
      }
      if (line.trim() === "") {
        return <Box key={index} sx={{ mb: 1 }} />;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <Typography
            key={index}
            variant="body1"
            component="p"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {line.slice(2, -2)}
          </Typography>
        );
      }
      return (
        <Typography key={index} variant="body1" paragraph>
          {line}
        </Typography>
      );
    });
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBackToPosts}
        sx={{ mb: 3, cursor: "pointer" }}
      >
        Back to Posts
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {post.title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 3, display: "block" }}
        >
          By {post.author} • Published on {formatDate(post.createdAt)}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ "& > *": { mb: 2 } }}>{formatContent(post.content)}</Box>
      </Paper>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: { id: true },
  });

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = parseInt(params?.id as string);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
      },
    },
    revalidate: 60,
  };
};

export default PostPage;
