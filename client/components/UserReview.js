import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useReviewContext } from '../hooks/useReviewContext';
import { useUserContext } from '../hooks/useReviewContext';


const UserReview = () => {
  const dispatch = useReviewContext();

  const handleEdit = async (e) => {
    e.preventDefault()
    const response = await fetch('reviews' + review.id, {
      method: 'PATCH'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_REVIEW', payload: json })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const response = await fetch('route' + review.id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_REVIEW', payload: json })
    }
  }

  return (
    <div className='review-container'>
      Sample Review here
      <p>{review.name}</p>
      <button onClick={handleEdit} >Edit Review</button>
      <button onClick={handleDelete} >Delete Review</button>
    </div>
  )
}

export default UserReview