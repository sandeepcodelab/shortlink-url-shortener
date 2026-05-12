import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        bgcolor: "#0f172a",
      }}
    >
      <CircularProgress size={42} />

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.7)",
          letterSpacing: 1,
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}
