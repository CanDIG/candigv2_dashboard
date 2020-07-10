import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

/*
 * Component listing the server status in the form of bar graph
 */
class Server extends Component {
  constructor() {
    super();
    /*
     * chartOptions describes the format and style of the graph.
     * More information on Highcharts website
     */
    this.state = {
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          type: "bar",
          height: "200px; auto",
        },
        title: {
          text: "Server Status",
        },
        xAxis: {
          categories: [
            "Known peers",
            "Queried peers",
            "Successful communications",
          ],
        },
        series: [
          {
            colorByPoint: true,
            showInLegend: false,
            data: [0, 0, 0],
          },
        ],
      },
    };
  }

  /*
   * Fetch server status information from the server after the component is added to the DOM
   * and create the bar graph by changing the chartOptions state 
   */
  componentDidMount() {
    fetch(BASE_URL + "/datasets/search", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let options = { series: [{ data: [] }], xAxis: { categories: [] } };
          for (const property in data.status) {
            if (property === "Valid response") {
              continue;
            }
            options.series[0].data.push(data.status[property]);
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

export default Server;
