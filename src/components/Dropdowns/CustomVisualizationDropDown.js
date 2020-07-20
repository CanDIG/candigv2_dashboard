import React from "react";
import { Container } from "reactstrap";
// Consts
import tableSchema from "../../constants/tableSchema.js";

import { Card, CardBody, Row, Col, Input } from "reactstrap";
import CustomChart from "components/Graphs/CustomChart.js";

/*
 * Visualizatiion component to plot tables and its columns values to different kinds of graphs
 */

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

  splitString(newString) {
    let splitted = newString.replace(/([a-z])([A-Z])/g, "$1 $2");
    let capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
    return capitalized;
  }

  /*
   * It is invoked immediately after updating occurs.
   * This method updates the `selectedColumn` everytime there is a change of `selectedTable`,
   * setting the `selectedColumn` to the first element of the columns list
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTable !== prevState.selectedTable) {
      this.setState({
        selectedColumn: tableSchema[this.state.selectedTable][0],
      });
    }
  }

  /*
   * Update the `selectedTable` and `selectedColumn` state everytime the component is clicked
   */

  handleTableClick = (e) => {
    const table = e.currentTarget.value;
    const column = tableSchema[table][0];
    this.setState({ selectedTable: table, selectedColumn: column });
  };

  /*
   * Update the `selectedColumn` state everytime the component is clicked
   */

  handleColumnClick = (e) => {
    this.setState({ selectedColumn: e.currentTarget.value });
  };

  /*
   * Update the `selectedChart` state everytime the component is clicked
   */

  handleChartClick = (e) => {
    this.setState({ selectedChart: e.currentTarget.value.toLowerCase() });
  };

  /*
   * Create dropdown for tables
   */

  buildTableList() {
    return Object.keys(tableSchema).map((x) => {
      return (
        <option key={x} value={x}>
          {this.splitString(x)}
        </option>
      );
    });
  }

  /*
   * Create dropdown for columns
   */

  buildColumnsList(tableName) {
    let columnsList = tableSchema[tableName].map((x) => {
      return (
        <option key={x} value={x}>
          {this.splitString(x)}
        </option>
      );
    });
    return columnsList;
  }

  /*
   * Create dropdown for charts
   */

  buildChartList = () => {
    const chartList = ["Bar", "Column", "Scatter", "Pie"];
    return chartList.map((x) => {
      return (
        <option key={x} value={x.toLowerCase()}>
          {x}
        </option>
      );
    });
  };

  render() {
    const tables = this.buildTableList();
    const columns = this.buildColumnsList(this.state.selectedTable);
    return (
      <>
        <Container fluid>
          <div style={{ marginBottom: "10px" }}>
            <Row>
              <Col xs="6" sm="6" md="4" lg="4" xl="4">
                <Input onChange={this.handleTableClick} type="select">
                  {tables}
                </Input>
              </Col>

              <Col xs="6" sm="6" md="4" lg="4" xl="4">
                <Input
                  value={this.state.selectedColumn}
                  onChange={this.handleColumnClick}
                  type="select"
                >
                  {columns}
                </Input>
              </Col>

              <Col xs="6" sm="6" md="4" lg="4" xl="4">
                <Input onChange={this.handleChartClick} type="select">
                  {this.buildChartList()}
                </Input>
              </Col>
              {/* <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Button className="btn btn-primary">Confirm</Button>
            </Col> */}
            </Row>
          </div>
        </Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CustomChart
                  datasetId={this.props.datasetId}
                  datasetName={this.props.datasetName}
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
