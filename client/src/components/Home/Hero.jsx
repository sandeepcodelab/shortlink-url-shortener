import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../context/ToastProvider";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { createShortUrl } from "../../services/shorten";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const [copy, setCopy] = useState(false);

  // Submit
  const handleShorten = async () => {
    if (!url) return;

    const isValidUrl = /^https?:\/\/.+\..+/.test(url);

    if (!isValidUrl) {
      notify.error("Invalid URL");
      return;
    }

    try {
      setLoading(true);

      const res = await createShortUrl(url);
      setShortUrl(res?.data?.url);

      setCopy(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopy(true);
    notify.success("Copied!");
    setUrl("");
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 12,
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
          background: "linear-gradient(45deg, #38bdf8, #7d0cee)",
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
          px: { xs: 0, sm: 4 },
          py: { xs: 2, sm: 4 },
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
          onChange={(e) => {
            (setUrl(e.target.value), setShortUrl(false));
          }}
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
            width: { xs: "100%", sm: "200px" },
            borderRadius: "50px",
            px: 4,
            py: 2,
            gap: "5px",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #098bc4, #7d0cee)",
            boxShadow: "0 4px 20px #c34dff47",
            "&:hover": {
              background: "linear-gradient(45deg, #0ea5e9, #4f46e5)",
              boxShadow: "0 6px 25px rgba(56,189,248,0.5)",
            },
            "&.Mui-disabled": {
              color: "#b6b6b6",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} color="#b6b6b6" /> : ""}
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
          <Typography
            sx={{ color: "#38bdf8", fontSize: { xs: "small", sm: "medium" } }}
          >
            {shortUrl}
          </Typography>

          <IconButton
            aria-label="Copy"
            onClick={handleCopy}
            disabled={copy}
            sx={{
              width: { xs: 28, sm: 42 },
              height: { xs: 28, sm: 42 },
              borderRadius: { xs: "6px", sm: "10px" },
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              "&:hover": {
                background: "rgba(17,19,20,0.15)",
              },
              "&.Mui-disabled": {
                background: "rgba(17,19,20,0.15)",
                color: "#fff",
              },
            }}
          >
            {copy ? (
              <DoneOutlinedIcon sx={{ fontSize: { xs: 18, sm: 25 } }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: { xs: 18, sm: 25 } }} />
            )}
          </IconButton>
        </Paper>
      )}
    </Box>
  );
}
