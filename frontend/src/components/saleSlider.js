import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

// MUI
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SaleSlider({ products }) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      style={{ height: "60vh", width: "100%" }}
    >
      {products?.map((product, i) => (
        <SwiperSlide>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={i}
          >
            <Box
              sx={{
                width: "100%",
                height: "60vh",
                backgroundImage: `url(${product?.variants[0]?.images[0]?.url})`,
                backgroundSize: "45vh",
                backgroundPositionX: "center",
                backgroundPositionY: "85%",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "800",
                  maxWidth: "75%",
                  paddingTop: "15px",
                  fontFamily: "Poppins,sans-serif", color: 'white'
                }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: 'center' }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 800, fontFamily: "Poppins,sans-serif", color: 'balck' }}
                >
                  Rs.{product.variants[0].price}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                    fontFamily: "Poppins,sans-serif", color: 'white'
                  }}
                  color="text.secondary"
                >
                  Rs.{product.variants[0].discount}
                </Typography>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
