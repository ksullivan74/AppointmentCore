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

export const getAllInsuranceTypes = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/InsuranceTypes/`, {
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

export const addInsurance = (insurance) => {
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insurance),
    })
  );
};

export const updateInsurance = (insurance, id) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/InsuranceDetails/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insurance),
    })
  );
};
