import React from 'react';
import PropTypes from 'prop-types';
// reactstrap components
import {
  Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import CustomOfflineChart from '../components/Graphs/CustomOfflineChart';

/*
 * Patient Overview view component
 * @param {array} patientsList
 * @param {string} datasetName
 */
function PatientsOverview({ patientsList, datasetName }) {
  /*
   * Return the aggregation value of a key from an array of objects.
   * @param {array} objectArray: An array of objects.
   * @param {object} property: The key to aggregate on.
   * @return an object with different values of the
   *  queried property being the key, and frequency being the value.
   */
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1;
      delete acc.undefined;
      return acc;
    }, {});
  }

  const genderObj = groupBy(patientsList, 'gender');
  const ethnicityObj = groupBy(patientsList, 'ethnicity');
  const raceObj = groupBy(patientsList, 'race');
  const causeOfDeathObj = groupBy(patientsList, 'causeOfDeath');
  const provinceOfResidenceObj = groupBy(patientsList, 'provinceOfResidence');
  const occupationalOrEnvironmentalExposureObj = groupBy(
    patientsList,
    'occupationalOrEnvironmentalExposure',
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
                      <CardTitle tag="p">{patientsList.length}</CardTitle>
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
                  datasetName={datasetName}
                  dataObject={genderObj}
                  chartType="bar"
                  barTitle="Gender"
                  height="200px; auto"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName={datasetName}
                  dataObject={ethnicityObj}
                  chartType="bar"
                  barTitle="Ethnicity"
                  height="200px; auto"
                />
              </CardBody>
            </Card>
          </Col>

          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName={datasetName}
                  dataObject={raceObj}
                  chartType="bar"
                  barTitle="Race"
                  height="200px; auto"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName={datasetName}
                  dataObject={causeOfDeathObj}
                  chartType="bar"
                  barTitle="Cause Of Death"
                  height="200px; auto"
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
                  datasetName={datasetName}
                  dataObject={provinceOfResidenceObj}
                  chartType="pie"
                  barTitle="Province Of Residence"
                  height="400px; auto"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName={datasetName}
                  dataObject={occupationalOrEnvironmentalExposureObj}
                  chartType="pie"
                  barTitle="Occupational Or Environmental Exposure"
                  height="400px; auto"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

PatientsOverview.propTypes = {
  patientsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  datasetName: PropTypes.string.isRequired,
};

export default PatientsOverview;
