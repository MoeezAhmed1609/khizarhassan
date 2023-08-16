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
            <CardContent
              sx={{
                textAlign: "center",
                height: "24vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#ededed",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {product?.category}
              </Typography>
              <Typography
                // gutterBottom
                variant="subtitle1"
                sx={{ fontWeight: "600", maxWidth: "75%" }}
              >
                {product.name}
              </Typography>
              <Rating
                name="read-only"
                value={product.ratings}
                readOnly
                size="small"
                sx={{ color: "black" }}
              />
              <Typography sx={{ fontSize: "12px" }} color="text.secondary">
                {product.totalReviews} Reviews
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: 800 }}
                >
                  ${product.price}.00
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", marginLeft: "8px" }}
                  color="text.secondary"
                >
                  ${product.discount}.00
                </Typography>
              </Box>
            </CardContent>
            <CardMedia
              sx={{ height: "35vh" }}
              image={product.images[0].url}
              title="nike"
            />
          </>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
