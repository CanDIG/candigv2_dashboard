import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

window.Highcharts = Highcharts;

class CustomOfflineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {},
    };
  }

  splitString(newString) {
    let splitted = newString.replace(/([a-z])([A-Z])/g, "$1 $2");
    let capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
    return capitalized;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataObject !== this.props.dataObject) {
      this.fetchData();
    }
  }

  createBarChart() {
    let options = {
      chart: { type: this.props.chartType, height: this.props.height },
      title: {
        text: "Distribuition of " + this.splitString(this.props.barTitle),
      },
      subtitle: {
        text: this.props.datasetName,
      },
      series: [{ data: [], colorByPoint: true, showInLegend: false }],
      xAxis: { categories: [] },
    };
    for (const entry in this.props.dataObject) {
      options.series[0].data.push(this.props.dataObject[entry]);
      options.xAxis.categories.push(entry);
    }

    this.setState({ chartOptions: options });
  }

  createPieChart() {
    let options = {
      credits: {
        enabled: false,
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.props.chartType,
        height: this.props.height,
      },
      title: {
        text: "Distribuition of " + this.splitString(this.props.barTitle),
      },
      subtitle: {
        text: this.props.datasetName,
      },
    };
    const graphData = [];
    for (const entry in this.props.dataObject) {
      graphData.push({ name: entry, y: this.props.dataObject[entry] });
    }
    console.log(graphData);
    options["series"] = [{ data: graphData }];
    this.setState({ chartOptions: options });
  }

  fetchData() {
    if (this.props.chartType === "pie") {
      this.createPieChart();
    } else {
      this.createBarChart();
    }
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  render() {
    const chartOptions = this.state.chartOptions;
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}

export default CustomOfflineChart;
