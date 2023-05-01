import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./Register";
import Hello from "./Hello";
import Login from "./Login";

const ApplicationViews = ({ isLoggedIn, userProfile }) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={isLoggedIn ? <Hello /> : <Login />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
