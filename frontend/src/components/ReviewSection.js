import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Rating,
  Typography,
  Modal,
  Badge,
  IconButton,
} from "@mui/material";
import StyledButton from "./styledButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StyledTextField from "./styledTextField";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch } from "react-redux";
import { createReview } from "../redux/actions/userActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: "35vw", xs: " 95vw" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const ReviewSection = ({ id }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   create review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [customer, setCustomer] = useState("");
  const [image, setImage] = useState("");
  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader?.readAsDataURL(e.target.files[0]);
  };

  const handleImageRemove = (image) => {
    setImage("");
  };
  const handleCreateReview = () => {
    const review = {
      rating,
      comment,
      customer,
      image,
      id,
    };
    dispatch(createReview(review));
  };
  const reviews = [
    {
      customer: "Moeez Ahmed",
      rating: 4.5,
      comment:
        "Jacked Nutrition presents to you the smooth and crunchiest Organic peanut butter in Pakistan. The company has been in the business of bringing delicious delights to health freaks. Now you can enjoy snacking without any guilt.",
      image:
        "https://res.cloudinary.com/dptwxpos1/image/upload/v1695812405/dzdgzhpij83t6fuzyidf.jpg",
    },
  ];
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Customer Reviews
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "35vh",
        }}
      >
        <Rating defaultValue={4.5} precision={0.5} readOnly />
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          4.5 out of 5 stars
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Based on 32 Reviews
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "35vh",
        }}
      >
        <StyledButton
          title={"Write a Review"}
          width={"50%"}
          onClick={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                textAlign: "center",
              }}
              gutterBottom
            >
              Write a Review
            </Typography>
            <Typography
              sx={{ fontFamily: "Poppins, sans-serif", textAlign: "center" }}
            >
              Rating
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <br />
            <Typography
              sx={{ fontFamily: "Poppins, sans-serif", textAlign: "center" }}
              gutterBottom
            >
              Customer Name
            </Typography>
            <StyledTextField
              title={"Your Name"}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <br />
            <Typography
              sx={{ fontFamily: "Poppins, sans-serif", textAlign: "center" }}
              gutterBottom
            >
              Review
            </Typography>
            <StyledTextField
              title={"Write a Comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Box
              sx={{
                height: "75px",
                display: "flex",
                alignItems: "center",
                border: "1.5px solid black",
                borderRadius: "4px",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <Box
                sx={{
                  height: "75px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {image && (
                  <Badge
                    overlap="circular"
                    badgeContent={
                      <IconButton
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => handleImageRemove()}
                      >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    }
                  >
                    <img
                      src={image}
                      alt="Product"
                      style={{ height: "68px", margin: "0 3px" }}
                    />
                  </Badge>
                )}
              </Box>
              {!image && (
                <>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <IconButton size={"large"} onClick={handleImageClick}>
                    <FileUploadIcon sx={{ fontSize: "10vh" }} />
                  </IconButton>
                </>
              )}
            </Box>
            <br />
            <StyledButton title={"Submit"} onClick={handleCreateReview} />
          </Box>
        </Modal>
      </Grid>

      {
        reviews?.length > 0 &&
          reviews?.map((review, index) => (
            <Grid
              item
              xs={12}
              key={index}
              component={Paper}
              sx={{ padding: "10px" }}
            >
              <Grid
                container
                sx={{ maxHeight: "50vh", overflowY: "auto", width: "100%" }}
              >
                <Grid item sm={7} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontFamily: "Poppins, san-serif",
                      }}
                    >
                      <AccountCircleOutlinedIcon sx={{ paddingRight: "5px" }} />
                      {review.customer}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                      sx={{ color: "golden" }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginTop: "8px",
                      marginLeft: "8px",
                      fontFamily: "Poppins, san-serif",
                    }}
                  >
                    {review.comment}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={5}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={review.image}
                    alt={`review ${index}`}
                    style={{ height: "35vh" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))
        //   : (
        //     <Box
        //       sx={{
        //         height: "37vh",
        //         width: "100%",
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <Typography variant="h6" sx={{ textAlign: "center" }}>
        //         No reviews for this product!
        //       </Typography>
        //     </Box>
        //   )
      }
    </Grid>
  );
};

export default ReviewSection;
