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
