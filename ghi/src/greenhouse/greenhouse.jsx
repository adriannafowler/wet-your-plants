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
import './greenhouse.css'

const Greenhouse = () => {
    return (
        <div className="big">
            <div className="header">
                <div>
                    <img className="hamburger" src=""></img>
                </div>
                <div className="inventory_name">User's Greenhouse</div>
                <div>
                    <img className="watering_can" src=""></img>
                </div>
            </div>
        </div>
    )
}

export default Greenhouse
