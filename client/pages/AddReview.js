import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Submit button- route back to landing page
// 	*Can we use state to render our landing page to include the last clicked product's reviews?

const AddReview = () => {
  const [farmName, setFarmName] = useState('');
  const [produceName, setProduceName] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const response = await fetch('/add-reviews', {
    //   method: 'POST',
    //   body: JSON.stringify(review),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    // const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error)
    //   setEmptyFields(json.emptyFields)
    // }

    navigate('/reviews')
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

export default AddReview