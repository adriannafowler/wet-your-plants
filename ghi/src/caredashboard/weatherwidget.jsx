import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const WeatherWidget = ({ zipcode }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=YOUR_OPENWEATHER_API_KEY`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [zipcode]);

  return (
    <Card>
      <CardContent>
        {weather.main && (
          <>
            <Typography variant="h6">{`Weather in ${weather.name}`}</Typography>
            <Typography>{`Temperature: ${weather.main.temp} °F`}</Typography>
            <Typography>{`Description: ${weather.weather[0].description}`}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

