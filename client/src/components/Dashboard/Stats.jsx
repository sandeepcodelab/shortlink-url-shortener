import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Stats({ links = [] }) {
  const totalLinks = links.length;

  const totalClicks = links.reduce((acc, l) => acc + (l.clicks || 0), 0);

  const topClicks =
    links.length > 0 ? Math.max(...links.map((l) => l.clicks || 0)) : 0;

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
    <Grid container spacing={3} sx={{ mt: 2, mx: 3 }}>
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
            <Typography variant="h6">Top Link</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">{topClicks}</Typography>
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
