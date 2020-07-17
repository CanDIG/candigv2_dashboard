import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {},
    };
  }

  splitString(newString) {
    let splitted = newString.replace(/([a-z])([A-Z])/g, "$1 $2");
    let capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
    return capitalized;
  }

  componentDidMount() {
    this.fetchData(this.props.datasetId);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.datasetId !== prevProps.datasetId ||
      this.props.table !== prevProps.table ||
      this.props.field !== prevProps.field ||
      this.props.chartType !== prevProps.chartType
    ) {
      this.fetchData(this.props.datasetId);
    }
  }

  fetchData(datasetId) {
    const table = this.props.table;
    const field = this.props.field;

    if (!datasetId) {
      return;
    }

    fetch(BASE_URL + "/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset_id: datasetId,
        logic: {
          id: "A",
        },
        components: [
          {
            id: "A",
            patients: {},
          },
        ],
        results: [
          {
            table: table,
            fields: [field],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let result = data.results[table][0][field];
          let options = {
            chart: { type: this.props.chartType },
            title: { text: "Distribuition of " + this.splitString(field) },
            subtitle: {
              text: this.props.datasetName + " " + this.splitString(table),
            },
            series: [{ data: [] }],
            xAxis: { categories: [] },
          };
          for (const property in result) {
            options.series[0].data.push(result[property]);
            options.xAxis.categories.push(property);
          }

          this.setState({ chartOptions: options });
        }
      });
  }

  render() {
    const chartOptions = this.state.chartOptions;
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}

export default CustomChart;
