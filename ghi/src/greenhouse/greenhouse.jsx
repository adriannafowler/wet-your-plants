
//all of this code will need to be added to the main function/exported component
//to be able to work with the
import AddPlantDialog from "./plant_form";

const [isAddPlantDialogOpen, setIsAddPlantDialogOpen] = useState(false);

const handleAddPlantClick = () => {
    setIsAddPlantDialogOpen(true);
    };

const handleAddPlantDialogClose = () => {
    setIsAddPlantDialogOpen(false);
    };
//In the returned jsx,
<>
    <button className='add-plant-button' variant="contained" onClick={handleAddPlantClick}>
        <AddPlantIcon />
    </button>
    <AddPlantDialog
        open={isAddPlantDialogOpen}
        onClose={handleAddPlantDialogClose}
    />
</>
