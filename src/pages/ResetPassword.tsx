import CustomTextField from "../components/CustomTextField";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography, Box } from "@mui/material";
import { StaggeredLabel } from "../components/StaggerdLabel";
import { SendIcon } from "../components/Icons";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
    const { token } = useParams<{ token?: string }>();
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onsubmit: SubmitHandler<{
    password: string;
    confirmPassword: string;
  }> = async ({ password }) => {
    if (!token) {
        console.error("Token is undefined");
        return;
      }
    const response = await API.resetPassword(token,{ password });
    if (response?.success) {
      toast.success(response?.message || "Reset Link Sent Successfully");
    } else {
      toast.error(response?.message || "something went wrong!");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-background flex-col">
      <ToastContainer />
      <div className="w-full sm:max-w-md p-12 shadow-md rounded-lg bg-white box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=#b74ad3"
            alt="Your Company"
          />
          <Typography
            variant="h5"
            gutterBottom
            className="text-text text-center"
          >
            Reset Password
          </Typography>
          <Typography variant="body2" className="text-text text-center mt-2">
            Enter your new password below to reset your account password.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="mt-4">
          <Controller
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label={<StaggeredLabel text="Password" />}
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label={<StaggeredLabel text="Confirm Password" />}
                type="password"
                variant="outlined"
                sx={{
                  marginTop: "16px",
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...field}
              />
            )}
            name="confirmPassword"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              fullWidth
              className="!bg-primary"
              variant="contained"
              type="submit"
              sx={{ cursor: isValid ? "pointer" : "not-allowed" }}
            >
              Reset Password
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
