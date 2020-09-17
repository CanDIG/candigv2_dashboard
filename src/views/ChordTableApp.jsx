import React, { useState, useRef } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import {
  ProcessMetadata, ProcessData, diseaseSchema, featureSchema,
} from '../components/Processing/ChordSchemas';

import ChordMetadataTable from '../components/Tables/ChordMetadataTable';
import ChordSubTable from '../components/Tables/ChordSubTable';
import { CHORD_METADATA_URL } from '../constants/constants';

import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { notify, NotificationAlert } from '../utils/alert';

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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function TableApp() {
  const [data, setData] = useState([]);
  const [phenopackets, setPhenopackets] = useState({});
  const [columns, setColumns] = useState([]);
  const [diseases, setDiseases] = useState({});
  const [features, setFeatures] = useState({});
  const [activeID, setActiveID] = useState('');
  const [diseaseTableData, setDiseaseTableData] = useState([]);
  const [diseaseTableColumns, setDiseaseTableColumns] = useState([]);
  const [featuresTableData, setFeaturesTableData] = useState([]);
  const [featuresTableColumns, setFeaturesTableColumns] = useState([]);

  const { promiseInProgress } = usePromiseTracker();

  const notifyEl = useRef(null);

  React.useEffect(() => {
    // fetch data
    try {
      trackPromise(
        fetch(`${CHORD_METADATA_URL}/api/individuals`, {
          method: 'GET',
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
            const [dataset, phenopacket] = ProcessMetadata(dataResponse.results);
            setData(dataset);
            setPhenopackets(phenopacket);
            CreateColumns(Object.keys(dataset[0]), setColumns);
          })
          .catch(() => {
            notify(
              notifyEl,
              'The resources you requested were not available.',
              'warning',
            );
          }),
      );
    } catch (err) {
      // Need better reporting
      console.log(err);
      notify(
        notifyEl,
        'The resources you requested were not available.',
        'warning',
      );
    }
  }, []);

  React.useEffect(() => {
    try {
      if (activeID) {
        if (diseases[activeID]) {
          setDiseaseTableData(diseases[activeID]);
        } else {
          const newDisease = ProcessData(activeID, phenopackets[activeID].diseases, diseaseSchema);
          if (!isEmpty(diseases)) {
            setDiseases((prevState) => ({
              ...prevState, ...newDisease,
            }));
            setDiseaseTableData(diseases[activeID]);
          } else {
            setDiseases(newDisease);
            setDiseaseTableData(diseases[activeID]);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [activeID, diseases, phenopackets]);

  React.useEffect(() => {
    try {
      if (diseaseTableData[0]) {
        CreateColumns(Object.keys(diseaseTableData[0]), setDiseaseTableColumns);
      }
    } catch (err) {
      // This catch will always error out at least once due to async timing.
      // Need a better way to handle the logic

    }
  }, [diseaseTableData]);

  React.useEffect(() => {
    try {
      if (activeID) {
        if (features[activeID]) {
          setFeaturesTableData(features[activeID]);
        } else {
          console.log(phenopackets[activeID]);

          const newFeature = ProcessData(
            activeID,
            phenopackets[activeID].phenotypic_features,
            featureSchema,
          );
          if (!isEmpty(features)) {
            setFeatures((prevState) => ({
              ...prevState, ...newFeature,
            }));
            setFeaturesTableData(features[activeID]);
          } else {
            setFeatures(newFeature);
            setFeaturesTableData(features[activeID]);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [activeID, features, phenopackets]);

  React.useEffect(() => {
    try {
      if (featuresTableData[0]) {
        CreateColumns(Object.keys(featuresTableData[0]), setFeaturesTableColumns);
      }
    } catch (err) {
      // This catch will always error out at least once due to async timing.
      // Need a better way to handle the logic

    }
  }, [featuresTableData]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  const dataD = React.useMemo(() => diseaseTableData, [diseaseTableData]);
  const columnsD = React.useMemo(() => diseaseTableColumns, [diseaseTableColumns]);

  const dataF = React.useMemo(() => featuresTableData, [featuresTableData]);
  const columnsF = React.useMemo(() => featuresTableColumns, [featuresTableColumns]);

  return (
    <div className="content">
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <>
          <NotificationAlert ref={notifyEl} />

          <ChordMetadataTable columns={columnsM} data={dataM} setActiveID={setActiveID} />
          <ChordSubTable columns={columnsD} data={dataD} />
          <ChordSubTable columns={columnsF} data={dataF} />
        </>
      )}
    </div>
  );
}

export default TableApp;
