import React, { useEffect } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Components Imports
import FadeSlider from "../components/fadeSlider";
// import ProductSlider from "../components/productSlider";
// Metadata Import
import Metadata from "../components/metadata";
// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productsActions";
import DisplaySlider from "../components/displaySlider";

const Home = ({ handleAddToFavorites }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <>
      <Metadata title="Get your desired footwears | BoomWear Official Store" />
      <FadeSlider
        width="100%"
        background={true}
        button={true}
        pagination={true}
      />
      <Box sx={{ height: "120vh", padding: "25px 0" }}>
        <Box
          sx={{
            height: "40vh",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: " center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "15vh",
              fontWeight: "900",
              fontStyle: "italic",
              color: "black",
            }}
          >
            UNBELIEVABLE
          </Typography>
          <Typography
            sx={{
              fontSize: "8vh",
              fontWeight: "900",
              fontStyle: "italic",
              color: "black",
              marginTop: "-20px",
            }}
          >
            SPEED. COMFORT.
          </Typography>
        </Box>
        <Box
          sx={{
            height: "80vh",
            padding: "15px",
          }}
        >
          {products.loading ? (
            <Box
              sx={{
                height: "80vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DisplaySlider
              products={products}
              handleAddToFavorites={handleAddToFavorites}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          height: "100vh",
          padding: "25px 0",
          backgroundColor: "#ededed",
          display: "flex",
        }}
      >
        <FadeSlider
          width="55%"
          background={false}
          button={false}
          pagination={false}
        />
        <Box
          sx={{
            height: "100vh",
            width: "45%",
            display: "flex",
            justifyContent: "center",
            padding: "25px",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textTransform: "uppercase", fontWeight: "400" }}
          >
            Limited STock Available!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "800",
              margin: "20px 0",
            }}
          >
            Nike Air Force
          </Typography>
          <Typography variant="body1" sx={{}}>
            Paragraphs are the building blocks of papers. Many students define
            paragraphs in terms of length: a paragraph is a group of at least
            five sentences, a paragraph is half a page long, etc. In reality,
            though, the unity and coherence of ideas among sentences is what
            constitutes a paragraph.
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "40%",
              marginTop: "30px",
              backgroundColor: "white",
              borderRadius: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              cursor: "pointer",
              color: "black",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
              "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
                backgroundColor: "#54aee6",
                color: "white",
              },
            }}
            className="swiper-btn"
          >
            <Typography
              sx={{
                fontSize: "2.2vh",
              }}
            >
              SHOP COLLECTIONS
            </Typography>
            <ArrowForwardIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
