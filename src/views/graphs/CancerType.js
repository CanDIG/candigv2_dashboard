import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

class CancerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Cancer type",
        },
      },
      datasetId: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.fetchData(this.props.datasetId);
    }
  }

  componentDidMount() {
    if (this.props.datasetId) {
      this.fetchData(this.props.datasetId);
    }
  }

  fetchData(datasetId) {
    fetch(BASE_URL + "/count", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset_id: datasetId,
        logic: {
          id: "A",
        },
        components: [
          {
            id: "A",
            diagnoses: {},
          },
        ],
        results: [
          {
            table: "diagnoses",
            fields: ["cancerType"],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const graphData = [];
        if (data) {
          let cancerType = data.results.diagnoses[0].cancerType;
          for (const name in cancerType) {
            graphData.push({ name: name, y: cancerType[name] });
          }
        }
        const chart = {
          series: [
            {
              data: graphData,
            },
          ],
        };
        this.setState({ chartOptions: chart });
      })
      .catch((err) => {
        const chart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
          },
          title: {
            text: "No data in pie chart",
          },
          series: [
            {
              type: "pie",
              name: "Random data",
              data: [],
            },
          ],
        };
        this.setState({ chartOptions: chart });
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

export default CancerType;
