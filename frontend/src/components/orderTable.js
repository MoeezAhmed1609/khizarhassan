import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function OrderTable({ order }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "80px" }}>Wear</TableCell>
            <TableCell align="left" sx={{ width: "120px" }}></TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order?.items?.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="item">
                <img
                  src={item?.product?.images[0]?.url}
                  alt={item?.product?.name}
                  style={{ height: "70px" }}
                />
              </TableCell>
              <TableCell align="left">{item?.product?.name}</TableCell>
              <TableCell align="right">{item?.size}</TableCell>
              <TableCell align="right">${item?.product?.price}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
