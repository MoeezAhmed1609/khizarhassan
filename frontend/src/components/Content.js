import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Badge,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./styledButton";
import {
  changeBanner,
  deleteBanner,
  updateContent,
  uploadBanner,
} from "../redux/actions/contentActions";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextEditor from "./TextEditor";
import toast from "react-hot-toast";

const Content = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data } = useSelector((state) => state.banners);
  const contents = useSelector((state) => state.content?.data);
  // Banner
  const [bannerSm, setBannerSm] = useState("");
  const [bannerXs, setBannerXs] = useState("");
  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        bannerSm === ""
          ? setBannerSm(reader.result)
          : setBannerXs(reader.result);
      }
    };
    reader?.readAsDataURL(e.target.files[0]);
  };

  const handleImageRemove = (index) => {
    index === 0 ? setBannerSm("") : setBannerXs("");
  };
  const handleBannerUpdate = () => {
    // dispatch(changeBanner(banner));
  };
  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };
  // Contents
  // about page
  const [contentAbout, setContentAbout] = useState("");
  const [contentTerms, setContentTerms] = useState("");
  const handleUpdateContent = (title) => {
    if (title === "about") {
      if (!contentAbout) {
        toast.error("Content required!");
        return;
      }
      const contents = {
        title: "about",
        content: contentAbout,
      };
      dispatch(updateContent(contents));
    } else {
      if (!contentTerms) {
        toast.error("Content required!");
        return;
      }
      const contents = {
        title: "terms & conditions",
        content: contentTerms,
      };
      dispatch(updateContent(contents));
    }
  };
  // Banners
  const handleUploadBanners = () => {
    if (!bannerSm || !bannerXs) {
      toast.error("Upload both banners!");
      return;
    }
    const banner = {
      xs: bannerXs,
      sm: bannerSm,
    };
    dispatch(uploadBanner(banner));
  };
  useEffect(() => {
    if (contents) {
      contents?.map((c) => {
        if (c?.title === "about") {
          setContentAbout(c?.content);
        } else {
          setContentTerms(c?.content);
        }
      });
    }
  }, []);
  console.log({ bannerSm, bannerXs });
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* Banners */}
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
              Banners
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                  <Grid
                    item
                    key={i}
                    sm={12}
                    sx={{ padding: "15px 5px", display: "flex" }}
                    component={Paper}
                  >
                    <Grid container>
                      <Grid
                        sm={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            height: "40px",
                            width: "40px",
                            background: "#e63146",
                          }}
                          onClick={() => handleDeleteBanner(ban?._id)}
                        >
                          <CloseIcon
                            sx={{ fontSize: "35px", color: "white" }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid sm={6}>
                        <img
                          src={ban?.sm}
                          alt={`bannerLg${i}`}
                          style={{
                            width: "90%",
                            objectFit: "contain",
                            marginBottom: "15px",
                          }}
                        />
                      </Grid>
                      <Grid sm={5}>
                        <img
                          src={ban?.xs}
                          alt={`bannerSm${i}`}
                          style={{
                            width: "90%",
                            objectFit: "contain",
                            marginBottom: "15px",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  Add new Banner
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{ marginY: "20px", paddingX: "8px" }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <Box sx={{ maxHeight: "55vh" }}> */}
                  {bannerSm && (
                    <Badge
                      overlap="circular"
                      badgeContent={
                        <IconButton
                          sx={{
                            height: "25px",
                            width: "25px",
                            background: "red",
                          }}
                          onClick={() => {
                            handleImageRemove(0);
                          }}
                        >
                          <CloseIcon
                            sx={{ fontSize: "23px", color: "white" }}
                          />
                        </IconButton>
                      }
                    >
                      <img
                        src={bannerSm}
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
                  {!bannerSm && (
                    <StyledButton
                      title={"Upload LG"}
                      mode={"light"}
                      onClick={handleImageClick}
                    />
                  )}
                  {/* </Box> */}
                </Box>
              </Grid>
              <Grid item sm={6} sx={{ marginY: "20px", paddingX: "8px" }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <Box sx={{ maxHeight: "55vh" }}> */}
                  {bannerXs && (
                    <Badge
                      overlap="circular"
                      badgeContent={
                        <IconButton
                          sx={{
                            height: "25px",
                            width: "25px",
                            background: "red",
                          }}
                          onClick={() => {
                            handleImageRemove(1);
                          }}
                        >
                          <CloseIcon
                            sx={{ fontSize: "23px", color: "white" }}
                          />
                        </IconButton>
                      }
                    >
                      <img
                        src={bannerXs}
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
                  {!bannerXs && (
                    <StyledButton
                      title={"Upload SM"}
                      mode={"light"}
                      onClick={handleImageClick}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item sm={12} sx={{ marginBottom: "10px", paddingX: "8px" }}>
                {bannerSm && bannerXs ? (
                  <StyledButton
                    title={"Save Banners"}
                    mode={"light"}
                    onClick={handleUploadBanners}
                  />
                ) : null}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* About Us */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              About Us
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item sm={12} sx={{ marginBottom: "55px" }}>
                <TextEditor
                  value={contentAbout}
                  setValue={setContentAbout}
                  height={"45vh"}
                />
              </Grid>
              <Grid item sm={12}>
                <StyledButton
                  title={"Update"}
                  onClick={() => handleUpdateContent("about")}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* Terms & Conditions */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              Terms & Conditions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item sm={12} sx={{ marginBottom: "55px" }}>
                <TextEditor
                  value={contentTerms}
                  setValue={setContentTerms}
                  height={"45vh"}
                />
              </Grid>
              <Grid item sm={12}>
                <StyledButton
                  title={"Update"}
                  onClick={() => handleUpdateContent("terms & conditions")}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Content;
