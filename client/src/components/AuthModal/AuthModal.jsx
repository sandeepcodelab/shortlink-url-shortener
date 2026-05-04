import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Signup from "../Forms/Signup";
import Login from "../Forms/Login";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "85%", sm: 400, md: 450 },

  // Glass effect core
  background: "rgba(20, 20, 20, 0.3)",

  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",

  // Border + depth
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",

  // Shadow (soft, not harsh)
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",

  // Padding
  padding: "24px",

  // Optional: text color
  color: "#fff",
};

export default function AuthModal({
  open,
  handleClose,
  formType,
  setFormType,
}) {
  //   const [type, setType] = useState("");

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                width: 250,
                position: "relative",
                display: "flex",
                p: "3px",
                borderRadius: "999px",

                // softer glass background
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",

                // sliding indicator
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 3,
                  left: 3,
                  width: "calc(50% - 3px)",
                  height: "calc(100% - 6px)",
                  borderRadius: "999px",
                  background: "linear-gradient(45deg, #098bc4, #7d0cee)",
                  transform:
                    formType === "login"
                      ? "translateX(0%)"
                      : "translateX(100%)",
                  transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                },
              }}
            >
              <Button
                disableRipple
                onClick={() => setFormType("login")}
                sx={{
                  flex: 1,
                  zIndex: 1,
                  borderRadius: "999px",
                  background: "transparent",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: 500,
                  color:
                    formType === "login" ? "#fff" : "rgba(255,255,255,0.7)",

                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                Login
              </Button>

              <Button
                disableRipple
                onClick={() => setFormType("signup")}
                sx={{
                  flex: 1,
                  zIndex: 1,
                  borderRadius: "999px",
                  background: "transparent",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: 500,
                  color:
                    formType === "signup" ? "#fff" : "rgba(255,255,255,0.7)",

                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                Signup
              </Button>
            </Box>
          </Box>

          {formType === "login" ? <Login /> : <Signup />}
        </Box>
      </Modal>
    </>
  );
}
