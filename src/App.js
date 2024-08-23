import './App.css';
import Places from './Components/Screens/Places';
import Place from './Components/Screens/Place';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Screens/Login";
import Signup from "./Components/Screens/Signup";
import NotFound from "./Components/Screens/NotFound";
import React, { useState, useEffect } from 'react';
import PrivateRoute from './Components/PrivateRoute';


export const UserContext = React.createContext();


function App() {

  const [userData, setUserData] = useState({});
  const [loading,setLoading] = useState(true);

  const updateUserData = (action)=>{
        switch(action.type){
          case "LOGOUT":
            setUserData(null);
            localStorage.clear();
            break;
            case "LOGIN":
              setUserData(action.payload);
              break;
            default:
              break;
        }
  };
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setLoading(false);
   
  }, []);
  
  return loading?
  (<h1>Loading</h1>):(
    <div>
      <UserContext.Provider value={{userData, updateUserData}}>
        <Router>
          <Routes>
            <Route path="/" element={<Places />} />
            <Route path="/auth/login/" element={<Login />} />
            <Route path="/auth/create/" element={<Signup />} />
            <Route
            path="/place/:id"
            element={
              <PrivateRoute element={Place} />
            }
          />
            <Route element={NotFound} />
          </Routes>
        </Router>
      </UserContext.Provider>

    </div>
  );
}

export default App;
