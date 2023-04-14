import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import reviewController from '../../server/controllers/reviewController';
import { useReviewContext } from '../hooks/useReviewContext';

//editing button -> have the editable field be on the page

export default function Review({ review }) {
  const dispatch = useReviewContext();

  const handleEdit = async (e) => {
    e.preventDefault()
    const response = await fetch('route' + review.id, {
      method: 'PATCH'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_REVIEW', payload: json })
    }
  }

  // useEffect(() => {
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
  // })

  return (
    <form className='editReview'>
      <label>Produce Name</label>
      <input />
      <label>Farm Name</label>
      <input />
      <label>Review</label>
      <input />
      <button onClick={handleEdit}>Edit Review</button>
      <button onClick={handleDelete}>Delete Review</button>
    </form>
  )
}