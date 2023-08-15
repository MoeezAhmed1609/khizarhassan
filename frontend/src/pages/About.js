import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const About = () => {
  return (
    <>
      <Box sx={{ height: "18vh", width: "100%" }} />
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: "80vh",
          padding: "0 5%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ padding: { xs: "10px", sm: "20px", md: "30px" } }}
        >
          <Typography
            sx={{
              fontWeight: "1000",
              textTransform: "uppercase",
              fontSize: "12vh",
            }}
          >
            Discover limited sneakers without limitations
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
