import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from 'react'
import LocationInput from '../components/LocationInput'
import Produce from '../components/Produce';


export default function Landing() {
  const [location, setLocation] = useState('');
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  const date = Date();
  const produce = [];

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('this is your new location:', setLocation())
  }

  const handleEditReview = (e) => {
    e.preventDefault()
    console.log('You are editing your review')
    // return //Edit Review page location
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    console.log("You are adding a review now")
    // return //Add Review page location
  }

  useEffect(() => {
    const displayProduce = async () => {
      const response = await fetch('/landing')
      const json = await response.json()

      if (response.ok) {
        const data = await response.json();

        //Update to store all produce results into an array
        produce = data.map((el) => produce.push(el))

      }
    }
  })

  return (
    <div>
      <div>Landing Page</div>
      <div>Your Current Location is:</div>
      <form onSubmit={handleSubmit}>
        <LocationInput
          label={<label>Change Current Location:</label>}
          value={location}
          onChange={setLocation}
          type="select"
          choices={states}
        />
        <button>Submit</button>
      </form>

      <div>
        {/* {produce.map((el) => { */}
        < Produce
          value={produce}
        />
        {/* } */}
        {/* //create individual produce component for each produce item */}

      </div>

      <button onClick={handleAddReview}>Add Review</button>
      <button onClick={handleEditReview}>Edit Review</button>
    </div>
  )
}