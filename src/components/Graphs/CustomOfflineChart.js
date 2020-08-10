import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

window.Highcharts = Highcharts;

function CustomOfflineChart({
  chartType,
  barTitle,
  height,
  datasetName,
  dataObject,
}) {
  const [chartOptions, setChartOptions] = useState({
    chart: { type: chartType, height: height },
    title: {
      text: "Distribuition of " + splitString(barTitle),
    },
    subtitle: {
      text: datasetName,
    },
  });

  function splitString(newString) {
    let splitted = newString.replace(/([a-z])([A-Z])/g, "$1 $2");
    let capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
    return capitalized;
  }

  useEffect(() => {
    if (chartType === "pie") {
      createPieChart();
    } else {
      createBarChart();
    }
  }, [datasetName, dataObject]);

  function createBarChart() {
    let options = {
      series: [{ data: [], colorByPoint: true, showInLegend: false }],
      xAxis: { categories: [] },
    };
    const data = [];
    const categories = [];
    for (const entry in dataObject) {
      data.push(dataObject[entry]);
      categories.push(entry);
    }

    setChartOptions({
      series: [{ data: data, colorByPoint: true, showInLegend: false }],
      xAxis: { categories: categories },
    });
  }

  function createPieChart() {
    let options = {
      credits: {
        enabled: false,
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
    };
    const graphData = [];
    for (const entry in dataObject) {
      graphData.push({ name: entry, y: dataObject[entry] });
    }
    options["series"] = [{ data: graphData }];
    setChartOptions(options);
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default CustomOfflineChart;
