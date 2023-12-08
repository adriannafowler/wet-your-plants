import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './greenhouse.css'
import Can from './watering_can.svg'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, Typography, Drawer, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddPlantDialog from './plant_form'

import SideDrawer from './sidedrawer'

const Greenhouse = () => {
    const [info, setInfo] = useState([])
    const [plants, setPlants] = useState([])
    const [newToken, setNewToken] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(false)
    const updatePlants = (newPlant) => {
        setPlants([...plants, newPlant])
    }
    const handleAddPlantClick = () => {
        setIsAddPlantDialogOpen(true)
    }

    const handleAddPlantDialogClose = () => {
        setIsAddPlantDialogOpen(false)
    }

    useEffect(() => {
        if (!newToken) {
            navigate('/signin/')
        }
    }, [newToken, navigate])

    const fetchToken = async () => {
        try {
            const url = `http://localhost:8000/token/`
            const response = await fetch(url, {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('HTTP error!')
            }
            const data = await response.json()
            setInfo(data.account.name)
            setNewToken(data.access_token)
        } catch (error) {
            console.error('Error fetching token:', error)
        }
    }

    const fetchPlants = async () => {
        try {
            const url = `http://localhost:8000/greenhouse/`
            const response = await fetch(url, {
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch plants')
            }
            const data = await response.json()
            setPlants(data)
        } catch (error) {
            console.error('Error fetching plants:', error)
        }
    }

    useEffect(() => {
        fetchToken()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [newToken])

    return (
        <>
            {newToken ? (
                <div className="overall">
                    <div className="top">
                        <div className="header">
                            <div className="icon_div">
                                <SideDrawer />
                            </div>
                            <div className="inventory_name">
                                {info}'s Greenhouse
                            </div>
                            <div className="icon_div">
                                <button className="watering_can_button">
                                    <img
                                        className="watering_can"
                                        src={Can}
                                    ></img>
                                </button>
                            </div>
                        </div>
                        <div className="add_plant_div">
                            <IconButton
                                className="add-plant-button"
                                onClick={handleAddPlantClick}
                                style={{ fontSize: '36px' }}
                            >
                                <AddIcon className="add_plant_icon"></AddIcon>
                            </IconButton>
                            <AddPlantDialog
                                open={isAddPlantDialogOpen}
                                onClose={handleAddPlantDialogClose}
                                updatePlants={updatePlants}
                            />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="plant_container">
                            {plants.map((plant) => (
                                <a
                                    className="plant_link"
                                    href={`http://localhost:3000/greenhouse/${plant.id}`}
                                >
                                    <div className="card" key={plant.id}>
                                        <div className="card_content">
                                            <img
                                                className="plant_image"
                                                src={plant.original_url}
                                            ></img>
                                            <h3 className="plant_name">
                                                {plant.common_name}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Please Log In</h1>
                </div>
            )}
        </>
    )
}

export default Greenhouse
