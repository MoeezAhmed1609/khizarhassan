import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const SaleCard = ({ product }) => {
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
        sx={{ width: "100%", boxShadow: "none", background: "transparent" }}
      >
        <CardActionArea>
          {product?.quantity === 0 && (
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
                background: "white",
              }}
            >
              Sold Out
            </Box>
          )}
          <CardMedia
            component="img"
            image={product?.variants[0]?.images[0]?.url}
            alt={product?.name}
            sx={{ objectFit: "contain", height: "37vh" }}
          />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/product/${product?._id}`}
          >
            <CardContent sx={{ paddingBottom: "5px !important" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "capitalize",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {product?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  gap: "0 8px",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Rs.{product?.variants[0]?.price}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    color: "black",
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rs.{product?.variants[0]?.discount}
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    background: "white",
                    color: "#e63146",
                    borderRadius: "5px",
                    padding: "0 8px",
                  }}
                >
                  Save Rs.
                  {product?.variants[0]?.discount - product?.variants[0]?.price}
                </Typography>
              </Box>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default SaleCard;
