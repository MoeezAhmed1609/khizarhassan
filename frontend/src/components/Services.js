import {
  IconButton,
  Box,
  Avatar,
  Badge,
  Modal,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import StyledTextField from "./styledTextField";
// Redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Services = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
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
  // Getting all products for search
  const { data } = useSelector((state) => state?.products);
  const products = data?.products;
  const services = [
    {
      title: "Account",
      icon: isAuthenticated ? (
        <Avatar {...stringAvatar(user?.name)} />
      ) : (
        <PersonOutlineOutlinedIcon />
      ),
      link: "/account",
    },
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
  // Search Modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: "75vw", md: "55vw" },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "70vh",
    borderRadius: "10px",
  };
  const handleOpen = () => setSearch(true);
  const handleClose = () => setSearch(false);
  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={() => handleOpen()}>
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
      <Modal open={search} onClose={handleClose}>
        <Box sx={style}>
          <Grid
            container
            sx={{
              width: "100%",
              margin: "20px 0",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "15vh",
              }}
            >
              <StyledTextField
                title={"Search here"}
                type={"text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container sx={{ overflowY: "scroll", height: "51vh" }}>
                {products
                  ?.filter((product) =>
                    product?.name?.toLowerCase()?.includes(query?.toLowerCase())
                  )
                  ?.map((product, index) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={index}
                      sx={{ padding: "16px 10px" }}
                    >
                      <Card sx={{ boxShadow: "none" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ height: "30vh", objectFit: "contain" }}
                            image={product?.variants[0]?.images[0]?.url}
                            alt={product?.name}
                          />
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            to={`/product/${product?._id}`}
                          >
                            <CardContent>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  textTransform: "capitalize",
                                  fontFamily: "Poppins, sans-serif",
                                }}
                              >
                                {product?.name}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <IconButton onClick={() => setShow(!show)}>
        <SettingsIcon sx={{ color: "white" }} />
      </IconButton>
      {show && (
        <Box
          sx={{
            minHeight: "200px",
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
