import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

// MUI
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function SaleSlider({
  products,
}) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      style={{ height: "60vh", width: "100%" }}
    >
      {products?.products?.map((product) => (
        <SwiperSlide>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "60vh",
                backgroundImage: `url(${product?.images[0].url})`,
                backgroundSize: "70%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "800", maxWidth: "75%", paddingTop: "15px" }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: 800 }}
                >
                  ${product.price}.00
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "line-through", marginLeft: "8px" }}
                  color="text.secondary"
                >
                  ${product.discount}.00
                </Typography>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
