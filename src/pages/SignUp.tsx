import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import {  Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { StaggeredLabel } from "../components/StaggerdLabel";
import CustomTextField from "../components/CustomTextField";
import GoogleIcon from "../components/Icons";
type SignInData = { email: string; mobileNo: string; password: string };

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNo: yup
    .string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("mobileNo is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors ,isValid,},
  } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    const response = await API.signUp({
      email: data.email,
      phone: data.mobileNo,
      password: data.password,
    });
    if (!response?.success) {
      toast.error(response?.message || "Sign in failed!");
    }
  };
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const { code } = response;
      const res = await API.googleAuth({ code });
      if (res?.success) {
        console.log("Login Success:", res);
      } else {
        console.error("Login Failed:");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "auth-code",
  });

  return (
    <div className="flex min-h-screen flex-col justify-center bg-background ">
      <ToastContainer />
      <Grid container>
        <Grid item md={6} className="hidden md:block">
          <img
            src="https://via.placeholder.com/600x800"
            alt="Sample"
            className="w-full h-screen object-cover"
          />
        </Grid>
        <Grid item xs={12} md={6} className="flex items-center justify-center ">
          <div className="w-full sm:max-w-md p-12  shadow-md rounded-lg bg-white box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <Typography
                variant="h5"
                gutterBottom
                className=" text-text text-center"
              >
                Create account
              </Typography>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="mobileNo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={<StaggeredLabel text="Mobile Number" />}
                        className="input"
                        variant="outlined"
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={<StaggeredLabel text="Password" />}
                        className="input"
                        variant="outlined"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                   type="submit"
                    className="!bg-primary"
                    variant="contained"
                    fullWidth
                    sx={{cursor:isValid?"pointer":"not-allowed"}}
                  >
                    Create account
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography
              className="text-blac  pt-4"
              variant="caption"
              display="block"
              gutterBottom
            >
              Already have an account?
              <Link to="/login">
                <span className="text-primary cursor-pointer underline decoration-primary">
                  {" "}
                  Log in
                </span>
              </Link>
            </Typography>
            <Grid item xs={12} className="pt-4">
              <Button
                fullWidth
                className="!bg-background"
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{ color: "black" }}
                onClick={() => login()}
              >
                Sign up with Google
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
