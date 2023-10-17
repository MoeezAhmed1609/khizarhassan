import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper";
import { useSelector } from "react-redux";

const CategoriesSlider = ({ cards, brand }) => {
  // Categories
  // const categories = [
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/eXXKeUKu5Tjw5tAM%7Cmuscletech-nitro-tech-ripped-4lbs-new-in-pakistan-karachi-lahore-islamabad-at-xtrack.pk-removebg-preview_11zon.png",
  //     title: "Proteins",
  //     link: "proteins",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/V8xV0lIZlB1Ajatk%7Cgold-super-mass-7-kg-removebg-preview_11zon.png",
  //     title: "Weight Gainers",
  //     link: "weight-gainers",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/jcYlQXVxPq6IfyiC%7CC4%20ripped%20sport-pre%20workout-xtrack.pk.png",
  //     title: "Pre-workouts",
  //     link: "pre-workouts",
  //   },
  //   {
  //     url: "https://msznutrition.com/cdn/shop/products/ezgif.com-webp-to-jpg.jpg?v=1694170942",
  //     title: "Fat Loss Products",
  //     link: "fat-loss-products",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/TUH8nOQMv8ay8MUN%7Cmuscletech-platinum-multivitamin-in-pakistan-karachi-lahore-islamabad-at-shaped-nutrition_11zon.png",
  //     title: "Multivitamins",
  //     link: "multivitamins",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/4u5JuIdi5NfDNQCX%7Cgold_creatine_616x700_11zon-removebg-preview_11zon.png",
  //     title: "Creatine",
  //     link: "creatine",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/w1D4eaBlbDFyM4Pa%7C61qYjpcjgbL_11zon_11zon.jpg",
  //     title: "BCAAs & EAAs",
  //     link: "bcaa-eaa",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/sTzxy5Vo3vP6CuAQ%7CMuscle-Rulz-Testo-Rulz-60_900x_11zon.jpg",
  //     title: "Testosterone Boosters",
  //     link: "testosterone-boosters",
  //   },
  //   {
  //     url: "https://cdn.chec.io/merchants/49229/assets/dU5U8GsWmafypT9O%7Cmusclerulz-zma_11zon.jpg",
  //     title: "ZMA",
  //     link: "zma",
  //   },
  // ];

  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="category-slider"
      >
        {cards?.map((cat, i) => (
          <SwiperSlide
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: { xs: "10px 0", sm: "0" },
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to={"/shop"}
              state={
                brand
                  ? { brand: cat?.title?.toLowerCase() }
                  : { category: cat?.title?.toLowerCase() }
              }
            >
              <Box
                sx={{
                  height: "160px",
                  width: "160px",
                  backgroundImage: `url(${cat?.image?.url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: "15px",
                  textTransform: "uppercase",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {cat.title}
              </Typography>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategoriesSlider;
