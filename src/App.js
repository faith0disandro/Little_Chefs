/* eslint-disable */ 

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from 'react';
import Explore from "./components/Explore";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Explore />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/profile' element={<Profile /> }>
          </Route>
          {/* <PrivateRoute exact path="/profile" element={<Profile />} /> */}
        </Routes>
      </AuthProvider>


    </Router>
  );


}

export default App;
