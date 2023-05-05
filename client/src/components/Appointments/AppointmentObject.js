import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AppointmentObject = ({ appointment }) => {
  const navigate = useNavigate();

  const insuranceList = appointment.insurances.map((insurance) => {
    if (insurance.insuranceType.type == "Primary") {
      return <li>Primary Insurance: {insurance.insuranceName}</li>;
    } else {
      return <li>Secondary Insurance: {insurance.insuranceName}</li>;
    }
  });

  // const deductible = appointment.insurances.map((insurance) => {
  //   let deductibleamount = 0;
  //   if (insurance.insuranceType.type == "Primary") {
  //     deductibleamount = insurance.deductible;
  //   } else {
  //     deductibleamount = deductibleamount;
  //   }
  //   return deductibleamount;
  //   //console.log(insurance);
  // });

  const deductible = appointment.insurances.reduce(
    (totalDeductible, insurance) => {
      if (insurance.insuranceType.type === "Primary") {
        totalDeductible += insurance.deductible;
      }
      return totalDeductible;
    },
    0
  );

  // const coveragePercent = appointment.insurances.map((insurance) => {
  //   let coveragePercentAmount = 0;
  //   if (insurance.insuranceType.type == "Primary") {
  //     coveragePercentAmount = insurance.preventativeCoveragePercent;
  //     return coveragePercentAmount;
  //   }
  // });

  const coveragePercent = appointment.insurances.reduce(
    (percent, insurance) => {
      if (insurance.insuranceType.type === "Primary") {
        percent += insurance.preventativeCoveragePercent;
      }
      return percent;
    },
    0
  );

  // const yearlyMax = appointment.insurances.map((insurance) => {
  //   let yearlyMaxAmount = 0;
  //   if (insurance.insuranceType.type == "Primary") {
  //     yearlyMaxAmount = insurance.yearlyMax;
  //   }
  //   return yearlyMaxAmount;
  // });

  const yearlyMax = appointment.insurances.reduce((max, insurance) => {
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
        {/* <Link to={`/AdminUserList/UserDetails/${user.id}`}> */}
        <p className="text-left px-2">
          Patient Name: {appointment.userProfile.fullName}
        </p>
        {/* </Link> */}
        <p className="text-left px-2">Current Insurance: {insuranceList}</p>
        <p className="text-left px-2">
          Appointment Date: {appointment.appointmentDate}
        </p>
        <p className="text-left px-2">
          Patient Estimate: ${" "}
          {calculatePatientCost(
            appointment.appointmentCost,
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

export default AppointmentObject;
