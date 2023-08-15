import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  Typography,
  MenuItem,
  Card,
} from "@mui/material";
import "datejs";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductCard from "../components/card";

const Shop = ({ handleAddToFavorites }) => {
  // Category mode
  const [mode, setMode] = useState("All");
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
  const [anchorElSort, setAnchorElSort] = React.useState(null);
  const openSort = Boolean(anchorElSort);
  const handleClickSort = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const { data, loading } = useSelector((state) => state.products);
  let products = data?.products?.filter((product) =>
    mode === "All"
      ? product?.category?.toLowerCase()?.includes("")
      : product?.category?.toLowerCase()?.includes(mode?.toLowerCase())
  );

  console.log(Date.today().toString("yyyy-MM-dd"));

  products =
    filter === ""
      ? products
      : filter === "Low-High"
      ? products.sort((a, b) => Number(a.price) - Number(b.price))
      : filter === "High-Low"
      ? products.sort((a, b) => Number(b.price) - Number(a.price))
      : filter === "Newest"
      ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : filter === "Oldest"
      ? products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      : products;
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
          sx={{
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{mode} Wears</Typography>
          <Box
            sx={{
              height: "40px",
              display: "flex",
              justifyContent: "center",
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  setMode("Mens");
                }}
              >
                Mens Wear
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setMode("Woman");
                }}
              >
                Woman Wear
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setMode("Kids");
                }}
              >
                Kids Wear
              </MenuItem>
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
        {products?.map((product, i) => (
          <Grid item xs={12} sm={4} md={3} key={i} sx={{ padding: "10px" }}>
            <ProductCard
              handleAddToFavorites={handleAddToFavorites}
              loading={loading}
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Shop;
