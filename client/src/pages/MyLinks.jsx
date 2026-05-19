import { useState, useEffect } from "react";
import { Box, Container, Paper, TextField } from "@mui/material";
import LinksTable from "../components/Dashboard/LinksTable";
import TablePagination from "@mui/material/TablePagination";
import { deleteLinkData, getAllLinks } from "../services/linkServices";
import { useToast } from "../context/ToastProvider";
import { useSearchParams } from "react-router";
import { formStyle } from "../components/Forms/Style";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Processing from "../components/ProtectedRoute/Processing";

export default function MyLinks() {
  const { notify } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [links, setLinks] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchedValue, setSearchedValue] = useState("");
  const [deleteRecord, setDeleteRecord] = useState("");
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = String(searchParams.get("search")) || "";

  // Fetch Links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setloading(true);

        const allLinks = await getAllLinks({ search, page, limit });
        setLinks(allLinks.data.data.links);
        setPageInfo(allLinks.data.data.info);
      } catch (err) {
        if (err.status !== 401) {
          notify.error(err.response.data.message);
        }
      } finally {
        setloading(false);
      }
    };

    fetchLinks();
  }, [page, limit, search]);

  // Search handler
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((searchParams) => {
        searchParams.set("search", searchedValue);
        return searchParams;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchedValue]);

  // Page change handler
  const handleChangePage = (event, newPage) => {
    setSearchParams((searchParams) => {
      searchParams.set("page", newPage + 1);
      return searchParams;
    });
  };

  // Number of records handler
  const handleChangeRowsPerPage = (event) => {
    setSearchParams((searchParams) => {
      searchParams.set("limit", event.target.value);
      return searchParams;
    });
  };

  // Get record id for delete
  const handleRecordId = (recordId) => {
    setDeleteRecord(recordId);
    setOpen(true);
  };

  // Handle delete record
  const handleDeleteRecord = async () => {
    if (!deleteRecord) return;

    try {
      setloader(true);

      const getData = await deleteLinkData(deleteRecord);

      setLinks(getData.data.data.links);
      setPageInfo((prev) => ({
        ...prev,
        totalRecords: getData.data.data.totalRecords,
      }));
      setOpen(false);
    } catch (err) {
      if (!err.status !== 401) notify.error(err.response.data.message);
    } finally {
      setloader(false);
    }
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpen(false);
  };

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
      maxWidth: 170,
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
      id: "actions",
      label: "Actions",
      minWidth: 150,
      align: "center",
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
        <Container>
          <TextField
            onChange={() => setSearchedValue(event.target.value)}
            label="Search"
            variant="outlined"
            size="small"
            sx={{ ...formStyle, mt: 0 }}
          />

          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              // mx: 3,
              mt: 2,
              // bgcolor: "rgba(255, 255, 255, 0.1)",
              bgcolor: "#19263b",
              border: "1px solid #334155",
              borderRadius: 3,
            }}
          >
            {!loading ? (
              <>
                {/* Table */}
                <LinksTable
                  columns={columns}
                  rows={links}
                  handleDelete={handleRecordId}
                  showDelete
                />

                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={pageInfo.totalRecords}
                  rowsPerPage={limit}
                  page={page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  slotProps={{
                    select: {
                      MenuProps: {
                        slotProps: {
                          paper: {
                            sx: {
                              bgcolor: "#0b1629",
                              color: "#fff",

                              "& .MuiMenuItem-root": {
                                color: "#fff",
                              },

                              "& .MuiMenuItem-root:hover": {
                                bgcolor: "#19263b",
                              },
                            },
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    bgcolor: "#19263b",
                    color: "#fff",

                    "& .MuiTablePagination-selectLabel": {
                      color: "#fff",
                    },

                    "& .MuiTablePagination-displayedRows": {
                      color: "#fff",
                    },

                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },

                    "& .MuiIconButton-root": {
                      color: "#fff",
                    },

                    // Disabled arrow
                    "& .Mui-disabled": {
                      opacity: 0.3,
                      color: "#fff !important",
                    },

                    "& .Mui-disabled .MuiSvgIcon-root": {
                      color: "#fff !important",
                    },
                  }}
                />
              </>
            ) : (
              <Processing />
            )}
          </Paper>

          {/* Dialog Box */}
          <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ bgcolor: "#1e293b", color: "#fff" }}
            >
              Are you sure you want to delete this record?
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "#1e293b", color: "#fff" }}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ color: "#fff" }}
              >
                This action will permanently delete this record. You will not be
                able to recover it later.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ bgcolor: "#1e293b" }}>
              <Button
                variant="outlined"
                onClick={handleDialogClose}
                autoFocus
                sx={{ borderColor: "#fff", color: "#fff" }}
                disabled={loader}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteRecord}
                sx={{ bgcolor: "red" }}
                disabled={loader}
              >
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
