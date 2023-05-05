import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import AppointmetList from "./Appointments/AppointmentList";
import InsuranceList from "./Insurance/InsuranceList";
import AppointmentDetails from "./Appointments/AppointmentDetails";
import InsuranceDetails from "./Insurance/InsuranceDetails";

const ApplicationViews = ({ isLoggedIn, userProfile }) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={isLoggedIn ? <Hello /> : <Login />} />
        <Route path="register" element={<Register />} />
        <Route path="AppointmentList">
          <Route
            index
            element={isLoggedIn ? <AppointmetList /> : <Navigate to="/login" />}
          />
          <Route
            path="AppointmentDetails/:id"
            element={
              isLoggedIn ? <AppointmentDetails /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route path="InsuranceList">
          <Route
            index
            element={isLoggedIn ? <InsuranceList /> : <Navigate to="/login" />}
          />
          <Route
            path="InsuranceDetails/:id"
            element={
              isLoggedIn ? <InsuranceDetails /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
