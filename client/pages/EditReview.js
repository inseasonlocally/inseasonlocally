import React from 'react';
import { useEffect } from 'react';
import UserReviewTable from '../components/UserReviewTable';


// After delete and/or submit buttons are clicked, re-render the screen with updated results
const EditReview = () => {

  // const fetchReviews = async () => {

  // }

  //load all reviews on first page load
  // useEffect(() => {
  //   fetchReviews()
  // }, [])


  //re-render page with new Reviews when you click submit button
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   //update the reviews (if needed) when submit is pushed (into DB)
  //   fetchReviews()
  // }


  return (
    <div>
      <UserReviewTable />
    </div>
  )
}

export default EditReview