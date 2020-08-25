import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {CHORD_METADATA_URL} from '../constants/constants';
import {ProcessMetadata} from "components/Processing/CHORD"
import ClinMetadataTable from '../components/Tables/ClinMetadataTable';

import INDIVIDUALS from "constants/individuals_local"


function dummy() {
    return(
        <></>
    )
}



function CreateColumns(columnNames, cb) {
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
  cb(columnList);
}

function getMetadataData(datasetId, cb) {
  return fetch(`${CHORD_METADATA_URL}/api/individuals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      const datasets = ProcessMetadata(data.results);
      cb(datasets);
    });
}

function TableApp({  }) {
  // const [selectedMetadata, setSelectedMetadata] = useState('patients');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  React.useEffect(() => {
    // fetch data
    try {
      getMetadataData(setData);
    } catch (err) {
      //Need better reporting
      console.log(err);
    }
  }, [data]);

  React.useEffect(() => {
    // Separate Effect since state change is async and columns depends on data
    // Not entirely sure if necessary
    try {
      CreateColumns(Object.keys(data[0]), setColumns);
    } catch (err) {
      //Need better reporting
      console.log(err);
    }
  }, [data]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  return (
    <div className="content">
      <ClinMetadataTable columns={columnsM} data={dataM} metadataCallback={() => {}} />
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
