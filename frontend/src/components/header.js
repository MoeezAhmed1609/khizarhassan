import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Badge,
  Modal,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Divider,
} from "@mui/material";

// Icons Import
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TokenIcon from "@mui/icons-material/Token";

// components import
import xtrack from "../assets/xtrack.png";
import { Link } from "react-router-dom";
import StyledTextField from "./styledTextField";

// Redux
import { useSelector } from "react-redux";
import Services from "./Services";
import MobileDrawer from "./MobileDrawer";

const Header = () => {
  const categories = useSelector((state) => state.category?.data);

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

  const pages = [
    {
      name: "Home",
      link: "/",
      // code: ()
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  const services = [
    {
      title: "Account",
      icon: isAuthenticated ? (
        <Avatar {...stringAvatar(user?.name)} sx={{ background: "#e63146" }} />
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
              backgroundColor: "#e63146",
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
              backgroundColor: "#e63146",
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

  // Getting all products for search
  const { data } = useSelector((state) => state?.products);
  const products = data?.products;
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        background: "black",
        left: "0",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          height: "12.26vh",
        }}
      >
        <Box sx={{ display: { xs: "flex", md: "none" }, width: "33%" }}>
          <MobileDrawer />
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              width: "33%",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          }}
        >
          {pages.map((page, index) =>
            page.name === "Shop" ? (
              <>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    letterSpacing: "1.5px",
                    fontWeight: "600",
                    margin: "0 15px",
                    fontFamily: "Poppins,sans-serif",
                    alignItems: "center",
                  }}
                >
                  SHOP
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseAnchor}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      to={"/shop"}
                    >
                      <MenuItem
                        onClick={handleCloseAnchor}
                        sx={{
                          textTransform: "capitalize",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "bold",
                          width: "25vw",
                          paddingLeft: "30px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TokenIcon
                          sx={{
                            color: "#aab2bb",
                            fontSize: "14px",
                            marginRight: "12px",
                          }}
                        />
                        Shop
                      </MenuItem>
                    </Link>
                    <Divider />
                  </>
                  {categories?.map((cat, i) => (
                    <>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        key={i}
                        to={"/shop"}
                        state={{ category: cat?.title?.toLowerCase() }}
                      >
                        <MenuItem
                          onClick={handleCloseAnchor}
                          sx={{
                            textTransform: "capitalize",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "bold",
                            width: "25vw",
                            paddingLeft: "30px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TokenIcon
                            sx={{
                              color: "#aab2bb",
                              fontSize: "14px",
                              marginRight: "12px",
                            }}
                          />
                          {cat?.title}
                        </MenuItem>
                      </Link>
                      <Divider />
                    </>
                  ))}
                </Menu>
              </>
            ) : (
              <Link
                to={page.link}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1.5px",
                    fontWeight: "600",
                    margin: "0 15px",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            )
          )}
        </Box>
        <Box
          sx={{
            display: {xs:'none', sm:"flex"},
            width: "33%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <img
              src={xtrack}
              alt="Z"
              style={{ height: "7vh" }}
              loading="lazy"
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: {xs:'flex', sm:"none"},
            width: "33%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <img
              src={xtrack}
              alt="Z"
              style={{ height: "5vh" }}
              loading="lazy"
            />
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            width: "33%",
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ margin: "0 10px", color: "white" }}
            onClick={() => handleOpen()}
          >
            <SearchIcon />
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
                        product?.name
                          ?.toLowerCase()
                          ?.includes(query?.toLowerCase())
                      )
                      ?.map((product, index) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          key={index}
                          sx={{ padding: "16px 10px" }}
                        >
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            to={`/product/${product?._id}`}
                            onClick={() => {
                              handleClose();
                              setQuery("");
                            }}
                          >
                            <Card sx={{ boxShadow: "none" }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  sx={{
                                    height: "30vh",
                                    objectFit: "contain",
                                  }}
                                  image={product?.variants[0]?.images[0]?.url}
                                  alt={product?.name}
                                />

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
                              </CardActionArea>
                            </Card>
                          </Link>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
          {services.map((service, index) => (
            <Link
              key={index}
              style={{ textDecoration: "none", color: "white" }}
              to={service.link}
            >
              <Tooltip title={service.title}>
                <IconButton sx={{ margin: "0 10px", color: "white" }}>
                  {service.icon}
                </IconButton>
              </Tooltip>
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            width: "30%",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Services />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
