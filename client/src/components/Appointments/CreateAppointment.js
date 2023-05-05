import { useEffect, useState, useRef } from "react";
import { Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addAppointment } from "../../modules/AppointmentManager";
import ReactDatePicker from "react-datepicker";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    AppointmentDate: "",
    AppointmentCost: "",
    DentistId: "",
    UserId: "",
    IsDeleted: "",
  });

  const handleSubmitUpload = (evt) => {
    evt.preventDefault();
    if (appointment.AppointmentDate) {
      addAppointment(appointment).then(() => {
        navigate("/");
      });
    } else {
      alert("Please Choose a Date");
    }
  };

  return (
    <div>
      <Card>
        <p className="text-left px-2">Upload a video</p>
        <CardBody>
          <div>
            <h2>Book an Appointment:</h2>
            <fieldset>
              <div className="form-group">
                <label htmlFor="Appointment Date"></label>
                <input
                  required
                  id="Appointment Date"
                  type="datetime-local"
                  className="form-control"
                  placeholder="Title"
                  onChange={(event) => {
                    const copy = { ...addAppointment };
                    copy.Title = event.target.value;
                    setAppointment(copy);
                  }}
                />
              </div>
            </fieldset>
            <button
              className="btn btn-success"
              onClick={(event) => {
                handleSubmitUpload(event);
              }}
            >
              Book It!
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateAppointment;
