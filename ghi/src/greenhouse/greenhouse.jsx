import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Can from '../public/watering_can.svg'
import { IconButton, Tooltip, Typography } from '@mui/material'
import AddPlantDialog from './plant_form'
import SideDrawer from './sidedrawer'
import LoginModal from './loginmodal'
import './greenhouse.css'
import add_button from '../public/add_button.svg'
import { Link } from 'react-router-dom';

const Greenhouse = () => {
    const [info, setInfo] = useState([])
    const [plants, setPlants] = useState([])
    const [newToken, setNewToken] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(false)

    const handleAddPlantClick = () => {
        setIsAddPlantDialogOpen(true)
    }

    const handleModalClose = (redirectTo) => {
        setModalOpen(false)
        if (redirectTo) {
            navigate(redirectTo)
        }
    }

    const handleAddPlantDialogClose = () => {
        setIsAddPlantDialogOpen(false)
    }

    const fetchTokenOrRedirect = async () => {
        try {
            const url = `http://localhost:8000/token/`
            const response = await fetch(url, {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('HTTP error!')
            }
            const data = await response.json()
            const fullName = data.account.name
            const splitName = fullName.split(' ')
            const firstName = splitName.length > 0 ? splitName[0] : ''
            setInfo(firstName)
            setNewToken(data.access_token)
        } catch (error) {
            console.error('Error fetching token:', error)
            setModalOpen(true)
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
        fetchTokenOrRedirect()
    }, [navigate])

    useEffect(() => {
        fetchPlants()
    }, [newToken])

    return (
        <>
            <div className="overall">
                <div className="top">
                    <div className="header">
                        <div className="icon_div">
                            <SideDrawer />
                        </div>
                        <div className="inventory_name">
                            {info}'s Greenhouse
                        </div>
                        <Tooltip title="Open care dashboard">
                            <div className="watering_can_div">
                                <Link to="/dashboard">
                                    <button className="watering_can_button">
                                        <img
                                            className="watering_can"
                                            src={Can}
                                        ></img>
                                    </button>
                                </ Link>
                            </div>
                        </Tooltip>
                    </div>
                    <div className="add_plant_div">
                        <IconButton
                            className="add-plant-button"
                            onClick={handleAddPlantClick}
                            style={{ fontSize: '36px' }}
                        >
                            <Tooltip title="Add a plant">
                                <img
                                    src={add_button}
                                    alt="Add a Plant"
                                    className="add_plant_icon"
                                />
                            </Tooltip>
                        </IconButton>
                        <AddPlantDialog
                            open={isAddPlantDialogOpen}
                            onClose={handleAddPlantDialogClose}
                        />
                    </div>
                </div>
                <div className="middle">
                    <div className="plant_container">
                        {plants.map((plant) => (
                            <Link
                                key={plant.id}
                                className="plant_link"
                                to={`http://localhost:3000/greenhouse/${plant.id}`}
                            >
                                <div className="card">
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
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <LoginModal
                message="Login to see greenhouse"
                isOpen={modalOpen}
                onRequestClose={handleModalClose}
                redirectTo="/login"
            />
        </>
    )
}

export default Greenhouse
