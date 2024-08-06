import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
type props = {
  image: string;
  productName: string;
  price: string;
  discount?: number;
};
const ProductCard: React.FC<props> = ({
  image,
  productName,
  price,
  discount,
}) => {
  const originalPrice = parseFloat(price);
  const discountedPrice = discount
    ? (originalPrice * (1 - discount / 100)).toFixed(2)
    : price;
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Card className="max-w-xs mx-auto  bg-white rounded-xl shadow-md overflow-hidden p-2 aspect-9/16 md:aspect-auto">
        <div className="aspect-square  w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <CardMedia
            component="img"
            image={image}
            alt={productName}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <motion.div className="item" variants={item}>
          <CardContent className="!p-2 h-1/2 flex flex-col justify-between md:justify-start ">
            <Typography className="!text-[12px] font-semibold mb-2">
              {productName?.length > 10
                ? `${productName.slice(0, 14)}...`
                : productName}
            </Typography>
            <div className="flex items-center justify-between gap-1">
              <Typography
                className={` ${
                  discount ? "text-inherit" : "text-gray-500"
                } !text-[12px]`}
              >
                ₹{discount ? discountedPrice : price}
              </Typography>
              {discount && (
                <Typography className="text-gray-500 line-through !text-[12px]">
                  ₹{originalPrice.toFixed(2)}
                </Typography>
              )}
              {discount && (
                <div className="flex justify-between items-center">
                  <ArrowDownwardIcon
                    fontSize="small"
                    className="text-green-500 !text-[12px] "
                  />
                  <Typography className="!text-[12px] text-green-500">
                    {discount}%
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
