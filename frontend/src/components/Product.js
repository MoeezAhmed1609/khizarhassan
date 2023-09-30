import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Pagination,
  Rating,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAllProductReviews,
} from "../redux/actions/productsActions";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Get all products
  const { data } = useSelector((state) => state?.products);
  const products = data?.products;
  const productsCount = data?.productsCount;
  // Search
  const [search, setSearch] = useState("");
  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 6;
  const dispatch = useDispatch();

  // Getting product reviews
  const reviewsData = useSelector((state) => state?.product);
  const reviews = reviewsData?.data?.reviews;

  // Delete product
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  // Search product reviews
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchProductReviews = () => {
    dispatch(getAllProductReviews(searchQuery));
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* All Product */}
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
              All Products ({productsCount} items)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              sx={{
                width: "100%",
                minHeight: "80vh",
                // padding: "0 5%",
                margin: "20px 0",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <StyledTextField
                  title={"Search here"}
                  type={"text"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  width="75%"
                />
              </Grid>
              {products
                ?.filter((product) =>
                  product?.name?.toLowerCase()?.includes(search?.toLowerCase())
                )
                .slice((page - 1) * perPage, page * perPage)
                ?.map((product, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ padding: "16px 10px" }}
                  >
                    <Card sx={{ boxShadow: "none" }}>
                      <CardActionArea>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/product/${product?._id}`}
                        >
                          <CardMedia
                            component="img"
                            height="200px"
                            image={product?.variants[0]?.images[0]?.url}
                            alt={product?.variants[0]?.size}
                            sx={{ objectFit: "contain" }}
                          />
                          <CardContent sx={{ paddingX: "8px" }}>
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              {product?.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="subtitle1">
                                Rs.{product?.variants[0]?.price}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {product?.category}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Link>
                        <CardActions sx={{ gap: "0 6px" }}>
                          <StyledButton
                            title="Copy ID"
                            mode="dark"
                            width={"50%"}
                            onClick={() => {
                              navigator.clipboard.writeText(product?._id);
                            }}
                          />
                          <StyledButton
                            title="Remove"
                            mode="light"
                            width={"50%"}
                            onClick={() => handleDeleteProduct(product?._id)}
                          />
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              {products?.length > 6 && (
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Pagination
                    count={Math.ceil(products?.length / perPage)}
                    defaultPage={page}
                    onChange={(event, value) => setPage(value)}
                  />
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* Create Product */}
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
              Create Product
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "10px 30px" }}>
            <CreateProduct />
          </AccordionDetails>
        </Accordion>
        {/* Update Product */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              Update Product
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UpdateProduct />
            {/* <Grid container>
              {isError && (
                <Grid item sx={{ height: "50px" }} xs={12}>
                  <Typography variant="subtitle2" sx={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              {updateFields?.map((field, i) => (
                <Grid item sm={field.xs} key={i} sx={{ padding: "10px" }}>
                  {field.code}
                </Grid>
              ))}
            </Grid> */}
          </AccordionDetails>
        </Accordion>
        {/* Product Reviews */}
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              Product Reviews
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: "80vh", overflowY: "auto" }}>
            <Grid
              container
              sx={{
                width: "100%",
                margin: "20px 0",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0 10px",
                }}
              >
                <StyledTextField
                  title={"Search by Product ID"}
                  type={"text"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  width="75%"
                  bottom={"0"}
                />
                <StyledButton
                  title={"Get"}
                  width={"24%"}
                  onClick={handleSearchProductReviews}
                />
              </Grid>
              {reviewsData?.error ||
                (reviews?.length === 0 ? (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0 10px",
                    }}
                  >
                    <Typography sx={{ color: "red" }}>
                      No reviews found with this product ID!
                    </Typography>
                  </Grid>
                ) : (
                  reviews?.map((rev, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={i}
                      sx={{ padding: "16px 10px" }}
                    >
                      <Card sx={{ boxShadow: "none" }}>
                        <CardActionArea sx={{ display: "flex" }}>
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                              position: "relative",
                            }}
                          >
                            <Tooltip
                              title="Delete"
                              sx={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                              }}
                            >
                              <IconButton size="small">
                                <DeleteIcon sx={{ fontSize: "20px" }} />
                              </IconButton>
                            </Tooltip>
                            <Typography gutterBottom variant="h5">
                              {rev?.customer}
                            </Typography>
                            <Rating
                              name="simple-controlled"
                              value={rev.rating}
                              readOnly
                            />
                            <Box sx={{ width: "100%", textAlign: "center" }}>
                              <Typography variant="body1">
                                {rev.comment}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Product;
