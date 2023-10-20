import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Collapse,
  ListItem,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Grid,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledTextField from "./styledTextField";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

function MobileDrawer(props) {
  const categories = useSelector((state) => state.category?.data);
  const brands = useSelector((state) => state.brands?.data);
  // Getting all products for search
  const { data } = useSelector((state) => state?.products);
  const products = data?.products;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [openBrand, setOpenBrand] = useState(false);

  const handleClickBrand = () => {
    setOpenBrand(!openBrand);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins, san-serif", fontWeight: "bold" }}
        >
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
      >
        <Link
          to={"/"}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerToggle}
        >
          <ListItem>
            <Typography
              sx={{
                fontFamily: "Poppins, san-serif !important",
                fontWeight: "bold",
              }}
            >
              Home
            </Typography>
          </ListItem>
        </Link>
        <Divider sx={{ marginY: "6px" }} />
        <Link
          to={"/shop"}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerToggle}
        >
          <ListItem>
            <Typography
              sx={{
                fontFamily: "Poppins, san-serif !important",
                fontWeight: "bold",
              }}
            >
              Shop
            </Typography>
          </ListItem>
        </Link>
        <Divider sx={{ marginY: "6px" }} />
        <ListItem onClick={handleClick}>
          <Typography
            sx={{
              fontFamily: "Poppins, san-serif !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            <span>Shop By Category</span>{" "}
            {open ? <ExpandLess /> : <ExpandMore />}
          </Typography>
        </ListItem>
        <Divider sx={{ marginY: "6px" }} />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories?.map((cat, i) => (
              <Link
                to={"/shop"}
                key={i}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleDrawerToggle}
                state={{ category: cat?.title?.toLowerCase() }}
              >
                <ListItem>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, san-serif !important",
                      textTransform: "capitalize",
                    }}
                  >
                    {cat?.title}
                  </Typography>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ marginY: "6px" }} />
          </List>
        </Collapse>
        <ListItem onClick={handleClickBrand}>
          <Typography
            sx={{
              fontFamily: "Poppins, san-serif !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            <span>Shop By Brand</span>{" "}
            {openBrand ? <ExpandLess /> : <ExpandMore />}
          </Typography>
        </ListItem>
        <Divider sx={{ marginY: "6px" }} />
        <Collapse in={openBrand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {brands?.map((cat, i) => (
              <Link
                to={"/shop"}
                key={i}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleDrawerToggle}
                state={{ brand: cat?.title?.toLowerCase() }}
              >
                <ListItem>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, san-serif !important",
                      textTransform: "capitalize",
                    }}
                  >
                    {cat?.title}
                  </Typography>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ marginY: "6px" }} />
          </List>
        </Collapse>
        <Link
          to={"/about"}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerToggle}
        >
          <ListItem>
            <Typography
              sx={{
                fontFamily: "Poppins, san-serif !important",
                fontWeight: "bold",
              }}
            >
              About
            </Typography>
          </ListItem>
        </Link>
        <Divider sx={{ marginY: "6px" }} />
        <Link
          to={"/blogs"}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerToggle}
        >
          <ListItem>
            <Typography
              sx={{
                fontFamily: "Poppins, san-serif !important",
                fontWeight: "bold",
              }}
            >
              Blogs
            </Typography>
          </ListItem>
        </Link>
        <Divider sx={{ marginY: "6px" }} />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // Search Modal
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
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
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" }, paddingLeft: "25px" }}
        // edge={"end"}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer> */}
      </Box>
      <IconButton onClick={() => handleOpen()} sx={{ display: { sm: "none" }, marginLeft: "8px" }}>
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
                      </Link>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

MobileDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MobileDrawer;
