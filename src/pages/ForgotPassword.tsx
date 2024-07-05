import CustomTextField from "../components/CustomTextField";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography, Box } from "@mui/material";
import { StaggeredLabel } from "../components/StaggerdLabel";
import { SendIcon } from "../components/Icons";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<{ email: string }>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const onsubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    setLoading(true);
    const response = await API.forgotPassword({ email });
    setLoading(false)
    if (response?.success) {
      toast.success(response?.message || "Reset Link Sent Successfully");
    } else {
      toast.error(response?.message || "something went wrong!");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-background flex-col">
      <ToastContainer />
      {loading && <Loader />}
      <div className=" w-full sm:max-w-md p-12 shadow-md rounded-lg bg-white box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) ">
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
            Forgot Password
          </Typography>
          <Typography variant="body2" className="text-text text-center mt-2">
            Enter your email address below and we will send you a link to reset
            your password.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="mt-4">
          <Controller
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label={<StaggeredLabel text="Email" />}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
            name="email"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={
                <div
                  className="flex items-center justify-center h-[30px] w-[30px] mr-[0.5em]"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    transition: "all 0.5s ease",
                  }}
                >
                  <SendIcon />
                </div>
              }
              sx={{
                cursor: isValid ? "pointer" : "not-allowed",
                backgroundColor: "#ab3fc6",
                marginBottom: "16px",
                "& .MuiButton-startIcon svg": {
                  fill: "white",
                  height: "18px",
                  width: "18px",
                  transition: "all 0.3s ease-out",
                },
                "&:hover": {
                  backgroundColor: "#b74ad3",
                  "& .MuiButton-startIcon svg": {
                    transform: isValid ? "rotate(45deg)" : "rotate(0)",
                    transition: "all 0.3s ease-in",
                  },
                },
              }}
            >
              Send Link
            </Button>
          </Box>

          <Typography variant="body2" className="text-text text-center mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
