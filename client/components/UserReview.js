import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useReviewContext } from '../hooks/useReviewContext';
import { useUserContext } from '../hooks/useReviewContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserReview = (props) => {
  const { dispatch } = useReviewContext();
  const [review, setReview] = useState(props.review.description);

  const handleEdit = async (e) => {
    e.preventDefault()
    const reviewBody = {
      description: review
    };

    const response = await fetch(`/api/reviews/${props.review.review_id}`, {
      method: 'PATCH',
      body: JSON.stringify(reviewBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'UPDATE_REVIEW', payload: json })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/reviews/${props.review.review_id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_REVIEW', payload: json });
      setReview('')
    }

  }

  return (
    <div className='ReviewContainer'>
      < div >
        Produce Name: {props.review.produce}
      </div >
      <div>
        Farm Name: {props.review.farm}
      </div>
      <div>
        <label>Review: </label>
        <textarea className='reviewEditField' value={review} onChange={(e) => setReview(e.target.value)}></textarea>
      </div>
      <div>
        <button onClick={handleEdit}>Edit Review</button>
        <button onClick={handleDelete}>Delete Review</button>
      </div>
    </div >
  )
}

export default UserReview
