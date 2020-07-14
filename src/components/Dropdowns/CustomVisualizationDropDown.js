import React from "react";
import { Container } from "reactstrap";
// Consts
import tableSchema from "../../constants/tableSchema.js";

import { Card, CardBody, Row, Col, Button, Input } from "reactstrap";
import CustomChart from "components/Graphs/CustomChart.js";

/*
 * Dropdown component listing all the available Datasets
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
      selectedColumn: "dateofbirth",
      selectedChart: "bar",
    };
  }

  /*
   * Fetch dataset information from the server after the Dropdown component is added to the DOM
   * and update both parent and local state
   */

  componentDidMount() {
    this.buildColumnsList(Object.keys(tableSchema)[0]);
    const selectedTable = Object.keys(tableSchema)[0];
    const selectColumn = tableSchema[selectedTable][0];
    this.setState({
      selectedTable: selectedTable.toLowerCase(),
      selectedColumn: selectColumn.toLowerCase(),
    });
  }

  handleTableClick = (e) => {
    let table = e.currentTarget.textContent;
    this.buildColumnsList(table);
  };

  handleColumnClick = (e) => {
    this.setState({ selectedColumn: e.currentTarget.textContent });
  };

  handleChartClick = (e) => {
    this.setState({ selectedChart: e.currentTarget.textContent.toLowerCase() });
  };

  buildTableList() {
    return Object.keys(tableSchema).map((x) => {
      x = x.charAt(0).toUpperCase() + x.slice(1);
      return <option onClick={this.handleTableClick}>{x}</option>;
    });
  }

  buildColumnsList(tableName) {
    let columnsList = tableSchema[tableName.toLowerCase()].map((x) => {
      x = x.charAt(0).toUpperCase() + x.slice(1);
      return <option onClick={this.handleColumnClick}>{x}</option>;
    });
    const selectedColumn = tableSchema[tableName.toLowerCase()][0];
    this.setState({
      columnsList: columnsList,
      selectedTable: tableName.toLowerCase(),
      selectedColumn: selectedColumn,
    });
  }

  buildChartList() {
    const chartList = ["Bar", "Column", "Pie", "Scatter"];
    return chartList.map((x) => {
      return <option onClick={this.handleChartClick}>{x}</option>;
    });
  }

  render() {
    const tables = this.buildTableList();
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Input type="select">{tables}</Input>
            </Col>

            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Input type="select">{this.state.columnsList}</Input>
            </Col>

            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Input type="select">{this.buildChartList()}</Input>
            </Col>
            <Col xs="6" sm="6" md="3" lg="3" xl="3">
              <Button class="btn btn-primary">Confirm</Button>
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
