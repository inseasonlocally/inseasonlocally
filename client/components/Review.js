import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';

//editing button -> have the editable field be on the page

export default function Review() {

  const handleEdit = async (e) => {
    e.preventDefault()
  }

  // useEffect(() => {
  const handleDelete = async (e) => {
    e.preventDefault()
  }
  // })

  return (
    <form className='editReview'>
      <label>Produce Name</label>
      <input />
      <label>Farm Name</label>
      <input />
      <label>Review</label>
      <input />
      <button onClick={handleEdit}>Edit Review</button>
      <button onClick={handleDelete}>Delete Review</button>
    </form>
  )
}