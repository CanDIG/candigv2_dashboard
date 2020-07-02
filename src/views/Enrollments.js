import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Consts
import BASE_URL from './../constants/constants.js'

class Enrollments extends Component {
  constructor() {
    super()
    this.state = {
      datasetId: "",
      chartOptions: {
        credits: {
          enabled: false
        },
        chart: {
          type: "bar",
          height: "200px; auto"
        },
        title: {
          text: "Enrollments"
        },
        series: [{
          colorByPoint: true,
          showInLegend: false,
          data: []
        }]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.datasetId !== prevProps.datasetId) {
      this.fetchData(this.props.datasetId)
    }
  }

  fetchData(datasetId) {
    fetch(BASE_URL + "/count",
      {
        method: 'POST',
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
                "enrollmentInstitution"
              ]
            }
          ]
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          let enrollmentInstitution = data.results.enrollments[0].enrollmentInstitution
          let options = { series: [{ data: [] }], xAxis: { categories: [] } }
          for(const property in enrollmentInstitution){
            options.series[0].data.push(enrollmentInstitution[property])
            options.xAxis.categories.push(property)
          }

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

export default Enrollments;