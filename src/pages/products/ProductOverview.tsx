// src/components/ProductOverview.jsx
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  useMediaQuery,
  IconButton,
  Slider,
  Stack,
  Rating,
  Button,
} from "@mui/material";
import { selectAllProducts } from "store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "store/productsSlice";
import { useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Cart from "components/Cart";
import { addItem } from "store/CartSlice";
import { RootState } from "../../store/store";
import { useTheme } from "@mui/material/styles";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import Collapse from "@mui/material/Collapse";
import LoopIcon from "@mui/icons-material/Loop";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ProductOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams<{ id: string }>();
  const products = useSelector(selectAllProducts);
  const product = products?.find((p: Product) => p._id === id);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isFocused, setIsFocused] = useState(false);
  const [openProductDes, setopenProductDes] = React.useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = useState<boolean>(false);
  const dispatch = useDispatch();
  console.log(product)
  const handleAdd = () => {
    if (product) {
      console.log('ff')
      dispatch(
        addItem({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageSrc: product.images[0],
          color,
          size,
        })
      );
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSize(event.target.value);
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setColor(event.target.value);
  };
  const formatColorClass = (color: string) => {
    return color.toLowerCase();
  };

  const handleClick = () => {
    setopenProductDes(!openProductDes);
  };

  return (
    <Card className="flex mx-auto flex-col sm:flex-row items-center">
      {open && <Cart open={open} setOpen={setOpen} products={cartItems} />}
      <CardMedia className="w-72 h-96 p-4" image="" title={product?.name} />
      <CardContent className="flex-1 p-4 w-auto md:max-w-md flex flex-col gap-y-3 relative">
        <Typography variant="h5" component="h2">
          {product?.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {product?.description}
        </Typography>

        {/* <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            {product?.colors.map((colorOption, index) => (
              <label
                key={index}
                // style={{
                //   backgroundColor: formatColorClass(colorOption),
                // }}
                className={`  ${color === colorOption ? "border p-[2px] rounded-lg " : ""}`}
              >
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value={colorOption}
                  checked={color === colorOption}
                  onChange={handleColorChange}
                />
                <div
                  style={{
                    backgroundColor: formatColorClass(colorOption),
                  }}
                  className={`w-5 h-5 !rounded-lg flex items-center justify-center `}
                ></div>
              </label>
            ))}
          </div>
        </div> */}
        <div className="flex items-baseline  mb-6   ">
          <div className="space-x-2 flex text-sm">
            {product?.sizes.map((sizeOption, index) => (
              <label key={index}>
                <input
                  className="sr-only peer"
                  name="size"
                  type="radio"
                  value={sizeOption}
                  checked={size === sizeOption}
                  onChange={handleSizeChange}
                />
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-text border border-accent
                ${
                  size === sizeOption
                    ? "font-semibold bg-secondary text-white"
                    : "bg-white"
                }`}
                >
                  {sizeOption}
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-baseline justify-self-start flex-col gap-1 ">
          <Typography className="text-text">
            <LocationOnIcon fontSize="small" className="" />
            Check For Delivery Details
          </Typography>
          <Typography className="text-text">
            Delivery all across <span className="text-accent">India</span>
          </Typography>
          <FormControl fullWidth={isMobile} variant="outlined">
            {!isFocused && <InputLabel>Enter Pincode</InputLabel>}
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end" className="cursor-pointer">
                  check
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
              }}
            />
          </FormControl>
        </div>
        <div>
          <Typography variant="h6">Key Highlights</Typography>

          <div className="grid grid-cols-2 items-center gap-2">
            <div>
              <Typography>Design</Typography>
              <Typography className="border-b !font-semibold">
                Graphics Print
              </Typography>
            </div>
            <div>
              <Typography>Fit</Typography>
              <Typography className="border-b !font-semibold">
                Oversized Fit
              </Typography>
            </div>
            <div>
              <Typography>Neck</Typography>
              <Typography className="border-b !font-semibold">round</Typography>
            </div>
            <div>
              <Typography>Occasion</Typography>
              <Typography className="border-b !font-semibold">
                Casual Wear
              </Typography>
            </div>
            <div>
              <Typography>Sleeve Style</Typography>
              <Typography className="border-b !font-semibold">
                Full Sleeve
              </Typography>
            </div>
            <div>
              <Typography>Material</Typography>
              <Typography className="border-b !font-semibold">
                Cotton
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Typography>
              <TextSnippetOutlinedIcon className="mr-2" />
              Product Description
            </Typography>
            <IconButton onClick={handleClick}>
              {openProductDes ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </div>
          <Collapse in={openProductDes} timeout="auto" unmountOnExit>
            <div>
              <Typography>Classic Fit Men's T-Shirt</Typography>
              <Typography>
                <span className="text-accent">Country Of Originy</span> 123
                Fashion Ave, New York, NY 10001, USA
              </Typography>
              <Typography>
                <span className="text-accent">Manufactured By</span> 123 Fashion
                Ave, New York, NY 10001, USA
              </Typography>
              <Typography>
                <span className="text-accent">Packed By</span> 123 Fashion Ave,
                New York, NY 10001, USA
              </Typography>
            </div>
          </Collapse>
          <div className="flex items-center justify-between">
            <Typography>
              {" "}
              <LoopIcon className="mr-2" />
              Return Policy and Exchange
            </Typography>
            <IconButton onClick={() => setOpenReturnPolicy(!openReturnPolicy)}>
              {openProductDes ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </div>
          <Collapse in={openReturnPolicy} timeout="auto" unmountOnExit>
            <Typography>
              Return within 30 days for a full refund or exchange. Conditions
              apply
            </Typography>
          </Collapse>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="">
            <div className="flex justify-center items-center flex-col">
              <Typography variant="h5">4.5</Typography>
              <Typography>7.5+ ratings</Typography>
              <Rating name="read-only" value={4.5} precision={0.5} readOnly />
              <Button variant="outlined" className="!mt-2">
                Rate
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Stack
              direction="row"
              alignItems="center"
              className="h-6"
              sx={{
                ".MuiSlider-thumb": {
                  display: "none",
                },
              }}
            >
              <span className="text-sm">5</span>
              <Slider aria-label="Volume" value={100} color="primary" />
              <span className="text-sm">(5M+)</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className="h-6"
              sx={{
                ".MuiSlider-thumb": {
                  display: "none",
                },
              }}
            >
              <span className="text-sm">4</span>
              <Slider aria-label="Volume" value={80} color="secondary" />
              <span className="text-sm">650</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className="h-6"
              sx={{
                ".MuiSlider-thumb": {
                  display: "none",
                },
              }}
            >
              3
              <Slider
                aria-label="Volume"
                value={60}
                sx={{ color: "#ff9800" }}
              />
              450
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className="h-6"
              sx={{
                ".MuiSlider-thumb": {
                  display: "none",
                },
              }}
            >
              2
              <Slider
                aria-label="Volume"
                value={40}
                sx={{ color: "#ff5722" }}
              />
              300
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className="h-6"
              sx={{
                ".MuiSlider-thumb": {
                  display: "none",
                },
              }}
            >
              1
              <Slider
                aria-label="Volume"
                value={20}
                sx={{ color: "#f44336" }}
              />
              150
            </Stack>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{
              backgroundColor: "var(--accent)",
            }}
            // className="!fixed bottom-0 [left:0.4rem] "
            onClick={handleAdd}
          >
            Add To cart
          </Button>
          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{
              backgroundColor: "var(--accent)",
            }}
            // className="!fixed bottom-0 [left:0.4rem] "
            onClick={() => setOpen(true)}
          >
            Add To cart
          </Button>
        </div>
        {/* <div className="flex space-x-4 mb-6 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                type="submit"
              >
                Buy now
              </button>
              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
                onClick={handleAdd}
              >
                Add to bag
              </button>
            </div>
            <button
              className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
              type="button"
              aria-label="Like"
              onClick={() => setOpen(true)}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          </div> */}
      </CardContent>
    </Card>
  );
};

export default ProductOverview;
