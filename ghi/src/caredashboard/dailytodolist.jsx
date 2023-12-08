import React, { useState } from 'react'
import {
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
    IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import './dashboard.css'

const DailyTodoList = ({ todos, onClose, onAddTodo }) => {
    const [task, setTask] = useState('')

    const addTodo = () => {
        if (task.trim() !== '') {
            const newTodo = { text: task, completed: false }
            onAddTodo(newTodo)
            setTask('')
        }
    }

    const toggleTodo = (index) => {
        const newTodos = [...todos]
        newTodos[index].completed = !newTodos[index].completed
        // Update the server with the new status if needed
    }

    const removeTodo = (index) => {
        // Remove the todo from the server
        // ...

        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    return (
        <div className="todo-list">
            <TextField
                label="Add a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button className="button" onClick={addTodo}>
                Add
            </Button>

            {todos.length > 0 && (
                <List>
                    {todos.map((todo, index) => (
                        <ListItem key={index} className="todo-item">
                            <Checkbox
                                className="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(index)}
                            />
                            <ListItemText
                                primary={todo.text}
                                className={todo.completed ? 'completed' : ''}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    className="delete-button"
                                    onClick={() => removeTodo(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button className="close-button" onClick={onClose} color="primary">
                Close
            </Button>
        </div>
    )
}

export default DailyTodoList
