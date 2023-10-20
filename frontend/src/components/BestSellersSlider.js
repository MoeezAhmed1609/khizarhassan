import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductSlider from "./ProductsSlider";
import { useSelector } from "react-redux";

const BestSellersSlider = ({ category, favorite }) => {
  const { loading, data } = useSelector((state) => state.products);
  const bestProducts = data?.products?.filter(
    (product) =>
      product?.best === true &&
      product?.category?.toLowerCase() === category?.toLowerCase()
  );
  return (
    <>
      <Grid item xs={12} sx={{ marginBottom: "8px" }}>
        <Box
          sx={{
            width: "100%",
            height: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: { xs: "15px", sm: "0" },
            background: "#e63146",
            color: "white",
            borderRadius: "5px",
            // padding: "0 8px",
          }}
        >
          <Link
            to={`/shop`}
            state={{ category: category?.toLowerCase() }}
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "white",
              }}
            >
              {category}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "white",
              }}
            >
              View More
            </Typography>
          </Link>
        </Box>
      </Grid>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            paddingLeft: { xs: "0", sm: "10px" },
            minHeight: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" size={"8.5vh"} />
        </Grid>
      ) : (
        <Grid item xs={12} sx={{ minHeight: "45vh" }}>
          <ProductSlider products={bestProducts} favorite={favorite} />
        </Grid>
      )}
    </>
  );
};

export default BestSellersSlider;
