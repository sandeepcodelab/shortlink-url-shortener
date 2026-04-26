import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    open: false,
  });

  const notify = {
    success: (msg) => setToast({ message: msg, type: "success", open: true }),

    error: (msg) => setToast({ message: msg, type: "error", open: true }),

    warning: (msg) => setToast({ message: msg, type: "warning", open: true }),

    info: (msg) => setToast({ message: msg, type: "info", open: true }),
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={toast.type}
          sx={{ color: "#fff", background: "#273245" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
