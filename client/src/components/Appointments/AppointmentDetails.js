import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAppointmentDetails } from "../../modules/AppointmentManager";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    getAppointmentDetails(parseInt(id)).then(setAppointment);
  }, []);

  const insuranceList = appointment?.insurances?.map((insurance) => {
    if (insurance.insuranceType.type == "Primary") {
      return <li>Primary Insurance: {insurance.insuranceName}</li>;
    } else {
      return <li>Secondary Insurance: {insurance.insuranceName}</li>;
    }
  });

  const deductible = appointment?.insurances?.reduce(
    (totalDeductible, insurance) => {
      if (insurance.insuranceType.type === "Primary") {
        totalDeductible += insurance.deductible;
      }
      return totalDeductible;
    },
    0
  );

  const coveragePercent = appointment?.insurances?.reduce(
    (percent, insurance) => {
      if (insurance.insuranceType.type === "Primary") {
        percent += insurance.preventativeCoveragePercent;
      }
      return percent;
    },
    0
  );

  const yearlyMax = appointment?.insurances?.reduce((max, insurance) => {
    if (insurance.insuranceType.type === "Primary") {
      max += insurance.yearlyMax;
    }
    return max;
  }, 0);

  function calculatePatientCost(
    visitCost,
    coveragePercent,
    deductible,
    yearlyMax
  ) {
    let patientCost = 0;

    if (deductible > 0) {
      patientCost += deductible;
      visitCost -= deductible;
    }

    if (yearlyMax > 0) {
      let remainingYearlyMax = yearlyMax - visitCost;
      if (remainingYearlyMax < 0) {
        patientCost += visitCost - yearlyMax;
        visitCost = yearlyMax;
      }
    }

    let insuranceCoverage = visitCost * coveragePercent;
    patientCost += visitCost - insuranceCoverage;
    return patientCost;
  }

  return (
    <Card>
      <h4>Appointment:</h4>
      <CardBody>
        <p className="text-left px-2">
          Patient First Name: {appointment?.userProfile?.firstName}
        </p>
        <p className="text-left px-2">
          Patient Last Name: {appointment?.userProfile?.lastName}
        </p>
        <p className="text-left px-2">Current Insurance: {insuranceList}</p>

        <p className="text-left px-2">
          Appointment Date: {appointment?.appointmentDate}
        </p>
        <p className="text-left px-2">
          Patient Estimate: ${" "}
          {calculatePatientCost(
            appointment?.appointmentCost,
            coveragePercent,
            deductible,
            yearlyMax
          )}
        </p>
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

export default AppointmentDetails;
