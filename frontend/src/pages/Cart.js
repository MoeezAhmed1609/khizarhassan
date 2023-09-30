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
  CardActions,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import StyledButton from "../components/styledButton";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../redux/reducers/cartReducer";

const Cart = () => {
  // Getting cart items
  const { cart } = useSelector((state) => state.cart);
  let subtotal = 0;
  let totalPieces = 0;
  let shipping = 0;
  let indexed;
  cart?.filter((item) => {
    indexed = item?.product?.variants.findIndex((object) => {
      return object?.size === item?.size;
    });
    subtotal += Number(
      item?.product?.variants[indexed]?.price * item?.quantity
    );
    totalPieces += item?.quantity;
    shipping += item?.product?.shipping;
  });
  const total = subtotal + shipping;
  // Remove from cart
  const dispatch = useDispatch();
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Box sx={{ height: "14vh", width: "100%" }}></Box>
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
              sx={{
                letterSpacing: "1.5px",
                fontWeight: "100",
                padding: { xs: "0", sm: "0 40px" },
                fontFamily: "Poppins, sans-serif",
              }}
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
                  fontFamily: "Poppins, sans-serif",
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
              sx={{ marginBottom: "35px", textAlign: "center" }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
              >
                Your Cart
              </Typography>
            </Grid>
            {cart?.map((item, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card sx={{ boxShadow: "none" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200px"
                      image={
                        item?.product?.variants[indexed]?.images[0]?.url
                      }
                      alt={item?.product?.variants[indexed]?.size}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent sx={{ paddingX: "8px" }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        sx={{
                          height: "10vh",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.product?.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {item?.size}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textTransform: "capitalize",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {item?.flavor}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textTransform: "capitalize",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {item?.quantity}{" "}
                          {item?.quantity === 1 ? "Piece" : "Pieces"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Rs.{item?.product?.variants[indexed]?.price}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ gap: "0 6px" }}>
                      <StyledButton
                        title="Remove"
                        mode="light"
                        onClick={() => handleRemoveFromCart(item?.product?._id)}
                      />
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            <Grid item md={3} xs={12} sx={{ padding: "0 8px" }}>
              <Box
                sx={{
                  width: "100%",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                  padding: "18px 10px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
                >
                  Summary:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Total Products
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {cart?.length} {cart?.length === 1 ? "Item" : "Items"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Total Quantity
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {totalPieces} {totalPieces === 1 ? "Piece" : "Pieces"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Subtotal{" "}
                    <Tooltip title="The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes.">
                      <IconButton sx={{ height: "15px", width: "20px" }}>
                        <HelpIcon sx={{ height: "14px", color: "black" }} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Rs.{subtotal}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Shipping
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Rs.{shipping}
                  </Typography>
                </Box>
                <Divider sx={{ background: "#ececec", marginY: "8px" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Rs.{total}
                  </Typography>
                </Box>
                <Divider sx={{ background: "#ececec", marginY: "8px" }} />
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/checkout"
                >
                  <StyledButton title={"Proceed to Checkout"} />
                </Link>
                <br />
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/shop"
                >
                  <StyledButton mode={"dark"} title={"Add More!"} />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Cart;
