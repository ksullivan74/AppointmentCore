import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAppointmentDetails } from "../../modules/AppointmentManager";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    getAppointmentDetails(parseInt(id)).then(setAppointment);
  }, []);

  console.log(appointment);

  return (
    <div>
      <h3>Patient Full Name: {appointment?.userProfile?.fullName}</h3>
      <h4>Dentist: {appointment?.dentist?.name}</h4>
    </div>
  );
};

export default AppointmentDetails;
