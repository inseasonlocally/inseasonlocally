import React from "react";
import { useReviewContext } from "../hooks/useReviewContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { useUserContext } from '../hooks/useUserContext'

const ReviewTable = ({ produce }) => {
  const { reviews, dispatch } = useReviewContext();
  const navigate = useNavigate();

  const addReview = (e) => {
    e.preventDefault()
    navigate('/addreviews')
  }

  const editReviews = (e) => {
    e.preventDefault()
    navigate('/editreviews')
  }

  //function to request for reviews, based on the user's location and produce selected
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const json = await response.json()

      if (response.ok) {

        dispatch({ type: 'SET_REVIEWS', payload: json })
      }
    }
    fetchReviews()
  }, [dispatch]);

  return (
    <div><div className="review-table">
      Hello! This is where our reviews will go!
      {reviews && reviews.map((review) => (
        <Review key={uuid()} review={review} produce={produce} />
      ))}
    </div>
      <button onClick={addReview} >Add Review</button>
      <button onClick={editReviews} >Edit Your Reviews</button>
    </div>
  )
}

export default ReviewTable