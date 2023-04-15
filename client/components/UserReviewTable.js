import React from "react";
import { useReviewContext } from "../hooks/useReviewContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { useUserContext } from "../hooks/useUserContext";
import UserReview from "./UserReview";

const UserReviewTable = () => {
  const { reviews, dispatch } = useReviewContext();
  const { user } = useUserContext();



  //function to request for reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`api/reviews?email=${user.email}`, {
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
      {reviews ? reviews.map((review) => (
        <UserReview key={uuid()} review={review} />
      )) : <div></div>
      }
    </div>
    </div>
  )
}

export default UserReviewTable