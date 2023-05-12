import { useEffect, useState } from "react";
import { FormGroup, Form, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addInsurance } from "../../modules/InsuranceManager";

const CreateInsurance = () => {
  const navigate = useNavigate();
  const [InsuranceName, setInsuranceName] = useState();
  const [GroupName, setGroupName] = useState();
  const [GroupNumber, setGroupNumber] = useState();
  const [YearlyMax, setYearlyMax] = useState();
  const [PreventativeCoveragePercent, setPreventativeCoveragePercent] =
    useState();
  const [BasicCoveragePercent, setBasicCoveragePercent] = useState();
  const [MajorCoveragePercent, setMajorCoveragePercent] = useState();
  const [Deductible, setDeductible] = useState();

  const handleCreateInsurance = (e) => {
    e.preventDefault();

    const insurance = {
      InsuranceName,
      GroupName,
      GroupNumber,
      YearlyMax,
      PreventativeCoveragePercent,
      BasicCoveragePercent,
      MajorCoveragePercent,
      Deductible,
    };
    addInsurance(insurance).then(() => navigate("/"));
  };

  return (
    <Form onSubmit={handleCreateInsurance}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="Insurance-Name">
            Insurance Company:
            <input
              type="text"
              onChange={(e) => setInsuranceName(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-GroupName">
            Group Name:
            <input
              type="text"
              value={GroupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-GroupNumber">
            Group Number:
            <input
              type="text"
              value={GroupNumber}
              onChange={(e) => setGroupNumber(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-YearlyMax">
            Yearly Max:
            <input
              type="text"
              value={YearlyMax}
              onChange={(e) => setYearlyMax(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-PreventativeCoveragePercent">
            Preventative Coverage Percent:
            <input
              type="number"
              value={PreventativeCoveragePercent}
              onChange={(e) => setPreventativeCoveragePercent(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-BasicCoveragePercent">
            Basic Coverag Percent:
            <input
              type="number"
              value={BasicCoveragePercent}
              onChange={(e) => setBasicCoveragePercent(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-MajorCoveragePercent">
            Major Coverage Percent:
            <input
              type="number"
              value={MajorCoveragePercent}
              onChange={(e) => setMajorCoveragePercent(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Insurance-Deductible">
            Deductible:
            <input
              type="text"
              value={Deductible}
              onChange={(e) => setDeductible(e.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Button>Upload</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
};

export default CreateInsurance;
