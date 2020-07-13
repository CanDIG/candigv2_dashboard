import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Input
} from "reactstrap";

import CustomChart from "../components/Graphs/CustomChart.js"

const initialState = {
  datasetName: "",
  datasetId: ""
}

class CustomVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  componentDidMount() {
    if (this.props.datasetId) {

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      datasetId: nextProps.datasetId,
      datasetName: nextProps.datasetName
    })
  }

  render() {

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6" md="6" sm="6">
                <Row>
                  <Input type="select" id="table1"></Input>
                  <Input type="select" id="key1"></Input>
                  <Input type="select"  id="type1"></Input>
                  <Button id="adv1_confirm" class="btn btn-secondary">Confirm</Button>
                  </Row>
              <Card>
                <CardBody>
                    <CustomChart datasetId={this.props.datasetId} chartType={"pie"} table={"patients"} field={"gender"}/>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
                <Row>
                  <Input type="select" id="table2"></Input>
                  <Input type="select" id="key2"></Input>
                  <Input type="select"  id="type2"></Input>
                  <Button id="adv1_confirm" class="btn btn-secondary">Confirm</Button>
                  </Row>
              <Card>
                <CardBody>
                    <CustomChart datasetId={this.props.datasetId} chartType={"pie"} table={"patients"} field={"gender"}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CustomVisualization;