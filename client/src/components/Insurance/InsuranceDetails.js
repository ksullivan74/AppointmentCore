import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getInsurancesDetails } from "../../modules/InsuranceManager";
import { updateInsurance } from "../../modules/InsuranceManager";

const InsuranceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [insurance, setInsurance] = useState();
  const [groupName, setGroupName] = useState();
  const [groupNumber, setGroupNumber] = useState();
  const [yearlyMax, setyearlyMax] = useState();
  const [preventativeCoveragePercent, setpreventativeCoveragePercent] =
    useState();

  useEffect(() => {
    getInsurancesDetails(parseInt(id)).then(setInsurance);
  }, []);

  const handlUpdateInsurance = (e) => {
    e.preventDefault();

    const insurance = {
      groupName,
      groupNumber,
      yearlyMax,
      preventativeCoveragePercent,
    };
    updateInsurance(insurance, parseInt(id)).then(() => navigate("/"));
  };

  return (
    <Form onSubmit={handlUpdateInsurance}>
      <div>
        <h3>Insurance: {insurance?.insuranceName}</h3>
        <FormGroup>
          <h4>Group Name: {insurance?.groupName}</h4>
          <Label>
            Update Group Name:
            <input type="text" onChange={(e) => setGroupName(e.target.value)} />
          </Label>
        </FormGroup>
        <FormGroup>
          <h4>Group Number: {insurance?.groupNumber}</h4>
          <Label>
            Update Group Number:
            <input
              type="text"
              onChange={(e) => setGroupNumber(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <h4>Yearly Max: {insurance?.yearlyMax}</h4>
          <Label>
            <input
              type="number"
              onChange={(e) => setyearlyMax(e.target.value)}
            />
          </Label>
        </FormGroup>
        <h4>
          <FormGroup>
            Preventative coverage percent:{"  "}
            {insurance?.preventativeCoveragePercent * 100} %
            <Label>
              <input
                type="number"
                onChange={(e) =>
                  setpreventativeCoveragePercent(e.target.value / 100)
                }
              />
            </Label>
          </FormGroup>
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
      <FormGroup>
        <Button>Update</Button>
      </FormGroup>
    </Form>
  );
};

export default InsuranceDetails;
