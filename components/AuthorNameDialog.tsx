import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAuthorStore } from "../store/authorStore";

interface AuthorNameDialogProps {
  open: boolean;
  onClose: () => void;
  isFirstTime?: boolean;
}

const AuthorNameDialog: React.FC<AuthorNameDialogProps> = ({
  open,
  onClose,
  isFirstTime = false,
}) => {
  const { authorName, setAuthorName, updatePostsAuthor } = useAuthorStore();
  const [name, setName] = useState(authorName);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(authorName);
  }, [authorName]);

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Name must be 50 characters or less");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (!isFirstTime && authorName && authorName !== trimmedName) {
        // Update existing posts with new author name
        await updatePostsAuthor(trimmedName);
      } else {
        // Just set the name for first time or when no posts exist
        setAuthorName(trimmedName);
      }

      onClose();
    } catch (error) {
      setError("Failed to update author name. Please try again.");
      console.error("Error updating author:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isFirstTime) {
      setName(authorName); // Reset to original value if not first time
      onClose();
    }
    // Don't allow closing on first time without setting name
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isFirstTime}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Person />
        {isFirstTime ? "Welcome! What should we call you?" : "Update Your Name"}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {isFirstTime
              ? "Your name will appear as the author on all posts you create. You can change it later if needed."
              : "Changing your name will update the author on all your existing posts."}
          </Typography>
        </Box>

        <TextField
          autoFocus
          fullWidth
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isLoading}
          inputProps={{ maxLength: 50 }}
          sx={{ mb: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        {!isFirstTime && (
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
        )}

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isLoading || !name.trim()}
          sx={{ minWidth: 120 }}
        >
          {isLoading
            ? "Saving..."
            : isFirstTime
            ? "Get Started"
            : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthorNameDialog;
