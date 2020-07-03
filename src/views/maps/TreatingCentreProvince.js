import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from "highcharts/modules/map";
import mapDataCanada from "@highcharts/map-collection/countries/ca/ca-all.geo.json";

// Consts
import BASE_URL from "../../constants/constants.js"

HighchartsMap(Highcharts);


class TreatingCentreProvince extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartOptions: {
        title: {
          text: "Treating Centre Province"
        },
        credits: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        colorAxis: {
          min: 0,
          minColor: '#E6E7E8',
          maxColor: '#005645'
        },
        series: [
          {
            type: 'map',
            name: 'Province',
            mapData: mapDataCanada,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
          }
        ]
      }, 
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
        let data_count = []
        let hc_prov_codes = ["ca-ab", "ca-bc", "ca-mb", "ca-nb", "ca-nl", "ca-nt", "ca-ns", "ca-nu", "ca-on", "ca-pe", "ca-qc", "ca-sk", "ca-yt"]
        let prov_short_codes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
        let prov_full_names = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory']

        if (data) {
          let treatingCentreProvince = data.results.enrollments[0].treatingCentreProvince

          for (let name in treatingCentreProvince) {
            if (prov_short_codes.includes(name)) {
              let temp_data_count = []
              temp_data_count.push(hc_prov_codes[prov_short_codes.indexOf(name)])
              temp_data_count.push(treatingCentreProvince[name])
              data_count.push(temp_data_count)
            }
            else if (prov_full_names.includes(name)) {
              let temp_data_count = []
              temp_data_count.push(hc_prov_codes[prov_full_names.indexOf(name)])
              temp_data_count.push(treatingCentreProvince[name])
              data_count.push(temp_data_count)
            }
          }
        }
        
        const chart = {
          series: [
            {
              data: data_count,
            }
          ]
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