import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";
import StyledButton from "./styledButton";

import { Link } from "react-router-dom";
const Favorites = ({ user }) => {
  return (
    <>
      {user?.favorites?.length === 0 ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ letterSpacing: "1.5px", fontWeight: "100" }}
            >
              You don't have any favorite wears,
              <Link
                to="/shop"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "10px",
                  backgroundColor: "black",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Add Some!
              </Link>
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Grid
            container
            sx={{
              width: "100%",
              minHeight: "80vh",
              padding: "0 5%",
              margin: "20px 0",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ marginBottom: "12px" }}
            >
              <Typography variant="h5">Favorites</Typography>
            </Grid>
            {user?.favorites?.map((product, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${product?._id}`}
                >
                  <Card sx={{ boxShadow: "none" }} component={Paper}>
                    <CardActionArea>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/product/${product?._id}`}
                      >
                        <CardMedia
                          component="img"
                          height="200px"
                          image={product?.variants[0]?.images[0]?.url}
                          alt={product?.variants[0]?.size}
                          sx={{ objectFit: "contain" }}
                        />
                        <CardContent sx={{ paddingX: "8px" }}>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {product?.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              Rs.{product?.variants[0]?.price}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ textTransform: "capitalize" }}
                            >
                              {product?.category}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Link>
                      {/* <CardActions sx={{ gap: "0 6px" }}>
                        <StyledButton
                          title="Remove"
                          onClick={() => {
                            navigator.clipboard.writeText(product?._id);
                          }}
                        />
                      </CardActions> */}
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Favorites;
