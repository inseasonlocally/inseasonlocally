import { ReviewContext } from "../contexts/ReviewContext";
import React, { useContext } from "react";

export const useReviewContext = () => {
  const context = useContext(ReviewContext)

  if (!context) {
    throw Error('something is wrong with the Review context')
  }
  return context
}