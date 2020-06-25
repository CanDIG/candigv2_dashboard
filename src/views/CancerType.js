import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const url = "http://ga4ghdev01.bcgsc.ca:20127/count"

class CancerType extends Component {
  constructor(props) {
    super(props)
    this.state = {chartOptions: {}}
  }

  componentDidMount() {
    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({        
        dataset_id: "WyJtb2NrMSJd",
        logic: {
          id: "A"
        },
        components: [
          {
            id: "A",
            diagnoses: {}
          }
        ],
        results: [
          {
            table: "diagnoses",
            fields: [
              "cancerType"
            ]
          }
        ]
      })

    })
      .then(response => response.json())
      .then(data => {
        const graphData = []
        if (data) {
          let cancerType = data.results.diagnoses[0].cancerType
          for (const name in cancerType) {
            graphData.push({ name: name, y: cancerType[name] })
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
            text: "Cancer type"
          },
          series: [{
            data: graphData
          }]
        }
        this.setState({chartOptions: chart})
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

export default CancerType;