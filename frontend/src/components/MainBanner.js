import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import required modules
import { Navigation, Autoplay, EffectFade } from "swiper";
import { useSelector } from "react-redux";

export default function MainBanner() {
  const { data } = useSelector((state) => state.banners);
  return (
    <>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation, Autoplay, EffectFade]}
        className="main-swiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
      >
        {data?.map((ban, i) => (
          <SwiperSlide key={i}>
            <picture>
              <source media="(min-width:600px)" srcset={ban?.sm} />
              <img alt={`banner${i}`} src={ban?.xs} />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
