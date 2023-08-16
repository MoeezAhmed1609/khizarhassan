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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Components Imports
import FadeSlider from "../components/fadeSlider";
// Metadata Import
import Metadata from "../components/metadata";
// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productsActions";
import banner from "../assets/banner.mp4";
import text from "../assets/banner-text.png";
import StyledButton from "../components/styledButton";
import menswear from "../assets/menswear.webp";
import womenswear from "../assets/womenswear.webp";
import kidswear from "../assets/kidswear.webp";
import userbg from "../assets/user-bg.jpg";
import boomwear from "../assets/Wear.png";

import { Link } from "react-router-dom";
import SaleSlider from "../components/saleSlider";

const Home = ({ handleAddToFavorites }) => {
  const dispatch = useDispatch();
  const [blogLength, setBlogLength] = useState(4);
  const { loading, data } = useSelector((state) => state.products);
  // Blogs
  const blogs = useSelector((state) => state.blogs.data);
  // Categories
  const categories = [
    {
      url: menswear,
      title: "Mens wear",
      perma: "Mens",
    },
    {
      url: womenswear,
      title: "Women wear",
      perma: "Woman",
    },
    {
      url: kidswear,
      title: "Kids wear",
      perma: "Kids",
    },
  ];
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
  }, [window.innerWidth, blogLength]);
  console.log(blogLength);
  return (
    <>
      <Metadata title="Get your desired footwears | BoomWear Official Store" />
      {/* Video Banner */}
      <Box
        sx={{
          height: { xs: "46vh", sm: "98vh" },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <video width="100%" autoPlay loop muted>
          <source src={banner} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            height: { xs: "46vh", sm: "98vh" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "99",
            top: "0",
            flexDirection: "column",
          }}
        >
          <img src={text} style={{ width: "50%" }} alt="banner text" />
          <Link
            to={"/shop"}
            style={{
              textDecoration: "none",
              color: "black",
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyledButton
              title={
                <>
                  <Typography
                    sx={{
                      fontSize: "2.6vh",
                    }}
                  >
                    SHOP COLLECTIONS
                  </Typography>
                  <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                </>
              }
              mode={"light"}
              width={"50%"}
            />
          </Link>
        </Box>
      </Box>
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
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "9vh", sm: "15vh" },
              fontWeight: "900",
              fontStyle: "italic",
              color: "black",
            }}
          >
            UNBELIEVABLE
          </Typography>
          <Typography
            sx={{
              fontSize: "6vh",
              fontWeight: "900",
              fontStyle: "italic",
              color: "black",
              marginTop: "-20px",
            }}
          >
            SPEED. COMFORT.
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            minHeight: "50vh",
            padding: "15px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {categories.map((cat, i) => (
            <Grid
              item
              key={i}
              xs={12}
              sm={4}
              sx={{
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
                onClick={() =>
                  window.sessionStorage.setItem("category", cat.perma)
                }
              >
                <Box
                  sx={{
                    height: "180px",
                    width: "180px",
                    borderRadius: "50%",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    backgroundImage: `url(${cat.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "15px",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Sale Wrapper */}
      <Grid
        container
        sx={{ minHeight: "60vh", width: "100%", background: "#f3f4ef" }}
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
            }}
          >
            Get extra 20% off
          </Typography>
          <Link
            to="/shop"
            style={{
              color: "black",
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
                backgroundColor: "#ededed",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <SaleSlider
              products={data}
              loading={loading}
              handleAddToFavorites={handleAddToFavorites}
            />
          )}
        </Grid>
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
                  <Card sx={{ width: "100%", height: "55vh" }}>
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
                        {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography> */}
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
          background: "black",
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
              <StyledButton title={"Sign In"} mode={"light"} />
            </Link>
            <Link
              style={{ textDecoration: "none", width: "40%" }}
              to="/account"
            >
              <StyledButton title={"Join Us"} mode={"light"} />
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
              background: "white",
            }}
          >
            <img src={boomwear} style={{ height: "25vh" }} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
