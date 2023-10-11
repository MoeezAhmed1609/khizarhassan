import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import RawHTMLRenderer from "../components/HtmlRenderer";

const Terms = () => {
  const contents = useSelector((state) => state.content?.data);
  let about;
  contents?.map((c) => {
    if (c?.title === "terms & conditions") {
      about = c?.content;
    }
  });
  return (
    <>
      <Box
        sx={{
          height: "12.3vh",
          width: "100%",
        }}
      />
      <RawHTMLRenderer html={about} />
    </>
  );
};

export default Terms;
