import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './pd.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit';
import { AspectRatio, Fullscreen } from '@mui/icons-material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
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
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }


function PlantDetail(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

        return (
            <div className='card-container'>
                <Card className="card" sx={{borderRadius: '20px'}}>
                    <div className='media-content'>
                        <div className='image-container' sx={{}}>
                            <img
                                src="https://www.thespruce.com/thmb/tBDy1ohOETN1l27cRTlTJWsN2iQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-921493782-9a70dc6a313e4497ba07412c2870573a.jpg"
                                className='image'
                            />
                            <button className='delete-button' variant="contained">
                                <HighlightOffIcon />
                            </button>
                            <button className='edit-button' variant="contained">
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                    <div className='details'>
                        <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                        <CardActions>
                                <Tabs value={value} onChange={handleChange} className='tab-labels'>
                                    <Tab label="Description" {...a11yProps(0)} />
                                    <Tab label="Plant Care" {...a11yProps(1)} />
                                    <Tab label="Care History" {...a11yProps(2)} />
                                </Tabs>
                            </CardActions>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Pink Princess Philodendron
                                </Typography>
                                <CustomTabPanel value={value} index={0}>
                                    Plant description here
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    Care instructions here
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    Care history here
                                </CustomTabPanel>
                            </CardContent>
                        </Box>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Button type="button"> Add to Marketplace</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button>Make an Offer</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </div>

            );
        }

export default PlantDetail;


// function PlantDetail(){
//     return(
//         <h1>Hello World</h1>
//     )
// }

// export default PlantDetail;
