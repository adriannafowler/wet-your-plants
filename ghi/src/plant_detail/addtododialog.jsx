import React, { useState } from 'react'
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

const AddTodoDialog = ({ onClose, onAddTodo }) => {
    const [todoName, setTodoName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [recurrence, setRecurrence] = useState('once')
    const [isRecurring, setIsRecurring] = useState(false)
    const navigate = useNavigate()

    const handleTodoNameChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value)
    }
    
    const handleRecurrenceChange = (e) => {
        setRecurrence(e.target.value)
    }

    const handleIsRecurringChange = (e) => {
        setIsRecurring(e.target.checked)
    }

    const handleAddTodo = async () => {
        const newTodo = {
            todo: todoName,
            due_date: '2021-10-10',
            recurrence: isRecurring ? recurrence : 'once',
        }
    
        try {
            const response = await fetch('http://localhost:8000/dashboard?plant_id=5', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });
            const data = await response.json();
            console.log(data);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Greenhouse Task</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}></Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Task Name"
                            fullWidth
                            value={todoName}
                            onChange={handleTodoNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Due Date"
                            fullWidth
                            value={dueDate}
                            onChange={handleDueDateChange}
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
