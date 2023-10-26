import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Navigation } from "swiper";
import ProductCard from "./card";

export default function ProductSlider({ products, favorite }) {
  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="product-slider"
        style={{ padding: "15px 0" }}
      >
        {products?.map((product, i) => (
          <SwiperSlide key={i}>
            <ProductCard handleAddToFavorites={favorite} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
