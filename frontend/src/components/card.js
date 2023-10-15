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
  Paper,
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
          minHeight: "70vh",
          width: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
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
                height: "40vh",
                backgroundSize: "contain",
                marginBottom: "6px",
              }}
              image={product?.variants[0]?.images[0]?.url}
              title={product?.variants[0]?.size}
            />
            <CardContent
              sx={{
                textAlign: "center",
                minHeight: "24vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // backgroundColor: "#e63146",
                padding: { xs: "0px" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {product?.category}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  maxWidth: { sm: "75%" },
                  fontSize: { xs: "13px" },
                  minHeight: { xs: "75px" },
                }}
              >
                {product?.name}
              </Typography>
              <Rating
                name="read-only"
                value={product?.ratings}
                readOnly
                size="small"
                sx={{ color: "#e63146" }}
                emptyIcon={<StarBorderIcon sx={{ fontSize: "inherit" }} />}
              />
              <Typography sx={{ fontSize: "12px" }}>
                {product?.reviews?.length} Reviews
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: 800, color: "#e63146" }}
                >
                  Rs.{product?.variants[0]?.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
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
