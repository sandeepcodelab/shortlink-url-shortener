import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import LinksTable from "../components/Dashboard/LinksTable";

export default function MyLinks() {
  const [links, setLinks] = useState([]);

  // 🔹 Dummy data (replace later with API)
  useEffect(() => {
    const dummyLinks = [
      {
        id: 1,
        shortUrl: "short.ly/abc123",
        originalUrl: "https://google.com",
        clicks: 12,
      },
      {
        id: 2,
        shortUrl: "short.ly/dev456",
        originalUrl: "https://github.com",
        clicks: 5,
      },
      {
        id: 3,
        shortUrl: "short.ly/ui789",
        originalUrl: "https://youtube.com",
        clicks: 25,
      },
    ];

    setLinks(dummyLinks);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: "radial-gradient(circle at top, #27364d, #020617 70%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <LinksTable links={links} setLinks={setLinks} />
        </Container>
      </Box>
    </>
  );
}
