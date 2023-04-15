import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { useReviewContext } from '../hooks/useReviewContext';

// Submit button- route back to landing page
// 	*Can we use state to render our landing page to include the last clicked product's reviews?

const AddReview = () => {
  const [farmName, setFarmName] = useState('');
  const [produceName, setProduceName] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const { user } = useUserContext()
  const { dispatch } = useReviewContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewBody = {
      email: user.email,
      produce: produceName,
      farm: farmName,
      description: review
    }

    const response = await fetch('api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json();

    if (response.ok) {
      setFarmName('')
      setProduceName('')
      setReview('')
      dispatch({ type: 'CREATE_REVIEW', payload: json });
    }

    // if (!response.ok) {
    //   setError(json.error)
    //   setEmptyFields(json.emptyFields)
    // }

    navigate('/reviews', { state: { produce: props.name } })
  }

  return (
    <div className='newReview'>
      <label>Produce Name</label>
      <input
        type='text'
        onChange={(e) => setProduceName(e.target.value)}

      />
      <label>Farm Name</label>
      <input
        type='text'
        onChange={(e) => setFarmName(e.target.value)}
      />
      <label>Review</label>
      <textarea onChange={(e) => setReview(e.target.value)} />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  )
}

export default AddReview
