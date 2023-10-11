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
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { createOrder } from "../redux/actions/userActions";
import RawHTMLRenderer from "../components/HtmlRenderer";
import toast from "react-hot-toast";
import AutoCompleteSelect from "../components/AutoComplete";
import cities from "../assets/cities";

const Checkout = () => {
  const navigate = useNavigate();
  // Getting User
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // Getting cart items
  const { cart } = useSelector((state) => state.cart);
  let subtotal = 0;
  let shipping = 0;
  cart?.filter((item) => {
    let price = item?.product?.variants.findIndex((object) => {
      return object?.size === item?.size;
    });
    subtotal += Number(item?.product?.variants[price]?.price * item?.quantity);
    shipping += item?.product?.shipping;
  });
  const total = subtotal + shipping;
  //   Delivery Details
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("Cash on Delivery");
  const [city, setCity] = useState("");

  const note =
    method === "Cash on Delivery"
      ? "<p>Cash on delivery service is not available in Villages, Self Collection or Incomplete Address (Without House Number). In this condition you can pay through Bank Transfer, Easypaisa or Jazzcash.</p>"
      : method === "EasyPaisa"
      ? "<p>Please share screenshot of transaction slip with your Order ID at Whatsapp 0333-2117276 or Email at xtrack.pk@gmail.com.<br /> Easypaisa account details:<br /> Account Title: Khizar Hasan<br /> Mobile Number: 0333-2117276</p>"
      : method === "Bank Transfer"
      ? "<p>Please share screenshot of transaction slip with your Order ID at Whatsapp 0333-2117276 or Email at xtrack.pk@gmail.com.<br /> Your order will not be dispatch until the amount have cleared in our bank account.<br /> Bank account details:<br /> Account Title: Khizar Hasan<br /> Account Number: 0172 0106782669<br /> IBAN Number: 0333-2117276<br /> BANK: 0333-2117276</p>"
      : null;

  const handleCreateOrder = () => {
    if (!name || !email || !address || !phone || !method || !city) {
      toast.error("Fill complete form!");
      return;
    }
    if (name.length < 4) {
      toast.error("Full Name needed!");
      return;
    }
    if (isEmail(email) === false) {
      toast.error("Invalid Email!");
      return;
    }
    if (phone.length !== 11) {
      toast.error("Enter a valid phone number!");
      return;
    }
    const items = [];
    cart?.filter((item) => {
      const data = {
        size: item?.size,
        flavor: item?.flavor,
        quantity: item.quantity,
        product: item?.product?._id,
      };
      items.push(data);
    });
    const data = {
      shipping: {
        address,
        phone,
        email,
        name,
        city,
      },
      items,
      itemsPrice: subtotal,
      shippingPrice: shipping,
      totalPrice: total,
      payment: method,
    };
    dispatch(createOrder(data));
  };
  useEffect(() => {
    if (cart?.length === 0) {
      navigate("/shop", { replace: true });
    }
  }, [cart?.length]);
  return (
    <>
      <Box sx={{ height: "13vh", width: "100%" }}></Box>
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
              minHeight: "80vh",
              padding: "0 5%",
              margin: "20px 0",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: "8px",
                textAlign: "center",
                minHeight: "8vh",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
              >
                Checkout
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ minHeight: "70vh" }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
              >
                Delivery Details
              </Typography>
              <Grid container sx={{ margin: "30px 0" }}>
                <Grid item xs={12} sm={6} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: "0 8px" }}>
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
                <Grid item xs={12} sm={6} sx={{ padding: "0 8px" }}>
                  <AutoCompleteSelect
                    options={cities}
                    value={city}
                    setValue={setCity}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: "0 8px" }}>
                  <StyledTextField
                    title="Phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: "0 8px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "800",
                    }}
                  >
                    Select Payment Method
                  </Typography>
                </Grid>
                <Grid item sm={4} xs={12} sx={{ padding: "4px 8px" }}>
                  <Button
                    sx={{
                      width: "100%",
                      border: `1.5px solid ${
                        method === "Cash on Delivery" ? "#e63146" : "black"
                      }`,
                      background:
                        method === "Cash on Delivery"
                          ? "#e63146"
                          : "transparent",
                      color: method === "Cash on Delivery" ? "white" : "black",
                      borderRadius: "7px",
                      textAlign: "center",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "15px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      setMethod("Cash on Delivery");
                    }}
                  >
                    Cash on Delivery
                  </Button>
                </Grid>
                <Grid item sm={4} xs={12} sx={{ padding: "4px 8px" }}>
                  <Button
                    sx={{
                      width: "100%",
                      border: `1.5px solid ${
                        method === "EasyPaisa" ? "#e63146" : "black"
                      }`,
                      background:
                        method === "EasyPaisa" ? "#e63146" : "transparent",
                      color: method === "EasyPaisa" ? "white" : "black",
                      borderRadius: "7px",
                      textAlign: "center",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "15px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      setMethod("EasyPaisa");
                    }}
                  >
                    EasyPaisa
                  </Button>
                </Grid>
                <Grid item sm={4} xs={12} sx={{ padding: "4px 8px" }}>
                  <Button
                    sx={{
                      width: "100%",
                      border: `1.5px solid ${
                        method === "Bank Transfer" ? "#e63146" : "black"
                      }`,
                      background:
                        method === "Bank Transfer" ? "#e63146" : "transparent",
                      color: method === "Bank Transfer" ? "white" : "black",
                      borderRadius: "7px",
                      textAlign: "center",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "15px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      setMethod("Bank Transfer");
                    }}
                  >
                    Bank Transfer
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ padding: "4px 8px" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Pay with {method}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <RawHTMLRenderer html={note} />
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ padding: "8px" }}>
                  <StyledButton
                    title="Place Order"
                    mode="dark"
                    onClick={() => handleCreateOrder()}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5} xs={12} sx={{ padding: "0 8px" }}>
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
                  to="/cart"
                >
                  <StyledButton title={"View Cart"} />
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

export default Checkout;
