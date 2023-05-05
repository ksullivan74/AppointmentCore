import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getInsurancesDetails } from "../../modules/InsuranceManager";

const InsuranceDetails = () => {
  const { id } = useParams();
  const [insurance, setInsurance] = useState();

  useEffect(() => {
    getInsurancesDetails(parseInt(id)).then(setInsurance);
  }, []);

  console.log(insurance);

  return (
    <div>
      <h3>Insurance: {insurance?.insuranceName}</h3>
      <h4>Group Name: {insurance?.groupName}</h4>
    </div>
  );
};

export default InsuranceDetails;
