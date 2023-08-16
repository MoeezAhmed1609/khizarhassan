import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Rating,
  InputLabel,
  Chip,
  InputAdornment,
  Input,
  Badge,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import OrderTable from "../components/orderTable";

const Orders = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: { xs: "96%", md: "75%" } }}>
      {user?.orders?.map((order, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ minWidth: "33%", flexShrink: 0 }}>
              Placed on: {order?.createdAt.split("T")[0]}
            </Typography>
            <Typography
              sx={{
                color: order?.orderStatus === "Cancelled" ? "red" : "green",
                marginLeft: { xs: "5px", sm: "0" },
              }}
            >
              Status: {order?.orderStatus}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h6">Shipping Information</Typography>
                <TableContainer component={Paper}>
                  <Table>
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
                          ZIP Code
                        </TableCell>
                        <TableCell align="right">
                          {order?.shipping?.zip}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <OrderTable order={order} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: "20px 0",
                }}
              >
                <Typography variant="h6">Payment Information</Typography>
                <TableContainer component={Paper}>
                  <Table>
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
                          Shipping
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
                          Payment Status
                        </TableCell>
                        <TableCell align="right">Cash on delivery</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Orders;
