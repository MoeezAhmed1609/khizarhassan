import { IconButton, Box, Avatar, Badge } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// Redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Services = () => {
  const [show, setShow] = useState(false);

  // Avatar
  // Getting user
  const { isAuthenticated, user } = useSelector((state) => state.user);
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "black",
        color: "white",
      },
      children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
    };
  }
  // Cart
  // Getting cart items
  const { cart } = useSelector((state) => state.cart);

  const services = [
    {
      title: "Cart",
      icon: (
        <Badge
          badgeContent={cart?.length || 0}
          sx={{
            "& .css-fvc8ir-MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      ),
      link: "/cart",
    },
    {
      title: "Favorite",
      icon: (
        <Badge
          badgeContent={user?.favorites?.length || 0}
          sx={{
            "& .css-fvc8ir-MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <FavoriteBorderOutlinedIcon />
        </Badge>
      ),
      link: "/favorite",
    },
  ];

  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
      <IconButton sx={{ paddingTop: "15px" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"/account"}
        >
          {isAuthenticated ? (
            <Avatar
              {...stringAvatar(user?.name)}
              sx={{ background: "#e63146", color: "white" }}
            />
          ) : (
            <PersonOutlineOutlinedIcon sx={{ color: "white" }} />
          )}
        </Link>
      </IconButton>
      <IconButton onClick={() => setShow(!show)}>
        <SettingsIcon sx={{ color: "white" }} />
      </IconButton>
      {show && (
        <Box
          sx={{
            minHeight: "150px",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            right: "0",
          }}
        >
          {services.map((service, index) => (
            <IconButton
              key={index}
              sx={{
                background: "white",
                padding: service.title === "Account" && user ? "0" : "8px",
                borderRadius: "50%",
                margin: "8px 0",
                boxShadow:
                  "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={service.link}
              >
                {service.icon}
              </Link>
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Services;
