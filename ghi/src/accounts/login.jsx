import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useToken, { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useToken()
    const { token } = useAuthContext()

    useEffect(() => {
        if (token) {
            navigate('/greenhouse/')
        }
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            login(username, password)
            e.target.reset()
        } catch (error) {
            console.error('Wrong username or password:', error)
        }
    }

    return (
        <>
            {!token ? (
                <>
                    <Container
                        component="main"
                        maxWidth="xs"
                        className="login-container"
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1 }} className="lock_icon">
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography
                                component="h1"
                                variant="h5"
                                className="login_title"
                            >
                                Log in
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={(e) => handleSubmit(e)}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="log-in-button"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Log In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup/" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </>
            ) : (
                <div>
                    <h1>Redirecting.....</h1>
                </div>
            )}
        </>
    )
}
