import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RawHTMLRenderer from "../components/HtmlRenderer";
import { getBlog } from "../redux/actions/blogActions";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);
  return (
    <>
      <Box sx={{ height: "18vh", width: "100%" }}></Box>
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: "80vh",
          padding: "0 5%",
          margin: "20px 0",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {data?.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={data?.banner?.url}
              alt={data?.title}
              style={{ height: "60vh" }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ padding: { xs: "5px", sm: "0 7%", md: "0 12%" } }}
        >
          <RawHTMLRenderer html={data?.content} />
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
