import React, { useReducer } from 'react'
import { createContext } from 'react'

export const ProduceContext = createContext();

export const produceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCE':
      return {
        produce: action.payload
      }
    default:
      return state
  }
}

export const ProduceContextProvider = ({ children }) => {
  const [state, dispatchProduce] = useReducer(produceReducer, { produce: null })

  return (
    <ProduceContext.Provider value={{ ...state, dispatchProduce }}>
      {children}
    </ProduceContext.Provider>
  )
}