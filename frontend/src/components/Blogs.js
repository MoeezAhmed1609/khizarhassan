import React, { useState, useRef } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledButton from "./styledButton";
import StyledTextField from "./styledTextField";
import TextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { uploadBlog } from "../redux/actions/blogActions";

const Blogs = () => {
  const dispatch = useDispatch();
  // Accordion
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //   Create Blog
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [content, setContent] = useState();

  // Getting Blogs
  const { data } = useSelector((state) => state.blogs);

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

  // Uplaod blog
  const handleuploadBlog = () => {
    if (!title || !banner || !content) return;
    dispatch(uploadBlog(title, banner, content));
    setTitle("");
    setBanner("");
    setContent();
  };

  return (
    <Box>
      {/* Create blog */}
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
            Create Blog
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ paddingRight: "10px" }}>
              <StyledTextField
                title={"Title"}
                type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                border: "1.5px solid black",
                borderRadius: "4px",
                width: "70%",
                padding: "5px",
                justifyContent: "space-between",
                alignItems: "center",
                height: "56px",
              }}
            >
              <img src={banner} alt="Banner" style={{ height: "50px" }} loading="lazy" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "50%",
                  gap: "0 5px",
                }}
              >
                <StyledButton
                  title={"Remove"}
                  mode={"light"}
                  // width={"25%"}
                  onClick={handleImageRemove}
                />
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
                  // width={"25%"}
                  onClick={handleImageClick}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ height: "400px" }}>
              <TextEditor value={content} setValue={setContent} />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                title={"Upload"}
                onClick={handleuploadBlog}
                validation={!title || !banner || !content}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* Blog Details */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            Blog Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {data?.map((blog, i) => (
              <Grid item xs={12} sm={6} key={i} sx={{ padding: "16px 10px" }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`/blog/${blog?._id}`}
                >
                  <Card sx={{ boxShadow: "none" }}>
                    <CardActionArea sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: "200px" }}
                        image={blog?.banner?.url}
                        alt={blog?.title}
                      />
                      <CardContent sx={{ textAlign: "left" }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                        >
                          {blog?.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Blogs;
