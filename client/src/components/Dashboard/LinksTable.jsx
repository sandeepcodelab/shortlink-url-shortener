import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LinksTable({ links = [], setLinks }) {
  // 🔹 Copy
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied!");
  };

  // 🔹 Delete
  const handleDelete = (id) => {
    const updated = links.filter((l) => l.id !== id);
    setLinks(updated);
  };

  return (
    <Card
      sx={{
        // bgcolor: "#1e293b",
        bgcolor: "rgba(30, 41, 59, 0.50)",
        color: "#fff",
        borderRadius: 3,
        border: "1px solid #334155",
        mt: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2}>
          Your Links
        </Typography>

        {links.length === 0 ? (
          <Typography color="gray">
            No links yet 😐 Start by shortening one.
          </Typography>
        ) : (
          links.map((link) => (
            <Box
              key={link.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                borderBottom: "1px solid #334155",
              }}
            >
              {/* Left Side */}
              <Box sx={{ maxWidth: "70%" }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {link.shortUrl}
                </Typography>
                <Typography
                  variant="body2"
                  color="gray"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.originalUrl}
                </Typography>
              </Box>

              {/* Right Side */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">{link.clicks} clicks</Typography>

                <IconButton
                  onClick={() => handleCopy(link.shortUrl)}
                  sx={{ color: "#fff" }}
                >
                  <ContentCopyIcon
                    sx={{
                      "&:hover": {
                        color: "#7d0cee",
                      },
                    }}
                  />
                </IconButton>

                <IconButton
                  onClick={() => handleDelete(link.id)}
                  sx={{ color: "#ef4444" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
