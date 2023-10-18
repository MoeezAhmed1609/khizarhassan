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
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        style={{
          height: images?.length > 1 ? "65vh" : "72vh",
          width: "100%",
          marginTop: "15px",
        }}
      >
        {images?.map((image, i) => (
          <SwiperSlide
            key={i}
            style={{
              backgroundImage: `url(${image?.url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundOrigin: "content-box",
              cursor: "pointer",
            }}
            onClick={() => openInNewTab(image?.url)}
          />
        ))}
      </Swiper>
      {images?.length > 1 && (
        <Box
          sx={{
            height: "16vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {images?.map((image, i) => (
            <img
              src={image?.url}
              loading="lazy"
              alt={`Product${i}`}
              style={{ height: "14vh", margin: "10px", cursor: "pointer" }}
              onClick={() => openInNewTab(image?.url)}
              key={i}
            />
          ))}
        </Box>
      )}
    </>
  );
}
