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
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  deleteProductReview,
} from "../redux/actions/userActions";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

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

const ReviewSection = ({ reviews, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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

  const handleImageRemove = () => {
    setImage("");
  };
  const handleCreateReview = () => {
    if (rating === 0) {
      toast.error("Please rate the product!");
      return;
    }
    if (!comment || !customer) {
      toast.error("Please write name & comment!");
      return;
    }
    const review = {
      rating,
      comment,
      customer,
      image,
      id,
    };
    dispatch(createReview(review));
  };
  const handleReviewDelete = (revId) => {
    dispatch(deleteProductReview(revId, id));
  };
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
        <Rating defaultValue={reviews?.ratings} precision={0.5} readOnly />
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {reviews?.ratings} out of 5 stars
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Based on {reviews?.reviews?.length} Reviews
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

      {reviews?.reviews?.length > 0 &&
        reviews?.reviews?.map((review, index) => (
          <Grid
            item
            xs={12}
            key={index}
            component={Paper}
            sx={{ padding: "10px", marginBottom: "15px" }}
          >
            <Grid
              container
              sx={{
                minHeight: "16vh",
                maxHeight: "50vh",
                overflowY: "auto",
                width: "100%",
              }}
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
                  <Box sx={{ display: "flex", alignItems: " center" }}>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                      sx={{ color: "golden" }}
                    />

                    {user?.role === "Admin" && (
                      <IconButton>
                        <DeleteIcon
                          sx={{ color: "red" }}
                          onClick={() => handleReviewDelete(review?._id)}
                        />
                      </IconButton>
                    )}
                  </Box>
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
              {review?.image?.url && (
                <Grid
                  item
                  sm={5}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={review?.image?.url}
                    alt={`review ${index}`}
                    style={{ height: "35vh" }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default ReviewSection;
