import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Stats({ links = [], totalLinks = 0, totalClicks = 0 }) {
  const topClicks =
    links.length > 0 ? Math.max(...links.map((l) => l.clicks || 0)) : 0;

  const trendingLink =
    links.length > 0 ? links.find((link) => link.clicks === topClicks) : {};

  const cardStyle = {
    // bgcolor: "#1e293b",
    bgcolor: "rgba(30, 41, 59, 0.50)",
    color: "#fff",
    borderRadius: 3,
    border: "1px solid #334155",
    height: "100%",
    transition: "0.2s",
    "&:hover": {
      borderColor: "#7d0cee",
    },
  };

  const iconWrapper = {
    p: 1.2,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    bgcolor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    transition: "0.2s",
    "&:hover": {
      borderColor: "#7d0cee",
      bgcolor: "#7d0cee",
    },
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={cardStyle}>
          <CardContent
            sx={{ display: "grid", alignContent: "space-between", gap: 2 }}
          >
            <Typography variant="h6">Total Links</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">{totalLinks}</Typography>
              <Box sx={iconWrapper}>
                <LinkIcon sx={{ fontSize: 20 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={cardStyle}>
          <CardContent
            sx={{ display: "grid", alignContent: "space-between", gap: 2 }}
          >
            <Typography variant="h6">Total Clicks</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">{totalClicks}</Typography>
              <Box sx={iconWrapper}>
                <VisibilityIcon sx={{ fontSize: 20 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={cardStyle}>
          <CardContent
            sx={{ display: "grid", alignContent: "space-between", gap: 2 }}
          >
            <Typography variant="h6">Trending Link</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {!Object.keys(trendingLink).length
                    ? "No links available yet"
                    : `${import.meta.env.VITE_BASE_URL}/${trendingLink?.shortCode}`}
                </Typography>
                <Typography variant="p">
                  {!Object.keys(trendingLink).length
                    ? ""
                    : `${trendingLink?.clicks} clicks`}
                </Typography>
              </Box>
              <Box sx={iconWrapper}>
                <TrendingUpIcon sx={{ fontSize: 20 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
