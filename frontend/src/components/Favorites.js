import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

import { Link } from "react-router-dom";
const Favorites = ({ user }) => {
  return (
    <>
      {user?.favorites?.length === 0 ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        </>
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
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${favorite?._id}`}
                >
                  <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="300px"
                        image={favorite?.images[0]?.url}
                        alt={favorite?.name}
                      />
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
                            {favorite?.price}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                          {favorite?.category}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          sx={{
                            width: "100%",
                            borderRadius: "22px",
                            height: "45px",
                            backgroundColor: "black",
                            boxShadow: "none",
                            color: "#fff",
                            border: "1.5px solid black",
                            "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root":
                              {
                                backgroundColor: "black",
                                color: "#fff",
                              },
                          }}
                        >
                          Get Your Size
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Favorites;
