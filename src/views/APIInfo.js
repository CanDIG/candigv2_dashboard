import React from "react";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

// reactstrap components
import { Card, CardBody, Row, Col, Table } from "reactstrap";

// Consts
import BASE_URL from "../constants/constants.js";

function APIInfo() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody className="all-icons">
                <Table responsive>
                  <SwaggerUI url={BASE_URL + "/static/api.yaml"} />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default APIInfo;
