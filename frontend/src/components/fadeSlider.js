import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

// Material UI components
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Assets Import
import sneaker from "../assets/nikeair.png";
import sneaker2 from "../assets/nikecamel.png";

export default function FadeSlider({
  width,
  background,
  button,
  pagination,
  height,
}) {
  return (
    <>
      <Box
        sx={{
          height: height ? height : "100vh",
          width: width,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={
            pagination && {
              clickable: true,
            }
          }
          speed={1500}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box
              sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              className={background ? "swiper-bg" : "swiper-transparent-bg"}
            >
              <img
                src={sneaker}
                alt="sneaker"
                style={{ height: "75vh", width: "auto" }}
              />
              {button && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 24px",
                    cursor: "pointer",
                    color: "black",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
                    "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  className="swiper-btn"
                >
                  <Typography
                    sx={{
                      fontSize: "2.6vh",
                    }}
                  >
                    SHOP COLLECTIONS
                  </Typography>
                  <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                </Button>
              )}
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              className={background ? "swiper-bg" : null}
            >
              <img
                src={sneaker2}
                alt="sneaker"
                style={{ height: "75vh", width: "auto" }}
              />
              {button && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 24px",
                    cursor: "pointer",
                    color: "black",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
                    "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  className="swiper-btn"
                >
                  <Typography
                    sx={{
                      fontSize: "2.6vh",
                    }}
                  >
                    SHOP COLLECTIONS
                  </Typography>
                  <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                </Button>
              )}
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
}
