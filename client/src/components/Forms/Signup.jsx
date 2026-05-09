import {
  Button,
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
import { formStyle } from "./style";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../../services/authService";
import { useToast } from "../../context/ToastProvider";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [apiError, setApiError] = useState("");
  const { setUser } = useAuth();
  const { closeModal } = useModal();
  const { notify } = useToast();
  const navigate = useNavigate();

  // submit handling
  const formSubmit = async (formData) => {
    if (Object.keys(formData).length < 1) return;

    try {
      const signupRes = await registerUser(formData);
      setUser(signupRes.data.data.user);

      reset({ fullname: "", email: "", password: "", confirmPassword: "" });
      setApiError("");
      closeModal();

      notify.success(signupRes.data.message);
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

      {/* FULLNAME */}
      <Controller
        name="fullname"
        control={control}
        rules={{ required: "Fullname is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Fullname"
            variant="outlined"
            fullWidth
            sx={formStyle}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />
        )}
      />

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

      {/* CONFIRM PASSWORD */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Confirm Password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        }}
        render={({ field }) => (
          <FormControl
            variant="outlined"
            fullWidth
            sx={formStyle}
            error={!!errors.confirmPassword}
          >
            <InputLabel>Confirm Password</InputLabel>

            <OutlinedInput
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
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

            <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
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
        {isSubmitting ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
