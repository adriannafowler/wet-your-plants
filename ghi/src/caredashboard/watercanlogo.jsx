import React from "react";
import { IconButton } from "@mui/material";
import WaterCanIcon from "path-to-water-can-icon"; // Replace with the actual path to your water can icon

const WaterCanLogo = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <WaterCanIcon />
    </IconButton>
  );
};

export default WaterCanLogo;
