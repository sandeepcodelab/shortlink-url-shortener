import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  mt: 3,

  // Input text color
  "& .MuiInputBase-input": {
    color: "#fff",
  },

  // Label default
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
  },

  // Label on focus
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#38bdf8",
  },

  // Outlined border default
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.4)",
  },

  // Hover border
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },

  // Focus border
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#38bdf8",
  },
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Fullname"
        variant="outlined"
        fullWidth
        sx={style}
      />

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        sx={style}
      />

      <FormControl variant="outlined" fullWidth sx={style}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: "#fff" }} />
                ) : (
                  <Visibility sx={{ color: "#fff" }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth sx={style}>
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showConfirmPassword
                    ? "hide the password"
                    : "display the password"
                }
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOff sx={{ color: "#fff" }} />
                ) : (
                  <Visibility sx={{ color: "#fff" }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
      </FormControl>

      <Button variant="contained" sx={{ mt: 3, mb: 1 }} fullWidth>
        Sign up
      </Button>
    </>
  );
}
