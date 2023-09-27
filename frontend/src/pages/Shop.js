import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import "datejs";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductCard from "../components/card";

const Shop = ({ handleAddToFavorites }) => {
  // Category mode
  const [mode, setMode] = useState("All");
  const [brand, setBrand] = useState("All");
  const [filter, setFilter] = useState("");
  //   Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElBrand, setAnchorElBrand] = React.useState(null);
  const openBrand = Boolean(anchorElBrand);
  const handleClickBrand = (event) => {
    setAnchorElBrand(event.currentTarget);
  };
  const handleCloseBrand = () => {
    setAnchorElBrand(null);
  };
  const [anchorElSort, setAnchorElSort] = React.useState(null);
  const openSort = Boolean(anchorElSort);
  const handleClickSort = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const { data, loading } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.category?.data);
  const brands = useSelector((state) => state.brands?.data);
  let products = data?.products
    ?.filter((product) =>
      mode === "All"
        ? product?.category?.toLowerCase()?.includes("")
        : product?.category?.toLowerCase()?.includes(mode?.toLowerCase())
    )
    ?.filter((product) =>
      brand === "All"
        ? product?.brand?.toLowerCase()?.includes("")
        : product?.brand?.toLowerCase()?.includes(brand?.toLowerCase())
    );
  products =
    filter === ""
      ? products
      : filter === "Low-High"
      ? products.sort(
          (a, b) => Number(a.variants[0]?.price) - Number(b.variants[0]?.price)
        )
      : filter === "High-Low"
      ? products.sort(
          (a, b) => Number(b.variants[0]?.price) - Number(a.variants[0]?.price)
        )
      : filter === "Newest"
      ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : filter === "Oldest"
      ? products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      : products;
  useEffect(() => {
    if (window.sessionStorage.getItem("category")) {
      setMode(window.sessionStorage.getItem("category"));
    }
  }, [window.sessionStorage]);
  return (
    <>
      <Box sx={{ height: "18vh", width: "100%" }} />
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: "80vh",
          padding: "0 5%",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            Listing {mode} Products
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              height: "40px",
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              alignItems: "center",
            }}
          >
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "black" }}
            >
              Category: {mode}
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setMode("All");
                }}
              >
                All
              </MenuItem>
              {categories?.map((cat, i) => (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setMode(cat?.title?.toLowerCase());
                  }}
                >
                  {cat?.title}
                </MenuItem>
              ))}
            </Menu>
            <Button
              id="demo-positioned-button"
              aria-controls={openBrand ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openBrand ? "true" : undefined}
              onClick={handleClickBrand}
              sx={{ color: "black" }}
            >
              Brand: {brand}
              {openBrand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElBrand}
              open={openBrand}
              onClose={handleCloseBrand}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setBrand("All");
                }}
              >
                All
              </MenuItem>
              {brands?.map((cat, i) => (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setBrand(cat?.title?.toLowerCase());
                  }}
                >
                  {cat?.title}
                </MenuItem>
              ))}
            </Menu>
            <Button
              id="demo-positioned-button"
              aria-controls={openSort ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSort ? "true" : undefined}
              onClick={handleClickSort}
              sx={{ color: "black" }}
            >
              Sort By: {filter}
              {openSort ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElSort}
              open={openSort}
              onClose={handleCloseSort}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseSort();
                  setFilter("");
                }}
              >
                No Filter
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseSort();
                  setFilter("Newest");
                }}
              >
                Newest
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseSort();
                  setFilter("Oldest");
                }}
              >
                Oldest
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseSort();
                  setFilter("High-Low");
                }}
              >
                Price: High - Low
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseSort();
                  setFilter("Low-High");
                }}
              >
                Price: Low - High
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
        {products ? (
          products?.map((product, i) => (
            <Grid item xs={12} sm={4} md={3} key={i} sx={{ padding: "10px" }}>
              <ProductCard
                handleAddToFavorites={handleAddToFavorites}
                loading={loading}
                product={product}
              />
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
            sx={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Shop;
