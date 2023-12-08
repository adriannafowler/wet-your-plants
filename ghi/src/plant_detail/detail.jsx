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
import AddIcon from '@mui/icons-material/Add'
import DeleteDialog from './delete_modal'
import EditDialog from './edit_modal'
import AddTodoDialog from './addtododialog'

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

function PlantDetail() {
    const [value, setValue] = useState(0)
    const [details, setDetails] = useState({})
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [newToken, setNewToken] = useState([])
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
                    `http://localhost:8000/greenhouse/${plant_id}/todos/`,
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
            {newToken ? (
                <div className="card-container">
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
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Description" />
                                    <Tab label="Plant Care" />
                                    <Tab label="Care History" />
                                    <Tab label="Dashboard Todo's" />
                                </Tabs>
                            </CardActions>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    gutterBottom
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
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={3}>
                                        <List>
                                            {todos.map((todo) => (
                                                <ListItemText
                                                    key={todo.id}
                                                    primary={todo.todo}
                                                />
                                            ))}
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
            ) : (
                <div>
                    <h1>Please Log In</h1>
                </div>
            )}
            <DeleteDialog ref={DeleteDialogRef} />
            <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Plant Details</DialogTitle>
                <DialogContent>
                    <EditDialog
                        open={isEditDialogOpen}
                        onClose={handleEditDialogClose}
                        plantId={plant_id}
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


// import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import PropTypes from 'prop-types'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import Box from '@mui/material/Box'
// import './pd.css'
// import HighlightOffIcon from '@mui/icons-material/HighlightOff'
// import EditIcon from '@mui/icons-material/Edit'
// import { useParams } from 'react-router-dom'
// import React, { useEffect, useState, useRef } from 'react'
// import { List, ListItemText } from '@mui/material'
// import DeleteDialog from './delete_modal'
// import EditDialog from './edit_modal'
// import { useNavigate, Link } from 'react-router-dom'

// function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props
//     const [newToken, setNewToken] = useState([])
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (!newToken) {
//             navigate('/signin/')
//         }
//     }, [newToken])

//     return (
//         <>
//             {newToken ? (
//                 <div
//                     role="tabpanel"
//                     hidden={value !== index}
//                     id={`simple-tabpanel-${index}`}
//                     aria-labelledby={`simple-tab-${index}`}
//                     {...other}
//                 >
//                     {value === index && (
//                         <Box sx={{ p: 3 }}>
//                             <Typography>{children}</Typography>
//                         </Box>
//                     )}
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Please Log In</h1>
//                 </div>
//             )}
//         </>
//     )
// }

// CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// }

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     }
// }

// function PlantDetail() {
//     const [value, setValue] = React.useState(0)
//     const [details, setDetails] = useState([])
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//     const [newToken, setNewToken] = useState([])
//     const navigate = useNavigate()
//     const param = useParams()
//     const plant_id = param.id

//     useEffect(() => {
//         if (!newToken) {
//             navigate('/signin/')
//         }
//     }, [newToken])

//     const fetchData = async () => {
//         const url = `http://localhost:8000/greenhouse/${plant_id}/`
//         const response = await fetch(url, {
//             credentials: 'include',
//         })
//         if (response.ok) {
//             const data = await response.json()
//             setDetails(data)
//         }
//     }
//     useEffect(() => {
//         fetchData()
//     }, [])

//     const handleChange = (event, newValue) => {
//         setValue(newValue)
//     }

//     const DeleteDialogRef = useRef()
//     const handleDeleteClick = () => {
//         DeleteDialogRef.current.showDialog()
//     }
//     const handleEditClick = () => {
//         setIsEditDialogOpen(true)
//     }

//     const handleEditDialogClose = () => {
//         setIsEditDialogOpen(false)
//     }

//     return (
//         <>
//             {newToken ? (
//                 <div className="card-container">
//                     <Card className="card" sx={{ borderRadius: '20px' }}>
//                         <div className="media-content">
//                             <div className="image-container" sx={{}}>
//                                 <img
//                                     src={details.original_url}
//                                     className="image"
//                                 />
//                                 <button
//                                     className="delete-button"
//                                     variant="contained"
//                                     onClick={handleDeleteClick}
//                                 >
//                                     <HighlightOffIcon />
//                                 </button>
//                                 <DeleteDialog ref={DeleteDialogRef} />
//                                 <button
//                                     className="edit-button"
//                                     variant="contained"
//                                     onClick={handleEditClick}
//                                 >
//                                     <EditIcon />
//                                    </button>
//                                    <EditDialog
//                                        open={isEditDialogOpen}
//                                        onClose={handleEditDialogClose}
//                                        plantId={plant_id}
//                                        initialData={details}
//                                    />
//                             </div>
//                         </div>
//                         <div className="details">
//                             <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
//                                 <CardActions>
//                                     <Tabs
//                                         value={value}
//                                         onChange={handleChange}
//                                         className="tab-labels"
//                                     >
//                                         <Tab
//                                             label="Description"
//                                             {...a11yProps(0)}
//                                         />
//                                         <Tab
//                                             label="Plant Care"
//                                             {...a11yProps(1)}
//                                         />
//                                         <Tab
//                                             label="Care History"
//                                             {...a11yProps(2)}
//                                         />
//                                     </Tabs>
//                                 </CardActions>
//                                 <CardContent>
//                                     <Typography
//                                         gutterBottom
//                                         variant="h5"
//                                         component="div"
//                                     >
//                                         {details.common_name === details.name
//                                             ? `${details.common_name}`
//                                             : `${details.common_name} ${details.name}`}
//                                     </Typography>
//                                     <CustomTabPanel
//                                         value={value}
//                                         index={0}
//                                         className="description"
//                                     >
//                                         {details.description}
//                                     </CustomTabPanel>
//                                     <CustomTabPanel value={value} index={1}>
//                                         <List>
//     <ListItemText
//         primary={`Care level: ${details.care_level}`}
//     />
//     <ListItemText
//         primary={`Watering needs: ${details.watering}`}
//     />
//     <ListItemText
//         primary={`Sunlight needs: ${details.sunlight}`}
//     />
//     <ListItemText
//         primary={`Indoor: ${details.indoor}`}
//     />
//     <ListItemText
//         primary={`Watering schedule: ${details.watering_schedule}`}
//     />
// </List>
//                                     </CustomTabPanel>
//                                     <CustomTabPanel value={value} index={2}>
//                                         Care history here
//                                     </CustomTabPanel>
//                                 </CardContent>
//                             </Box>
//                         </div>
//                     </Card>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Please Log In</h1>
//                 </div>
//             )}
//         </>
//     )
// }

// export default PlantDetail
