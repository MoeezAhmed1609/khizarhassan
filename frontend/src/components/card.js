import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// Link import
import { Link } from "react-router-dom";

const ProductCard = ({ product, loading, handleAddToFavorites }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "70vh",
          width: "100%",
          boxShadow: "none",
          position: "relative",
        }}
      >
        {loading ? (
          <CardContent
            sx={{
              textAlign: "center",
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#ededed",
            }}
          >
            <CircularProgress />
          </CardContent>
        ) : (
          <>
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
                    handleAddToFavorites(product._id);
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
              sx={{
                height: "38vh",
                backgroundSize: "contain",
                marginBottom: "6px",
              }}
              image={product?.variants[0]?.images[0]?.url}
              title={product?.variants[0]?.size}
            />
            <CardContent
              sx={{
                textAlign: "center",
                height: "24vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#e63146",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "white", textTransform: "capitalize" }}
              >
                {product?.category}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "white", fontWeight: "600", maxWidth: "75%" }}
              >
                {product?.name}
              </Typography>
              <Rating
                name="read-only"
                value={product?.ratings}
                readOnly
                size="small"
                sx={{ color: "white" }}
                emptyIcon={
                  <StarBorderIcon
                    sx={{ color: "white", fontSize: "inherit" }}
                  />
                }
              />
              <Typography sx={{ fontSize: "12px", color: "white" }}>
                {product?.totalReviews} Reviews
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: 800, color: "white" }}
                >
                  Rs.{product?.variants[0]?.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                    color: "white",
                  }}
                >
                  Rs.{product?.variants[0]?.discount}
                </Typography>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
