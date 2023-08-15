import React from "react";
// Material UI
import {
  Box,
  CircularProgress,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Card,
  Button,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../redux/reducers/cartReducer";

const Cart = ({ handleAddToFavorites }) => {
  // Getting cart items
  const { cart } = useSelector((state) => state.cart);
  let subtotal = 0;
  const shipping = 10;
  cart?.filter((item) => {
    subtotal += Number(item?.product?.price);
  });
  const tax = Math.round((subtotal / 100) * 13);
  const total = subtotal + shipping + tax;

  // Remove from cart
  const dispatch = useDispatch();
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Box sx={{ height: "18vh", width: "100%" }}></Box>
      {!cart ? (
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
      ) : cart?.length === 0 ? (
        <>
          <Box
            sx={{
              height: "80vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ letterSpacing: "1.5px", fontWeight: "100" }}
            >
              You don't have any wears in your cart,
              <Link
                to="/shop"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "10px",
                  backgroundColor: "black",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Add Some!
              </Link>
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "80vh",
              padding: "0 5%",
              margin: "20px 0",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ marginBottom: "26px", textAlign: "center" }}
            >
              <Typography variant="h5">Your Cart</Typography>
            </Grid>
            {cart?.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                  <CardActionArea>
                    <Box
                      sx={{
                        position: "absolute",
                        right: "4px",
                        top: "4px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Tooltip title="Remove From Cart" placement="left">
                        <IconButton
                          aria-label="cart"
                          size="medium"
                          sx={{ color: "black" }}
                          onClick={() =>
                            handleRemoveFromCart(item?.product?._id)
                          }
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add to Favorites" placement="left">
                        <IconButton
                          aria-label="favorite"
                          size="medium"
                          sx={{ color: "black" }}
                          onClick={() =>
                            handleAddToFavorites(item?.product?._id)
                          }
                        >
                          <FavoriteBorderOutlinedIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${item?.product?._id}`}
                    >
                      <CardMedia
                        component="img"
                        height="auto"
                        image={item?.product?.images[0]?.url}
                        alt={item?.product?.name}
                      />

                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {item?.product?.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            ${item?.product?.price}.00
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1">
                            Size: {item?.size}
                          </Typography>
                          <Typography variant="subtitle1">
                            {item?.product?.category}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                border: "1.5px solid black",
                borderRadius: "5px",
                padding: "15px",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "normal" }}>
                Summary:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Typography variant="subtitle1">
                  Subtotal{" "}
                  <Tooltip title="The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes.">
                    <IconButton sx={{ height: "20px", width: "20px" }}>
                      <HelpIcon sx={{ height: "18px", color: "black" }} />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="subtitle1">${subtotal}.00</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Typography variant="subtitle1">
                  Estimated Shipping & Handling
                </Typography>
                <Typography variant="subtitle1">${shipping}.00</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Typography variant="subtitle1">
                  Estimated Tax (13%)
                  <Tooltip title="The actual tax will be calculated based on the applicable state and local sales taxes when your order is shipped.">
                    <IconButton sx={{ height: "20px", width: "20px" }}>
                      <HelpIcon sx={{ height: "18px", color: "black" }} />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="subtitle1">${tax}.00</Typography>
              </Box>
              <Divider sx={{ background: "#ececec", marginTop: "10px" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "20px 0",
                }}
              >
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1">${total}.00</Typography>
              </Box>
              <Divider sx={{ background: "#ececec", marginTop: "10px" }} />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/checkout"
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 0",
                    cursor: "pointer",
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
                    "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
                      color: "black",
                      backgroundColor: "white",
                    },
                    width: "100%",
                    textTransform: "uppercase",
                    marginTop: "20px",
                  }}
                  className="swiper-btn"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 0",
                  cursor: "pointer",
                  color: "black",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
                  "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  width: "100%",
                  textTransform: "uppercase",
                  marginTop: "20px",
                }}
                className="swiper-btn"
              >
                Add more wears
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Cart;
