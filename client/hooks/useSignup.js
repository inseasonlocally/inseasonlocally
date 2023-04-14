import React, { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useUserContext()

  const signup = async (email, password, location) => {
    //we want to reset the error so that we do not show an error from a previous request prior to request
    setError(null)

    //population with the route to fetch user information
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, location })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({ type: 'LOGIN', payload: json })

    }
  }

  return { signup, error };
}

export default useSignup;
