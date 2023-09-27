import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function MainBanner() {
  return (
    <>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="main-swiper"
      >
        <SwiperSlide>
          <img
            src="https://cdn.sanity.io/images/ke3vv5hk/production/2f6c52bdb1eb7d3de65b599af5ecd9ed56614c14-1920x780.jpg"
            alt="banner1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.sanity.io/images/ke3vv5hk/production/dfc28951f8caa946f05841911b12d3d9402c2c49-1920x780.webp"
            alt="banner2"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
