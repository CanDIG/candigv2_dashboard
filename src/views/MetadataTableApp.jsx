import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import NotificationAlert from 'react-notification-alert';

import BASE_URL from '../constants/constants';
import ClinMetadataTable from '../components/Tables/ClinMetadataTable';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { notify } from '../utils/alert';

function CreateColumns(columnNames, setState) {
  const columnList = [];

  Object.values(columnNames).forEach((name) => {
    const column = {
      Header: (name.charAt(0).toLocaleUpperCase() + name.slice(1)),
      accessor: name,
      filter: 'fuzzyText',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} `,
    };
    columnList.push(column);
  });
  setState(columnList);
}

function TableApp({ datasetId }) {
  const [selectedMetadata, setSelectedMetadata] = useState('patients');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const { promiseInProgress } = usePromiseTracker();

  const notifyEl = useRef(null);

  React.useEffect(() => {
    // fetch data
    try {
      const datasets = [];
      if (datasetId) {
        trackPromise(
          fetch(`${BASE_URL}/${selectedMetadata}/search`, {
            method: 'POST',
            body: JSON.stringify({ datasetId }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return {};
            })
            .then((dataResponse) => {
              for (let i = 0; i < dataResponse.results[selectedMetadata].length; i += 1) {
                datasets.push(dataResponse.results[selectedMetadata][i]);
              }
              setData(datasets);
              CreateColumns(Object.keys(datasets[0]), setColumns);
            })
            .catch(() => {
              notify(
                notifyEl,
                'The resources you requested were not available.',
                'warning',
              );
            }),
        );
      }
    } catch (err) {
      notify(
        notifyEl,
        'The resources you requested were not available.',
        'warning',
      );
    }
  }, [selectedMetadata, datasetId]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  return (
    <div className="content">
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <>
          <NotificationAlert ref={notifyEl} />
          <ClinMetadataTable
            columns={columnsM}
            data={dataM}
            metadataCallback={setSelectedMetadata}
          />
        </>
      )}
    </div>
  );
}

TableApp.propTypes = {
  datasetId: PropTypes.string,
};
TableApp.defaultProps = {
  datasetId: 'patients',
};

export default TableApp;
