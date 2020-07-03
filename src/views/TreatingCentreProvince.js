import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from "highcharts/modules/map";
//import mapDataCanada from "@highcharts/map-collection/countries/ca/ca-all.geo.json";
import mapDataCanada from './mapDataCanada'

// Consts
import BASE_URL from "../constants/constants.js"

require('highcharts/modules/map')(Highcharts);

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
        // const graphData = []
        // if (data) {
        //   let treatingCentreProvince = data.results.enrollments[0].treatingCentreProvince
        //   for (const name in treatingCentreProvince) {
        //     graphData.push({ name: name, y: treatingCentreProvince[name] })
        //   }
        // }
        // replace this with real data from the response above
        var data_count = [
            ['ca-bc', 1],
            ['ca-nu', 2],
            ['ca-nt', 3],
            ['ca-ab', 4],
            ['ca-nl', 5],
            ['ca-sk', 6],
            ['ca-mb', 7],
            ['ca-qc', 8],
            ['ca-on', 9],
            ['ca-nb', 10],
            ['ca-ns', 11],
            ['ca-pe', 12],
            ['ca-yt', 13]
        ];
        const chart = {

          title: {
            text: "Treating Centre Province"
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: "bottom"
            }
          },
        
          plotOptions: {
            map: {
              states: {
                hover: {
                  color: "#EEDD66"
                }
              }
            }
          },
          series: [
            {
            name: 'Province',
            mapData: mapDataCanada,
            data: data_count,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
          }]
        }
        this.setState({ chartOptions: chart })
      }
      )
  }
  render() {
    const chartOptions = this.state.chartOptions
    return (
      <div>
        <HighchartsReact
          contructorType={"mapChart"}
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    );
  }
}
export default TreatingCentreProvince;