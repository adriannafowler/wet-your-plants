import React, { useState } from "react";
import { PlantProvider } from "./contexts/plantcontext";
import DashboardMaterialUI from "./dashboardMaterialUI";
import DailyTodoList from "./DailyTodoList";

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = (isOpen) => {
    setShowDashboard(isOpen);
  };

  return (
    <PlantProvider>
      <div>
        <DashboardMaterialUI
          showDashboard={showDashboard}
          toggleDashboard={toggleDashboard}
        />
        <DailyTodoList /> {/* Include the DailyTodoList component */}
      </div>
    </PlantProvider>
  );
};

export default Dashboard;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography, Tabs, Tab, Box } from '@mui/material';
// import { usePlantContext } from './PlantContext';

// const PlantDetail = () => {
//   const { plant_id } = useParams();
//   const { plantCareHistory } = usePlantContext();

//   const selectedPlantCareHistory = plantCareHistory.filter(
//     (record) => record.plant_id === parseInt(plant_id)
//   );

//   return (
//     <div>
//       <Typography variant="h4">Plant Detail</Typography>
//       <Tabs value={0} indicatorColor="primary" textColor="primary">
//         <Tab label="Description" />
//         <Tab label="Plant Care" />
//       </Tabs>
//       <TabPanel value={0}>
//         {/* Display plant description here */}
//       </TabPanel>
//       <TabPanel value={1}>
//         <Typography variant="h6">Plant Care History</Typography>
//         {selectedPlantCareHistory.map((record, index) => (
//           <div key={index}>
//             <Typography>{record.task}</Typography>
//             <Typography>{record.completionDate}</Typography>
//           </div>
//         ))}
//       </TabPanel>
//     </div>
//   );
// };

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </div>
//   );
// };

// export default PlantDetail;