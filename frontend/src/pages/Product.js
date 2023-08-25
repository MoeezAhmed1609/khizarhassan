import React, { useEffect, useState } from "react";
// Material Ui
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

// Components Import
import DisplaySlider from "../components/displaySlider";
import FadeSlider from "../components/fadeSlider";
import ProductTabs from "../components/tabs";

// React Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productsActions";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/reducers/cartReducer";
import ProductSlider from "../components/productSlider";

const Product = ({ handleAddToFavorites }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const data = product?.data?.product;
  // Toggle Button
  const [check, setCheck] = useState("outlined");
  // Add to cart
  const [size, setSize] = useState("");
  const handleAddToCart = () => {
    if (!size) {
      alert("Please select your desired size!");
      return;
    }
    dispatch(addToCart({ product: data, size }));
    navigate("/cart");
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <Box
        sx={{
          height: "18vh",
          width: "100%",
          display: { xs: "none", sm: "none", md: "block" },
        }}
      ></Box>
      {product.loading ? (
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
        <>
          <Box sx={{ width: "100%", minHeight: "80vh" }}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <ProductSlider images={data?.images} />
              </Grid>
              <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
                <Typography component="h1" variant="subtitle1">
                  {data?.category}
                </Typography>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: "8vh",
                    fontWeight: "500",
                    marginTop: "-10px",
                  }}
                >
                  {data?.name}
                </Typography>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: 700 }}
                >
                  ${data?.price}.00
                </Typography>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${data?.discount}.00
                </Typography>
                <Typography sx={{ marginTop: "15px" }} variant="body1">
                  Select your size:
                </Typography>
                <Grid container>
                  {data?.sizes?.map((size, i) => (
                    <Grid
                      item
                      md={3}
                      xs={6}
                      key={i}
                      sx={{ padding: "4px 8px" }}
                    >
                      <input
                        type="radio"
                        id={i}
                        name="fav_language"
                        value={size}
                        style={{ display: "none" }}
                        onChange={() => setSize(size)}
                      />
                      <label for={i}>
                        <Box
                          sx={{
                            width: "100%",
                            border: "1.5px solid black",
                            borderRadius: "7px",
                            textAlign: "center",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          className="radioBtn"
                        >
                          {size}
                        </Box>
                      </label>
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "140px",
                    margin: "15px 0",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "70%",
                      borderRadius: "30px",
                      height: "60px",
                      backgroundColor: "black",
                      boxShadow: "none",
                      color: "#fff",
                      border: "1.5px solid black",
                      "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root":
                        {
                          backgroundColor: "white",
                          color: "black",
                        },
                    }}
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "70%",
                      borderRadius: "30px",
                      height: "60px",
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "none",
                      border: "1.5px solid black",
                      "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root":
                        {
                          backgroundColor: "black",
                          color: "#fff",
                        },
                    }}
                    onClick={() => handleAddToFavorites(data?._id)}
                  >
                    Add To Favorite
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "20px 0",
            }}
          >
            <ProductTabs data={data} />
          </Box>
        </>
      )}
    </>
  );
};

export default Product;
