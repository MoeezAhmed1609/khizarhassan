import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import ProductCard from "./card";

export default function DisplaySlider({ products, handleAddToFavorites }) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {products?.data?.products?.map((product) => (
          <SwiperSlide>
            <ProductCard
              product={product}
              loading={products?.loading}
              handleAddToFavorites={handleAddToFavorites}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
