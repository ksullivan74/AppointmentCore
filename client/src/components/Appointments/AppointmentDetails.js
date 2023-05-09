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
import { getAllDentists } from "../../modules/DentistManager";
import { getAllInsurances } from "../../modules/InsuranceManager";
import { updateAppointment } from "../../modules/AppointmentManager";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});
  const [dentists, setDentists] = useState();
  const [insurances, setInsurances] = useState();
  const [updatedAppointment, setUpdatedAppointment] = useState({
    AppointmentDate: "",
    DentistId: 0,
    InsuranceList: [
      {
        insuranceId: 0,
        isPrimary: 1,
      },
      {
        insuranceId: 0,
        isPrimary: 2,
      },
    ],
  });

  useEffect(() => {
    getAllInsurances().then(setInsurances);
  }, []);

  useEffect(() => {
    getAllDentists().then(setDentists);
  }, []);

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

  const handleInsuranceChange = (index, field, value) => {
    // Copy the existing state of the appointment object
    const updatedAppointment2 = { ...updatedAppointment };

    // Convert isPrimary value to integer if needed
    if (field === "isPrimary") {
      value = value ? 1 : 2;
    }

    // Update the relevant insurance object in the InsuranceList array
    const updatedInsurance = { ...updatedAppointment.InsuranceList[index] };
    updatedInsurance[field] = value;
    updatedAppointment2.InsuranceList[index] = updatedInsurance;

    // Set the updated state of the appointment object
    setUpdatedAppointment(updatedAppointment2);
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    updateAppointment(updatedAppointment, parseInt(id)).then(() =>
      navigate("/AppointmentList")
    );
  };

  const handlesetDentistandDate = (evt) => {
    const { name, value } = evt.target;
    setUpdatedAppointment({ ...updatedAppointment, [name]: value });
  };

  return (
    <Card>
      <h2 className="text-left px-2">
        Appointment Estimate: ${" "}
        {calculatePatientCost(
          appointment?.appointmentCost,
          coveragePercent,
          deductible,
          yearlyMax
        )}
      </h2>
      <h4>Appointment Details / Update:</h4>
      <CardBody>
        <p className="text-left px-2">
          Patient First Name: {appointment?.userProfile?.firstName}
        </p>
        <p className="text-left px-2">
          Patient Last Name: {appointment?.userProfile?.lastName}
        </p>
        <p className="text-left px-2">
          Current Dentist: {appointment?.dentist?.name}
        </p>
        <p>Update Below:</p>
        <Form onSubmit={handleUpdateAppointment}>
          <fieldset>
            <FormGroup>
              <Label htmlFor="Dentist"></Label>
              <select
                key="Dentist"
                name="DentistId"
                value={appointment.DentistId}
                onChange={handlesetDentistandDate}
              >
                <option>Dentist: {appointment?.dentist?.name}</option>
                {dentists?.map((dentist) => {
                  return <option value={dentist.id}>{dentist.name}</option>;
                })}
              </select>
            </FormGroup>
          </fieldset>
          <p className="text-left px-2">Current Insurance: {insuranceList}</p>
          <p className="text-left px-2">Update Insurance Below:</p>
          <FormGroup>
            {/* Dropdowns for selecting insurance and primary/secondary */}
            <select
              value={updatedAppointment.InsuranceList[0].insuranceId}
              onChange={(e) =>
                handleInsuranceChange(0, "insuranceId", e.target.value)
              }
            >
              <option>Choose Insurance</option>
              {insurances?.map((insurance) => {
                return (
                  <option value={insurance.id}>
                    {insurance.insuranceName}
                  </option>
                );
              })}
            </select>
            {/* options for insurance */}
            <Label htmlFor="primary-0">
              Check if Primary:
              <input
                type="checkbox"
                checked={updatedAppointment.InsuranceList[0].isPrimary === 1}
                onChange={(e) =>
                  handleInsuranceChange(0, "isPrimary", e.target.checked)
                }
              />
            </Label>

            {/* Repeat for second insurance */}
            <select
              value={updatedAppointment.InsuranceList[1].insuranceId}
              onChange={(e) =>
                handleInsuranceChange(1, "insuranceId", e.target.value)
              }
            >
              <option>Choose Insurance</option>
              {insurances?.map((insurance) => {
                return (
                  <option value={insurance.id}>
                    {insurance.insuranceName}
                  </option>
                );
              })}
            </select>
            {/* options for insurance */}
            <Label>
              Check if Primary:
              <input
                type="checkbox"
                checked={updatedAppointment.InsuranceList[1].isPrimary === 1}
                onChange={(e) =>
                  handleInsuranceChange(1, "isPrimary", e.target.checked)
                }
              />
            </Label>
          </FormGroup>
          <p className="text-left px-2">
            Current Appointment Date: {appointment?.appointmentDate}
          </p>
          <p className="text-left px-2">Choose New Date Below:</p>
          <FormGroup>
            <label htmlFor="Appointment Date"></label>
            <input
              required
              key="Appointment Date"
              type="datetime-local"
              className="form-control"
              name="AppointmentDate"
              placeholder="Title"
              value={appointment.AppointmentDate}
              onChange={handlesetDentistandDate}
            />
          </FormGroup>
          <FormGroup>
            <Button>Update</Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AppointmentDetails;
