import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

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
  const discountedPrice = discount ? (originalPrice * (1 - discount / 100)).toFixed(2) : price;
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
  >
    <Card className="max-w-xs mx-auto mb-4 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <CardMedia
          component="img"
          image={image}
          alt={productName}
          className=" w-full object-contain object-center aspect-[3/4]"
        />
      </div>
      <CardContent className="p-4">
        <Typography variant="h6" component="h2" className="font-semibold mb-2">
          {productName}
        </Typography>
        <div className="flex items-center">
          {discount && (
            <Typography
              variant="body1"
              sx={{
                color: "green",
                marginRight: 2,
              }}
            >
              {discount}% OFF
            </Typography>
          )}
          {discount && (
            <Typography
              variant="body1"
              sx={{
                textDecoration: "line-through",
                color: "gray",
                marginRight: 2,
              }}
            >
             ₹{originalPrice.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{ color: discount ? "inherit" : "gray" }}
          >
            ${discount ? discountedPrice : price}
          </Typography>
          
        </div>
        {/* <Typography
              variant="body1"
             className="text-rose-600"
            >
            only 10 left
            </Typography> */}
      </CardContent>
    </Card>
    </motion.div>

  );
};

export default ProductCard;
