import React from "react";
import { Container } from "reactstrap";
// Consts
import tableSchema from "../../constants/tableSchema.js";

import { Card, CardBody, Row, Col, Button, Input } from "reactstrap";
import CustomChart from "components/Graphs/CustomChart.js";

/*
 * Dropdown component listing all the available Datasets
 */

// const buildChartList = () => {
//   const chartList = ["Bar", "Column", "Pie", "Scatter"];
//   return chartList.map((x) => {
//     return (
//       <option key={x} onClick={this.handleChartClick}>
//         {x}
//       </option>
//     );
//   });
// }

class CustomVisualizationDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownTablesOpen: false,
      dropdownColumnsOpen: false,
      dropdownChartsOpen: false,
      columnsList: [],
      selectedTable: "patients",
      selectedColumn: "dateOfBirth",
      selectedChart: "bar",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.selectedTable !== prevState.selectedTable) {
      this.setState({selectedColumn: tableSchema[this.state.selectedTable][0]})
    }
  }

  handleTableClick = (e) => {
    this.setState({ selectedTable: e.currentTarget.textContent });
  };

  handleColumnClick = (e) => {
    this.setState({ selectedColumn: e.currentTarget.textContent });
  };

  handleChartClick = (e) => {
    this.setState({ selectedChart: e.currentTarget.textContent });
  };

  buildTableList() {
    return Object.keys(tableSchema).map((x) => {
      return (
        <option key={x} onClick={this.handleTableClick}>
          {x}
        </option>
      );
    });
  }

  buildColumnsList(tableName) {
    let columnsList = tableSchema[tableName].map((x) => {
      return (
        <option key={x} onClick={this.handleColumnClick}>
          {x}
        </option>
      );
    });
    return columnsList;
  }

  buildChartList = () => {
    const chartList = ["Bar", "Column", "Pie", "Scatter"];
    return chartList.map((x) => {
      return (
        <option key={x} onClick={this.handleChartClick}>
          {x}
        </option>
      );
    });
  }

  render() {
    const tables = this.buildTableList();
    const columns = this.buildColumnsList(this.state.selectedTable);
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Input type="select">{tables}</Input>
            </Col>

            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              {/* <Input type="select">{this.state.columnsList}</Input> */}
              <Input type="select">{columns}</Input>
            </Col>

            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Input type="select">{this.buildChartList()}</Input>
            </Col>
            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Button className="btn btn-primary">Confirm</Button>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CustomChart
                  datasetId={this.props.datasetId}
                  chartType={this.state.selectedChart}
                  table={this.state.selectedTable}
                  field={this.state.selectedColumn}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default CustomVisualizationDropDown;
