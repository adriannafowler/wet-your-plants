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
import { useState, useEffect } from 'react'
import './greenhouse.css'
import Can from './watering_can.svg'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'

const Greenhouse = () => {
    const [user_id, setUserId] = useState([])
    const [info, setInfo] = useState([])
    const [plants, setPlants] = useState([])
    const { token } = useAuthContext

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
            console.log(data)
            setUserId(data.account.id)
        } catch (error) {
            console.error('Error fetching token:', error)
        }
    }

    const fetchName = async () => {
        const url = `http://localhost:8000/users/${user_id}`
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.ok) {
            const data2 = await response.json()
            console.log(data2)
            setInfo(data2)
        }
    }

    const fetchPlants = async () => {
        try {
            const url = `http://localhost:8000/greenhouse/${user_id}`
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch plants')
            }
            const data = await response.json()
            setPlants(data)
            console.log(plants)
        } catch (error) {
            console.error('Error fetching plants:', error)
        }
    }

    useEffect(() => {
        fetchToken()
    }, [])

    useEffect(() => {
        fetchName()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [token])

    return (
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
                        {info.name}'s Greenhouse
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
    )
}

export default Greenhouse
