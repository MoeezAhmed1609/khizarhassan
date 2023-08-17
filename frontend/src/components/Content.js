import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./styledButton";
import StyledTextfeild from "./styledTextField";
import { changeBanner, getAllBanners } from "../redux/actions/contentActions";

const Content = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.banners);
  // Accordion
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Banner
  const [banner, setBanner] = useState(data[0]?.banner);
  const [caption, setCaption] = useState(data[0]?.caption);
  const handleBannerUpdate = () => {
    dispatch(changeBanner(data[0]?._id, banner, caption));
  };

  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);
  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            Banner Slider
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                padding: "0 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Banner</Typography>
              <StyledTextfeild
                title={"Banner URL"}
                type={"text"}
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
              />
              {/* <video width="100%" controls style={{ marginBottom: "10px" }}>
                <source src={banner} type="video/mp4" />
              </video>
              <input
                type="file"
                ref={hiddenBannerInput}
                accept=" video/*"
                onChange={handleBannerChange}
                style={{ display: "none" }}
              /> */}
              {/* <StyledButton
                title={"Change"}
                width={"50%"}
                mode={"dark"}
                onClick={handleBannerClick}
              /> */}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                padding: "0 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Caption</Typography>
              <StyledTextfeild
                title={"Caption URL"}
                type={"text"}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              {/* <img
                src={caption}
                width={"100%"}
                style={{ marginBottom: "10px" }}
                alt={data && data[0]?.title}
              />
              <input
                type="file"
                ref={hiddenCaptionInput}
                accept="image/*"
                onChange={handleCaptionChange}
                style={{ display: "none" }}
              />
              <StyledButton
                title={"Change"}
                width={"50%"}
                mode={"dark"}
                onClick={handleCaptionClick}
              /> */}
            </Grid>
            {banner && caption && (
              <Grid item xs={12} sx={{ marginTop: "15px" }}>
                <StyledButton
                  title={"Update"}
                  onClick={handleBannerUpdate}
                  mode={"dark"}
                  validation={
                    banner === data[0]?.banner && caption === data[0]?.caption
                  }
                />
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Content;
