import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProduceContext, ProduceContextProvider } from "./contexts/ProduceContext";
import { ReviewContextProvider } from "./contexts/ReviewContext";
import { UserContextProvider } from "./contexts/UserContext";
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ProduceContextProvider>
      <ReviewContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ReviewContextProvider>
    </ProduceContextProvider>
  </UserContextProvider>
);

