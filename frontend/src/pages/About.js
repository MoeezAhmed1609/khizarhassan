import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import RawHTMLRenderer from "../components/HtmlRenderer";
import MetaData from "../components/metadata";

const About = () => {
  const contents = useSelector((state) => state.content?.data);
  let about;
  contents?.map((c) => {
    if (c?.title === "about") {
      about = c?.content;
    }
  });
  return (
    <>
      <MetaData title={"About - Xtrack.pk"} />
      <Box
        sx={{
          height: "12.3vh",
          width: "100%",
        }}
      />
      <Box sx={{ paddingX: { xs: "15px", sm: "5vw" } }}>
        <RawHTMLRenderer html={about} />
      </Box>
    </>
  );
};

export default About;
