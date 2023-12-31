import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import StyledButton from "./styledButton";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const ProductCard = ({ product, favorite, addToCart }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
        width: "100%",
      }}
      to={`/product/${product?._id}`}
    >
      <Card
        sx={{
          width: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          marginY: "10px",
        }}
      >
        <CardActionArea>
          {product?.quantity < 0 && (
            <Box
              sx={{
                width: "80px",
                height: "30px",
                position: "absolute",
                top: "10px",
                left: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#e63146",
                color: "white",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Sold Out
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              right: "5px",
              display: "flex",
              flexDirection: "column",
              top: "10px",
            }}
          >
            <Tooltip title="Add to Favorites" placement="left-end">
              <IconButton
                aria-label="favorite"
                size="medium"
                sx={{ color: "black" }}
                onClick={() => {
                  favorite(product._id);
                }}
              >
                <FavoriteBorderOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to Cart" placement="left-end">
              <IconButton
                aria-label="cart"
                size="medium"
                sx={{ color: "black" }}
              >
                <ShoppingCartOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
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
            <CardContent
              sx={{ paddingBottom: "5px !important", padding: { xs: "4px" } }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  height: { sm: "8vh", xs: "13vh" },
                  textTransform: "capitalize",
                  fontSize: { xs: "14px" },
                }}
              >
                {product?.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  paddingRight: "5px",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0",
                  justifyContent: "center",
                  fontSize: { xs: "12px" },
                }}
              >
                {product?.ratings}
                <StarIcon sx={{ color: "#e63146" }} /> (
                {product?.reviews?.length} Reviews)
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
          {addToCart === false ? null : (
            <CardActions>
              <StyledButton title="Add to Cart" mode="light" />
            </CardActions>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
