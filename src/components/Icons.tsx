const GoogleIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    version="1.1"
    x="0px"
    y="0px"
    className="google-icon"
    viewBox="0 0 48 48"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
    c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
    c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
    C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);
export default GoogleIcon;

export const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
    />
  </svg>
);

export const LoaderIcon = () => (
  <svg
    className="pl"
    width="240"
    height="240"
    viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="pl__ring pl__ring--a"
      cx="120"
      cy="120"
      r="105"
      fill="none"
      stroke="#FF0000"
      stroke-width="20"
      stroke-dasharray="0 660"
      stroke-dashoffset="-330"
      stroke-linecap="round"
    ></circle>
    <circle
      className="pl__ring pl__ring--b"
      cx="120"
      cy="120"
      r="35"
      fill="none"
      stroke="#00FF00"
      stroke-width="20"
      stroke-dasharray="0 220"
      stroke-dashoffset="-110"
      stroke-linecap="round"
    ></circle>
    <circle
      className="pl__ring pl__ring--c"
      cx="85"
      cy="120"
      r="70"
      fill="none"
      stroke="#0000FF"
      stroke-width="20"
      stroke-dasharray="0 440"
      stroke-linecap="round"
    ></circle>
    <circle
      className="pl__ring pl__ring--d"
      cx="155"
      cy="120"
      r="70"
      fill="none"
      stroke="#FFFF00"
      stroke-width="20"
      stroke-dasharray="0 440"
      stroke-linecap="round"
    ></circle>
  </svg>
);
