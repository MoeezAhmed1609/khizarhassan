import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Badge,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";
import CloseIcon from "@mui/icons-material/Close";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
} from "../redux/actions/categoryActions";
import { createBrands, deleteBrands } from "../redux/actions/brandsActions";
import toast from "react-hot-toast";
import CategoryCard from "./CategoryCard";
const Category = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //   Create category
  const [title, setTitle] = useState("");
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
  const handleCreateCategory = () => {
    if (!title) {
      toast.error("Category title is required!");
      return;
    }
    if (!image) {
      toast.error("Category image is required!");
      return;
    }
    dispatch(createCategory(title, image));
  };
  const fields = [
    {
      code: (
        <StyledTextField
          title={"Category Title"}
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ),
      xs: 6,
    },
    {
      code: (
        <>
          <Box
            sx={{
              height: "75px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              border: "1.5px solid black",
              borderRadius: "4px",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Box sx={{ height: "75px", display: "flex", alignItems: "center" }}>
              {image ? (
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
                    loading="lazy"
                  />
                </Badge>
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No image
                </Typography>
              )}
            </Box>
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
              width={"25%"}
              onClick={handleImageClick}
            />
          </Box>
        </>
      ),
      xs: 5,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledButton
          title="Create Category"
          mode={"dark"}
          validation={!title || !image}
          onClick={handleCreateCategory}
        />
      ),
      xs: 12,
    },
  ];
  const handleCreateBrand = () => {
    if (!title) {
      toast.error("Brand title is required!");
      return;
    }
    if (!image) {
      toast.error("Brand image is required!");
      return;
    }
    dispatch(createBrands(title, image));
  };
  const brandsFields = [
    {
      code: (
        <StyledTextField
          title={"Brand Title"}
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ),
      xs: 6,
    },
    {
      code: (
        <>
          <Box
            sx={{
              height: "75px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              border: "1.5px solid black",
              borderRadius: "4px",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Box sx={{ height: "75px", display: "flex", alignItems: "center" }}>
              {image ? (
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
                    loading="lazy"
                  />
                </Badge>
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No image
                </Typography>
              )}
            </Box>
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
              width={"25%"}
              onClick={handleImageClick}
            />
          </Box>
        </>
      ),
      xs: 5,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledButton
          title="Create Brand"
          mode={"dark"}
          validation={!title || !image}
          onClick={handleCreateBrand}
        />
      ),
      xs: 12,
    },
  ];
  // data's
  const categories = useSelector((state) => state.category);
  const brands = useSelector((state) => state.brands);
  const handleDeleteBrand = (id) => {
    dispatch(deleteBrands(id));
  };
  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
              Read + Delete Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              sx={{
                width: "100%",
                margin: "20px 0",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              {categories &&
                categories?.data?.map((product, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ padding: "16px 10px" }}
                  >
                    <CategoryCard
                      product={product}
                      handleDelete={handleDeleteCategory}
                    />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
              Create Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              sx={{
                width: "100%",
                margin: "20px 0",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {fields?.map((field, i) => (
                <Grid item sm={field.xs} key={i} sx={{ padding: "10px" }}>
                  {field.code}
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
              Read + Delete Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              sx={{
                width: "100%",
                margin: "20px 0",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              {brands &&
                brands?.data?.map((product, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ padding: "16px 10px" }}
                  >
                    <CategoryCard
                      product={product}
                      handleDelete={handleDeleteBrand}
                    />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              Create Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              sx={{
                width: "100%",
                margin: "20px 0",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {brandsFields?.map((field, i) => (
                <Grid item sm={field.xs} key={i} sx={{ padding: "10px" }}>
                  {field.code}
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Category;
