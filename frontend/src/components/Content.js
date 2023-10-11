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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./styledButton";
import {
  changeBanner,
  deleteBanner,
  updateContent,
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
              {/* {data?.length > 0 &&
                data?.map((ban, i) => (
                  <Grid item key={i} md={4} sm={6} sx={{ padding: "15px 5px" }}>
                    <Badge
                      overlap="circular"
                      badgeContent={
                        <IconButton
                          sx={{
                            height: "35px",
                            width: "35px",
                            background: "#e63146",
                          }}
                          onClick={() => handleDeleteBanner(ban?._id)}
                        >
                          <CloseIcon
                            sx={{ fontSize: "30px", color: "white" }}
                          />
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
                ))} */}
              <Grid item sm={6} sx={{ marginBottom: "30px", paddingX: "8px" }}>
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
                      title={"Save LG"}
                      mode={"light"}
                      onClick={handleBannerUpdate}
                    />
                  ) : (
                    <StyledButton
                      title={"Upload LG"}
                      mode={"light"}
                      onClick={handleImageClick}
                    />
                  )}
                  {/* </Box> */}
                </Box>
              </Grid>
              <Grid item sm={6} sx={{ marginBottom: "30px", paddingX: "8px" }}>
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
                      title={"Save LG"}
                      mode={"light"}
                      onClick={handleBannerUpdate}
                    />
                  ) : (
                    <StyledButton
                      title={"Upload SM"}
                      mode={"light"}
                      onClick={handleImageClick}
                    />
                  )}
                  {/* </Box> */}
                </Box>
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
