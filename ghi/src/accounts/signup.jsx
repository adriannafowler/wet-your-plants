import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        zipcode: '',
    })

    const signUp = async (e) => {
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
        console.log(response)
        if (response.ok) {
            setFormData({
                email: '',
                password: '',
                name: '',
                zipcode: '',
            })

            const userData = { email, password }
            console.log('User registered:', userData)
            navigate('/signin/')
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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={signUp}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                />
                <label htmlFor="zipcode">Zipcode:</label>
                <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleFormChange}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
// confirm password zipcode name put things in a formdata
