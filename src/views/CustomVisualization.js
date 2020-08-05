import React from "react";
// reactstrap components
import { Row, Col, Container } from "reactstrap";

import CustomVisualizationDropDown from "../components/Dropdowns/CustomVisualizationDropDown.js";

function CustomVisualization({ datasetId, datasetName }) {
  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col sm="12" xs="12" md="12" lg="6" xl="6">
              <CustomVisualizationDropDown
                datasetId={datasetId}
                datasetName={datasetName}
              />
            </Col>
            <Col sm="12" xs="12" md="12" lg="6" xl="6">
              <CustomVisualizationDropDown
                datasetId={datasetId}
                datasetName={datasetName}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CustomVisualization;
