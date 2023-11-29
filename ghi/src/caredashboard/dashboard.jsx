import React, { useState } from "react";
import DashboardMaterialUI from "./DashboardMaterialUI";

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = (isOpen) => {
    setShowDashboard(isOpen);
  };

  return (
    <div>
      <DashboardMaterialUI
        showDashboard={showDashboard}
        toggleDashboard={toggleDashboard}
      />
    </div>
  );
};

export default Dashboard;
