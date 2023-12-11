import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
    List,
    ListItemText,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import DeleteDialog from './delete_modal'
import EditDialog from './edit_modal'
import AddTodoDialog from './addtododialog'
// import './pd.css'
import './detail.css'

function CustomTabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function PlantDetail() {
    const [newToken, setNewToken] = useState([])
    const [value, setValue] = useState(0)
    const [details, setDetails] = useState({})
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState(false)
    const navigate = useNavigate()
    const param = useParams()
    const plant_id = param.id

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/greenhouse/${plant_id}/`,
                    {
                        credentials: 'include',
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    setDetails(data)
                }
            } catch (error) {
                console.error('Error fetching plant details:', error)
            }
        }

        const fetchTodos = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/dashboard?plant_id=${plant_id}`,
                    {
                        credentials: 'include',
                    }
                )

                if (response.ok) {
                    const todosData = await response.json()
                    setTodos(todosData)
                }
            } catch (error) {
                console.error('Error fetching todos:', error)
            }
        }

        const checkToken = () => {
            if (!newToken) {
                navigate('/signin/')
            }
        }
        fetchPlantData()
        fetchTodos()
        checkToken()
    }, [newToken, navigate, plant_id])

    const fetchToken = async () => {
        try {
            const url = `http://localhost:8000/token/`
            const response = await fetch(url, {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('HTTP error!')
            }
            const data = await response.json()
            setNewToken(data.access_token)
        } catch (error) {
            console.error('Error fetching token:', error)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const DeleteDialogRef = useRef()

    const handleDeleteClick = () => {
        DeleteDialogRef.current.showDialog()
    }

    const handleEditClick = () => {
        setIsEditDialogOpen(true)
    }

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false)
    }

    const handleAddTodoClick = () => {
        setIsAddTodoDialogOpen(true)
    }

    const handleAddTodoDialogClose = () => {
        setIsAddTodoDialogOpen(false)
    }

    const handleAddTodo = async (newTodoData) => {
        try {
            const response = await fetch(
                `http://localhost:8000/greenhouse/${plant_id}/todos/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(newTodoData),
                }
            )

            if (response.ok) {
                // Fetch updated todos
                fetchTodos()
                handleAddTodoDialogClose()
            }
        } catch (error) {
            console.error('Error adding todo:', error)
        }
    }

    const handleSave = () => {
        // Handle Save logic here
    }

    return (
        <>
            <div className="card-container">
                <div className="return_button">
                    <a href="http://localhost:3000/greenhouse">
                        <IconButton>
                            <Typography
                                style={{
                                    fontFamily: 'Virgil, sans-serif',
                                    fontSize: 18,
                                    color: 'black',
                                }}
                            >
                                Return To Greenhouse
                            </Typography>
                        </IconButton>
                    </a>
                </div>
                <Card
                    sx={{
                        borderRadius: '20px',
                        width: '800px',
                        margin: 'auto',
                    }}
                >
                    <div className="media-content">
                        <div className="image-container">
                            <img
                                src={details.original_url}
                                alt="Plant"
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px',
                                }}
                            />
                            <div className="action-buttons">
                                <IconButton onClick={handleDeleteClick}>
                                    <HighlightOffIcon />
                                </IconButton>
                                <IconButton onClick={handleEditClick}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div
                        className="details"
                        sx={{
                            borderTop: 1,
                            borderColor: 'divider',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                        }}
                    >
                        <CardActions>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                className="tab-labels"
                                variant="fullWidth"
                            >
                                <Tab
                                    label="Description"
                                    {...a11yProps(0)}
                                    className="tab"
                                />
                                <Tab
                                    className="tab"
                                    label="Plant Care"
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    className="tab"
                                    label="Care History"
                                    {...a11yProps(2)}
                                />
                                <Tab
                                    className="tab"
                                    label="Dashboard Todos"
                                    {...a11yProps(3)}
                                />
                            </Tabs>
                        </CardActions>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                className="plant_name"
                            >
                                {details.common_name === details.name ? (
                                    `${details.common_name}`
                                ) : (
                                    <>
                                        {`Hi, my name is ${details.name} and I am a ${details.common_name}`}
                                    </>
                                )}
                            </Typography>
                            <div className="tabs-content">
                                <CustomTabPanel value={value} index={0}>
                                    {details.description}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <List>
                                        <ListItemText
                                            primary={`Care level: ${details.care_level}`}
                                        />
                                        <ListItemText
                                            primary={`Watering needs: ${details.watering}`}
                                        />
                                        <ListItemText
                                            primary={`Sunlight needs: ${details.sunlight}`}
                                        />
                                        <ListItemText
                                            primary={`Indoor: ${details.indoor}`}
                                        />
                                        <ListItemText
                                            primary={`Watering schedule: ${details.watering_schedule}`}
                                        />
                                    </List>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    Care history here
                                    <List>
                                        {todos.map(
                                            (todo) =>
                                                todo.complete && (
                                                    <ListItemText
                                                        key={todo.id}
                                                        primary={todo.todo}
                                                    />
                                                )
                                        )}
                                    </List>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                    <List>
                                        {todos.map(
                                            (todo) =>
                                                !todo.complete && (
                                                    <ListItemText
                                                        key={todo.id}
                                                        primary={todo.todo}
                                                    />
                                                )
                                        )}
                                    </List>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddTodoClick}
                                    >
                                        Add Todo Here
                                    </Button>
                                </CustomTabPanel>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
            <DeleteDialog ref={DeleteDialogRef} />
            <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Plant Details</DialogTitle>
                <DialogContent>
                    <EditDialog
                        open={isEditDialogOpen}
                        onClose={handleEditDialogClose}
                        plantid={plant_id}
                        initialData={details}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isAddTodoDialogOpen}
                onClose={handleAddTodoDialogClose}
            >
                <DialogTitle>Add New Todo</DialogTitle>
                <DialogContent>
                    <AddTodoDialog
                        onClose={handleAddTodoDialogClose}
                        onAddTodo={handleAddTodo}
                        plantid={plant_id}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTodoDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PlantDetail
