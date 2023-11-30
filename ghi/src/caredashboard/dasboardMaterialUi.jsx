import React, { useState, useEffect } from "react";
import WeatherWarningBar from "/WeatherWarningBar";
import WeatherWidget from "/WeatherWidget";
import DailyTodoList from "/DailyTodoList";
import WaterCanLogo from "/WaterCanLogo"; // Added this import
import {
  Container,
  Grid,
  Paper,
  Button,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePlantContext } from "./PlantContext";

const DashboardMaterialUI = ({ showDashboard, toggleDashboard }) => {
  const { user, plantCareStats, updatePlantStats } = usePlantContext();
  const [zipcode, setZipcode] = useState(user.zipcode || "");

  useEffect(() => {
    // Fetch additional user-specific data or perform any necessary side effects
  }, [user]);

  const openDashboard = () => {
    toggleDashboard(true);
  };

  const closeDashboard = () => {
    toggleDashboard(false);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleTodoCompleted = () => {
    // Perform the logic for a completed todo
    updatePlantStats();
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <TextField
          label="Zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
        />
        <Button onClick={openDashboard}>Open Dashboard</Button>
        <WaterCanLogo onClick={openDashboard} /> {/* Added WaterCanLogo */}
      </Grid>
      {showDashboard && (
        <Drawer anchor="right" open={showDashboard} onClose={closeDashboard}>
          <Paper>
            <IconButton
              style={{ position: "absolute", top: 5, right: 5 }}
              onClick={closeDashboard}
            >
              <CloseIcon />
            </IconButton>
            <WeatherWarningBar zipcode={zipcode} />
            <WeatherWidget zipcode={zipcode} />
            <DailyTodoList />
            <Button
              className="delete-button"
              variant="contained"
              onClick={handleTodoCompleted}
            >
              Complete Todo
            </Button>
            {/* ... other components or features ... */}
          </Paper>
        </Drawer>
      )}
    </Container>
  );
};

export default DashboardMaterialUI;
