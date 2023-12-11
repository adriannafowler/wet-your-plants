import React, { useEffect, useState } from 'react'
import {
    TextField,
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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddTodoDialog = ({ onClose, onAddTodo, plantid }) => {
    const [todoName, setTodoName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [recurrence, setRecurrence] = useState('once')
    const [isRecurring, setIsRecurring] = useState(false)
    const [dueDateError, setDueDateError] = useState('')
    const navigate = useNavigate()

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
            due_date: dueDate, // Assuming you want to use the state variable dueDate
            recurrence: isRecurring ? recurrence : 'once',
        }

        try {
            const response = await fetch(
                `http://localhost:8000/dashboard/?plant_id=${plantid}`,
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
            navigate('/dashboard')
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
                        label="Due Date"
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
