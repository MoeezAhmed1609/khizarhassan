import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import StyledButton from "./styledButton";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
  console.log({ product });
  return (
    <Card sx={{ width: "100%", boxShadow: "none" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220px"
          image={product?.variants[0]?.images[0]?.url}
          alt={product?.name}
          sx={{ objectFit: "contain" }}
        />
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/product/${product?._id}`}
        >
          <CardContent sx={{ paddingBottom: "5px !important" }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontFamily: "Poppins, sans-serif", height: "8vh" }}
            >
              {product?.name} {product?.variants[0]?.size}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                paddingRight: "5px",
                display: "flex",
                alignItems: "center",
                padding: "5px 0",
                justifyContent :'center'
              }}
            >
              {product?.ratings}
              <StarIcon sx={{ color: "#e63146" }} /> ({product?.reviews?.length}{" "}
              Reviews)
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  paddingRight: "5px",
                }}
              >
                Rs.{product?.variants[0]?.price}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#e63146",
                  textDecoration: "line-through",
                }}
              >
                Rs.{product?.variants[0]?.discount}
              </Typography>
            </Box>
          </CardContent>
        </Link>
        <CardActions>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
            }}
            to={`/product/${product?._id}`}
          >
            <StyledButton title="Add to Cart" mode="light" />
          </Link>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
