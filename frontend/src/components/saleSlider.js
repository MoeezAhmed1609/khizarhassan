import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import SaleCard from "./saleCard";

export default function SaleSlider({ products, handleAddToFavorites }) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      style={{ height: "auto", width: "100%" }}
    >
      {products?.map((product, i) => (
        <SwiperSlide key={i}>
          <SaleCard product={product} favorite={handleAddToFavorites} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
