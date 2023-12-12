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

const DailyTodoList = ({ todos, setTodos, onClose, onAddTodo }) => {
    const [task, setTask] = useState('')

    const addTodo = () => {
        if (task.trim() !== '') {
            const newTodo = { text: task, complete: false }
            onAddTodo(newTodo)
            setTask('')
        }
    }

    const toggleTodo = (index) => {
        const updatedTodo = {
            ...todos[index],
            complete: !todos[index].complete,
        }
        fetch(
            `http://localhost:8000/dashboard/complete/?todo_id=${todos[index].id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    complete: updatedTodo.complete,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update todo completion status')
                }
                return response.json()
            })
            .then((updatedTodo) => {
                // Update the state only after the server confirms the change
                const newTodos = [...todos]
                newTodos[index] = updatedTodo
                // Assuming there's a state setter function provided, e.g., setTodos
                setTodos(newTodos)
            })
            .catch((error) => {
                console.error('Error updating todo:', error)
            })
    }

    const removeTodo = (index) => {
        // Remove the todo from the server
        // ...

        const newTodos = [...todos]
        newTodos.splice(index, 1)
        // setTodos(newTodos) // this needs to be passed in from parent component as a prompt?
    }
    return (
        <div className="todo-list">
            {todos.length > 0 && (
                <List>
                    {todos.map((todo, index) => (
                        <ListItem key={index} className="todo-item">
                            <Checkbox
                                className="checkbox"
                                checked={todo.complete}
                                onClick={() => toggleTodo(index)}
                            />
                            <ListItemText
                                primary={todo.todo}
                                style={{
                                    textDecoration: todo.complete
                                        ? 'line-through'
                                        : 'none',
                                }}
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
