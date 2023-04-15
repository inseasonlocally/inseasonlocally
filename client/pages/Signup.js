import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import LocationInput from '../components/LocationInput';

//1 Form with three labels: (username, password, location– drop down of 50 states)
// Sign Up button→ route to landing page

const Signup = () => {
  const [location, setLocation] = useState('');
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault()

    //   //Utilize signup from useSignup hook to make async call to DB
    await signup(email, password, location);
    //   console.log('you have signed up with:', setEmail.value, useState, setLocation)
  }

  return (
    <div className='signup'>
      <div className='credentialInput'>
        <label>Email</label>
        <input type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
        <div className='loginButtons'>
          <LocationInput
            label={<label>Current Location</label>}
            value={location}
            onChange={setLocation}
            type="select"
            choices={states}
          />
          <button onClick={handleSignup}>Sign Up</button>
        </div>
    </div >
  )
}
export default Signup
