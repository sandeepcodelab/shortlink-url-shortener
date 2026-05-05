import {
  Button,
  colors,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { style } from "./style";
import { useForm } from "react-hook-form";
import { login } from "../../services/authService";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [apiError, setApiError] = useState("");

  // Submit handler
  const formSubmit = async (formData) => {
    const { email, password } = formData;

    try {
      const formRes = await login({ email, password });
      console.log(formRes);
    } catch (err) {
      setApiError(err.response.data.response.message);
    }
  };

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
    <form onSubmit={handleSubmit(formSubmit)}>
      {apiError && (
        <Typography
          variant="body2"
          gutterBottom
          sx={{ textAlign: "center", color: "#d32f2f" }}
        >
          {apiError}
        </Typography>
      )}

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        sx={style}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <FormControl
        variant="outlined"
        fullWidth
        sx={style}
        error={!!errors.password}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
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
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        type="submit"
        disabled={isSubmitting}
        sx={{ mt: 3, mb: 1 }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
