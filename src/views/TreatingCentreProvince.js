import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Consts
import BASE_URL from "../constants/constants.js"

class TreatingCentreProvince extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartOptions: {}, 
      datasetId: ""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.fetchData(this.props.datasetId)
    }
  }

  fetchData(datasetId) {
    fetch(BASE_URL + "/count", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataset_id: datasetId,
        logic: {
          id: "A"
        },
        components: [
          {
            id: "A",
            enrollments: {}
          }
        ],
        results: [
          {
            table: "enrollments",
            fields: [
              "treatingCentreProvince"
            ]
          }
        ]
      })

    })
      .then(response => response.json())
      .then(data => {
        const graphData = []
        if (data) {
          let treatingCentreProvince = data.results.enrollments[0].treatingCentreProvince
          for (const name in treatingCentreProvince) {
            graphData.push({ name: name, y: treatingCentreProvince[name] })
          }
        }
        const chart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: "Treating Centre Province"
          },
          series: [{
            data: graphData
          }]
        }
        this.setState({ chartOptions: chart })
      }
      )

  }

  render() {
    console.log(this.state)
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

export default TreatingCentreProvince;