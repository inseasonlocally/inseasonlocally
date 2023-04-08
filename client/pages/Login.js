import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import Signup from './Signup';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Need to complete with route to verify login (2 options - have functionality within this file or create additional folders/file to handle login functionality)
  const handleLogin = async (e) => {
    e.preventDefault()
  }

  //Need to complete with sign-up page
  const handleSignup = async (e) => {
    e.preventDefault()
    console.log("You are signing up now")
    return (<Signup />)
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
        <button>Log In</button>
      </form>
      <button onSubmit={handleSignup}>Sign Up</button>
    </div>
  )
}
