import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, getAllUsers } from "../redux/actions/userActions";

// Components
import Orders from "../components/Orders";
import Favorites from "../components/Favorites";
import Settings from "../components/Settings";
import Dash from "../components/Dash";
import Product from "../components/Product";
import Users from "../components/Users";
import AdminOrders from "../components/AdminOrders";
// import Reviews from "../components/Reviews";
import Blogs from "../components/Blogs";
import Content from "../components/Content";
import Category from "../components/Category";
import Metadata from "../components/metadata";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );
  // Pages
  const pages = ["Orders", "Favorites", "Settings"];
  const [mode, setMode] = useState("orders");
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);
  useEffect(() => {
    const m = window.sessionStorage.getItem("mode");
    if (m) {
      setMode(m);
    }
  }, [window.sessionStorage]);
  return (
    <>
      <Metadata title={"Dashboard - Xtrack.pk"} />

      <Box sx={{ height: "10vh", width: "100%" }}></Box>
      {loading ? (
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
      ) : isAuthenticated ? (
        <>
          <Box
            sx={{
              minHeight: "75vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "20px 0",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Typography
                sx={{ fontWeight: 800, fontSize: { xs: "8vh", sm: "10vh" } }}
              >
                Hey!
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  marginLeft: "10px",
                  fontSize: { xs: "8vh", sm: "10vh" },
                }}
              >
                {user?.name}
              </Typography>
            </Box>
            <Stack
              direction="row"
              spacing={{ xs: 0, sm: 3 }}
              sx={{ marginTop: "0px" }}
            >
              {pages.map((page, i) => (
                <Button
                  key={i}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    letterSpacing: "1.5px",
                    fontWeight: "100",
                    margin: { xs: "0 5px", sm: "0 15px" },
                    border:
                      mode === page.toLowerCase()
                        ? "1.5px solid black"
                        : "none",
                  }}
                  onClick={() => {
                    setMode(page.toLowerCase());
                    window.sessionStorage.setItem("mode", page.toLowerCase());
                  }}
                >
                  {page}
                </Button>
              ))}
              {user?.role === "Admin" && (
                <Button
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    letterSpacing: "1.5px",
                    fontWeight: "100",
                    margin: "0 15px",
                    border: mode === "admin" ? "1.5px solid black" : "none",
                  }}
                  onClick={() => {
                    setMode("admin");
                    window.sessionStorage.setItem("mode", "admin");
                  }}
                >
                  Admin
                </Button>
              )}
            </Stack>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {mode === "orders" ? (
                <Orders user={user} />
              ) : mode === "favorites" ? (
                <Favorites user={user} />
              ) : mode === "admin" ? (
                <Admin user={user} />
              ) : (
                <Settings user={user} error={error} />
              )}
            </Box>
          </Box>
        </>
      ) : (
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
            Wanna be a Member?
            <Link
              to="/account"
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "10px",
                backgroundColor: "black",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
};
const Admin = ({ user }) => {
  const [mode, setMode] = useState("dashboard");
  const options = [
    "Dashboard",
    "Product",
    "Category Brands",
    "Users",
    "Orders",
    "Blogs",
    "Contents",
  ];
  const optionsXs = ["Dashboard", "Users", "Orders"];
  useEffect(() => {
    const m = window.sessionStorage.getItem("admin");
    if (m) {
      setMode(m);
    }
  }, [window.sessionStorage]);
  return (
    <Box
      sx={{
        minHeight: "75vh",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Stack
        direction={{ xs: "row", sm: "column" }}
        sx={{ width: { xs: "100%", sm: "15vw" }, marginTop: "15px" }}
      >
        {options.map((option, i) => (
          <Button
            key={i}
            sx={{
              color: "black",
              letterSpacing: "1.5px",
              fontWeight: "100",
              border:
                mode === option.toLowerCase() ? "1.5px solid black" : "none",
              margin: "8px 15px",
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => {
              setMode(option.toLowerCase());
              window.sessionStorage.setItem("admin", option.toLowerCase());
            }}
          >
            {option}
          </Button>
        ))}
        {optionsXs.map((option, i) => (
          <Button
            key={i}
            sx={{
              color: "black",
              letterSpacing: "1.5px",
              fontWeight: "100",
              border:
                mode === option.toLowerCase() ? "1.5px solid black" : "none",
              margin: "8px 15px",
              display: { xs: "block", sm: "none" },
            }}
            onClick={() => {
              setMode(option.toLowerCase());
              window.sessionStorage.setItem("admin", option.toLowerCase());
            }}
          >
            {option}
          </Button>
        ))}
      </Stack>
      <Box
        sx={{
          margin: "20px",
          width: "84vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {mode === "dashboard" ? (
          <Dash user={user} />
        ) : mode === "product" ? (
          <Product user={user} />
        ) : mode === "category brands" ? (
          <Category user={user} />
        ) : mode === "users" ? (
          <Users user={user} />
        ) : mode === "orders" ? (
          <AdminOrders user={user} />
        ) : mode === "blogs" ? (
          <Blogs user={user} />
        ) : mode === "contents" ? (
          <Content />
        ) : null}
      </Box>
    </Box>
  );
};

export default Dashboard;
