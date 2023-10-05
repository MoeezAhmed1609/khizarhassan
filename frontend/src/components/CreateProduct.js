import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Badge,
  IconButton,
  InputAdornment,
  Input,
  Chip,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import TextEditor from "../components/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./styledButton";
import StyledTextField from "./styledTextField";
import { createProduct } from "../redux/actions/productsActions";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import axios from "axios";
import AutoCompleteSelect from "./AutoComplete";

const CreateProduct = () => {
  // Categories
  const categories = useSelector((state) => state?.category?.data);
  const brands = useSelector((state) => state?.brands?.data);
  const products = useSelector((state) => state?.products?.data?.products);
  // Create Product
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [usage, setUsage] = useState("");
  const [size, setSize] = useState("");
  const [quantityV, setQuantityV] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [flavor, setFlavor] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [bestSelling, setBestSelling] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [related, setRelated] = useState([]);
  const [variants, setVariants] = useState([]);

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
  const handleRemoveVariant = (variant) => {
    const array = [...variants];
    const index = array.indexOf(variant);
    if (index !== -1) {
      array.splice(index, 1);
      setVariants(array);
    }
  };
  const handleChipDelete = (chip) => {
    const array = [...flavors];
    const index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      setFlavors(array);
    }
  };
  const handleRelatedDelete = (chip) => {
    const array = [...related];
    const index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      setRelated(array);
    }
  };

  //   handle add variant
  const handleAddVariant = async () => {
    if (!size) {
      toast.error("Describe variant size!");
      return;
    }
    if (!quantityV) {
      toast.error("Describe variant quantity!");
      return;
    }
    if (!price) {
      toast.error("Describe variant price!");
      return;
    }
    if (images.length === 0) {
      toast.error("Add variant image!");
      return;
    }

    const uploads = [];
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", "xtrack-products-variants");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dptwxpos1/image/upload",
          formData
        )
        .then((res) => {
          const result = {
            public_id: res.data.public_id,
            url: res.data.secure_url,
          };
          uploads.push(result);
        });
    }

    const data = {
      size,
      quantity: quantityV,
      price,
      discount,
      images: uploads,
      flavors,
    };
    setVariants((variants) => [...variants, data]);
    setSize("");
    setQuantityV(0);
    setPrice(0);
    setDiscount(0);
    setImages([]);
    setFlavors([]);
  };

  const dispatch = useDispatch();
  const handleCreateProduct = () => {
    if (name.length === 0 || name.length < 6) {
      toast.error("Enter a proper product name!");
      return;
    }
    if (description.length === 0 || description.length < 20) {
      toast.error("Enter proper description! (min 20 letters)");
      return;
    }
    if (variants.length < 1) {
      toast.error("Add at least 1 variant!");
      return;
    }
    if (related.length === 0) {
      toast.error("Add related products!");
      return;
    }
    if (
      !name ||
      !description ||
      !usage ||
      !category ||
      !brand ||
      !quantity ||
      !shipping
    ) {
      toast.error("Complete form!");
      return;
    }
    const relatedProducts = [];
    related?.map((r) => {
      relatedProducts.push(r?._id);
    });
    const product = {
      name,
      description,
      usage,
      category,
      brand,
      quantity,
      variants,
      sale: onSale,
      best: bestSelling,
      shipping,
      related: relatedProducts,
    };
    dispatch(createProduct(product));
  };
  return (
    <Grid container>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Products Name"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Total Quantity"}
          type={"number"}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
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
                  style={{ height: "9vh" }}
                />
                <Typography>{category?.title}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={brand}
            label="Brand"
            onChange={(e) => setBrand(e.target.value)}
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
            {brands?.map((category, i) => (
              <MenuItem
                value={category?.title?.toLowerCase()}
                key={i}
                sx={{ display: "flex" }}
              >
                <img
                  src={category?.image?.url}
                  alt={category?.title}
                  style={{ height: "9vh" }}
                />
                <Typography>{category?.title}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <FormGroup sx={{ flexDirection: "row" }}>
          <FormControlLabel
            control={<Checkbox onChange={(e) => setOnSale(e.target.checked)} />}
            label="On Sale"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setBestSelling(e.target.checked)} />
            }
            label="Best Selling"
          />
        </FormGroup>
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Shipping"}
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        />
      </Grid>
      <Grid
        item
        sm={12}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
          Add Variants of Product
        </Typography>
        <Typography sx={{ textAlign: "right", color: "#e63146" }}>
          *At least 1 required
        </Typography>
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Variant Size"}
          type={"text"}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Variant Quantity"}
          type={"number"}
          value={quantityV}
          onChange={(e) => setQuantityV(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Variant Price"}
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <StyledTextField
          title={"Variant Discount"}
          type={"number"}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <>
          <Box
            sx={{
              height: "75px",
              display: "flex",
              alignItems: "center",
              border: "1.5px solid black",
              borderRadius: "4px",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Box
              sx={{
                height: "75px",
                display: "flex",
                alignItems: "center",
              }}
            >
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
              mode={"light"}
              width={"25%"}
              onClick={handleImageClick}
            />
          </Box>
        </>
      </Grid>
      <Grid item sm={6} sx={{ padding: "10px" }}>
        <>
          <Box
            sx={{
              height: "75px",
              display: "flex",
              border: "1.5px solid black",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            <Box sx={{ width: "35%", height: "75px", marginRight: "8px" }}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Flavors
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type="text"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setFlavors((flavors) => [...flavors, flavor]);
                          setFlavor("");
                        }}
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#e63146",
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
                width: "65%",
                display: "flex",
                alignItems: "center",
                gap: "0 4px",
                overflowX: "auto",
              }}
            >
              {flavors?.length > 0 ? (
                flavors?.map((size, i) => (
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
                <Chip label={"No Flavors!"} />
              )}
            </Box>
          </Box>
        </>
      </Grid>
      <Grid item sm={12} sx={{ padding: "10px" }}>
        <StyledButton title={"Add this Variant"} onClick={handleAddVariant} />
      </Grid>
      {variants?.length > 0 &&
        variants?.map((step, i) => (
          <Grid
            item
            sm={12}
            sx={{
              padding: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              minHeight: "15vh",
              borderRadius: "1vh",
              marginTop: "10px",
            }}
            key={i}
          >
            <Grid container>
              <Grid item sm={1}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveVariant(step)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item sm={1}>
                <img
                  src={step?.images[0]?.url}
                  alt={step.size}
                  style={{ height: "9vh" }}
                />
              </Grid>
              <Grid item sm={2}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "4px" }}>
                  Size
                </Typography>
                <Typography>{step.size}</Typography>
              </Grid>
              <Grid item sm={1}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "4px" }}>
                  Quantity
                </Typography>
                <Typography>{step.quantity}</Typography>
              </Grid>
              <Grid item sm={2}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "4px" }}>
                  Price
                </Typography>
                <Typography>{step.price}</Typography>
              </Grid>
              <Grid item sm={2}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "4px" }}>
                  Discount
                </Typography>
                <Typography>{step.discount}</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography sx={{ fontWeight: "bold", marginBottom: "4px" }}>
                  Flavors
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {step.flavors.map((f, i) => (
                    <Typography key={i}>{f},</Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      <Grid item sm={5} sx={{ padding: "10px", marginTop: "10px" }}>
        <AutoCompleteSelect
          options={products}
          value={related}
          setValue={setRelated}
        />
      </Grid>
      <Grid item sm={7} sx={{ padding: "10px" }}>
        <Box
          sx={{
            height: "75px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "0 4px",
            overflowX: "auto",
          }}
        >
          {related?.length > 0 ? (
            related?.map((size, i) => (
              <>
                <Chip
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        {size?.name}
                      </Typography>
                      <IconButton
                        sx={{
                          height: "13px",
                          width: "13px",
                          marginLeft: "4px",
                        }}
                        onClick={() => handleRelatedDelete(size?.name)}
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
            <Chip label={"No Related Products!"} />
          )}
        </Box>
      </Grid>
      <Grid item sm={12} sx={{ padding: "10px" }}>
        <Box sx={{ marginBottom: "10vh" }}>
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            Enter Product Description
          </Typography>
          <TextEditor value={description} setValue={setDescription} />
        </Box>
      </Grid>
      <Grid item sm={12} sx={{ padding: "10px" }}>
        <Box sx={{ marginBottom: "10vh" }}>
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            Enter Product Usage
          </Typography>
          <TextEditor value={usage} setValue={setUsage} />
        </Box>
      </Grid>
      <Grid item sm={12} sx={{ padding: "10px" }}>
        <StyledButton title={"Create Product"} onClick={handleCreateProduct} />
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
