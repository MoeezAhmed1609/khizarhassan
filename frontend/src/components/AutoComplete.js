import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoCompleteSelect({
  options,
  value,
  setValue,
  label,
  src,
}) {
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        setValue(
          src === "related"
            ? (value) => [...value, newValue]
            : src === "category" || src === "brand"
            ? newValue?.title
            : newValue
        );
      }}
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) =>
        src === "related"
          ? option?.name
          : src === "category" || src === "brand"
          ? option?.title
          : option
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            style={{ height: "50px" }}
            src={
              src === "related"
                ? option?.variants[0]?.images[0]?.url
                : src === "category" || src === "brand"
                ? option?.image?.url
                : null
            }
            alt=""
          />
          {src === "related"
            ? option?.name
            : src === "category" || src === "brand"
            ? option?.title
            : option}
        </Box>
      )}
    />
  );
}
