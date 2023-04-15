import React, { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const { dispatch } = useUserContext()

  const signup = async (email, password, location) => {
    let error = false;
    //population with the route to fetch user information
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, location })
    })

    const json = await response.json()

    if (response.ok) {
      if(json.signIn) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      }
      else error = true;
    }
    return error;
  }

  return signup;
}

export default useSignup;
