import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function LinksTable({
  columns = [],
  rows = [],
  pagination = true,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copiedId, setCopiedId] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Copy handler
  const handleCopy = async (shortCode) => {
    const shortUrl = `http://localhost:3000/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopiedId(shortCode);

      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch (error) {
      console.log("Copy failed");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        // mx: 3,
        // mt: 8,
        bgcolor: "rgba(255, 255, 255, 0.1)",
        color: "red",
        border: "1px solid #334155",
        borderRadius: 3,
      }}
    >
      {/* <TableContainer sx={{ maxHeight: 440 }}> */}
      <TableContainer
        sx={{
          maxHeight: 440,
          overflowY: "auto",

          // Scrollbar width
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },

          // Scrollbar track
          "&::-webkit-scrollbar-track": {
            background: "#0f172a",
            borderRadius: "10px",
          },

          // Scrollbar thumb
          "&::-webkit-scrollbar-thumb": {
            background: "#475569",
            borderRadius: "10px",
          },

          // Hover effect
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#64748b",
          },

          // Firefox
          scrollbarWidth: "thin",
          scrollbarColor: "#475569 #0f172a",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    // bgcolor: "#131b29",
                    bgcolor: "#0b1629",
                    color: "#fff",
                    borderColor: "#334155",
                    fontWeight: 600,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.shortCode}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            bgcolor: "#19263b",
                            color: "#fff",
                            borderColor: "#334155",
                          }}
                        >
                          {/* {column.format ? column.format(value) : value}
                          {row.code} */}

                          {column.id === "copy" ? (
                            <IconButton
                              onClick={() => handleCopy(row.shortCode)}
                            >
                              {copiedId === row.shortCode ? (
                                <CheckIcon
                                  fontSize="small"
                                  sx={{ color: "#fff" }}
                                />
                              ) : (
                                <ContentCopyIcon
                                  fontSize="small"
                                  sx={{ color: "#fff" }}
                                />
                              )}
                            </IconButton>
                          ) : column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
      )}
    </Paper>
  );
}
