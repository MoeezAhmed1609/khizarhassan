import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import StyledTextField from "../components/styledTextField";
import StyledButton from "../components/styledButton";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { createOrder } from "../redux/actions/userActions";

const Checkout = () => {
  // Getting User
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // Getting cart items
  const { cart } = useSelector((state) => state.cart);
  let subtotal = 0;
  const shipping = 10;
  cart?.filter((item) => {
    subtotal += Number(item?.product?.price);
  });
  const tax = Math.round((subtotal / 100) * 13);
  const total = subtotal + shipping + tax;
  //   Delivery Details
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placed, setPlaced] = useState(false);
  const handleCreateOrder = () => {
    if (name.length < 4) {
      setIsError(true);
      setErrorMessage("Full Name needed!");
      return;
    }
    if (isEmail(email) === false) {
      setIsError(true);
      setErrorMessage("Invalid Email!");
      return;
    }
    if (phone.length !== 11) {
      setIsError(true);
      setErrorMessage("Enter a valid phone number!");
      return;
    }
    const items = [];
    cart?.filter((item) => {
      const data = {
        size: item?.size,
        product: item?.product?._id,
      };
      items.push(data);
    });
    const data = {
      shipping: {
        address,
        phone,
        zip,
        email,
        name,
      },
      items,
      itemsPrice: subtotal,
      shippingPrice: shipping,
      taxPrice: tax,
      totalPrice: total,
    };
    dispatch(createOrder(data));
    setPlaced(true);
  };
  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      window.location.replace("/account");
    }
    if (cart?.length === 0) {
      window.location.replace("/shop");
    }
  }, [isAuthenticated]);
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
      ) : (
        <>
          <Grid
            container
            sx={{
              width: "100%",
              height: "80vh",
              padding: "0 5%",
              margin: "20px 0",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: "26px",
                textAlign: "center",
                height: "8vh",
              }}
            >
              <Typography variant="h5">Checkout</Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ height: "70vh" }}>
              <Typography variant="h5">Delivery Details</Typography>
              <Grid container sx={{ margin: "30px 0" }}>
                <Grid item xs={12} md={6} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={8} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Zip"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Grid>
                {isError && (
                  <Grid item xs={12} sx={{ padding: "0 16px" }}>
                    <Typography variant="subtitle2" sx={{ color: "red" }}>
                      {errorMessage}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sx={{ padding: "8px" }}>
                  <StyledButton
                    title="Place Order"
                    mode="dark"
                    validation={!name || !email || !address || !phone || !zip}
                    onClick={() => handleCreateOrder()}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                height: "70vh",
                padding: "0 30px",
                marginTop: { xs: "20px", md: "0" },
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  margin: "15px 0",
                  gap: "0 10px",
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "50%",
                  }}
                  to="/cart"
                >
                  <StyledButton title="View Cart" mode="dark" />
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "50%",
                  }}
                  to="/shop"
                >
                  <StyledButton title="Add more wears" mode="light" />
                </Link>
              </Box>
            </Grid>
          </Grid>
          {placed && (
            <Box
              sx={{
                position: "absolute",
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, .6)",
                top: 0,
                zIndex: 999,
              }}
            >
              <Box
                sx={{
                  padding: "35px 50px",
                  background: "white",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Order Placed!</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "15px",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", width: "100%" }}
                    to="/dashboard"
                  >
                    <StyledButton title={"Track Order"} mode="dark" />
                  </Link>
                  <Link
                    style={{ textDecoration: "none", width: "100%" }}
                    to="/shop"
                  >
                    <StyledButton title={"Back to Shop"} mode="light" />
                  </Link>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
