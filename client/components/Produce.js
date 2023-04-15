import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//Each produce component will contain:
// 1) Photo of the produce (available in static files)
// 2) Name of Produce somewhere
// 3) handleClick property -> this will utilize a fetch request based on produce + user's location to grab all of the matching reviews. This will then be rendered somewhere on the page  

const Produce = (props) => {
  const navigate = useNavigate();

  const handleReviews = (e) => {
    e.preventDefault()
    navigate('/reviews')
  }

  return (
    <div>
      <div> Produce Name: {props.name}</div>
      <div><img src={'../client/' + props.img} /></div> {/**fixed */}
      <button onClick={handleReviews} >See Reviews</button>
    </div>
  )
}

export default Produce