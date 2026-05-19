import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Processing() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
