import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Grid, Badge, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./styledButton";
import { changeBanner, deleteBanner } from "../redux/actions/contentActions";
import CloseIcon from "@mui/icons-material/Close";

const Content = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.banners);
  // Banner
  const [banner, setBanner] = useState("");
  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBanner(reader.result);
      }
    };
    reader?.readAsDataURL(e.target.files[0]);
  };

  const handleImageRemove = () => {
    setBanner("");
  };
  const handleBannerUpdate = () => {
    dispatch(changeBanner(banner));
  };
  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}
        >
          Current Banners
        </Typography>
      </Grid>
      {data?.length > 0 &&
        data?.map((ban, i) => (
          <Grid item key={i} md={4} sm={6} sx={{ padding: "15px 5px" }}>
            <Badge
              overlap="circular"
              badgeContent={
                <IconButton
                  sx={{ height: "35px", width: "35px", background: "#e63146" }}
                  onClick={() => handleDeleteBanner(ban?._id)}
                >
                  <CloseIcon sx={{ fontSize: "30px", color: "white" }} />
                </IconButton>
              }
            >
              <img
                src={ban?.banner?.url}
                alt={ban?.title}
                style={{
                  width: "100%",
                  objectFit: "contain",
                  marginBottom: "15px",
                }}
              />
            </Badge>
          </Grid>
        ))}
      <Grid item sm={12} sx={{ marginBottom: "30px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "40vw", height: "55vh" }}>
            {banner && (
              <Badge
                overlap="circular"
                badgeContent={
                  <IconButton
                    sx={{ height: "20px", width: "20px" }}
                    onClick={handleImageRemove}
                  >
                    <CloseIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                }
              >
                <img
                  src={banner}
                  alt="banner"
                  style={{
                    width: "35vw",
                    objectFit: "contain",
                    marginBottom: "15px",
                  }}
                />
              </Badge>
            )}
            <input
              type="file"
              ref={hiddenFileInput}
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {banner ? (
              <StyledButton
                title={"Save"}
                mode={"light"}
                onClick={handleBannerUpdate}
              />
            ) : (
              <StyledButton
                title={"Upload"}
                mode={"light"}
                onClick={handleImageClick}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Content;
