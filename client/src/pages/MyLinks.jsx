import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import LinksTable from "../components/Dashboard/LinksTable";

export default function MyLinks() {
  const [links, setLinks] = useState([]);

  //   // 🔹 Dummy data (replace later with API)
  //   useEffect(() => {
  //     const dummyLinks = [
  //       {
  //         id: 1,
  //         shortUrl: "short.ly/abc123",
  //         originalUrl: "https://google.com",
  //         clicks: 12,
  //       },
  //       {
  //         id: 2,
  //         shortUrl: "short.ly/dev456",
  //         originalUrl: "https://github.com",
  //         clicks: 5,
  //       },
  //       {
  //         id: 3,
  //         shortUrl: "short.ly/ui789",
  //         originalUrl: "https://youtube.com",
  //         clicks: 25,
  //       },
  //     ];

  //     setLinks(dummyLinks);
  //   }, []);

  const columns = [
    {
      id: "shortUrl",
      label: "Short URL",
      minWidth: 200,
    },
    {
      id: "originalUrl",
      label: "Original URL",
      minWidth: 250,
    },
    {
      id: "clicks",
      label: "Clicks",
      minWidth: 100,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 170,
      align: "right",
      format: (value) =>
        new Date(value).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 120,
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 150,
      align: "center",
    },
  ];

  const rows = [
    {
      shortUrl: "https://sho.rt/abc123",
      originalUrl: "https://www.google.com/search?q=mern+stack+interview",
      clicks: 120,
      createdAt: "2026-05-10T08:30:00Z",
      status: "Active",
    },
    {
      shortUrl: "https://sho.rt/x9k21",
      originalUrl: "https://github.com/facebook/react",
      clicks: 89,
      createdAt: "2026-05-09T12:15:00Z",
      status: "Active",
    },
    {
      shortUrl: "https://sho.rt/mn78pq",
      originalUrl: "https://nodejs.org/en/docs",
      clicks: 45,
      createdAt: "2026-05-08T16:45:00Z",
      status: "Inactive",
    },
    {
      shortUrl: "https://sho.rt/z1y2x3",
      originalUrl: "https://www.mongodb.com/docs/",
      clicks: 230,
      createdAt: "2026-05-07T10:00:00Z",
      status: "Active",
    },
    {
      shortUrl: "https://sho.rt/qwe456",
      originalUrl: "https://expressjs.com/en/starter/installing.html",
      clicks: 67,
      createdAt: "2026-05-06T14:20:00Z",
      status: "Active",
    },
  ];

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
        <Container>
          <LinksTable columns={columns} rows={rows} />
        </Container>
      </Box>
    </>
  );
}
