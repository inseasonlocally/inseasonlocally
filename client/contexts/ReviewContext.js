import React, { useReducer } from 'react'
import { createContext } from 'react'

export const ReviewContext = createContext();

export const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        reviews: action.payload
      }
    case 'CREATE_REVIEW':
      return {
        reviews: [action.payload, ...state.reviews]
      }
    case 'UPDATE_REVIEW':
      return {
        reviews: [action.payload, ...state.reviews]
      }
    case 'DELETE_REVIEW':
      return {
        reviews: state.reviews.filter((review) => review.review_id !== action.payload.review_id)
      }
    default:
      return state
  }
}

export const ReviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, { reviews: null })

  return (
    <ReviewContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReviewContext.Provider>
  )
}