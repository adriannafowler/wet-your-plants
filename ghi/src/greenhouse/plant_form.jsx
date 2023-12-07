import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import sadPlant from '../public/sad-plant.svg'

const SearchBar = ({ setSearchQuery, onSearch }) => (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onChange={(e) => {
                setSearchQuery(e.target.value)
            }}
            label="Enter a plant name"
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
        <IconButton type="submit" aria-label="search" onClick={onSearch}>
            <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
    </form>
)

export default function AddPlantDialog({ open, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        source: '',
        watering_schedule: 2,
    })
    const [step, setStep] = useState(1)
    const [speciesId, setSpeciesId] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [wateringSchedules, setWateringSchedules] = useState([])
    const navigate = useNavigate()

    const fetchWateringSchedules = async () => {
        const url = 'http://localhost:8000/watering-schedules/'
        const response = await fetch(url, {
            credentials: 'include',
        })
        if (response.ok) {
            const data = await response.json()
            setWateringSchedules(data)
        }
    }

    useEffect(() => {
        fetchWateringSchedules()
    }, [])

    const onSearch = async (e) => {
        e.preventDefault()
        if (searchQuery) {
            await getPlantSpecies(searchQuery)
        }
    }

    const getPlantSpecies = async (searchQuery) => {
        const response = await fetch(
            `http://localhost:8000/species_ids/${searchQuery}`,
            { credentials: 'include' }
        )
        if (response.ok) {
            const data = await response.json()
            setSearchResults(data.species)
        }
    }

    const handleSpeciesSelect = (selectedSpecies) => {
        setSpeciesId(selectedSpecies.id)
        setFormData({ ...formData, species_id: selectedSpecies.id })
        setStep(2)
    }

    useEffect(() => {}, [formData, speciesId])

    const SearchResultsDropdown = ({ searchResults, onSelect }) => {
        return (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {searchResults.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        style={{ cursor: 'pointer', padding: '10px' }}
                    >
                        <img
                            src={item.original_url || sadPlant}
                            alt={item.common_name}
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <div>{item.common_name}</div>
                    </div>
                ))}
            </div>
        )
    }

    useEffect(() => {
        if (searchQuery) {
            getPlantSpecies(searchQuery)
        }
    }, [searchQuery])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        const submitData = {
            name: formData.name,
            source: formData.source,
            species_id: formData.species_id,
            watering_schedule: formData.watering_schedule,
        }
        window.location.reload()

        // const handleReload = async () => {
        //     window.location.reload()
        // }

        try {
            const response = await fetch(`http://localhost:8000/greenhouse/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                },
                body: JSON.stringify(submitData),
                credentials: 'include',
            })

            if (!response.ok) {
                const errorDetails = await response.json()
                console.error('Submission error details:', errorDetails)
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            onClose()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Plant</DialogTitle>
            <DialogContent>
                {step === 1 && (
                    <>
                        <SearchBar
                            setSearchQuery={setSearchQuery}
                            onSearch={onSearch}
                        />
                        <SearchResultsDropdown
                            searchResults={searchResults}
                            onSelect={handleSpeciesSelect}
                        />
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
                            <InputLabel id="watering-schedule-label">
                                Watering Schedule
                            </InputLabel>
                            <Select
                                labelId="watering-schedule-label"
                                value={formData.watering_schedule}
                                label="Watering Schedule"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        watering_schedule: e.target.value,
                                    })
                                }
                            >
                                {wateringSchedules.map((schedule) => (
                                    <MenuItem
                                        key={schedule.id}
                                        value={schedule.id}
                                    >
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
                {step === 1 && <Button onClick={onClose}>Cancel</Button>}
            </DialogActions>
        </Dialog>
    )
}
