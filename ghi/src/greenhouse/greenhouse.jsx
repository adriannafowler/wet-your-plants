//all of this code will need to be added to the main function/exported component
//to be able to work with the
// import AddPlantDialog from "./plant_form";

// const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(false);

// const handleAddPlantClick = () => {
//     setIsAddPlantDialogOpen(true);
//     };

// const handleAddPlantDialogClose = () => {
//     setIsAddPlantDialogOpen(false);
//     };
// //In the returned jsx,
// <>
//     <button className='add-plant-button' variant="contained" onClick={handleAddPlantClick}>
//         <AddPlantIcon />
//     </button>
//     <AddPlantDialog
//         open={isAddPlantDialogOpen}
//         onClose={handleAddPlantDialogClose}
//     />
// </>
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './greenhouse.css'
import Can from './watering_can.svg'

const Greenhouse = () => {
    const [info, setInfo] = useState([])
    const [plants, setPlants] = useState([])
    const [newToken, setNewToken] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!newToken) {
            navigate('/signin/')
        }
    }, [newToken])

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
        console.log(newToken)
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
                                <hamburger />
                                <img
                                    className="hamburger"
                                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                                ></img>
                            </div>
                            <div className="inventory_name">
                                {info}'s Greenhouse
                            </div>
                            <div className="icon_div">
                                <img className="watering_can" src={Can}></img>
                            </div>
                        </div>
                        <div className="weather_bar_div"></div>
                    </div>
                    <div className="middle">
                        <div className="plant_container">
                            {plants.map((plant) => (
                                <a
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
