import React, { useEffect, useState } from "react";
import { PlantProvider } from "./contexts/plantcontext";
import Dashboard from "./dashboard";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
        let response = await fetch(url);
        let data = await response.json();

        if (response.ok) {
          setLaunchInfo(data.launch_details);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      }
    }
    fetchData();
  }, []);

  return (
    <PlantProvider>
      <div>
        <ErrorNotification error={error} />
        <Dashboard launchInfo={launchInfo} />
      </div>
    </PlantProvider>
  );
}

export default App;
