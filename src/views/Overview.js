/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

// Consts
import BASEURL from "../constants/constants";

import Server from "./graphs/Server.js";
import BarChart from "./graphs/BarChart.js";
import CancerType from "./graphs/CancerType.js";
import TreatingCentreProvince from "./maps/TreatingCentreProvince";

const initialState = {
  datasetName: "",
  datasetId: "",
  provinces: 0,
  hospitals: 0,
  patients: 0,
  samples: 0,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if(this.props.datasetId){
      this.fetchData(this.props.datasetId); 
    }
  }

  fetchData(datasetId) {
    if (datasetId) {
      this.getCounters(datasetId, "enrollments", [
        "datasetId",
        "treatingCentreName",
        "treatingCentreProvince",
      ]);
      this.getCounters(datasetId, "samples", ["datasetId"]);
    }
  }

  getCounters(dataset_id, table, fields) {
    fetch(BASEURL + "/count", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset_id: dataset_id,
        logic: {
          id: "A",
        },
        components: [
          {
            id: "A",
            enrollments: {},
          },
        ],
        results: [
          {
            table: table,
            fields: fields,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (table === "enrollments") {
          let datasetId = this.getDatadetIdFromEnrollments(data);
          this.setState({
            patients: data.results.enrollments[0].datasetId[datasetId],
            hospitals: Object.keys(
              data.results.enrollments[0].treatingCentreName
            ).length,
            provinces: Object.keys(
              data.results.enrollments[0].treatingCentreProvince
            ).length,
            samples: this.state.samples,
          });
        } else if (table === "samples") {
          let datasetId = this.getDatadetIdFromSamples(data);
          this.setState({
            patients: this.state.patients,
            hospitals: this.state.hospitals,
            provinces: this.state.provinces,
            samples: data.results.samples[0].datasetId[datasetId],
          });
        }
      })
      .catch((err) => {
        this.setState({
          datasetName: "",
          datasetId: "",
          provinces: "Not Available",
          hospitals: "Not Available",
          patients: "Not Available",
          samples: "Not Available",
        });
      });
  }

  getDatadetIdFromEnrollments(data) {
    return Object.keys(data.results.enrollments[0].datasetId)[0];
  }

  getDatadetIdFromSamples(data) {
    return Object.keys(data.results.samples[0].datasetId)[0];
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.setState({
        datasetId: this.props.datasetId,
        datasetName: this.props.datasetId,
      });
      this.getCounters(this.props.datasetId, "enrollments", [
        "datasetId",
        "treatingCentreName",
        "treatingCentreProvince",
      ]);
      this.getCounters(this.props.datasetId, "samples", ["datasetId"]);
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
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
                        <CardTitle tag="p">{this.state.provinces}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bank text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Hospitals</p>
                        <CardTitle tag="p">{this.state.hospitals}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
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
                        <CardTitle tag="p">{this.state.patients}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Samples</p>
                        <CardTitle tag="p">{this.state.samples}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <Server />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={this.props.datasetId}
                    table="patients"
                    field="gender"
                    title="Gender Distribution"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={this.props.datasetId}
                    table="treatments"
                    field="therapeuticModality"
                    title="Treatment Modalities"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={this.props.datasetId}
                    table="enrollments"
                    field="enrollmentInstitution"
                    title="Enrollment Institutions"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" sm="6">
              <Card>
                <CardBody>
                  <TreatingCentreProvince datasetId={this.props.datasetId} />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
              <Card>
                <CardBody>
                  <CancerType datasetId={this.props.datasetId} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
