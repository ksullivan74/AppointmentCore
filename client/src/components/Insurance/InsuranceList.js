import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllInsurances } from "../../modules/InsuranceManager";
import InsuranceObject from "./InsuranceObject";

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);

  const getInsurances = () => {
    getAllInsurances().then((insurance) => setInsurances(insurance));
  };

  useEffect(() => {
    getInsurances();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {insurances.map((insurance) => (
          <InsuranceObject insurance={insurance} key={insurance.id} />
        ))}
      </div>
    </div>
  );
};

export default InsuranceList;
