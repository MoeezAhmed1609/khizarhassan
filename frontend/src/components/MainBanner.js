import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
// import { useSelector } from "react-redux";

export default function MainBanner() {
  // const { data } = useSelector((state) => state.banners);
  const data = [
    {
      md: "https://msznutrition.com/cdn/shop/files/Newbanner1web.jpg?v=1695022546&width=1880",
      xs: "https://msznutrition.com/cdn/shop/files/Newbanner1.1.jpg?v=1694862636&width=750",
    },
    {
      md: "https://msznutrition.com/cdn/shop/files/Newbanner2web.jpg?v=1695022596&width=1880",
      xs: "https://msznutrition.com/cdn/shop/files/Newbanner2.jpg?v=1694865180&width=750",
    },
  ];
  return (
    <>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="main-swiper"
      >
        {data?.map((ban, i) => (
          <SwiperSlide key={i}>
            <picture>
              <source media="(min-width:600px)" srcset={ban.md} />
              <img alt={`banner${i}`} src={ban.xs} />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
