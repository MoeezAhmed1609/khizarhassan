import React, { useEffect, useState } from "react";
// Material Ui
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

// Components Import
import ProductTabs from "../components/tabs";
import StyledButton from "../components/styledButton";
// React Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productsActions";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/reducers/cartReducer";
import ProductSlider from "../components/productSlider";
import toast from "react-hot-toast";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RelatedSlider from "../components/ProductsSlider";
import ReviewSection from "../components/ReviewSection";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const Product = ({ handleAddToFavorites }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const data = product?.data?.product;
  // Add to cart
  const [size, setSize] = useState(0);
  const [flavor, setFlavor] = useState(0);
  const [sizeCart, setSizeCart] = useState("");
  const [flavorCart, setFlavorCart] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    if (!sizeCart) {
      toast.error("Please select your desired size and flavor!");
      return;
    }
    if (quantity > data?.variants[size]?.quantity) {
      toast.error(`Only ${data?.variants[size]?.quantity} in stock!`);
      return;
    }
    dispatch(
      addToCart({ product: data, size: sizeCart, flavor: flavorCart, quantity })
    );
    toast.success("Added to Cart!");
    window.setTimeout(function () {
      navigate("/cart");
    }, 2000);
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSizeCart(data?.variants[size]?.size);
    setFlavorCart(data?.variants[size]?.flavors[flavor]);
  }, [data, size]);
  return (
    <>
      <Box
        sx={{
          height: "13vh",
          width: "100%",
          // display: { xs: "none", sm: "none", md: "block" },
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
                <ProductSlider images={data?.variants[size]?.images} />
              </Grid>
              <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
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
                  {data?.variants[size]?.quantity <= 0 && (
                    <Typography
                      component="h1"
                      variant="subtitle1"
                      sx={{
                        textTransform: "capitalize",
                        fontFamily: "Poppins, sans-serif",
                        color: "white",
                        background: "#e63146",
                        padding: "4px 8px",
                      }}
                    >
                      Sold Out
                    </Typography>
                  )}
                </Box>
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
                  Rs.{data?.variants[size]?.price}
                </Typography>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  sx={{
                    textDecoration: "line-through",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Rs.{data?.variants[size]?.discount}
                </Typography>

                <Typography
                  component="h1"
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    marginY: "10px",
                  }}
                >
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: "36px", paddingRight: "6px" }}
                  />{" "}
                  {data?.shipping === 0
                    ? "Free Delivery All Over Pakistan"
                    : `Delivery for only Rs.${data?.shipping} All Over Pakistan`}
                </Typography>

                <Typography
                  sx={{ marginTop: "5px", fontFamily: "Poppins, sans-serif" }}
                  variant="body1"
                >
                  Select your variants:
                </Typography>
                <Grid container>
                  {data?.variants?.map((variant, i) => (
                    <Grid
                      item
                      md={3}
                      xs={6}
                      key={i}
                      sx={{ padding: "4px 8px" }}
                    >
                      <Button
                        sx={{
                          width: "100%",
                          border: `1.5px solid ${
                            size === i ? "#e63146" : "black"
                          }`,
                          borderRadius: "7px",
                          textAlign: "center",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          color: size === i ? "white" : "black",
                          fontSize: "18px",
                          textTransform: "capitalize",
                          background: size === i ? "#e63146" : "transparent",
                        }}
                        onClick={() => {
                          setSize(i);
                          setSizeCart(variant?.size);
                        }}
                      >
                        {variant?.size}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item xs={12} sx={{ padding: "4px 8px" }}>
                    <Typography
                      sx={{
                        marginTop: "5px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      variant="body1"
                    >
                      Select your flavors:
                    </Typography>
                  </Grid>
                  {data?.variants[size].flavors?.map((variant, i) => (
                    <Grid
                      item
                      md={3}
                      xs={6}
                      key={i}
                      sx={{ padding: "4px 8px" }}
                    >
                      <Button
                        sx={{
                          width: "100%",
                          border: `1.5px solid ${
                            flavor === i ? "#e63146" : "black"
                          }`,
                          borderRadius: "7px",
                          textAlign: "center",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          color: flavor === i ? "white" : "black",
                          fontSize: "15px",
                          textTransform: "capitalize",
                          background: flavor === i ? "#e63146" : "transparent",
                        }}
                        onClick={() => {
                          setFlavor(i);
                          setFlavorCart(variant);
                        }}
                      >
                        {variant}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    marginY: "8px",
                    paddingLeft: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="remove"
                    onClick={() =>
                      setQuantity(quantity === 1 ? 1 : quantity - 1)
                    }
                    size="large"
                    sx={{ color: "#e63146", paddingRight: "15px" }}
                  >
                    <RemoveCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                  <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    aria-label="add"
                    onClick={() => setQuantity(quantity + 1)}
                    size="large"
                    sx={{ color: "#e63146", paddingLeft: "15px" }}
                  >
                    <AddCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Box>
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
                    onClick={handleAddToCart}
                    validation={data?.variants[size]?.quantity <= 0}
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
          {data?.related?.length > 0 && (
            <Box
              sx={{
                padding: "20px 10px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Related Products
              </Typography>
              <RelatedSlider
                products={data?.related}
                favorite={handleAddToFavorites}
                cart={false}
              />
            </Box>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "80%",
                },
                minHeight: "40vh",
                // maxHeight: "80vh",
                // overflowY: "auto",
              }}
            >
              <ReviewSection reviews={data} id={data?._id} />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Product;
