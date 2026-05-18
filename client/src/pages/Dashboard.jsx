import { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import Stats from "../components/Dashboard/Stats";
import LinksTable from "../components/Dashboard/LinksTable";
import { useAuth } from "../context/AuthContext";
import { getAllLinks, getdashboardInfo } from "../services/linkServices";
import { useToast } from "../context/ToastProvider";

export default function DashboardPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [linksData, setLinksData] = useState({});

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const getlinks = await getdashboardInfo();

        setLinksData(getlinks.data.data);
      } catch (err) {
        notify.error(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      id: "shortCode",
      label: "Short URL",
      minWidth: 150,
      format: (value) => `${import.meta.env.VITE_BASE_URL}/${value}`,
    },
    {
      id: "originalUrl",
      label: "Original URL",
      minWidth: 100,
      maxWidth: 200,
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
      minWidth: 200,
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
      id: "copy",
      label: "Copy",
      minWidth: 100,
      align: "right",
      format: (value) => value,
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
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: 6, mt: 2 }}
        >
          <Stats
            links={linksData.links}
            totalLinks={linksData.totalLink}
            totalClicks={linksData.totalClicks}
          />

          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              bgcolor: "#19263b",
              border: "1px solid #334155",
              borderRadius: 3,
            }}
          >
            <LinksTable
              columns={columns}
              rows={linksData.links}
              pagination={false}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
