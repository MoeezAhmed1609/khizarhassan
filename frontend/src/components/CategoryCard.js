import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import StyledButton from "./styledButton";

const CategoryCard = ({ product, handleDelete }) => {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardActionArea>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          //   to={`/product/${product?._id}`}
        >
          <CardMedia
            component="img"
            height="200px"
            image={product?.image?.url}
            alt={product?.title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
            >
              {product?.title}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ gap: "0 6px" }}>
          <StyledButton
            title="Remove"
            mode="light"
            onClick={() => handleDelete(product?._id)}
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
