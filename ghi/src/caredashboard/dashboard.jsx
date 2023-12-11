// Dashboard.jsx
import React, { useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Paper,
    Button,
    Typography,
    Box,
    Dialog,
    TextField,
} from '@mui/material'
import WeatherWidget from './weatherwidget'
import DailyTodoList from './dailytodolist'
import AddTodoDialog from '../plant_detail/addtododialog'
import './dashboard.css'

const Dashboard = ({ userId }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [todos, setTodos] = useState([])
    const [weatherApiKey, setWeatherApiKey] = useState('')
    const [manualZipcode, setManualZipcode] = useState('')
    const [manualWeatherData, setManualWeatherData] = useState(null)

    // useEffect(() => {
    //     const fetchWeatherApiKey = async () => {
    //         try {
    //             const response = await fetch(
    //                 'http://localhost:8000/api/weather-key'
    //             )
    //             if (!response.ok) {
    //                 throw new Error(
    //                     `Failed to fetch weather API key: ${response.statusText}`
    //                 )
    //             }
    //             const data = await response.json()
    //             setWeatherApiKey(data.weatherApiKey)
    //         } catch (error) {
    //             console.error('Error fetching weather API key:', error)
    //         }
    //     }

    //     fetchWeatherApiKey()
    // }, [])

    useEffect(() => {
        const fetchWeatherByLocation = async () => {
            try {
                if (weatherApiKey) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords
                            const response = await fetch(
                                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=c289d5ddb9dcd1282b02b4a11cdaa063`
                            )
                            const locationData = await response.json()

                            if (
                                locationData.length > 0 &&
                                locationData[0].postal_code
                            ) {
                                const zipCode = locationData[0].postal_code
                                const weatherResponse = await fetch(
                                    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=c289d5ddb9dcd1282b02b4a11cdaa063`
                                )
                                const weatherData = await weatherResponse.json()
                                setWeatherData(weatherData)
                            }
                        },
                        (error) => {
                            console.error('Error getting user location:', error)
                        }
                    )
                }
            } catch (error) {
                console.error('Error fetching weather:', error)
            }
        }

        fetchWeatherByLocation()
    }, [weatherApiKey])

    useEffect(() => {
        fetchTodos()
    }, [])

    const openDialog = () => {
        setShowDialog(true)
    }

    const closeDialog = () => {
        setShowDialog(false)
    }

    const addGreenhouseTask = (newTodo) => {
        setTodos([newTodo, ...todos])
        closeDialog() // Close the dialog after adding a todo
    }

    const handleManualZipcodeChange = (event) => {
        setManualZipcode(event.target.value)
    }

    const fetchManualWeather = async () => {
        try {
            if (manualZipcode && weatherApiKey) {
                const response = await fetch(
                    `http://api.openweathermap.org/data/2.5/weather?zip=${manualZipcode}&units=imperial&appid=${weatherApiKey}`
                )
                const data = await response.json()
                setManualWeatherData(data)
            }
        } catch (error) {
            console.error('Error fetching manual weather:', error)
        }
    }
    const fetchTodos = async () => {
        try {
            const response = await fetch(`http://localhost:8000/dashboard`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error('Error fetching todos:', error)
        }
    }
    return (
        <Container className="container" style={{ textAlign: 'center' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper className="dashboard-card">
                        <Typography variant="h4" gutterBottom>
                            Plant Care Dashboard
                        </Typography>
                        {/* Add Greenhouse Task Button */}
                        <Button className="button" onClick={openDialog}>
                            Add Greenhouse Task
                        </Button>

                        <DailyTodoList todos={todos} setTodos={setTodos} />
                        <Box>
                            {/* Manual Weather Entry */}
                            <TextField
                                label="Enter ZIP code for manual weather"
                                variant="outlined"
                                value={manualZipcode}
                                onChange={handleManualZipcodeChange}
                            />
                            <Button
                                className="button"
                                onClick={fetchManualWeather}
                            >
                                Fetch Manual Weather
                            </Button>
                            {manualWeatherData && (
                                <div>
                                    <Typography variant="h6">
                                        Manual Weather Information
                                    </Typography>
                                    <Typography>{`Temperature: ${manualWeatherData.main.temp} °F`}</Typography>
                                    <Typography>{`Description: ${manualWeatherData.weather[0].description}`}</Typography>
                                </div>
                            )}
                        </Box>
                        {/* AddTodoDialog Component */}
                        <Dialog open={showDialog} onClose={closeDialog}>
                            <AddTodoDialog
                                onClose={closeDialog}
                                onAddTodo={addGreenhouseTask}
                            />
                        </Dialog>
                        {/* Placeholder for Severe Weather Warning */}
                        <WeatherWidget zipcode={manualZipcode} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard
