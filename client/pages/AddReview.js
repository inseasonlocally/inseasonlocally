import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import Landing from './Landing';
import { response } from '../../server/server';

// Submit button- route back to landing page
// 	*Can we use state to render our landing page to include the last clicked product's reviews?

export default function AddReview() {
  const [farmName, setFarmName] = useState('');
  const [produceName, setProduceName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/add-reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  }

  return (
    <form className='newReview' onSubmit={handleSubmit}>
      <label>Produce Name</label>
      <input
        type='text'
        onChange={(e) => setProduceName}

      />
      <label>Farm Name</label>
      <input />
      <label>Review</label>
      <input />
      <button onClick={handleSubmit}>Submit Review</button>
    </form>
  )
}