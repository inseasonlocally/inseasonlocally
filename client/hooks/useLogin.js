import React from "react";
import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const { dispatch } = useUserContext()
  const [location, setLocation] = useState('')
  const navigate = useNavigate();

  const login = async (email, password) => {
    let error = false;

    const response = await fetch('/api/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
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
  return login;
}

// const [location, setLocation] = useState('');

// //Need to complete with route to verify login (2 options - have functionality within this file or create additional folders/file to handle login functionality)
// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//   const body = {
//     email,
//     password,
//   }
//   const response = await fetch('/sign-in', {
//     method: "POST",
//     body: JSON.stringify(body)
//   });

//   if (response.ok) {
//     const data = await response.json();
//     // when user is not found in the database
//     if(!data.signIn) {
//       setEmail('')
//       setPassword('')
//       alert ('Email or password is incorrect!')
//     }
//     else setLocation(data.location);
//   }
// }
//   catch (error) {
//     console.error('Error: could not fetch data')
//   }
// }

// //did this fetch request-- does this belong here?? Why is there a handle sign up on login page and signup page?
// //Need to complete with sign-up page
// const handleSignup = async (e) => {
//   e.preventDefault()
//   console.log("You are signing up now")
//   try{
//     const body = {
//       email,
//       password,
//       location
//     }
//     const response = await fetch('', {
//       method: "POST",
//       body: JSON.stringify(body)
//     });
//     if (response.ok) {
//       const data = await response.json()
//     }
//   }
//   catch(error) {
//     console.error('Error: Error fetching data')
//   }