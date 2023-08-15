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
          pendingItems.push({ item, orderId: order?._id });
        }
        if (item?.isReviewed === true) {
          postedItems.push({ item, orderId: order?._id });
        }
      });
    }
  });
  console.log(postedItems);
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
              {pendingItems?.map((item, i) => (
                <Grid item xs={12} sm={6} key={i} sx={{ padding: "16px 10px" }}>
                  <Card sx={{ boxShadow: "none" }}>
                    <CardActionArea sx={{ display: "flex" }}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/product/${item?.item?.product?._id}`}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: "200px" }}
                          image={item?.item?.product?.images[0]?.url}
                          alt={item?.item?.product?.name}
                        />
                      </Link>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography gutterBottom variant="h5">
                          {item?.item?.product?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ marginTop: "-10px" }}
                        >
                          ${item?.item?.product?.price}.00
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
              ))}
            </Grid>
          </Grid>
        ) : mode === "posted" ? (
          <Grid item xs={12}>
            <Grid container>
              {postedItems?.map((item, i) => (
                <Grid item xs={12} sm={6} key={i} sx={{ padding: "16px 10px" }}>
                  <Card sx={{ boxShadow: "none" }}>
                    <CardActionArea sx={{ display: "flex" }}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/product/${item?.item?.product?._id}`}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: "200px" }}
                          image={item?.item?.product?.images[0]?.url}
                          alt={item?.item?.product?.name}
                        />
                      </Link>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography gutterBottom variant="h5">
                          {item?.item?.product?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ marginTop: "-10px" }}
                        >
                          ${item?.item?.product?.price}.00
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
              ))}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Reviews;
