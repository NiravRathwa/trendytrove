import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import CustomTextField from "../components/CustomTextField";
import { StaggeredLabel } from "../components/StaggerdLabel";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../components/Icons";
import Loader from "../components/Loader";
import { useSignInMutation, useGoogleAuthMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
type SignInData = {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean;
};

const emailOrPhone = (value: string | undefined): boolean => {
  if (!value) return false;

  const isEmail = yup.string().email().isValidSync(value);

  const isPhone = /^\d{10}$/.test(value);

  return isEmail || isPhone;
};

const schema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("emailOrPhone", "Invalid email or phone number", emailOrPhone)
    .required("Email or phone is required"),
  password: yup.string().min(8).required("Password is required"),
  rememberMe: yup.boolean(),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();
  const [googleAuth, { isLoading: googleLoading }] = useGoogleAuthMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    try {
      const isEmail =
        emailOrPhone(data.emailOrPhone) &&
        yup.string().email().isValidSync(data.emailOrPhone);
      const requestData = isEmail
        ? { email: data.emailOrPhone, password: data.password }
        : { phone: data.emailOrPhone, password: data.password };

      const response = await signIn(requestData).unwrap();
      if (response?.success) {
        dispatch(setUser({ user: response.data.user }));
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Sign in failed!");
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const { code } = response;
      try {
        const response = await googleAuth({ code }).unwrap();
        if (response?.success) {
          dispatch(setUser({ user: response.data.user }));
          navigate("/");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Sign in failed!");
      }
    },
    flow: "auth-code",
  });

  return (
    <div className="flex min-h-screen flex-col justify-center  bg-background">
      <ToastContainer />
      {(signInLoading || googleLoading) && <Loader />}
      <Grid container>
        <Grid item md={6} className="hidden md:block">
          <img
            src="https://via.placeholder.com/600x800"
            alt="Sample"
            className="w-full h-screen object-cover"
          />
        </Grid>
        <Grid item xs={12} md={6} className="flex items-center justify-center">
          <div className="w-full sm:max-w-md p-12 bg-white shadow-md rounded-lg">
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
                Welcome Back
              </Typography>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="emailOrPhone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={<StaggeredLabel text="Email or Phone" />}
                        variant="outlined"
                        error={!!errors.emailOrPhone}
                        helperText={errors.emailOrPhone?.message}
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
                        variant="outlined"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} className="flex justify-end">
                  <Link to="/forgot-password">
                    <Typography
                      className="text-primary cursor-pointer underline decoration-primary"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    className="!bg-primary"
                    variant="contained"
                    fullWidth
                    sx={{ cursor: isValid ? "pointer" : "not-allowed" }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography
              className="pt-4"
              variant="caption"
              display="block"
              gutterBottom
            >
              Don't have an account?
              <Link to="/signup">
                <span className="text-primary cursor-pointer underline decoration-primary">
                  {" "}
                  Sign up
                </span>
              </Link>
            </Typography>
            <Grid item xs={12} className="pt-4">
              <Button
                fullWidth
                className="!bg-background text-text"
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{ color: "black" }}
                onClick={() => login()}
              >
                Sign in with Google
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
