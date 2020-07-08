import React from "react";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

// reactstrap components
import {
  //   Button,
  Card,
  //   CardHeader,
  CardBody,
  //   CardFooter,
  //   CardTitle,
  //   FormGroup,
  //   Form,
  //   Input,
  Row,
  Col,
  Table,
} from "reactstrap";

class APIInfo extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody className="all-icons">
                  <Table responsive>
                    <SwaggerUI url="http://ga4ghdev01.bcgsc.ca:20127/static/api.yaml" />
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default APIInfo;
