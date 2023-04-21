import { Button } from "@mui/material";
import React, { memo } from "react";

const ButtonCmp = ({ title, onClick, style, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{ width: "100%", borderRadius: "20px", padding: "15px", ...style }}
      onClick={onClick}
      {...props}
    >
      {title || "Container"}
    </Button>
  );
};

export default memo(ButtonCmp);
