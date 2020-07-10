import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      datasetId: "",
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          type: "bar",
          height: "200px; auto",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: [],
        },
        series: [
          {
            colorByPoint: true,
            showInLegend: false,
            data: [],
          },
        ],
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.fetchData(this.props.datasetId);
    }
  }

  componentDidMount() {
    if(this.props.datasetId){
      this.fetchData(this.props.datasetId); 
    }
  }

  fetchData(datasetId) {
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
            table: this.props.table,
            fields: [this.props.field],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let counts = data.results[this.props.table][0][this.props.field];
          let options = {
            series: [{ data: [] }],
            xAxis: { categories: [] },
            title: { text: this.props.title}
          };
          for (const property in counts) {
            options.series[0].data.push(counts[property]);
            options.xAxis.categories.push(
              property.charAt(0).toUpperCase() + property.slice(1)
            );
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

export default BarChart;
