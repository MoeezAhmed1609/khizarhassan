import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createReview } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
const Reviews = () => {
  const dispatch = useDispatch();
  // Mode
  const [mode, setMode] = useState("pending");
  // Getting user orders
  const { user, loading } = useSelector((state) => state.user);
  const pendingItems = [];
  const postedItems = [];
  user?.orders?.filter((order) => {
    if (order.orderStatus === "Completed") {
      order?.items?.filter((item) => {
        if (item?.isReviewed === false) {
          let indexed = item?.product?.variants.findIndex((object) => {
            return object?.size === item?.size;
          });
          pendingItems.push({
            item,
            orderId: order?._id,
            index: indexed === -1 ? 0 : indexed,
          });
        }
        if (item?.isReviewed === true) {
          let indexed = item?.product?.variants.findIndex((object) => {
            return object?.size === item?.size;
          });
          postedItems.push({
            item,
            orderId: order?._id,
            index: indexed === -1 ? 0 : indexed,
          });
        }
      });
    }
  });
  // Create Review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleCreateReview = (orderId, productId, itemId) => {
    dispatch(createReview(orderId, productId, itemId, rating, comment));
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Pending & Posted Reviews
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Stack direction={"row"} gap={2}>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                letterSpacing: "1.5px",
                fontWeight: "100",
                margin: "0 15px",
                border: mode === "pending" ? "1.5px solid black" : "none",
              }}
              onClick={() => setMode("pending")}
            >
              Pending
            </Button>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                letterSpacing: "1.5px",
                fontWeight: "100",
                margin: "0 15px",
                border: mode === "posted" ? "1.5px solid black" : "none",
              }}
              onClick={() => setMode("posted")}
            >
              Posted
            </Button>
          </Stack>
        </Grid>
        {mode === "pending" ? (
          <Grid item xs={12}>
            <Grid container>
              {pendingItems?.length > 0 ? (
                pendingItems?.map((item, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={i}
                    sx={{ padding: "16px 10px" }}
                  >
                    <Card sx={{ boxShadow: "none" }}>
                      <CardActionArea
                        sx={{ display: { xs: "block", sm: "flex" } }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                          to={`/product/${item?.item?.product?._id}`}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              maxHeight: "240px",
                              objectFit: "contain",
                            }}
                            image={
                              item?.item?.product?.variants[item?.index]
                                ?.images[0]?.url
                            }
                            alt={item?.item?.product?.name}
                          />
                        </Link>
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "95%",
                          }}
                        >
                          <Typography
                            gutterBottom
                            sx={{
                              height: "9vh",
                              fontFamily: "Poppins , san-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.item?.product?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginTop: "-10px" }}
                          >
                            Rs.
                            {item?.item?.product?.variants[item?.index]?.price}
                          </Typography>
                          <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue);
                            }}
                          />
                          <StyledTextField
                            title={"Comment"}
                            type={"text"}
                            variant={"standard"}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <StyledButton
                            title={"Post Review"}
                            mode={"dark"}
                            validation={!rating || !comment}
                            onClick={() =>
                              handleCreateReview(
                                item?.orderId,
                                item?.item?.product?._id,
                                item?.item?._id
                              )
                            }
                          />
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    height: "25vh",
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
                    No pending reviews!
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        ) : mode === "posted" ? (
          <Grid item xs={12}>
            <Grid container>
              {postedItems?.length > 0 ? (
                postedItems?.map((item, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={i}
                    sx={{ padding: "16px 10px" }}
                  >
                    <Card sx={{ boxShadow: "none" }}>
                      <CardActionArea
                        sx={{ display: { xs: "block", md: "flex" } }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                          to={`/product/${item?.item?.product?._id}`}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              maxHeight: "240px",
                              objectFit: "contain",
                            }}
                            image={
                              item?.item?.product?.variants[item?.index]
                                ?.images[0]?.url
                            }
                            alt={item?.item?.product?.name}
                          />
                        </Link>
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "95%",
                          }}
                        >
                          <Typography
                            gutterBottom
                            sx={{
                              fontFamily: "poppins, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.item?.product?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginTop: "-10px" }}
                          >
                            Rs.
                            {item?.item?.product?.variants[item?.index]?.price}
                          </Typography>
                          <Rating
                            name="simple-controlled"
                            value={item?.item?.rating}
                            readOnly
                          />
                          <Box sx={{ width: "100%", textAlign: "center" }}>
                            <Typography variant="body1">
                              {item?.item?.comment}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    height: "25vh",
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
                    No posted reviews!
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Reviews;
