import React, { Component, useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Consts
import BASE_URL from "../../constants/constants.js";

// Hook
// Used to keep the previous value of a state or prop 
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]); 

  return ref.current;
}

function BarChart({ datasetId, table, field, title }) {
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false,
    },
    chart: {
      type: "bar",
      height: "200px; auto",
    },
    title: {
      text: title,
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

  const prevDatasetId = usePrevious(datasetId);

  useEffect(() => {
    if (prevDatasetId !== datasetId && datasetId) {
      fetch(BASE_URL + "/count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataset_id: datasetId,
          logic: {
            id: "A",
          },
          components: [
            {
              id: "A",
              patients: {},
            },
          ],
          results: [
            {
              table: table,
              fields: [field],
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let counts = data.results[table][0][field];
          const dataList = [];
          const categories = [];
          for (const property in counts) {
            dataList.push(counts[property]);
            categories.push(
              property.charAt(0).toUpperCase() + property.slice(1)
            );
          }
          setChartOptions({
            xAxis: {
              categories: categories,
            },
            series: [
              {
                data: dataList,
              },
            ],
          });
        });
    }
  });
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default BarChart;
