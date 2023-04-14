import { UserContext } from "../contexts/UserContext";
import React, { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw Error('something is not working with the User Context')
  }
  return context
}

