import { getToken } from "./authManager";

const baseUrl = "http://localhost:3000/api/Appointment";

export const getAllAppointments = () => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred.");
      }
    });
  });
};

export const getAppointmentDetails = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/AppointmentDetails/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred.");
      }
    });
  });
};

export const addAppointment = (appointment) => {
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
  );
};
