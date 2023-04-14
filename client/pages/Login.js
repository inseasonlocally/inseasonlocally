import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import Signup from './Signup';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  //Need to complete with route to verify login (2 options - have functionality within this file or create additional folders/file to handle login functionality)
  const handleLogin = async (e) => {
    e.preventDefault()
    //utilize async function from useLoginHook to initiate login
    await login(email, password)
  }

  //Need to complete with sign-up page -> this should route user to the sign-up page
  const handleSignup = (e) => {
    e.preventDefault()
    //render sign-up page if button is clicked
    return (< Signup />)
  }

  return (
    <div>
      <div>This is where our information or about page would go</div>

      <form className='login' onSubmit={handleLogin}>
        <h3>Log In Here</h3>

        <label>Email</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type='submit'>Log In</input>
      </form>
      <button onClick={handleSignup}>Sign Up</button>
    </div >
  )
}
