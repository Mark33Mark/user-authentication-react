import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const UnauthenticatedApp = () => {

  console.log("Not Authenticated");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="login" replace={true} />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/:rest/*'>404, not found!</Route>
      </Routes>
    </BrowserRouter>
  );

}

export default UnauthenticatedApp;