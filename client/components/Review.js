import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useReviewContext } from '../hooks/useReviewContext';

//editing button -> have the editable field be on the page

export default function Review({ review }) {

  return (
    <div className='review-container'>
      <p>{review.name}</p>
    </div>
  )
}