import React, {
  useEffect, useRef, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { notify, NotificationAlert } from '../../utils/alert';

// Consts
import BASE_URL from '../../constants/constants';

function splitString(newString) {
  const splitted = newString.replace(/([a-z])([A-Z])/g, '$1 $2');
  const capitalized = splitted.charAt(0).toUpperCase() + splitted.substr(1);
  return capitalized;
}

function reducer(state, action) {
  switch (action.type) {
    case 'addPieChart':
      return {
        credits: {
          enabled: false,
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: action.payload.chartType,
        },
        title: { text: `Distribution of ${splitString(action.payload.field)}` },
        subtitle: {
          text: `${action.payload.datasetName} ${splitString(action.payload.table)}`,
        },
        series: [{ data: action.payload.graphData }],
      };
    case 'addRegularChart':
      return {
        chart: { type: action.payload.chartType },
        title: { text: `Distribution of ${splitString(action.payload.field)}` },
        subtitle: {
          text: `${action.payload.datasetName} ${splitString(action.payload.table)}`,
        },
        series: [{ data: action.payload.graphData }],
        xAxis: { categories: action.payload.categories },
      };
    default:
      throw new Error();
  }
}

function CustomChart({
  datasetId, table, field, chartType, datasetName,
}) {
  const [chartOptions, dispatchChartOptions] = useReducer(reducer, {});
  const notifyEl = useRef(null);

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
            if (!data.results[table][0]) {
              throw new Error();
            }
            const result = data.results[table][0][field];
            if (chartType === 'pie') {
              const graphData = Object.keys(result).map((key) => ({ name: key, y: result[key] }));
              dispatchChartOptions({
                type: 'addPieChart',
                payload: {
                  chartType, graphData, field, datasetName, table,
                },
              });
            } else {
              const graphData = [];
              const categories = [];
              Object.keys(result).map((key) => {
                graphData.push(result[key]);
                categories.push(key);
                return 1;
              });

              dispatchChartOptions({
                type: 'addRegularChart',
                payload: {
                  graphData,
                  categories,
                  chartType,
                  field,
                  datasetName,
                  table,
                },
              });
            }
          }
        }).catch(() => {
          notify(
            notifyEl,
            'Some resources you requested were not available.',
            'warning',
          );
          if (chartType === 'pie') {
            dispatchChartOptions({
              type: 'addPieChart',
              payload: {
                chartType, graphData: [], field, datasetName, table,
              },
            });
          } else {
            dispatchChartOptions({
              type: 'addRegularChart',
              payload: {
                graphData: [],
                categories: [],
                chartType,
                field,
                datasetName,
                table,
              },
            });
          }
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
