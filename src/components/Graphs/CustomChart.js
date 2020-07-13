import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Consts
import BASE_URL from "../../constants/constants.js";

class CustomChart extends Component {
  constructor() {
    super()
    this.state = {
      chartOptions: {
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.fetchData(this.props.datasetId);
    }
  }

  fetchData(datasetId) {
    const table = this.props.table;
    const field = this.props.field;

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
          let options = { series: [{ data: [] }], xAxis: { categories: [] } };
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