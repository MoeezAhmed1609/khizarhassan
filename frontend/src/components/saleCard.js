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
                variant="subtitle1"
                component="div"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  height: "8vh",
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
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    paddingRight: "5px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Rs.{product?.variants[0]?.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    color: "black",
                    textDecoration: "line-through",

                    textAlign: "center",
                  }}
                >
                  Rs.{product?.variants[0]?.discount}
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
