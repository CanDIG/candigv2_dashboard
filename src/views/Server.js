import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const url = "http://ga4ghdev01.bcgsc.ca:20127/datasets/search"

class Server extends Component {
  constructor() {
    super()
    this.state = {
      chartOptions: {
        chart: {
          type: "bar"
        },
        title: {
          text: ""
        },
        series: [
          {
            name: "Known peers", data: [0]
          },
          {
            name: "Queried peers", data: [0]
          },
          {
            name: "Successful communications", data: [0]
          }]
      }
    }
  }

  componentDidMount() {    
    fetch(url, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data) {
          let series = { series: [] }
          let options = {
            chart: { type: "bar" },
            title: { text: "Server Status" }
          }
          for (const property in data.status) {
            series["series"].push({ name: property, data: [data.status[property]] })
          }
          options["series"] = series["series"]
          this.setState({ chartOptions: options })
        }
      })

  }

  render() {
    const chartOptions = this.state.chartOptions
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    );
  }

}

export default Server;