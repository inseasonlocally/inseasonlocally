import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useReviewContext } from '../hooks/useReviewContext';

//editing button -> have the editable field be on the page

export default function Review(props) {

  return (
    <div className='ReviewContainer'>
      <div>
        Produce Name: {props.review.produce}
      </div>
      <div>
        Farm Name: {props.review.farm}
      </div>
      <div>
        User: {props.review.email}
      </div>
      <div>
        <label>Review: </label>
        <p>{props.review.description}</p>
      </div>

      {/* <div>
        <button onClick={handleEdit}>Edit Review</button>
        <button onClick={handleDelete}>Delete Review</button>
      </div> */}
    </div>
  )
}