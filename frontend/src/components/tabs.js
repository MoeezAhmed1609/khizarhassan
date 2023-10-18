import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
    </Box>
  );
}
