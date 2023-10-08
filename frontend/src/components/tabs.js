import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Rating, colors } from "@mui/material";
import RawHTMLRenderer from "./HtmlRenderer";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "80%",
        },
        minHeight: "40vh",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .css-1aquho2-MuiTabs-indicator": {
              backgroundColor: "black",
            },
            "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: "black",
            },
          }}
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Usage" {...a11yProps(2)} />
          {/* <Tab label="Reviews" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RawHTMLRenderer html={data?.description} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {data?.usage ? (
          <RawHTMLRenderer html={data?.usage} />
        ) : (
          <Typography sx={{ fontFamily: "Poppins, san-serif" }}>
            Usage not Prescribed!
          </Typography>
        )}
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        <Box sx={{ paddingX: 2 }}>
          {data?.reviews?.length > 0 ? (
            data?.reviews?.map((review, index) => (
              <Box key={index} sx={{ minHeight: "120px", width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">{review.customer}</Typography>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{ color: "golden" }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ marginTop: "8px", marginLeft: "8px" }}
                >
                  {review.comment}
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                height: "37vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                No reviews for this product!
              </Typography>
            </Box>
          )}
        </Box>
      </CustomTabPanel> */}
    </Box>
  );
}
