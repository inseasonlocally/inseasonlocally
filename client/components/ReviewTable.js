import React from "react";
import { useReviewContext } from "../hooks/useReviewContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { useUserContext } from '../hooks/useUserContext'
import { useLocation } from "react-router-dom";
import Review from "./Review";
// import { useProduceContext } from "../hooks/useProduceContext";

const ReviewTable = (state) => {
  const location = useLocation();
  const { reviews, dispatch } = useReviewContext();
  // const { produce } = useProduceContext();

  const navigate = useNavigate();

  const addReview = (e) => {
    e.preventDefault();
    navigate('/addreviews');
  }

  const editReviews = (e) => {
    e.preventDefault();
    navigate('/editreviews');
  }

  //function to request for reviews, based on the user's produce selected
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`api/reviews?produce=${location.state.produce}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();

      if (response.ok) {

        dispatch({ type: 'SET_REVIEWS', payload: json });
      }
    }
    fetchReviews();
  }, [dispatch]);

  return (
    <div>
      <div className="review-table">
        {reviews ? reviews.map((review) => (
          <Review key={uuid()} review={review} />
        )) : <div></div>
        }
      </div>
      <button onClick={addReview} >Add Review</button>
      <button onClick={editReviews} >Edit Your Reviews</button>
    </div>
  )
}

export default ReviewTable;