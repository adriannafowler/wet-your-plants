import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import './signup.css'
import potted_plant1 from '../public/potted_plant1.svg'


    export default function SignUpForm() {
        const navigate = useNavigate()
        const [formData, setFormData] = useState({
            email: '',
            password: '',
            name: '',
            zipcode: '',
        })

        const handleSubmit = async (e) => {
            e.preventDefault()

            const signupUrl = 'http://localhost:8000/api/user'

            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch(signupUrl, fetchConfig)
            if (response.ok) {
                setFormData({
                    email: '',
                    password: '',
                    name: '',
                    zipcode: '',
                })

                const userData = { email, password }
                navigate('/login/')
            }
        }

        const handleFormChange = (e) => {
            const value = e.target.value
            const inputName = e.target.name
            setFormData({
                ...formData,
                [inputName]: value,
            })
        }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <img className='potted_plant1' src={potted_plant1}></img>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full name"
                    autoFocus
                    value={formData.name}
                    onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="zipcode"
                    label="Zipcode"
                    name="zipcode"
                    autoComplete="zipcode"
                    value={formData.zipcode}
                    onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className='signup_button'
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <RouterLink to='/login' variant="body2">
                        <Typography variant="body2">
                        Already have an account? Sign in
                        </Typography>
                    </RouterLink>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
    );
    }
