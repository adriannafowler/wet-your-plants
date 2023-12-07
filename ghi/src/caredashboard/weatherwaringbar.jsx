import React, { useState, useEffect } from 'react'
import { Alert } from '@mui/material'

const WeatherWarningBar = ({ zipcode }) => {
    const [weather, setWeather] = useState({})
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/weather-data/${zipcode}`,
                    { credentials: 'include' }
                )
                const data = await response.json()
                setWeather(data)

                // Check for weather warnings
                const temperature = data.main.temp
                if (temperature < 40 || temperature > 95) {
                    setShowWarning(true)
                } else {
                    setShowWarning(false)
                }
            } catch (error) {
                console.error('Error fetching weather:', error)
            }
        }

        fetchWeather()
    }, [zipcode])

    return (
        <div>
            {showWarning && (
                <Alert severity="warning">
                    {weather.main.temp < 40
                        ? 'Warning: Extremely cold weather! Bring your plants indoors!'
                        : 'Warning: High temperatures! Wet your plants!'}
                </Alert>
            )}
        </div>
    )
}

export default WeatherWarningBar
