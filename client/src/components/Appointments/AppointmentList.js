import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllAppointments } from "../../modules/AppointmentManager";
import AppointmentObject from "./AppointmentObject";

const AppointmetList = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = () => {
    getAllAppointments().then((appointment) => setAppointments(appointment));
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {appointments.map((appointment) => (
          <AppointmentObject appointment={appointment} key={appointment.id} />
        ))}
      </div>
    </div>
  );
};

export default AppointmetList;
