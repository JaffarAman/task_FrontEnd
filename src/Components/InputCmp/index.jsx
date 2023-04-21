import { TextField } from "@mui/material";
import React, { memo } from "react";
import { Controller } from "react-hook-form";

const InputCmp = ({ label, type, name, control, style, variant, ...props }) => {
  return (
    <Controller
      name={name || "testing"}
      control={control || "test"}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label ? label : "Outlined"}
          variant={variant ? variant : "outlined"}
          onChange={onChange}
          sx={{ width: "100%", ...style }}
          type={type ? type : "text"}
          {...props}
          value={value}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default memo(InputCmp);
