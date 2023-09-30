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
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        sx={{ paddingRight: { xs: "0", sm: "10px" } }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "20vh", sm: "70vh" },
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: { xs: "15px", sm: "0" },
          }}
        >
          <Link
            to={`/shop/${category?.toLowerCase()}`}
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              {category}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "Poppins, sans-serif", color: "white" }}
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
          sm={9}
          md={10}
          sx={{
            paddingLeft: { xs: "0", sm: "10px" },
            height: "70vh",
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
          sm={9}
          md={10}
          sx={{ paddingLeft: { xs: "0", sm: "10px" } }}
        >
          <ProductSlider products={bestProducts} favorite={favorite} />
        </Grid>
      )}
    </>
  );
};

export default BestSellersSlider;
