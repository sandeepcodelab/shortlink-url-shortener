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
import { formStyle } from "./Style";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../../services/authService";
import { useToast } from "../../context/ToastProvider";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useModal } from "../../context/ModalContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [apiError, setApiError] = useState("");
  const { setUser } = useAuth();
  const { closeModal } = useModal();
  const { notify } = useToast();
  const navigate = useNavigate();

  // Submit handler
  const formSubmit = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) return;

    try {
      const loginRes = await loginUser({ email, password });
      setUser(loginRes.data.data.user);

      reset({ email: "", password: "" });
      setApiError("");
      closeModal();

      notify.success(loginRes.data.message);
      navigate("/dashboard");
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

      {/* EMAIL */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            sx={formStyle}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* PASSWORD */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            sx={formStyle}
            error={!!errors.password}
          >
            <InputLabel>Password</InputLabel>

            <OutlinedInput
              {...field}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
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
        )}
      />

      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={isSubmitting}
        sx={{
          mt: 3,
          mb: 1,
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.5)",
            boxShadow: "none",
            backgroundColor: "rgba(25, 118, 210, 0.5)",
          },
        }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
