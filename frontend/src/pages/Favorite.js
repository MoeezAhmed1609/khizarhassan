import React, { useEffect } from "react";
// Material UI
import {
  Box,
  CircularProgress,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../redux/actions/userActions";
import StyledButton from "../components/styledButton";

const Favorite = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // Remove from favorites
  const dispatch = useDispatch();
  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
    window.location.reload();
  };

  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      window.location.replace("/account");
    }
  }, []);
  return (
    <>
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
            {user?.favorites?.map((favorite, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300px"
                      image={favorite?.images[0]?.url}
                      alt={favorite?.name}
                    />
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${favorite?._id}`}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {favorite?.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            ${favorite?.price}.00
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                          {favorite?.category}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions sx={{ gap: "0 10px" }}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "50%",
                        }}
                        to={`/product/${favorite?._id}`}
                      >
                        <StyledButton title="Get Your Size" mode="dark" />
                      </Link>
                      <StyledButton
                        title="Remove Favorite"
                        mode="light"
                        width={"50%"}
                        onClick={() => handleRemoveFromFavorites(favorite?._id)}
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
