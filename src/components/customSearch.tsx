import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const CustomSearch = styled((props: TextFieldProps) => (
  <TextField 
    {...props} 
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon  />
        </InputAdornment>
      ),
    }}
  />
))({
  "& .staggered-label span": {
    display: "inline-block",
    transition: "all 0.5s ease",
  },
  "& .MuiInputLabel-root.Mui-focused .staggered-label span": {
    color: "black",
    transform: "translateY(-10px)",
    marginTop: "10px",
  },
  "& .MuiInputLabel-root.Mui-error .staggered-label span": {
    color: "red",
  },
  ".staggered-label": {
    marginTop: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--primary)", 
    },
    "&:hover fieldset": {
      borderColor: "var(--primary)", 
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary)", 
    },
  },
});

export default CustomSearch;
