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
import ProductTabs from "../components/tabs";
import StyledButton from "../components/styledButton";
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
          height: "13vh",
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
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <Box sx={{ width: "100%", minHeight: "80vh" }}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <ProductSlider images={data?.variants[0]?.images} />
              </Grid>
              <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {data?.category}
                </Typography>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: "8vh",
                    fontWeight: "500",
                    marginTop: "-10px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {data?.name}
                </Typography>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    color: "#e63146",
                  }}
                >
                  Rs.{data?.variants[0]?.price}
                </Typography>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  sx={{
                    textDecoration: "line-through",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Rs.{data?.variants[0]?.discount}
                </Typography>
                <Typography
                  sx={{ marginTop: "15px", fontFamily: "Poppins, sans-serif" }}
                  variant="body1"
                >
                  Select your variants:
                </Typography>
                <Grid container>
                  {data?.variants?.map((size, i) => (
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
                        value={size?.size}
                        style={{ display: "none" }}
                        onChange={() => setSize(size?.size)}
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
                          {size?.size}
                        </Box>
                      </label>
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item xs={12} sx={{ padding: "4px 8px" }}>
                    <Typography
                      sx={{
                        marginTop: "15px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      variant="body1"
                    >
                      Select your flavors:
                    </Typography>
                  </Grid>
                  {data?.variants[0].flavors?.map((size, i) => (
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
                  <StyledButton
                    title={"Add to Cart"}
                    onClick={() => handleAddToCart()}
                  />
                  <StyledButton
                    title={"Add to Favorites"}
                    onClick={() => handleAddToFavorites(data?._id)}
                    mode="dark"
                  />
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
