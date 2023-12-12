import React, { useEffect, useState } from 'react'
import {
    TextField,
    InputLabel,
    Button,
    Select,
    MenuItem,
    FormControl,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'


const AddTodoDialog = ({ onClose, onAddTodo, plantid }) => {
    const [todoName, setTodoName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [recurrence, setRecurrence] = useState('once')
    const [isRecurring, setIsRecurring] = useState(false)
    const [dueDateError, setDueDateError] = useState('')
    const navigate = useNavigate()
    const [plants, setPlants] = useState([])
    const [selectedPlantId, setSelectedPlantId] = useState('')

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
        fetchPlants();
    }, []);

    const handleTodoNameChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleRecurrenceChange = (e) => {
        setRecurrence(e.target.value)
    }

    const handleIsRecurringChange = (e) => {
        setIsRecurring(e.target.checked)
    }

    const handleDueDateChange = (e) => {
        const inputDate = e.target.value
        setDueDate(inputDate)

        if (!isValidDate(inputDate)) {
            setDueDateError('Please enter a valid date (yyyy-mm-dd)')
        } else {
            setDueDateError('')
        }
    }


    const isValidDate = (dateString) => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/
        return regEx.test(dateString)
    }

    const handleAddTodo = async () => {
        const newTodo = {
            todo: todoName,
            due_date: dueDate,
        }

        try {
            const response = await fetch(
                `http://localhost:8000/dashboard/?plant_id=${selectedPlantId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(newTodo),
                    query: {
                        plant_id: plantid,
                    },
                }
            )
            const data = await response.json()
            console.log(newTodo)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Grid container spacing={2}></Grid>
                <Grid item xs={12}>
                    <DialogTitle>Add New To-Do Here</DialogTitle>
                    <Box sx={{ my: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="plant-select-label">Select a Plant</InputLabel>
                            <Select
                                labelId="plant-select-label"
                                value={selectedPlantId}
                                label="Select a Plant"
                                onChange={(e) => setSelectedPlantId(e.target.value)}
                            >
                                {plants.map((plant) => (
                                    <MenuItem key={plant.id} value={plant.id}>
                                        <ul>
                                            <li>
                                                {plant.common_name}
                                                <img src={plant.original_url} style={{ width: '100px', height: '100px' }}/>
                                            </li>
                                        </ul>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        label="Task Name"
                        fullWidth
                        value={todoName}
                        onChange={handleTodoNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DialogTitle>To-Do Due Date</DialogTitle>
                    <TextField
                        label="Must be yyyy-mm-dd"
                        fullWidth
                        value={dueDate}
                        onChange={handleDueDateChange}
                        error={!!dueDateError}
                        helperText={dueDateError}
                    />
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <DialogTitle>Select Recurrence</DialogTitle>
                            <Select
                                value={recurrence}
                                onChange={handleRecurrenceChange}
                                disabled={!isRecurring}
                            >
                                <MenuItem value="once">Once</MenuItem>
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="biweekly">Biweekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isRecurring}
                                    onChange={handleIsRecurringChange}
                                />
                            }
                            label="Recurring"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddTodo}>Add Task</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTodoDialog
