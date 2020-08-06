import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

/*
 * Component listing the server status in the form of bar graph
 */
function Server() {
  /*
   * chartOptions describes the format and style of the graph.
   * More information on Highcharts website
   */
  const [chartOptions, setChartOptions] = useState({
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
      categories: [],
    },
    series: [
      {
        colorByPoint: true,
        showInLegend: false,
        data: [],
      },
    ],
  });
  /*
   * Fetch server status information from the server after the component is added to the DOM
   * and create the bar graph by changing the chartOptions state
   */
  useEffect(() => {
    fetch(BASE_URL + "/datasets/search", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const dataList = [];
          const categoriesList = [];
          for (const property in data.status) {
            if (property === "Valid response") {
              continue;
            }
            dataList.push(data.status[property]);
            categoriesList.push(property);
          }
          setChartOptions({
            xAxis: {
              categories: categoriesList,
            },
            series: [
              {
                data: dataList,
              },
            ],
          });
        }
      });
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default Server;
