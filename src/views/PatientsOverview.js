import React from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import CustomOfflineChart from "../components/Graphs/CustomOfflineChart";

const initialState = {
  datasetName: "",
  datasetId: "",
};

class PatientsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1;
      delete acc["undefined"];
      return acc;
    }, {});
  }

  render() {
    let genderObj = this.groupBy(this.props.patientsList, "gender");
    let ethnicityObj = this.groupBy(this.props.patientsList, "ethnicity");
    let raceObj = this.groupBy(this.props.patientsList, "race");
    let causeOfDeathObj = this.groupBy(this.props.patientsList, "causeOfDeath");
    let provinceOfResidenceObj = this.groupBy(
      this.props.patientsList,
      "provinceOfResidence"
    );
    let occupationalOrEnvironmentalExposureObj = this.groupBy(
      this.props.patientsList,
      "occupationalOrEnvironmentalExposure"
    );

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-world-2 text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Provinces</p>
                        <CardTitle tag="p">
                          {Object.keys(provinceOfResidenceObj).length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Patients</p>
                        <CardTitle tag="p">
                          {this.props.patientsList.length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={genderObj}
                    chartType={"bar"}
                    barTitle={"Gender"}
                    height={"200px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={ethnicityObj}
                    chartType={"bar"}
                    barTitle={"Ethnicity"}
                    height={"200px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={raceObj}
                    chartType={"bar"}
                    barTitle={"Race"}
                    height={"200px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={causeOfDeathObj}
                    chartType={"bar"}
                    barTitle={"Cause Of Death"}
                    height={"200px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={provinceOfResidenceObj}
                    chartType={"pie"}
                    barTitle={"Province Of Residence"}
                    height={"400px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12" sm="12">
              <Card>
                <CardBody>
                  <CustomOfflineChart
                    datasetName={this.props.datasetName}
                    dataObject={occupationalOrEnvironmentalExposureObj}
                    chartType={"pie"}
                    barTitle={"Occupational Or Environmental Exposure"}
                    height={"400px; auto"}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PatientsOverview;
