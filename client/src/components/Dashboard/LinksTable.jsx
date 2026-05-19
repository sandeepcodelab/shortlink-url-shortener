import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

export default function LinksTable({
  columns = [],
  rows = [],
  showDelete = false,
  handleDelete,
}) {
  const [copiedId, setCopiedId] = useState(null);

  // Copy handler
  const handleCopy = async (shortCode) => {
    const shortUrl = `http://localhost:3000/${shortCode}`;

    await navigator.clipboard.writeText(shortUrl);

    setCopiedId(shortCode);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <TableContainer
      sx={{
        maxHeight: 440,
        minHeight: 440,
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
          {rows.length > 0 ? (
            rows.map((row) => {
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
                        {column.id === "actions" ? (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            {/* COPY */}

                            <Tooltip title="Copy">
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
                            </Tooltip>

                            {/* VISIT */}
                            <Tooltip title="Visit">
                              <IconButton
                                component="a"
                                href={`${import.meta.env.VITE_BASE_URL}/${row.shortCode}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LaunchIcon
                                  fontSize="small"
                                  sx={{ color: "#fff" }}
                                />
                              </IconButton>
                            </Tooltip>

                            {/* DELETE */}
                            {showDelete && (
                              <Tooltip title="Delete">
                                <IconButton
                                  color="error"
                                  onClick={() => handleDelete(row._id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
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
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ height: 380, color: "#fff", fontSize: 16 }}
              >
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
