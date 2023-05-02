import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";

const ApplicationViews = ({ isLoggedIn, userProfile }) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={isLoggedIn ? <Hello /> : <Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
