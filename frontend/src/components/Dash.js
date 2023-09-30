import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Dash = () => {
  // Geting states
  const productsCount = useSelector(
    (state) => state.products.data.productsCount
  );
  const users = useSelector((state) => state.users?.users?.data?.users);
  // Calculation
  let totalOrders = 0;
  let totalSales = 0;
  users?.filter((user) => {
    totalOrders += user.orders.length;
    user.orders.filter((order) => {
      console.log({ order });
      totalSales += order.orderStatus === "Cancelled" ? 0 : order.totalPrice;
      // totalSales += order.totalPrice;
    });
  });

  const boxes = [
    {
      title: "Total Products",
      value: productsCount,
    },
    {
      title: "Total Users",
      value: users?.length,
    },
    {
      title: "Total Orders",
      value: totalOrders,
    },
    {
      title: "Total Sales",
      value: totalSales,
    },
  ];
  return (
    <Grid container>
      {boxes.map((box, i) => (
        <Grid item xs={6} sm={3} key={i} sx={{ padding: "7px" }}>
          <Box
            sx={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "150px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "1000" }}>
              {box.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "1000" }}>
              {box.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dash;
