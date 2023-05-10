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

  return (
    <div>
      <h3>Insurance: {insurance?.insuranceName}</h3>
      <h4>Group Name: {insurance?.groupName}</h4>
      <h4>Group Number: {insurance?.groupNumber}</h4>
      <h4>Yearly Max: {insurance?.yearlyMax}</h4>
      <h4>
        Preventative coverage percent:{"  "}
        {insurance?.preventativeCoveragePercent * 100} %
      </h4>
      <h4>
        Preventative coverage percent:{"  "}
        {insurance?.basicCoveragePercent * 100} %
      </h4>
      <h4>
        Preventative coverage percent:{"  "}
        {insurance?.majorCoveragePercent * 100} %
      </h4>
      <h4>Deductible: $ {insurance?.deductible}</h4>
    </div>
  );
};

export default InsuranceDetails;
