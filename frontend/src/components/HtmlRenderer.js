import React from "react";

const RawHTMLRenderer = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} className="html-renderer" />;
};

export default RawHTMLRenderer;
