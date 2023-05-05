import { getToken } from "./authManager";

const baseUrl = "http://localhost:3000/api/Insurance";

export const getAllInsurances = () => {
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

export const getInsurancesDetails = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/InsuranceDetails/${id}`, {
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
