import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
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
  Pagination,
} from "@mui/material";

// Icons Import
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";

// components import
import boomwear from "../assets/Wear.png";
import { Link } from "react-router-dom";
import StyledTextField from "./styledTextField";
import StyledButton from "./styledButton";

// Redux
import { useSelector } from "react-redux";

const Header = () => {
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

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
  return (
    <AppBar
      position="absolute"
      sx={{ boxShadow: 0, background: "transparent", mt: 2 }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.link} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                width: "33.33%",
                justifyContent: "flex-start",
                alignItems: "center",
              },
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={page.link}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    letterSpacing: "1.5px",
                    fontWeight: "100",
                    margin: "0 15px",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "33.33%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              <img src={boomwear} alt="boomwear" style={{ height: "60px" }} />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              width: "33.33%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ margin: "0 10px" }} onClick={() => handleOpen()}>
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
                    <Grid
                      container
                      sx={{ overflowY: "scroll", height: "51vh" }}
                    >
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
                            <Card sx={{ boxShadow: "none" }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="200px"
                                  image={
                                    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png"
                                  }
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
                                      gutterBottom
                                      variant="subtitle1"
                                      component="div"
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
            {services.map((service, index) => (
              <Link
                key={index}
                style={{ textDecoration: "none" }}
                to={service.link}
              >
                <Tooltip title={service.title}>
                  <IconButton sx={{ margin: "0 10px" }}>
                    {service.icon}
                  </IconButton>
                </Tooltip>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
