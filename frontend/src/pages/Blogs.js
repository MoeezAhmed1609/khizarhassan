import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import RawHTMLRenderer from "../components/HtmlRenderer";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { data } = useSelector((state) => state.blogs);
  console.log(data);
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
        {data.map((blog) => (
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Link
              to={`/blog/${blog._id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Grid container>
                <Grid item xs={12} sm={6} md={5}>
                  <img
                    src={blog.banner.url}
                    alt={blog.title}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={7}
                  sx={{
                    padding: "0 10px",
                    height: "55vh",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {blog.title}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle1">
                      Published By: <b>{blog.admin.name}</b>
                    </Typography>
                    <Typography variant="subtitle1">
                      Published On: <b>{blog.createdAt}</b>
                    </Typography>
                  </Box>
                  <RawHTMLRenderer html={blog.content} />
                </Grid>
              </Grid>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Blogs;
