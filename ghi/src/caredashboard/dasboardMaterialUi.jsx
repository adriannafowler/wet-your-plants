import React from "react";
import WeatherWarningBar from "./weatherwarningbar.jsx";
import WeatherWidget from "./weatherwidget.jsx";
import DailyTodoList from "./dailytodolist.jsx";
import {
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Drawer,
  IconButton,
} from "@mui/material";
import WaterCanLogo from "./watercanlogo.jsx";
import CloseIcon from "@mui/icons-material/Close";

const DashboardMaterialUI = ({ showDashboard, toggleDashboard }) => {
  const zipcode = "10001"; // Replace with your actual logic to get the zipcode

  const openDashboard = () => {
    toggleDashboard(true);
  };

  const closeDashboard = () => {
    toggleDashboard(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label="Zipcode" value={zipcode} disabled />
          <Button onClick={openDashboard}>Open Dashboard</Button>
          <WaterCanLogo onClick={openDashboard} />
        </Grid>
      </Grid>

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
        </Paper>
      </Drawer>
    </Container>
  );
};

export default DashboardMaterialUI;
