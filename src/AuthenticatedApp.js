import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

const AuthenticatedApp = () => {

  console.log("Authenticated");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Navigate to="/"  replace={true} />} />
        <Route path='/signup' element={<Navigate to="/" replace={true} />} />
        <Route path='/:rest/*'>404, not found!</Route>
      </Routes>
    </BrowserRouter>
  );

}

export default AuthenticatedApp;