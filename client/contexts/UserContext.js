import React from "react";
import { createContext, useReducer, useEffect } from "react";

//Create context that will be utilized to maintain user data throughout the application
export const UserContext = createContext();

//create User Reducer function to manage user state
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_LOCATION':
      return { user: action.payload }
    default:
      return state
  }
}

//create User Context Provider, which will dispatch login action with user payload, if user is in local storage
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('UserContext state is:', state)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}