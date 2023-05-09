import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addAppointment } from "../../modules/AppointmentManager";
import ReactDatePicker from "react-datepicker";
import { getAllInsurances } from "../../modules/InsuranceManager";
import { getAllDentists } from "../../modules/DentistManager";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
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
  const [dentists, setDentists] = useState();
  const [insurances, setInsurances] = useState();

  useEffect(() => {
    getAllInsurances().then(setInsurances);
  }, []);

  useEffect(() => {
    getAllDentists().then(setDentists);
  }, []);

  const handlesetDentistandDate = (evt) => {
    const { name, value } = evt.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleInsuranceChange = (index, field, value) => {
    // Copy the existing state of the appointment object
    const updatedAppointment = { ...appointment };

    // Convert isPrimary value to integer if needed
    if (field === "isPrimary") {
      value = value ? 1 : 2;
    }

    // Update the relevant insurance object in the InsuranceList array
    const updatedInsurance = { ...updatedAppointment.InsuranceList[index] };
    updatedInsurance[field] = value;
    updatedAppointment.InsuranceList[index] = updatedInsurance;

    // Set the updated state of the appointment object
    setAppointment(updatedAppointment);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    addAppointment(appointment).then(() => navigate("/"));
  };

  return (
    <Form onSubmit={handleCreateAppointment}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="Dentist"></Label>
          <select
            key="Dentist"
            name="DentistId"
            value={appointment.DentistId}
            onChange={handlesetDentistandDate}
          >
            <option>Choose Dentist</option>
            {dentists?.map((dentist) => {
              return <option value={dentist.id}>{dentist.name}</option>;
            })}
          </select>
        </FormGroup>

        <FormGroup>
          {/* Dropdowns for selecting insurance and primary/secondary */}
          <select
            value={appointment.InsuranceList[0].insuranceId}
            onChange={(e) =>
              handleInsuranceChange(0, "insuranceId", e.target.value)
            }
          >
            <option>Choose Insurance</option>
            {insurances?.map((insurance) => {
              return <option value={insurance.id}>{insurance.name}</option>;
            })}
          </select>
          {/* options for insurance */}
          <Label htmlFor="primary-0">
            Check if Primary:
            <input
              type="checkbox"
              checked={appointment.InsuranceList[0].isPrimary === 1}
              onChange={(e) =>
                handleInsuranceChange(0, "isPrimary", e.target.checked)
              }
            />
          </Label>

          {/* Repeat for second insurance */}
          <select
            value={appointment.InsuranceList[1].insuranceId}
            onChange={(e) =>
              handleInsuranceChange(1, "insuranceId", e.target.value)
            }
          >
            <option>Choose Insurance</option>
            {insurances?.map((insurance) => {
              return <option value={insurance.id}>{insurance.name}</option>;
            })}
          </select>
          {/* options for insurance */}
          <Label>
            Check if Primary:
            <input
              type="checkbox"
              checked={appointment.InsuranceList[1].isPrimary === 1}
              onChange={(e) =>
                handleInsuranceChange(1, "isPrimary", e.target.checked)
              }
            />
          </Label>
        </FormGroup>

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
          <Button>Book It!</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
};

export default CreateAppointment;
