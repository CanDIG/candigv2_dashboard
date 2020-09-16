import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { notify, NotificationAlert } from '../../utils/alert';

// Consts
import BASE_URL from '../../constants/constants';

function CustomChart({
  datasetId, table, field, chartType, datasetName,
}) {
  const [chartOptions, setChartOptions] = useState({});
  const notifyEl = useRef(null);

  function splitString(newString) {
    const splitted = newString.replace(/([a-z])([A-Z])/g, '$1 $2');
    const capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
    return capitalized;
  }

  useEffect(() => {
    if (datasetId) {
      fetch(`${BASE_URL}/count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataset_id: datasetId,
          logic: {
            id: 'A',
          },
          components: [
            {
              id: 'A',
              patients: {},
            },
          ],
          results: [
            {
              table,
              fields: [field],
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            let options = {};
            if (!data.results[table][0]) {
              throw new Error();
            }
            const result = data.results[table][0][field];
            if (chartType === 'pie') {
              options = {
                credits: {
                  enabled: false,
                },
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: chartType,
                },
                title: { text: `Distribution of ${splitString(field)}` },
                subtitle: {
                  text: `${datasetName} ${splitString(table)}`,
                },
              };
              const graphData = Object.keys(result).map((key) => ({ name: key, y: result[key] }));
              options.series = [{ data: graphData }];
            } else {
              options = {
                chart: { type: chartType },
                title: { text: `Distribution of ${splitString(field)}` },
                subtitle: {
                  text: `${datasetName} ${splitString(table)}`,
                },
                series: [{ data: [] }],
                xAxis: { categories: [] },
              };
              Object.keys(result).map((key) => {
                options.series[0].data.push(result[key]);
                options.xAxis.categories.push(key);
                return 1;
              });
            }

            setChartOptions(options);
          }
        }).catch(() => {
          let options = {};
          if (chartType === 'pie') {
            options = {
              credits: {
                enabled: false,
              },
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: chartType,
              },
              title: { text: `Distribution of ${splitString(field)}` },
              subtitle: {
                text: `${datasetName} ${splitString(table)}`,
              },
              series: {
                data: [],
              },
            };
          } else {
            options = {
              chart: { type: chartType },
              title: { text: `Distribution of ${splitString(field)}` },
              subtitle: {
                text: `${datasetName} ${splitString(table)}`,
              },
              series: [{ data: [] }],
              xAxis: { categories: [] },
            };
          }
          setChartOptions(options);
          notify(
            notifyEl,
            'Some resources you requested were not available.',
            'warning',
          );
        });
    }
  }, [datasetId, table, field, chartType, datasetName]);

  return (
    <div>
      <NotificationAlert ref={notifyEl} />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

CustomChart.propTypes = {
  datasetId: PropTypes.string.isRequired,
  table: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
  datasetName: PropTypes.string.isRequired,
};

export default CustomChart;
