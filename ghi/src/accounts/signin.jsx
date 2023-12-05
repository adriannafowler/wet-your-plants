import React, { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useToken();


const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    e.target.reset();
  };
  
console.log(email, password)
  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
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

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
// confirm password zipcode name put things in a formdata
