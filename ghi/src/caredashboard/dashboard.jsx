import React, { useState } from "react";
import WeatherWarningBar from "./weatherwarningbar.jsx";
import WeatherWidget from "./weatherwidget.jsx";
import DailyTodoList from "./dailytodolist.jsx";
import WaterCanLogo from "./watercanlogo.jsx";
import { Button, Typography, Box, TextField } from "@mui/material";

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [zipcode, setZipcode] = useState("10001"); // default zipcode

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const showDashboard = () => {
    setShowDropdown(true);
  };

  return (
    <div>
      <TextField
        label="Zipcode"
        value={zipcode}
        onChange={handleZipcodeChange}
      />
      <Button onClick={toggleDropdown}>Toggle Dropdown</Button>
      <WaterCanLogo onClick={showDashboard} />
      {showDropdown && (
        <div>
          <WeatherWarningBar zipcode={zipcode} />
          <WeatherWidget zipcode={zipcode} />
          <DailyTodoList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

