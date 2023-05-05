import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InsuranceObject = ({ insurance }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <h4>Insurance:</h4>
      <CardBody>
        <p className="text-left px-2">
          Insurance Name: {insurance.insuranceName}
        </p>
        <Link to={`/InsuranceList/InsuranceDetails/${insurance.id}`}>
          <p className="text-left px-2">Group Name: {insurance.groupName}</p>
        </Link>
        <div>
          <p>Insurance Status:</p>
          <p className="text-left px-2">
            {insurance.isDeleted ? "Inactive" : "Active"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsuranceObject;
