import { ProduceContext } from "../contexts/ProduceContext";
import React, { useContext } from "react";

export const useProduceContext = () => {
  const context = useContext(ProduceContext)

  if (!context) {
    throw Error('something is wrong with the Produce context')
  }
  return context
}