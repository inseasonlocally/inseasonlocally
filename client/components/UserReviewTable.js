import React from "react";
import { useReviewContext } from "../hooks/useReviewContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { useUserContext } from "../hooks/useUserContext";

const UserReviewTable = () => {
  const { reviews, dispatch } = useReviewContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const addReview = (e) => {
    e.preventDefault()
    navigate('/addreviews')
  }

  const editReviews = (e) => {
    e.preventDefault()
    navigate('/editreviews')
  }

  //function to request for reviews
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
    <div><div className="user-review-table">
      These are all of your user reviews here:
      {reviews && reviews.map((review) => (
        <Review key={uuid()} user={user} review={review} />
      ))}
    </div>
    </div>
  )
}

export default UserReviewTable