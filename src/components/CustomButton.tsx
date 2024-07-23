import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled((props: ButtonProps) => <Button {...props} />)({
  backgroundColor: "var(--primary)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#3c32cc",
    transform: "translateY(-3px)",
  },
});

export default CustomButton;
