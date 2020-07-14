import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
  Container,
} from "reactstrap";

import CustomChart from "../components/Graphs/CustomChart.js";
import CustomVisualizationDropDown from "../components/Dropdowns/CustomVisualizationDropDown.js";

const initialState = {
  datasetName: "",
  datasetId: "",
};

class CustomVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.datasetId) {
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      datasetId: nextProps.datasetId,
      datasetName: nextProps.datasetName,
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col sm="12" xs="12" md="12" lg="6" xl="6">
                <CustomVisualizationDropDown datasetId={this.props.datasetId} />
              </Col>
              <Col sm="12" xs="12" md="12" lg="6" xl="6">
                <CustomVisualizationDropDown datasetId={this.props.datasetId} />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="content">
          <Row>
            <Col lg="6" md="6" sm="6">
              <Row>
                <Col xs="3">
                  <Input type="select" id="table1">
                  </Input>
                </Col>
                <Col xs="3">
                  <Input type="select" id="key1"></Input>
                </Col>
                <Col xs="3">
                  <Input type="select" id="type1"></Input>
                </Col>
                <Col xs="3">
                  <Button class="btn btn-primary">Confirm</Button>
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <CustomChart
                    datasetId={this.props.datasetId}
                    chartType={"pie"}
                    table={"patients"}
                    field={"gender"}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
              <Row>
                <Col xs="3">
                  <Input type="select" id="table2"></Input>
                </Col>
                <Col xs="3">
                  <Input type="select" id="key2"></Input>
                </Col>
                <Col xs="3">
                  <Input type="select" id="type2"></Input>
                </Col>
                <Col xs="3">
                  <Button class="btn btn-primary">Confirm</Button>
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <CustomChart
                    datasetId={this.props.datasetId}
                    chartType={"pie"}
                    table={"patients"}
                    field={"gender"}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div> */}
      </>
    );
  }
}

export default CustomVisualization;
