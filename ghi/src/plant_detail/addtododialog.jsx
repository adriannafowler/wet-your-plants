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

const AddTodoDialog = ({ onClose, onAddTodo }) => {
    const [todoName, setTodoName] = useState('')
    const [recurrence, setRecurrence] = useState('once')
    const [isRecurring, setIsRecurring] = useState(false)

    const handleTodoNameChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleRecurrenceChange = (e) => {
        setRecurrence(e.target.value)
    }

    const handleIsRecurringChange = (e) => {
        setIsRecurring(e.target.checked)
    }

    const handleAddTodo = () => {
        const newTodo = {
            name: todoName,
            recurrence: isRecurring ? recurrence : 'once',
        }

        onAddTodo(newTodo)

        setTodoName('')
        setRecurrence('once')
        setIsRecurring(false)
        onClose() // Close the dialog after adding a todo
    }

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Greenhouse Task</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Task Name"
                            fullWidth
                            value={todoName}
                            onChange={handleTodoNameChange}
                        />
                    </Grid>
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

// import React, { useState } from 'react'
// import {
//     TextField,
//     Button,
//     Select,
//     MenuItem,
//     FormControl,
//     Checkbox,
//     FormControlLabel,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
// } from '@mui/material'

// const AddTodoDialog = ({ onClose, onAddTodo }) => {
//     const [todoName, setTodoName] = useState('')
//     const [recurrence, setRecurrence] = useState('once')
//     const [isRecurring, setIsRecurring] = useState(false)

//     const handleTodoNameChange = (e) => {
//         setTodoName(e.target.value)
//     }

//     const handleRecurrenceChange = (e) => {
//         setRecurrence(e.target.value)
//     }

//     const handleIsRecurringChange = (e) => {
//         setIsRecurring(e.target.checked)
//     }

//     const handleAddTodo = () => {
//         const newTodo = {
//             name: todoName,
//             recurrence: isRecurring ? recurrence : 'once',
//         }

//         onAddTodo(newTodo)

//         setTodoName('')
//         setRecurrence('once')
//         setIsRecurring(false)
//     }

//     return (
//         <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
//             <DialogTitle>Add New Todo</DialogTitle>
//             <DialogContent>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Add Todo"
//                             fullWidth
//                             value={todoName}
//                             onChange={handleTodoNameChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <FormControl fullWidth margin="normal">
//                                 <DialogTitle>Select Recurrence</DialogTitle>
//                             <Select
//                                 value={recurrence}
//                                 onChange={handleRecurrenceChange}
//                                 disabled={!isRecurring}
//                             >
//                                 <MenuItem value="once">Once</MenuItem>
//                                 <MenuItem value="daily">Daily</MenuItem>
//                                 <MenuItem value="weekly">Weekly</MenuItem>
//                                 <MenuItem value="biweekly">Biweekly</MenuItem>
//                                 <MenuItem value="monthly">Monthly</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={isRecurring}
//                                     onChange={handleIsRecurringChange}
//                                 />
//                             }
//                             label="Recurring"
//                         />
//                     </Grid>
//                 </Grid>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={handleAddTodo}>Add Todo Now</Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default AddTodoDialog
