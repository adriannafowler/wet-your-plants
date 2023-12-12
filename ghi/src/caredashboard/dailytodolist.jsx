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
    const [todoID, setTodoId] = useState('')
    const addTodo = () => {
        if (task.trim() !== '') {
            const newTodo = { text: task, complete: false }
            onAddTodo(newTodo)
            setTask('')
        }
    }

    const toggleTodo = (todoId) => {
        // Find the todo item using todoId
        const todoToUpdate = todos.find((todo) => todo.id === todoId)
        if (!todoToUpdate) return

        const updatedTodo = {
            ...todoToUpdate,
            complete: !todoToUpdate.complete,
        }

        const response = fetch(
            `http://localhost:8000/dashboard/complete/${todoId}/`,
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
            .then((updatedTodoFromServer) => {
                // Update the state only after the server confirms the change
                const newTodos = todos.map((todo) =>
                    todo.id === todoId ? updatedTodoFromServer : todo
                )
                setTodos(newTodos)
            })
            .catch((error) => {
                console.error('Error updating todo:', error)
            })
    }

    const removeTodo = async (todoId) => {
        if (!todoId) return
        try {
            const response = await fetch(
                `http://localhost:8000/dashboard/${todoId}/`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete the todo.')
            }
            console.log('Todo deleted successfully')

            // Update the state to reflect the deleted todo
            const newTodos = todos.filter((todo) => todo.id !== todoId)
            setTodos(newTodos)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <div className="todo-list">
            {todos.length > 0 && (
                <List>
                    {todos.map((todo) => (
                        <ListItem key={todo.id} className="todo-item">
                            <Checkbox
                                className="checkbox"
                                checked={todo.complete}
                                onClick={() => toggleTodo(todo.id)}
                            />
                            <ListItemText
                                primary={todo.todo}
                                className='(todo.complete ? "complete" : "")'
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
                                    onClick={() => removeTodo(todo.id)}
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
