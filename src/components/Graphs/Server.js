import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Consts
import BASE_URL from '../../constants/constants';

/*
 * Component listing the server status in the form of bar graph
 */
function Server({ datasetId }) {
  /*
   * chartOptions describes the format and style of the graph.
   * More information on Highcharts website
   */
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: '200px; auto',
    },
    title: {
      text: 'Server Status',
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
    fetch(`${BASE_URL}/datasets/search`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        const dataList = [];
        const categoriesList = Object.keys(data.status).filter((key) => {
          if (key === 'Valid response') {
            return false;
          }
          return true;
        }).map((key) => {
          dataList.push(data.status[key]);
          return key;
        });
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
      });
  }, [datasetId]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

Server.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default Server;
