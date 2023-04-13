import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import Signup from './Signup';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  //Need to complete with route to verify login (2 options - have functionality within this file or create additional folders/file to handle login functionality)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const body = {
      email,
      password,
    }
    const response = await fetch('/sign-in', {
      method: "POST",
      body: JSON.stringify(body)
    });
  
    if (response.ok) {
      const data = await response.json();
      // when user is not found in the database
      if(!data.signIn) {
        setEmail('')
        setPassword('')
        alert ('Email or password is incorrect!')
      }
      else setLocation(data.location);
    }
  }
    catch (error) {
      console.error('Error: could not fetch data')
    }
  }

  //did this fetch request-- does this belong here?? Why is there a handle sign up on login page and signup page?
  //Need to complete with sign-up page
  const handleSignup = async (e) => {
    e.preventDefault()
    console.log("You are signing up now")
    try{
      const body = {
        email,
        password,
        location
      }
      const response = await fetch('', {
        method: "POST",
        body: JSON.stringify(body)
      });
      if (response.ok) {
        const data = await response.json()
      }
    }
    catch(error) {
      console.error('Error: Error fetching data')
    }
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
