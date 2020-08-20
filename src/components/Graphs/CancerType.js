import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Consts
import BASE_URL from '../../constants/constants';

// Hook
// Used to keep the previous value of a state or prop
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/*
 * Pie graph component for type of cancer data
 * @param {string} datasetId
 */

function CancerType({ datasetId }) {
  const [chartOptions, setChartOptions] = useState({
    credits: {
      enabled: false,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Cancer type',
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

  /*
   * Fetch cancer information from the server after the component is added to the DOM
   * and create the bar graph by changing the chartOptions state
   */
  useEffect(() => {
    if (prevDatasetId !== datasetId && datasetId) {
      fetch(`${BASE_URL}/count`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataset_id: datasetId,
          logic: {
            id: 'A',
          },
          components: [
            {
              id: 'A',
              diagnoses: {},
            },
          ],
          results: [
            {
              table: 'diagnoses',
              fields: ['cancerType'],
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { cancerType } = data.results.diagnoses[0];

          const graphData = Object.keys(cancerType).map(
            (key) => ({ name: key, y: cancerType[key] }),
          );

          setChartOptions({
            series: [
              {
                data: graphData,
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

CancerType.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default CancerType;
