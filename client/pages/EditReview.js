import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import Landing from './Landing';
import Review from '../components/Review';





// After delete and/or submit buttons are clicked, re-render the screen with updated results
export default function EditReview() {

  const fetchReviews = async () => {


  }

  //load all reviews on first page load
  useEffect(() => {
    fetchReviews()
    console.log('you have re-loaded the page')
  }, [])


  //re-render page with new Reviews when you click submit button
  const handleSubmit = async (e) => {
    e.preventDefault()

    //update the reviews (if needed) when submit is pushed (into DB)
    fetchReviews()
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Review />
        <button>Submit Review Changes</button>
      </form>
    </div>
  )
}