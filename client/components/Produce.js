import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import LocationInput from '../components/LocationInput';
import Landing from '../pages/Landing';

//Each produce component will contain:
// 1) Photo of the produce (available in static files)
// 2) Name of Produce somewhere
// 3) handleClick property -> this will utilize a fetch request based on produce + user's location to grab all of the matching reviews. This will then be rendered somewhere on the page  


const Produce = (produce) => {

  const handleReviews = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div>
      <div> Produce Name: {'Squash'}</div>
      <div> Produce Pic: {'Squash'}</div>
      <button onClick={handleReviews} >See Reviews</button>
    </div>
  )
}


export default Produce