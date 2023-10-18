import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function OrderTable({ order }) {
  let index;
  order?.items?.filter((item) => {
    index = item?.product?.variants.findIndex((object) => {
      return object?.size === item?.size;
    });
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "80px" }}>Product</TableCell>
            <TableCell align="left" sx={{ width: "120px" }}></TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order?.items?.map((item, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="item">
                <img
                  src={item?.product?.variants[index]?.images[0]?.url}
                  alt={item?.product?.name}
                  style={{ height: "70px" }}
                  loading="lazy"
                />
              </TableCell>
              <TableCell align="left">{item?.product?.name}</TableCell>
              <TableCell align="right">{item?.size}</TableCell>
              <TableCell align="right">{item?.quantity}</TableCell>
              <TableCell align="right">
                Rs.{item?.product?.variants[index]?.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
