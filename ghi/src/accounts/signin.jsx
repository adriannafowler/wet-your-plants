import useToken, { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const SignInForm = () => {
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
            setErrorMessage('')
            e.target.reset()
        } catch (error) {
            console.error('Wrong username or password:', error)
            setErrorMessage('Wrong username or password. Try again.')
        }
    }

    return (
        <>
            {!token ? (
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header">Login</h5>
                    <div className="card-body">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <label className="form-label">Username:</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Redirecting.....</h1>
                </div>
            )}
        </>
    )
}

export default SignInForm
