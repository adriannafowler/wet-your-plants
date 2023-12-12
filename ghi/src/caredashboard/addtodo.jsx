
// import React, { useState } from 'react'
// import {
//     TextField,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
// } from '@mui/material'
// import { useNavigate } from 'react-router-dom'

// const AddTodoDialog = ({ onClose, onAddGenericTodo, userid }) => {
//     const [todoName, setTodoName] = useState('')
//     const [dueDate, setDueDate] = useState('')
//     const [dueDateError, setDueDateError] = useState('')
//     const navigate = useNavigate()

//     const handleTodoNameChange = (e) => {
//         setTodoName(e.target.value)
//     }

//     const handleDueDateChange = (e) => {
//         const inputDate = e.target.value
//         setDueDate(inputDate)

//         if (!isValidDate(inputDate)) {
//             setDueDateError('Please enter a valid date (yyyy-mm-dd)')
//         } else {
//             setDueDateError('')
//         }
//     }

//     const isValidDate = (dateString) => {
//         const regEx = /^\d{4}-\d{2}-\d{2}$/
//         return regEx.test(dateString)
//     }

//     const handleAddGenericTodo = async () => {
//         const newGenericTodo = {
//             user_id: userid,
//             todo: todoName,
//             due_date: dueDate,
//         }

//         try {
//             const response = await fetch(
//                 `http://localhost:8000/dashboard/generic-todo`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                     body: JSON.stringify(newGenericTodo),
//                 }
//             )
//             const data = await response.json()
//             navigate('/dashboard')
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     return (
//         <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
//             <DialogContent>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <DialogTitle>Add New Generic To-Do</DialogTitle>
//                         <TextField
//                             label="Task Name"
//                             fullWidth
//                             value={todoName}
//                             onChange={handleTodoNameChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <DialogTitle>To-Do Due Date</DialogTitle>
//                         <TextField
//                             label="Must be yyyy-mm-dd"
//                             fullWidth
//                             value={dueDate}
//                             onChange={handleDueDateChange}
//                             error={!!dueDateError}
//                             helperText={dueDateError}
//                         />
//                     </Grid>
//                 </Grid>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={handleAddGenericTodo}>Add Task</Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default AddTodoDialog
