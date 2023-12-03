import React, { useState } from 'react';


const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();

    const signupUrl = 'https://localhost:8000/api/users/';

    const fetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch(signupUrl, fetchConfig);

    if (response.ok) {
        setFormData({
            email: '',
            password: ''
        })
    }

    const userData = { email, password };
    console.log('User registered:', userData);

  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={signUp}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
// confirm password zipcode name put things in a formdata