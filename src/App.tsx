import React, { createContext, useContext, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import Routes from './routes';
import { useNavigate } from 'react-router-dom';
import LandingPage from "./pages/dashboard/landing/landing-page";

// Define the type for the context value
interface AppContextType {
  userLoggedIn: boolean;
  setAuthorization: (value: boolean) => void;
}

// Create a context with the defined type
const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const setAuthorization = (value: boolean) => {
    if(value !== undefined && value !== false){
      setUserLoggedIn(true);
      navigate('/dashboard');
    }else{
      setUserLoggedIn(false);
      navigate('/')
    }
  };

  return (
    <AppContext.Provider value={{ userLoggedIn, setAuthorization }}>
      {!userLoggedIn ? (
        <div className="song-master-landing">
          <ReactRoutes>
            <Route path="*" element={<LandingPage />} />
          </ReactRoutes>
        </div>
      ) : (
        <div className="song-master">
          <Routes />
        </div>
      )}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default App;
