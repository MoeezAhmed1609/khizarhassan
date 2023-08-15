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
import { getAllBanners, uploadBanner } from "../redux/actions/contentActions";

const Content = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.banners);
  // Accordion
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
  const handleUploadImage = () => {
    dispatch(uploadBanner(banner));
    setBanner("");
  };
  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch, banner]);
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
            <Grid item xs={12}>
              <Grid container>
                {data?.map((ban, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={i}
                    sx={{ padding: "0 10px" }}
                  >
                    <img
                      src={ban.banner.url}
                      alt={ban.title}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: banner ? "space-around" : "center",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              {banner && (
                <img src={banner} alt="Banner" style={{ height: "140px" }} />
              )}
              {banner ? (
                <StyledButton
                  title={"Save"}
                  mode={"light"}
                  width={{ xs: "94%", sm: "65%", md: "45%" }}
                  onClick={() => {
                    handleUploadImage();
                  }}
                />
              ) : (
                <>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <StyledButton
                    title={"Upload"}
                    mode={"dark"}
                    width={{ xs: "94%", sm: "65%", md: "45%" }}
                    onClick={() => {
                      handleImageClick();
                    }}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Content;
