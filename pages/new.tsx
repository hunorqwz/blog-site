import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import Link from "next/link";
import { useAuthorStore, useAuthorName } from "../store/authorStore";
import AuthorNameDialog from "../components/AuthorNameDialog";

const NewPost: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { authorName, hasAuthorName, isInitialized } = useAuthorName();
  const { initializeAuthor } = useAuthorStore();
  const [showAuthorDialog, setShowAuthorDialog] = useState(false);

  useEffect(() => {
    initializeAuthor();

    if (isInitialized && !hasAuthorName) {
      setShowAuthorDialog(true);
    }
  }, [isInitialized, hasAuthorName, initializeAuthor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author: authorName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      setSuccess(true);

      setTimeout(() => {
        router.push(`/post/${newPost.id}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        component={Link}
        href="/"
        sx={{ mb: 3 }}
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
          Create New Post
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            disabled={isSubmitting}
          />

          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={12}
            disabled={isSubmitting}
            helperText="You can use simple markdown formatting (# for headers, ## for subheaders, - for lists, **text** for bold)"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>

            <Button
              variant="outlined"
              component={Link}
              href="/"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Post created successfully! Redirecting...
        </Alert>
      </Snackbar>

      <AuthorNameDialog
        open={showAuthorDialog}
        onClose={() => setShowAuthorDialog(false)}
        isFirstTime={true}
      />
    </Box>
  );
};

export default NewPost;
