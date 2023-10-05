import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoCompleteSelect({ options, value, setValue }) {
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        setValue((value) => [...value, newValue]);
      }}
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option?.name}
      renderInput={(params) => (
        <TextField {...params} label="Related Products" />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            style={{ height: "50px" }}
            src={option?.variants[0]?.images[0]?.url}
            alt=""
          />
          {option?.name}
        </Box>
      )}
    />
  );
}
