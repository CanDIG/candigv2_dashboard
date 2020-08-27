import React, { useState, useEffect } from 'react';
// reactstrap components
import {
  Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import CustomOfflineChart from '../components/Graphs/CustomOfflineChart';
import BoxPlotChart from '../components/Graphs/BoxPlotChart';

import { CHORD_METADATA_URL } from '../constants/constants';

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property].charAt(0).toUpperCase()
      + obj[property].slice(1).toLowerCase().replace('_', ' ');
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += 1;
    delete acc.undefined;
    return acc;
  }, {});
}

function groupExtraPropertieByGender(data, property) {
  const extraPropertieList = {};
  for (let i = 0; i < data.results.length; i += 1) {
    const key = data.results[i].sex.charAt(0).toUpperCase()
      + data.results[i].sex.slice(1).toLowerCase().replace('_', ' ');
    if (!extraPropertieList[key]) {
      extraPropertieList[key] = [];
    }
    extraPropertieList[key].push(
      parseFloat(data.results[i].extra_properties[property]),
    );
  }
  return extraPropertieList;
}

function countDiseases(data) {
  const diseases = {};
  for (let i = 0; i < data.results.length; i += 1) {
    for (let j = 0; j < data.results[i].phenopackets.length; j += 1) {
      for (
        let k = 0;
        k < data.results[i].phenopackets[j].diseases.length;
        k += 1
      ) {
        const key = data.results[i].phenopackets[j].diseases[k].term.label;
        if (!diseases[key]) {
          diseases[key] = 0;
        }
        diseases[key] += 1;
      }
    }
  }
  return diseases;
}

function getCounterUnderExtraProperties(data, property) {
  const education = {};
  for (let i = 0; i < data.results.length; i += 1) {
    const key = data.results[i].extra_properties[property];
    if (!education[key]) {
      education[key] = 0;
    }
    education[key] += 1;
  }

  return education;
}

function IndividualsOverview() {
  const [individualCounter, setIndividualCount] = useState(0);
  const [ethnicityObject, setEthnicityObject] = useState({ '': 0 });
  const [genderObject, setGenderObject] = useState({ '': 0 });
  const [doBObject, setDoBObject] = useState({ '': 0 });
  const [diseasesObject, setDiseasesObject] = useState({ '': 0 });
  const [educationObject, setEducationObject] = useState({ '': 0 });
  const [boxPlotObject, setBoxPlotObject] = useState({ '': [] });
  const [didFetch, setDidFetch] = useState(false);

  const countIndividuals = (data) => {
    setIndividualCount(data.results.length);
  };

  const countEthnicity = (data) => {
    setEthnicityObject(groupBy(data.results, 'ethnicity'));
  };

  const countGender = (data) => {
    setGenderObject(groupBy(data.results, 'sex'));
  };

  const countDateOfBirth = (data) => {
    setDoBObject(groupBy(data.results, 'date_of_birth'));
  };

  useEffect(() => {
    fetch(`${CHORD_METADATA_URL}/api/individuals?page_size=10000`)
      .then((response) => response.json())
      .then((data) => {
        countIndividuals(data);
        countEthnicity(data);
        countGender(data);
        countDateOfBirth(data);
        setDiseasesObject(countDiseases(data));
        setEducationObject(getCounterUnderExtraProperties(data, 'education'));
        setBoxPlotObject(groupExtraPropertieByGender(data, 'weight'));
        setDidFetch(true);
      });
  }, [didFetch]);

  // sex, ethnicity - Ok
  // agregation of labeling under diseases -ok
  // karyotypic_sex
  // date_of_birth - ok
  // extra_properties -> height
  // extra_properties -> weight
  // extra_properties -> education

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12" md="12" sm="12">
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
        <Row>
          <Col lg="6" md="6" sm="6">
            <Card>
              <CardBody>
                <BoxPlotChart
                  chartTitle="Weight"
                  plotObject={boxPlotObject}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName=""
                  dataObject={genderObject}
                  chartType="pie"
                  barTitle="Gender"
                  height="400px; auto"
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
                  datasetName=""
                  dataObject={ethnicityObject}
                  chartType="bar"
                  barTitle="Ethnicity"
                  height="400px; auto"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName=""
                  dataObject={diseasesObject}
                  chartType="pie"
                  barTitle="Diseases"
                  height="400px; auto"
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
                  datasetName=""
                  dataObject={doBObject}
                  chartType="pie"
                  barTitle="Date of Birth"
                  height="400px; auto"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                <CustomOfflineChart
                  datasetName=""
                  dataObject={educationObject}
                  chartType="bar"
                  barTitle="Education"
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

export default IndividualsOverview;
