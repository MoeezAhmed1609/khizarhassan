import React, { useEffect } from "react";
// Material UI
import {
  Box,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Card,
  CardActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../redux/actions/userActions";
import StyledButton from "../components/styledButton";
import Metadata from "../components/metadata";

const Favorite = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // Remove from favorites
  const dispatch = useDispatch();
  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
  };

  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      navigate("/account", { replace: true });
    }
  }, []);
  return (
    <>
      <Metadata title={"Favorites - Xtrack.pk"} />
      <Box sx={{ height: "18vh", width: "100%" }}></Box>
      {user?.favorites?.length === 0 ? (
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
              sx={{ marginBottom: "26px", borderBottom: "1.5px solid black" }}
            >
              <Typography variant="h5">Favorites</Typography>
            </Grid>
            {user?.favorites?.map((product, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card sx={{ boxShadow: "none" }}>
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
                          sx={{ height: "9vh" }}
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
                    <CardActions sx={{ gap: "0 6px" }}>
                      <Link
                        to={`/product/${product?._id}`}
                        style={{ width: "50%", textDecoration: "none" }}
                      >
                        <StyledButton title="Add to Cart" mode="dark" />
                      </Link>
                      <StyledButton
                        title="Remove"
                        mode="light"
                        width={"50%"}
                        onClick={() => handleRemoveFromFavorites(product?._id)}
                      />
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Favorite;
