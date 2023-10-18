import React from "react";
import Helmet from "react-helmet";
import xtrack from "../assets/xtrack.png";

const Metadata = ({ title, description, image }) => {
  return (
    <Helmet>
      <title style={{ textTransform: "capitalize" }}>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image ? image : xtrack} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Metadata;
