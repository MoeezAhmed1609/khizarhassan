import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productsActions";
import StyledButton from "../components/styledButton";
import xtrack from "../assets/X.png";

import { Link } from "react-router-dom";
import SaleSlider from "../components/saleSlider";
import MainBanner from "../components/MainBanner";
import CategoriesSlider from "../components/CategoriesSlider";
import BestSellersSlider from "../components/BestSellersSlider";

const Home = ({ handleAddToFavorites }) => {
  const dispatch = useDispatch();
  const [blogLength, setBlogLength] = useState(4);
  const { loading, data } = useSelector((state) => state.products);
  const ban = useSelector((state) => state.banners.data);
  // Blogs
  const blogs = useSelector((state) => state.blogs.data);
  // data's
  const categories = useSelector((state) => state.category);
  const brands = useSelector((state) => state.brands);

  // on Sale products
  const saleProducts = data?.products?.filter(
    (product) => product?.sale === true
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (window.innerWidth > 780) {
      setBlogLength(4);
    } else if (window.innerWidth > 430) {
      setBlogLength(3);
    } else if (window.innerWidth < 430) {
      setBlogLength(1);
    }
  }, [blogLength]);

  return (
    <>
      <Box
        sx={{
          height: "12.3vh",
          width: "100%",
          // display: { xs: "block", sm: "none" },
        }}
      ></Box>
      {/* Tagline Box */}
      <Grid
        container
        sx={{
          minHeight: "6vh",
          width: "100%",
          background: "#e63146",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins, sans-serif", color: "white" }}
          >
            Low Price Guaranteed
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins, sans-serif", color: "white" }}
          >
            100% Authentic Products
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins, sans-serif", color: "white" }}
          >
            Free Shipping Nationwide
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins, sans-serif", color: "white" }}
          >
            Ask Any Query: +923272026242
          </Typography>
        </Grid>
      </Grid>
      {/* Banner Slider */}
      <MainBanner />
      {/* Categories */}
      <Box sx={{ minHeight: "85vh", padding: "25px 0" }}>
        <Box
          sx={{
            height: { xs: "25vh", sm: "30vh" },
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: " center",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "44px", sm: "14vh" },
              fontWeight: "900",
              fontStyle: "italic",
              color: "black",
              textTransform: "uppercase",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Guaranteed
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "6vh" },
              fontWeight: "900",
              fontStyle: "italic",
              color: "#e63146",
              marginTop: { xs: "-10px", sm: "-20px" },
              fontFamily: "Poppins, sans-serif",
            }}
          >
            AUTHENTIC. LOW PRICED.
          </Typography>
        </Box>
        <CategoriesSlider cards={categories?.data} />
      </Box>
      {/* Sale Wrapper */}
      <Grid
        container
        sx={{ minHeight: "60vh", width: "100%", background: "#e63146" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: "60vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: -2,
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              color: "white",
            }}
          >
            What's on sale
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: -2,
              fontFamily: "Poppins, sans-serif",
              color: "white",
            }}
          >
            Get extra 20% off
          </Typography>
          <Link
            to="/shop"
            style={{
              color: "white",
              textDecoration: "none",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "8px 0",
            }}
          >
            <StyledButton title={"Shop"} mode={"dark"} width={"50%"} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          {loading ? (
            <Box
              sx={{
                textAlign: "center",
                height: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#e63146",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <SaleSlider
              products={saleProducts}
              loading={loading}
              handleAddToFavorites={handleAddToFavorites}
            />
          )}
        </Grid>
      </Grid>
      {/* Best Sellers Wrapper */}
      <Grid
        container
        sx={{
          minHeight: "60vh",
          width: "100%",
          padding: { xs: "14px", sm: "22px" },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: "12vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "900",
              textTransform: "uppercase",
              fontFamily: "Poppins, san-serif",
            }}
          >
            Our Best Sellers
          </Typography>
        </Grid>
        <BestSellersSlider favorite={handleAddToFavorites} category={"proteins"} />
        <BestSellersSlider favorite={handleAddToFavorites} category={"weight gainers"} />
        <BestSellersSlider favorite={handleAddToFavorites} category={"pre workouts"} />
        <BestSellersSlider favorite={handleAddToFavorites} category={"fat loss products"} />
        <BestSellersSlider favorite={handleAddToFavorites} category={"accessories"} />
      </Grid>
      {/* Shop by brands */}
      <Grid
        container
        sx={{
          minHeight: "60vh",
          width: "100%",
          padding: { xs: "14px", sm: "22px" },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: "12vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "900",
              textTransform: "uppercase",
              fontFamily: "Poppins, san-serif",
            }}
          >
            Shop by Brands
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CategoriesSlider cards={brands?.data} />
        </Grid>
        {/* <BestSellersSlider /> */}
      </Grid>
      {/* Blogs Wrapper */}
      <Grid container sx={{ minHeight: "60vh", width: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{
            height: "12vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/blogs"}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "900",
                textTransform: "uppercase",
                fontFamily: "Poppins, san-serif",
              }}
            >
              Our Latest Blogs
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ minHeight: "46vh" }}>
          <Grid container sx={{ padding: "20px" }}>
            {blogs?.slice(0, blogLength).map((blog, i) => (
              <Grid item xs={12} sm={4} md={3} key={i} sx={{ paddingX: 1 }}>
                <Link
                  to={`/blog/${blog?._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    sx={{ width: "100%", height: { xs: "65vh", sm: "55vh" } }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="50%"
                        image={blog?.banner?.url}
                        alt={blog?.title}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "600" }}>
                          {blog?.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: "12vh",
          }}
        >
          <Link
            to="/blogs"
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyledButton
              title={"View All"}
              mode={"dark"}
              width={{ xs: "90%", sm: "50%", md: "35%" }}
            />
          </Link>
        </Grid>
      </Grid>
      {/* Member Wrapper */}
      <Grid
        container
        sx={{
          minHeight: "60vh",
          width: "100%",
          background: "#e63146",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            color: "white",
            padding: { xs: "0 10px", sm: "0 40px" },
            minHeight: "50vh",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "900",
              textTransform: "uppercase",
              lineHeight: { xs: "10vh", sm: "9vh" },
              margin: "12px 0",
            }}
          >
            Become a member
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Sign up for free. Join the community.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: "15px",
            }}
          >
            <Link
              style={{ textDecoration: "none", width: "40%" }}
              to="/account"
            >
              <StyledButton title={"Sign In"} mode={"dark"} />
            </Link>
            <Link
              style={{ textDecoration: "none", width: "40%" }}
              to="/account"
            >
              <StyledButton title={"Join Us"} mode={"dark"} />
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <Box
            sx={{
              height: "26vh",
              width: "auto",
              background: "black",
              padding: "24px",
            }}
          >
            <img src={xtrack} style={{ height: "25vh" }} alt="boom wear" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
