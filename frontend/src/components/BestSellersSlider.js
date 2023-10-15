import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductSlider from "./ProductsSlider";
import { useSelector } from "react-redux";

const BestSellersSlider = ({ category, favorite }) => {
  const { loading, data } = useSelector((state) => state.products);
  const bestProducts = data?.products?.filter(
    (product) => product?.best === true && product?.category === category
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
          }}
        >
          <Link
            to={`/shop`}
            state={{ category: category?.toLowerCase() }}
            style={{ textAlign: "center", textDecoration: "none" }}
            className="category-header"
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "black",
                background: "white",
              }}
            >
              {category}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "black",
                background: "white",
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
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" size={"8.5vh"} />
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sx={{ minHeight: "70vh" }}
        >
          <ProductSlider products={bestProducts} favorite={favorite} />
        </Grid>
      )}
    </>
  );
};

export default BestSellersSlider;
