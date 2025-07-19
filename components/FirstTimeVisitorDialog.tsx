import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Person, WavingHand } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useAuthorStore } from "../store/authorStore";

interface FirstTimeVisitorDialogProps {
  open: boolean;
  onClose: () => void;
}

const FirstTimeVisitorDialog: React.FC<FirstTimeVisitorDialogProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const { setAuthorName, setHideWelcomeDialog } = useAuthorStore();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [hideDialogChecked, setHideDialogChecked] = useState(false);

  const handleSetName = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Name must be 50 characters or less");
      return;
    }

    setAuthorName(trimmedName);
    if (hideDialogChecked) {
      setHideWelcomeDialog(true);
    }
    onClose();
  };

  const handleContinueAnonymously = () => {
    setAuthorName("Anonymous");
    if (hideDialogChecked) {
      setHideWelcomeDialog(true);
    }
    onClose();
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textAlign: "center",
          pb: 1,
          flexShrink: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <WavingHand sx={{ color: "#FFA726" }} />
        <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
          Welcome to Our Blog!
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          paddingTop: "24px !important",
          paddingBottom: "24px !important",
          paddingLeft: "24px !important",
          paddingRight: "24px !important",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "dark" ? "#4b5563" : "#d1d5db",
            borderRadius: "3px",
            "&:hover": {
              background: theme.palette.mode === "dark" ? "#6b7280" : "#9ca3af",
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor:
            theme.palette.mode === "dark"
              ? "#4b5563 transparent"
              : "#d1d5db transparent",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #22c55e 100%)"
                  : "linear-gradient(135deg, #1e40af 0%, #1d4ed8 25%, #0891b2 50%, #059669 75%, #16a34a 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textFillColor: "transparent",
              fontWeight: 600,
              fontSize: "1.1rem",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
            }}
          >
            We're excited to have you here! To personalize your experience, you
            can set your author name for when you write posts.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Don't worry - you can always change this later or continue
            anonymously.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            p: 2,
            background:
              theme.palette.mode === "dark"
                ? "rgba(79, 195, 247, 0.1)"
                : "rgba(25, 118, 210, 0.05)",
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.main}20`,
          }}
        >
          <Person sx={{ color: theme.palette.primary.main }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Set Your Author Name (Optional)
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={
            error || "This name will appear when you create blog posts"
          }
          inputProps={{ maxLength: 50 }}
          sx={{ mb: 2 }}
          placeholder="Enter your preferred name..."
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={hideDialogChecked}
              onChange={(e) => setHideDialogChecked(e.target.checked)}
              size="small"
              sx={{
                color: theme.palette.primary.main,
                "&.Mui-checked": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Don't show this welcome message again
            </Typography>
          }
          sx={{
            mb: 1,
            alignSelf: "flex-start",
            "& .MuiFormControlLabel-label": {
              fontSize: "0.875rem",
            },
          }}
        />

        <Box
          sx={{
            mt: "auto",
            pt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSetName}
            disabled={!name.trim()}
            fullWidth
            sx={{
              minHeight: 48,
              fontWeight: 600,
            }}
          >
            Set My Name & Continue
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button
            variant="outlined"
            onClick={handleContinueAnonymously}
            fullWidth
            sx={{
              minHeight: 48,
            }}
          >
            Continue as Anonymous
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FirstTimeVisitorDialog;
