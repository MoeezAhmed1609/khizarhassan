import React from "react";
import { Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";

export default function ProductSlider({ images }) {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        style={{
          minHeight: "70vh",
          width: "100%",
        }}
      >
        {images?.map((image, i) => (
          <SwiperSlide
            key={i}
            style={{ backgroundImage: `url(${image?.url})` }}
          />
        ))}
      </Swiper>
      <Box sx={{ height: "20vh", width: "100%", display: "flex", alignItems: 'center', marginTop: '10px', }}>
        {images?.map((image, i) => (
          <img
            src={image?.url}
            alt={"Product"}
            style={{ height: "18vh", margin: '10px' }}
            key={i}
          />
        ))}
      </Box>
    </>
  );
}
