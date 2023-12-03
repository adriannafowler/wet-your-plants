import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import sadPlant from './sad-plant.svg'

const SearchBar = ({setSearchQuery, onSearch}) => (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onChange={(e) => {
            setSearchQuery(e.target.value);
            }}
            label="Enter a plant name"
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
        <IconButton type="submit" aria-label="search" onClick={onSearch}>
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
        </form>
    );

export default function EditDialog({ open, onClose, plantId, initialData }) {
    const PERENUAL_API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;
    const [formData, setFormData] = useState(initialData);
    const [step, setStep] = useState(1);
    const [speciesId, setSpeciesId] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [wateringSchedules, setWateringSchedules] = useState([])

    const fetchWateringSchedules = async () => {
        const url = 'http://localhost:8000/watering-schedules/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setWateringSchedules(data)
        }
    }

    useEffect(() => {
        fetchWateringSchedules();
    }, []);

    const onSearch = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            await getPlantSpecies(searchQuery);
        }
    };

    const getPlantSpecies = async (searchQuery) => {
        const response = await fetch (`https://perenual.com/api/species-list?key=${PERENUAL_API_KEY}&q=${searchQuery}`)
        if (response.ok) {
            const data = await response.json()
            setSearchResults(data.data)
        }
    }

    const handleSpeciesSelect = (selectedSpecies) => {
        setSpeciesId(selectedSpecies.id);
        setFormData({ ...formData, common_name: selectedSpecies.common_name });
        setStep(2);
    };

    const SearchResultsDropdown = ({ searchResults, onSelect }) => {
        return (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {searchResults.map((item) => (
                    <div key={item.id} onClick={() => onSelect(item)} style={{ cursor: 'pointer', padding: '10px' }}>
                        <img
                            src={item.default_image?.medium_url || sadPlant}
                            alt={item.common_name}
                            style={{ width: '100px', height: 'auto' }}
                        />
                    <div>{item.common_name}</div>
                </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        if (searchQuery) {
            getPlantSpecies(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        setFormData(initialData); // Set initial form data
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        console.log('formData:', formData)
        try {
            const submitData = {
                name: formData.name,
                source: formData.source,
                species_id: speciesId,
                watering_schedule: formData.watering_schedule
            }
            const response = await fetch(`http://localhost:8000/greenhouse/${plantId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                throw new Error('Failed to update the plant.');
            }

            console.log('Plant updated successfully');
            onClose(); // Close the dialog after successful update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Plant</DialogTitle>
            <DialogContent>
                {step === 1 && (
                    <>
                        <SearchBar setSearchQuery={setSearchQuery} onSearch={onSearch} />
                        <SearchResultsDropdown searchResults={searchResults} onSelect={handleSpeciesSelect} />
                    </>
                )}
                {step === 2 && (
                    <>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="source"
                            label="Source"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.source}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="watering-schedule-label">Watering Schedule</InputLabel>
                            <Select
                                labelId="watering-schedule-label"
                                value={formData.watering_schedule}
                                label="Watering Schedule"
                                onChange={(e) => setFormData({ ...formData, watering_schedule: e.target.value })}
                            >
                                {wateringSchedules.map((schedule) => (
                                    <MenuItem key={schedule.id} value={schedule.id}>
                                        {schedule.schedule}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
            </DialogContent>
            <DialogActions>
            {step === 2 && (
                    <>
                        <Button onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </>
                )}
                {step === 1 && (
                    <Button onClick={onClose}>Cancel</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
