import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AppointmentObject = ({ appointment }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <h4>Appointment:</h4>
      <CardBody>
        <p className="text-left px-2">
          Patient Name: {appointment.userProfile.fullName}
        </p>
        <Link to={`/AppointmentList/AppointmentDetails/${appointment.id}`}>
          <p className="text-left px-2">
            Appointment Date: {appointment.appointmentDate}
          </p>
        </Link>
        <div>
          <p>Patient Status:</p>
          <p className="text-left px-2">
            {appointment.isDeleted ? "Inactive" : "Active"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default AppointmentObject;
