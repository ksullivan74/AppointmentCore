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
    InsuranceList: [],
  });

  const [insurances, setInsurances] = useState();
  const [dentists, setDentists] = useState();

  useEffect(() => {
    getAllInsurances().then(setInsurances);
  }, []);

  useEffect(() => {
    getAllDentists().then(setDentists);
  }, []);

  const handlesetAppointment = (evt) => {
    const { name, value } = evt.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handlesetAppointmentInsurance = (e) => {
    const value = parseInt(e.target.value);
    setAppointment({
      ...appointment,
      InsuranceList: [...appointment.InsuranceList, value],
    });
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
            onChange={handlesetAppointment}
          >
            <option>Choose Dentist</option>
            {dentists?.map((dentist) => {
              return <option value={dentist.id}>{dentist.name}</option>;
            })}
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Primary Insurance"></Label>
          <select
            key="Insurance"
            name="Primary"
            value={appointment.InsuranceList}
            onChange={handlesetAppointmentInsurance}
          >
            <option>Choose Primary Insurance</option>
            {insurances?.map((insurance) => {
              return (
                <option value={insurance.id}>{insurance.insuranceName}</option>
              );
            })}
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Secondary Insurance"></Label>
          <select
            key="Insurance"
            name="Secondary"
            value={appointment.InsuranceList}
            onChange={handlesetAppointmentInsurance}
          >
            <option>Choose Primary Insurance</option>
            {insurances?.map((insurance) => {
              return (
                <option value={insurance.id}>{insurance.insuranceName}</option>
              );
            })}
          </select>
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
            onChange={handlesetAppointment}
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
