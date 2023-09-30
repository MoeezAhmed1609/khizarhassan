import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Navigation } from "swiper";
import ProductCard from "./ProductCard";

export default function ProductSlider({ products, favorite }) {
  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="product-slider"
      >
        {products?.map((product, i) => (
          <SwiperSlide key={i}>
            <ProductCard favorite={favorite} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
