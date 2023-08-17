import React, { useEffect, useState, useRef } from "react";
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  InputAdornment,
  Input,
  Rating,
  Badge,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getAllProductReviews,
  getProductDetails,
  updateProduct,
} from "../redux/actions/productsActions";

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
  // Categories
  const categories = ["Mens", "Woman", "Kids"];
  // Getting product details for update
  const details = useSelector((state) => state.product);
  const product = details?.data?.product;
  // Getting product reviews
  const reviewsData = useSelector((state) => state?.product);
  const reviews = reviewsData?.data?.reviews;
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setDiscount(product?.discount);
      setOldImages(product?.images);
      setCategory(product?.category);
      setSizes(product?.sizes);
    }
  }, [product]);
  // Create Product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages((images) => [...images, reader.result]);
      }
    };
    reader?.readAsDataURL(e.target.files[0]);
  };

  const handleImageRemove = (image) => {
    const array = [...images];
    const index = array.indexOf(image);
    if (index !== -1) {
      array.splice(index, 1);
      setImages(array);
    }
  };

  const handleChipDelete = (chip) => {
    const array = [...sizes];
    const index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      setSizes(array);
    }
  };
  const fields = [
    {
      create: true,
      code: (
        <StyledTextField
          title={"Products Name"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      xs: 4,
      update: true,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledTextField
          title={"Product Price"}
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledTextField
          title={"Product Discount"}
          type={"number"}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                border: "1.5px solid black",
                backgroundColor: "white",
                "&:focus": {
                  border: "1.5px solid black",
                  boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                },
              },
            }}
          >
            {categories.map((category, i) => (
              <MenuItem value={category.toLowerCase()} key={i}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <textarea
          style={{
            height: "48px",
            width: "100%",
            border: "1.5px solid black",
            borderRadius: "4px",
            padding: "4px 6px",
            fontFamily: "sans-serif",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description here..."
        />
      ),
      xs: 8,
    },
    {
      create: true,
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
              {images.length > 0 ? (
                images?.map((image, i) => (
                  <Badge
                    key={i}
                    overlap="circular"
                    badgeContent={
                      <IconButton
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => handleImageRemove(image)}
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
                ))
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No images
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
      xs: 6,
      update: false,
    },
    {
      create: true,
      update: true,
      code: (
        <>
          <Box
            sx={{
              height: "75px",
              width: "100%",
              display: "flex",
              border: "1.5px solid black",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            <Box sx={{ width: "30%", height: "75px", marginRight: "8px" }}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Size
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setSizes((sizes) => [...sizes, size])}
                      >
                        <Typography
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "6px",
                            borderRadius: "5px",
                            marginTop: "-11px",
                          }}
                        >
                          Add
                        </Typography>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                height: "75px",
                width: "70%",
                display: "flex",
                alignItems: "center",
                gap: "0 4px",
                overflowX: "auto",
              }}
            >
              {sizes?.length > 0 ? (
                sizes?.map((size, i) => (
                  <>
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ fontSize: "11px" }}>
                            {size}
                          </Typography>
                          <IconButton
                            sx={{
                              height: "13px",
                              width: "13px",
                              marginLeft: "4px",
                            }}
                            onClick={() => handleChipDelete(size)}
                          >
                            <CloseIcon sx={{ fontSize: "11px" }} />
                          </IconButton>
                        </Box>
                      }
                      key={i}
                    />
                  </>
                ))
              ) : (
                <Chip label={"No described sizes!"} />
              )}
            </Box>
          </Box>
        </>
      ),
      xs: 6,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledButton
          title="Create Product"
          mode={"dark"}
          validation={!name || !price || !discount || !category || !description}
          onClick={() => handleCreateProduct()}
        />
      ),
      xs: 12,
    },
  ];
  const dispatch = useDispatch();
  const handleCreateProduct = () => {
    if (name.length === 0 || name.length < 6) {
      setIsError(true);
      setErrorMessage("Enter a proper product name!");
      return;
    }
    if (price === 0 || price > 99999) {
      setIsError(true);
      setErrorMessage("Enter a valid price! (1 - 99999)");
      return;
    }
    if (discount <= price) {
      setIsError(true);
      setErrorMessage(`Enter a valid discount price! (greater than ${price})`);
      return;
    }
    if (description.length === 0 || description.length < 20) {
      setIsError(true);
      setErrorMessage(
        "Enter a proper product description! (at least 20 letters required)"
      );
      return;
    }
    if (images.length === 0) {
      setIsError(true);
      setErrorMessage("Upload at least one product image!");
      return;
    }
    if (sizes.length === 0 || sizes.length < 3) {
      setIsError(true);
      setErrorMessage("Add at least 3 sizes!");
      return;
    }
    const product = {
      name,
      description,
      price,
      discount,
      category,
      sizes,
    };
    dispatch(createProduct(product, images));
  };

  // Update
  const [id, setId] = useState(product?._id || "");
  const handleGetProductDetails = () => {
    dispatch(getProductDetails(id));
    setName(product?.name);
  };
  const handleOldImageRemove = (image) => {
    const array = [...oldImages];
    const index = array.indexOf(image);
    if (index !== -1) {
      array.splice(index, 1);
      setOldImages(array);
    }
  };
  const handleUpdateProduct = () => {
    if (name.length === 0 && name.length < 6) {
      setIsError(true);
      setErrorMessage("Enter a proper product name!");
      return;
    }
    if (price === 0 && price > 99999) {
      setIsError(true);
      setErrorMessage("Enter a valid price! (1 - 99999)");
      return;
    }
    if (discount <= price) {
      setIsError(true);
      setErrorMessage(`Enter a valid discount price! (greater than ${price})`);
      return;
    }
    if (description.length === 0 && description.length < 20) {
      setIsError(true);
      setErrorMessage(
        "Enter a proper product description! (at least 20 letters required)"
      );
      return;
    }
    // if (images.length === 0 && oldImages.length === 0) {
    //   setIsError(true);
    //   setErrorMessage("Upload at least one product image!");
    //   return;
    // }
    if (sizes.length === 0 && sizes.length < 3) {
      setIsError(true);
      setErrorMessage("Add at least 3 sizes!");
      return;
    }
    const product = {
      name,
      description,
      price,
      discount,
      category,
      sizes,
      oldImages,
    };
    dispatch(updateProduct(id, product, images));
    setTimeout(window.location.reload(), 5000);
  };
  const updateFields = [
    {
      code: (
        <>
          <StyledTextField
            title={"Product ID"}
            type={"text"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </>
      ),
      xs: 8,
    },
    {
      code: (
        <>
          <StyledButton
            title={"Find"}
            validation={!id}
            mode={"dark"}
            onClick={() => handleGetProductDetails()}
          />
        </>
      ),
      xs: 4,
    },
    {
      create: true,
      code: (
        <StyledTextField
          title={"Products Name"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      xs: 4,
      update: true,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledTextField
          title={"Product Price"}
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledTextField
          title={"Product Discount"}
          type={"number"}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                border: "1.5px solid black",
                backgroundColor: "white",
                "&:focus": {
                  border: "1.5px solid black",
                  boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                },
              },
            }}
          >
            {categories.map((category, i) => (
              <MenuItem value={category.toLowerCase()} key={i}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      xs: 4,
    },
    {
      create: true,
      update: true,
      code: (
        <textarea
          style={{
            height: "48px",
            width: "100%",
            border: "1.5px solid black",
            borderRadius: "4px",
            padding: "4px 6px",
            fontFamily: "sans-serif",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description here..."
        />
      ),
      xs: 8,
    },
    {
      create: true,
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
              {oldImages?.length > 0 ? (
                oldImages?.map((image, i) => (
                  <Badge
                    key={i}
                    overlap="circular"
                    badgeContent={
                      <IconButton
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => handleOldImageRemove(image)}
                      >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    }
                  >
                    <img
                      src={image?.url}
                      alt="Product"
                      style={{ height: "68px", margin: "0 3px" }}
                    />
                  </Badge>
                ))
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No images
                </Typography>
              )}
            </Box>
          </Box>
        </>
      ),
      xs: 6,
      update: false,
    },
    {
      create: true,
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
              {images.length > 0 ? (
                images?.map((image, i) => (
                  <Badge
                    key={i}
                    overlap="circular"
                    badgeContent={
                      <IconButton
                        sx={{ height: "20px", width: "20px" }}
                        onClick={() => handleImageRemove(image)}
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
                ))
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No images
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
      xs: 6,
      update: false,
    },
    {
      create: true,
      update: true,
      code: (
        <>
          <Box
            sx={{
              height: "75px",
              width: "100%",
              display: "flex",
              border: "1.5px solid black",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            <Box sx={{ width: "30%", height: "75px", marginRight: "8px" }}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Size
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => setSizes((sizes) => [...sizes, size])}
                      >
                        <Typography
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "6px",
                            borderRadius: "5px",
                            marginTop: "-11px",
                          }}
                        >
                          Add
                        </Typography>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                height: "75px",
                width: "70%",
                display: "flex",
                alignItems: "center",
                gap: "0 4px",
                overflowX: "auto",
              }}
            >
              {sizes?.length > 0 ? (
                sizes?.map((size, i) => (
                  <>
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ fontSize: "11px" }}>
                            {size}
                          </Typography>
                          <IconButton
                            sx={{
                              height: "13px",
                              width: "13px",
                              marginLeft: "4px",
                            }}
                            onClick={() => handleChipDelete(size)}
                          >
                            <CloseIcon sx={{ fontSize: "11px" }} />
                          </IconButton>
                        </Box>
                      }
                      key={i}
                    />
                  </>
                ))
              ) : (
                <Chip label={"No described sizes!"} />
              )}
            </Box>
          </Box>
        </>
      ),
      xs: 12,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledButton
          title="Update Product"
          mode={"dark"}
          validation={
            !name || !price || !discount || !category || !description || !id
          }
          onClick={() => handleUpdateProduct()}
        />
      ),
      xs: 12,
    },
  ];

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
                            image={product?.images[0]?.url}
                            alt={product?.name}
                          />
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                              >
                                {product?.name}
                              </Typography>
                              <Typography variant="subtitle1">
                                ${product?.price}.00
                              </Typography>
                            </Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ textTransform: "capitalize" }}
                            >
                              {product?.category}
                            </Typography>
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
            <Grid container>
              {isError && (
                <Grid item sx={{ height: "50px" }} xs={12}>
                  <Typography variant="subtitle2" sx={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              {fields?.map((field, i) => (
                <Grid item sm={field.xs} key={i} sx={{ padding: "10px" }}>
                  {field.code}
                </Grid>
              ))}
            </Grid>
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
            <Grid container>
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
            </Grid>
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
                  onClick={() => handleSearchProductReviews()}
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
