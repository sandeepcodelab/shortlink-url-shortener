import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleShorten = () => {
    if (!url) return;

    // Fake API response (replace with backend)
    const fakeShort =
      "https://short.ly/" + Math.random().toString(36).substring(7);
    setShortUrl(fakeShort);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setOpen(true);
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          background: "linear-gradient(45deg, #38bdf8, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shorten Your Links Instantly
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          mb: 4,
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        Paste your long URL below and get a clean, short link in seconds.
      </Typography>

      {/* Input Box */}
      <Box
        sx={{
          p: 5,
          width: "100%",
          maxWidth: { xs: "100%", sm: "700px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Paste your long URL..."
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              color: "#fff",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover fieldset": {
                borderColor: "#38bdf8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#38bdf8",
              },
            },
            "& input": {
              px: 3,
            },
            "& input::placeholder": {
              color: "#94a3b8",
              opacity: 1,
            },
          }}
        />

        <Button
          fullWidth={{ xs: true, sm: false }}
          variant="contained"
          onClick={handleShorten}
          sx={{
            width: { xs: "100%", sm: "auto" },
            borderRadius: "50px",
            px: 4,
            py: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #6366f1, #38bdf8)",
            boxShadow: "0 4px 20px rgba(56,189,248,0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #4f46e5, #0ea5e9)",
              boxShadow: "0 6px 25px rgba(56,189,248,0.5)",
            },
          }}
        >
          Shorten
        </Button>
      </Box>

      {/* Result */}
      {shortUrl && (
        <Paper
          sx={{
            mt: 3,
            p: 2,
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <Typography sx={{ color: "#38bdf8" }}>{shortUrl}</Typography>

          <IconButton
            aria-label="Copy"
            onClick={handleCopy}
            // sx={{
            //   color: "#fff",
            //   // border: "1px solid #38bdf8",
            //   background: "rgba(0,0,0,0.4)",
            //   width: "40px",
            //   height: "40px",
            //   borderRadius: "8px",
            // }}

            sx={{
              width: 42,
              height: 42,
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              "&:hover": {
                // background: "rgba(56,189,248,0.15)",
                background: "rgba(17,19,20,0.15)",
              },
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      )}

      {/* Toast */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{
            color: "#fff",
            background: "#273245",
          }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
