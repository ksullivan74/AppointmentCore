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
        {/* <Link to={`/AdminUserList/UserDetails/${user.id}`}> */}
        <p className="text-left px-2">Patient Name: {}</p>
        {/* </Link> */}
        <p className="text-left px-2">Appointment Type: {}</p>
        <p className="text-left px-2">Current Insurance: {}</p>
        <p className="text-left px-2">Appointment Date: {}</p>
        <p className="text-left px-2">Patient Estimate: {}</p>
        <div>
          <p>User Status:</p>
          <p className="text-left px-2">
            {appointment.isDeleted ? "Inactive" : "Active"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default AppointmentObject;
