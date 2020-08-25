import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import { CHORD_METADATA_URL } from "../constants/constants";

function IndividualsOverview() {
  const [individualsInfo, setIndividualsInfo] = useState({});
  const [individualCounter, setIndividualCount] = useState(0);

  const fetchData = () => {
    fetch(CHORD_METADATA_URL + "/api/individuals?page_size=10000")
      .then((response) => response.json())
      .then((data) => {
        // setIndividualsInfo(data);
        console.log(data)
        setIndividualCount(data.results.length);
      });
  };

  const countIndividuals = () => {
    
  };
  // sex, ethnicity
  // agregation of labeling under diseases
  // karyotypic_sex
  // date_of_birth
  // extra_properties -> height
  // extra_properties -> weight
  // extra_properties -> education

  fetchData();

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
                      <i className="nc-icon nc-single-02 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Individuals</p>
                      <CardTitle tag="p">{individualCounter}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default IndividualsOverview;
