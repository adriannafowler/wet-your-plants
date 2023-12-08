import PropTypes from 'prop-types'
import './pd.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import {
    List,
    ListItemText,
    CardActions,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
    Card,
    IconButton,
} from '@mui/material'
import DeleteDialog from './delete_modal'
import EditDialog from './edit_modal'
import './detail.css'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </>
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function PlantDetail() {
    const [value, setValue] = React.useState(0)
    const [details, setDetails] = useState([])
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const param = useParams()
    const plant_id = param.id

    const fetchData = async () => {
        const url = `http://localhost:8000/greenhouse/${plant_id}/`
        const response = await fetch(url, {
            credentials: 'include',
        })
        if (response.ok) {
            const data = await response.json()
            setDetails(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

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
                <Card className="card" sx={{ borderRadius: '20px' }}>
                    <div className="media-content">
                        <div className="image-container" sx={{}}>
                            <img src={details.original_url} className="image" />
                            <button
                                className="delete-button"
                                variant="contained"
                                onClick={handleDeleteClick}
                            >
                                <HighlightOffIcon />
                            </button>
                            <DeleteDialog ref={DeleteDialogRef} />
                            <button
                                className="edit-button"
                                variant="contained"
                                onClick={handleEditClick}
                            >
                                <EditIcon />
                            </button>
                            <EditDialog
                                open={isEditDialogOpen}
                                onClose={handleEditDialogClose}
                                plantId={plant_id}
                                initialData={details}
                            />
                        </div>
                    </div>
                    <div className="details">
                        <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                            <CardActions>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    className="tab-labels"
                                >
                                    <Tab
                                        label="Description"
                                        {...a11yProps(0)}
                                    />
                                    <Tab label="Plant Care" {...a11yProps(1)} />
                                    <Tab
                                        label="Care History"
                                        {...a11yProps(2)}
                                    />
                                </Tabs>
                            </CardActions>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {details.common_name === details.name
                                        ? `${details.common_name}`
                                        : `${details.common_name} ${details.name}`}
                                </Typography>
                                <CustomTabPanel
                                    value={value}
                                    index={0}
                                    className="description"
                                >
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
                            </CardContent>
                        </Box>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default PlantDetail
