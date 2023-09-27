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
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";

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

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category?.data);
  const brands = useSelector((state) => state?.brands?.data);
  // Getting product details for update
  const details = useSelector((state) => state.product);
  const product = details?.data?.product;
  
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
  const [usage, setUsage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



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
      code: (
        <StyledTextField
          title={"Products Name"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      xs: 4,
    },
    {
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
              <MenuItem
                value={category?.title?.toLowerCase()}
                key={i}
                sx={{ display: "flex" }}
              >
                <img
                  src={category?.image?.url}
                  alt={category?.title}
                  height={"9vh"}
                />
                <Typography>{category?.title}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      xs: 4,
    },
    {
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
  return <div>UpdateProduct</div>;
};

export default UpdateProduct;
