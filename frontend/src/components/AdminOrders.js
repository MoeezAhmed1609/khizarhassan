import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/actions/userActions";
const AdminOrders = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Search
  const [search, setSearch] = useState("");
  // Getting All users
  const { users } = useSelector((state) => state.users);
  const processingOrders = [];
  const deliveredOrders = [];
  const completedOrders = [];
  const cancelledOrders = [];
  users?.data?.users?.filter((user) => {
    user?.orders?.filter((order) => {
      if (order?.orderStatus === "Processing") {
        processingOrders.push(order);
      } else if (order?.orderStatus === "Delivered") {
        deliveredOrders.push(order);
      } else if (order?.orderStatus === "Completed") {
        completedOrders.push(order);
      } else if (order?.orderStatus === "Cancelled") {
        cancelledOrders.push(order);
      } else return null;
    });
  });
  // Change Order Status
  const [status, setStatus] = useState("");
  const handleStatusChange = (id) => {
    dispatch(updateOrderStatus(id, status));
    window.location.reload();
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
              Processing ({processingOrders?.length} Orders)
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
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledTextField
                  title={"Search by Customer Name"}
                  type={"text"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              {processingOrders?.length === 0 ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "60vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant={"h6"}>
                      No orders on processing!
                    </Typography>
                  </Grid>
                </>
              ) : (
                processingOrders?.map((order, i) => (
                  <Grid item xs={12} key={i} sx={{ padding: "10px" }}>
                    <Card sx={{ width: "100%", textAlign: "left" }}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Shipping Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Name
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Email
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.email}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Phone
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.phone}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Address
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.address}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      ZIP
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.zip}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Order Information
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ textAlign: "center" }}
                            >
                              Total Items ({order?.items?.length})
                            </Typography>
                            <TableContainer
                              sx={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  {order?.items?.map((item, i) =>
                                    item?.product ? (
                                      <React.Fragment key={i}>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Image
                                          </TableCell>
                                          <TableCell align="right">
                                            <img
                                              src={
                                                item?.product?.images[0]?.url
                                              }
                                              alt={item?.product?.name}
                                              style={{ height: "70px" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Name
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.product?.name}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Size
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.size}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Price
                                          </TableCell>
                                          <TableCell align="right">
                                            ${item?.product?.price}.00
                                          </TableCell>
                                        </TableRow>
                                      </React.Fragment>
                                    ) : null
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Payment Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Subtotal
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.itemsPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Shipping Cost
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.shippingPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Tax
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.taxPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Total
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.totalPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Order Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.orderStatus}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "310px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  padding: "15px",
                                }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem value={"Processing"}>
                                      Processing
                                    </MenuItem>
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>
                                      Completed
                                    </MenuItem>
                                    <MenuItem value={"Cancelled"}>
                                      Cancelled
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <StyledButton
                                title={"Change Order Status"}
                                onClick={() => handleStatusChange(order?._id)}
                                mode={"dark"}
                              />
                              {/* <StyledButton
                                  title={"Delete Order"}
                                  // onClick={() => handleDeleteOrder(user?._id)}
                                  mode={"light"}
                                /> */}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
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
              Delivered ({deliveredOrders?.length} Orders)
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
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledTextField
                  title={"Search by Customer Name"}
                  type={"text"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              {deliveredOrders?.length === 0 ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "60vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant={"h6"}>
                      No orders on processing!
                    </Typography>
                  </Grid>
                </>
              ) : (
                deliveredOrders?.map((order, i) => (
                  <Grid item xs={12} key={i} sx={{ padding: "10px" }}>
                    <Card sx={{ width: "100%", textAlign: "left" }}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Shipping Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Name
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Email
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.email}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Phone
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.phone}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Address
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.address}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      ZIP
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.zip}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Order Information
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ textAlign: "center" }}
                            >
                              Total Items ({order?.items?.length})
                            </Typography>
                            <TableContainer
                              sx={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  {order?.items?.map((item, i) =>
                                    item?.product ? (
                                      <React.Fragment key={i}>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Image
                                          </TableCell>
                                          <TableCell align="right">
                                            <img
                                              src={
                                                item?.product?.images[0]?.url
                                              }
                                              alt={item?.product?.name}
                                              style={{ height: "70px" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Name
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.product?.name}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Size
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.size}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Price
                                          </TableCell>
                                          <TableCell align="right">
                                            ${item?.product?.price}.00
                                          </TableCell>
                                        </TableRow>
                                      </React.Fragment>
                                    ) : null
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Payment Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Subtotal
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.itemsPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Shipping Cost
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.shippingPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Tax
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.taxPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Total
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.totalPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Order Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.orderStatus}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "310px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  padding: "15px",
                                }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem value={"Processing"}>
                                      Processing
                                    </MenuItem>
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>
                                      Completed
                                    </MenuItem>
                                    <MenuItem value={"Cancelled"}>
                                      Cancelled
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <StyledButton
                                title={"Change Order Status"}
                                onClick={() => handleStatusChange(order?._id)}
                                mode={"dark"}
                              />
                              {/* <StyledButton
                                  title={"Delete Order"}
                                  // onClick={() => handleDeleteOrder(user?._id)}
                                  mode={"light"}
                                /> */}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
              Completed ({completedOrders?.length} Orders)
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
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledTextField
                  title={"Search by Customer Name"}
                  type={"text"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              {completedOrders?.length === 0 ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "60vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant={"h6"}>
                      No orders on processing!
                    </Typography>
                  </Grid>
                </>
              ) : (
                completedOrders?.map((order, i) => (
                  <Grid item xs={12} key={i} sx={{ padding: "10px" }}>
                    <Card sx={{ width: "100%", textAlign: "left" }}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Shipping Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Name
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Email
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.email}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Phone
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.phone}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Address
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.address}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      ZIP
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.zip}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Order Information
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ textAlign: "center" }}
                            >
                              Total Items ({order?.items?.length})
                            </Typography>
                            <TableContainer
                              sx={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  {order?.items?.map((item, i) =>
                                    item?.product ? (
                                      <React.Fragment key={i}>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Image
                                          </TableCell>
                                          <TableCell align="right">
                                            <img
                                              src={
                                                item?.product?.images[0]?.url
                                              }
                                              alt={item?.product?.name}
                                              style={{ height: "70px" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Name
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.product?.name}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Size
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.size}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Price
                                          </TableCell>
                                          <TableCell align="right">
                                            ${item?.product?.price}.00
                                          </TableCell>
                                        </TableRow>
                                      </React.Fragment>
                                    ) : null
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Payment Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Subtotal
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.itemsPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Shipping Cost
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.shippingPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Tax
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.taxPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Total
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.totalPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Order Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.orderStatus}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "310px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  padding: "15px",
                                }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem value={"Processing"}>
                                      Processing
                                    </MenuItem>
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>
                                      Completed
                                    </MenuItem>
                                    <MenuItem value={"Cancelled"}>
                                      Cancelled
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <StyledButton
                                title={"Change Order Status"}
                                onClick={() => handleStatusChange(order?._id)}
                                mode={"dark"}
                              />
                              {/* <StyledButton
                                  title={"Delete Order"}
                                  // onClick={() => handleDeleteOrder(user?._id)}
                                  mode={"light"}
                                /> */}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
              Cancelled ({cancelledOrders?.length} Orders)
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
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledTextField
                  title={"Search by Customer Name"}
                  type={"text"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              {cancelledOrders?.length === 0 ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      height: "60vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant={"h6"}>
                      No orders on processing!
                    </Typography>
                  </Grid>
                </>
              ) : (
                cancelledOrders?.map((order, i) => (
                  <Grid item xs={12} key={i} sx={{ padding: "10px" }}>
                    <Card sx={{ width: "100%", textAlign: "left" }}>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Shipping Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Name
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Email
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.email}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Phone
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.phone}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Address
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.address}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      ZIP
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.shipping?.zip}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Order Information
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ textAlign: "center" }}
                            >
                              Total Items ({order?.items?.length})
                            </Typography>
                            <TableContainer
                              sx={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  {order?.items?.map((item, i) =>
                                    item?.product ? (
                                      <React.Fragment key={i}>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Image
                                          </TableCell>
                                          <TableCell align="right">
                                            <img
                                              src={
                                                item?.product?.images[0]?.url
                                              }
                                              alt={item?.product?.name}
                                              style={{ height: "70px" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Name
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.product?.name}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Size
                                          </TableCell>
                                          <TableCell align="right">
                                            {item?.size}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            Price
                                          </TableCell>
                                          <TableCell align="right">
                                            ${item?.product?.price}.00
                                          </TableCell>
                                        </TableRow>
                                      </React.Fragment>
                                    ) : null
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderRight: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{ textAlign: "center" }}
                            >
                              Payment Information
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{ width: "100%" }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Subtotal
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.itemsPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Shipping Cost
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.shippingPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Tax
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.taxPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Total
                                    </TableCell>
                                    <TableCell align="right">
                                      ${order?.totalPrice}.00
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Order Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {order?.orderStatus}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                              borderLeft: {
                                xs: "none",
                                sm: "1px solid black",
                              },
                              padding: "0 5px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "310px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  padding: "15px",
                                }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem value={"Processing"}>
                                      Processing
                                    </MenuItem>
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>
                                      Completed
                                    </MenuItem>
                                    <MenuItem value={"Cancelled"}>
                                      Cancelled
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <StyledButton
                                title={"Change Order Status"}
                                onClick={() => handleStatusChange(order?._id)}
                                mode={"dark"}
                              />
                              {/* <StyledButton
                                  title={"Delete Order"}
                                  // onClick={() => handleDeleteOrder(user?._id)}
                                  mode={"light"}
                                /> */}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default AdminOrders;
