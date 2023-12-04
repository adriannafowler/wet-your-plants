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
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import './greenhouse.css'

const Greenhouse = () => {
    // const [info, setInfo] = useState([])
    // const { token } = useAuthContext()

    // const fetchToken = async () => {
    //     const url = `http://localhost:8000/token/`
    //     const response = await fetch(url, {
    //         credentials: 'include',
    //     })
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setInfo(data)
    //     }
    // }

    // const fetchName = async () => {
    //     const url = `http://localhost:8000/users/${user_id}/`
    //     const response = await fetch(url)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setInfo(data)
    //     }
    // }

    // useEffect(() => {
    //     fetchName()
    // }, [])

    return (
        <div className="overall">
            <div className="top">
                <div className="header">
                    <div className="icon_div">
                        <img
                            className="hamburger"
                            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                        ></img>
                    </div>
                    <div className="inventory_name">{info.name}</div>
                    <div className="icon_div">
                        <img
                            className="watering_can"
                            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                        ></img>
                    </div>
                </div>
                <div className="weather_bar_div"></div>
            </div>
            <div className="plant_container">
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
                <div className="card">
                    <img
                        className="plant_image"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png"
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default Greenhouse
