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
      </>
    );
  }
}

export default CustomVisualization;
