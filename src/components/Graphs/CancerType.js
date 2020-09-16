import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import LoadingIndicator, { trackPromise, usePromiseTracker } from '../LoadingIndicator/LoadingIndicator';
import { notify, NotificationAlert } from '../../utils/alert';

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

const initialState = {
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
};

function reducer(state, action) {
  switch (action.type) {
    case 'addSeries':
      return {
        ...state,
        ...{
          series: [
            {
              data: action.payload,
              colorByPoint: true,
              showInLegend: false,
            }],
        },
      };
    default:
      throw new Error();
  }
}

/*
 * Pie graph component for type of cancer data
 * @param {string} datasetId
 */

function CancerType({ datasetId }) {
  const [chartOptions, dispatchChartOptions] = useReducer(reducer, initialState);
  const { promiseInProgress } = usePromiseTracker();
  const prevDatasetId = usePrevious(datasetId);
  const notifyEl = useRef(null);

  /*
   * Fetch cancer information from the server after the component is added to the DOM
   * and create the bar graph by changing the chartOptions state
   */
  useEffect(() => {
    if (prevDatasetId !== datasetId && datasetId) {
      trackPromise(fetch(`${BASE_URL}/count`, {
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
          if (!data.results.diagnoses[0]) {
            throw new Error();
          }
          const { cancerType } = data.results.diagnoses[0];

          const graphData = Object.keys(cancerType).map(
            (key) => ({ name: key, y: cancerType[key] }),
          );

          dispatchChartOptions({ type: 'addSeries', payload: graphData });
        }).catch(() => {
          dispatchChartOptions({ type: 'addSeries', payload: [] });
          notify(
            notifyEl,
            'Some resources you requested were not available.',
            'warning',
          );
        }));
    }
  });

  return (
    <>
      <NotificationAlert ref={notifyEl} />
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </>
  );
}

CancerType.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default CancerType;
