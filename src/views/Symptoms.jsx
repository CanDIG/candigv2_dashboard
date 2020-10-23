import React, {
  useState, useEffect,
} from 'react';

import {
  Row, UncontrolledAlert
} from 'reactstrap';
import { searchSymptom } from '../api/api';
import ClinMetadataTable from '../components/Tables/ClinMetadataTable';
import SearchBySymptom from '../components/Queries/KatsuSymptoms';

import {
  ProcessData, diseaseSchema,
  featureSchema, ProcessPhenopackets,
  ProcessFeatures,
} from '../components/Processing/ChordSchemas';

import LoadingIndicator, {
  trackPromise,
  usePromiseTracker,
} from '../components/LoadingIndicator/LoadingIndicator';

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

// function isEmpty(obj) {
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) { return false; }
//   }
//   return true;
// }

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// function getMetadataData(setData, setPhenopackets) {
//   return fetch(`${CHORD_METADATA_URL}/api/individuals`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       const [dataset, phenopackets] = ProcessMetadata(data.results);
//       setData(dataset);
//       setPhenopackets(phenopackets);
//     });
// }

// const MOCKED = (query) => {
//     console.log(query === 'fatigue')
//     if (query === 'fatigue') {
//         return RESPONSE.results
//     }

//     return {}
// }

function TableApp() {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [data, setData] = useState([]);
  const [phenopackets, setPhenopackets] = useState({});
  const [columns, setColumns] = useState([]);
  const [diseases, setDiseases] = useState({});
  const [symptomsTable, setSymptomsTable] = useState({});
  const [complicationsTable, setComplicationsTable] = useState({});

  const [activeID, setActiveID] = useState('');
  const [diseaseTableData, setDiseaseTableData] = useState([]);
  const [diseaseTableColumns, setDiseaseTableColumns] = useState([]);
  const [symptomsTableData, setSymptomsTableData] = useState([]);
  const [symptomsTableColumns, setSymptomsTableColumns] = useState([]);
  const [complicationsTableData, setComplicationsTableData] = useState([]);
  const [complicationsTableColumns, setComplicationsTableColumns] = useState([]);

  const { promiseInProgress } = usePromiseTracker();

  const clearSubTables = () => {
    setDiseaseTableData([]);
    setSymptomsTableData([]);
    setComplicationsTableData([]);
  };

  useEffect(() => {
    // fetch data
    try {
      trackPromise(
        searchSymptom(selectedSymptom)
          .then((dataResponse) => {
            const [tdatasets, tphenopackets] = ProcessPhenopackets(dataResponse.results);
            setData(tdatasets);
            setPhenopackets(tphenopackets);
            setActiveID('');
            clearSubTables();
          }),
      );
    } catch (err) {
      // Need better reporting
      console.log(err);
    }
  }, [selectedSymptom]);

  useEffect(() => {
    // Separate Effect since state change is async and columns depends on data
    // Not entirely sure if necessary
    try {
      CreateColumns(Object.keys(data[0]), setColumns);
    } catch (err) {
      // Need better reporting
      console.log(err);
    }
  }, [data]);

  useEffect(() => {
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

  useEffect(() => {
    try {
      CreateColumns(Object.keys(diseaseTableData[0]), setDiseaseTableColumns);
    } catch (err) {
      // Need better reporting
      // console.log(err);
    }
  }, [diseaseTableData]);

  useEffect(() => {
    // Want to store previously created tables rather than reprocessing them
    // each time the same sub tables are needed
    try {
      if (activeID) {
        if (symptomsTable[activeID]) {
          // The sub tables have already been created once, so set them back
          setSymptomsTableData(symptomsTable[activeID]);
        } else {
          const newFeature = ProcessFeatures(activeID, phenopackets[activeID].phenotypic_features, featureSchema, 'symptom');
          if (!isEmpty(symptomsTable)) {
            // Add onto the existing dictionary of created sub
            setSymptomsTable((prevState) => ({
              ...prevState, ...newFeature,
            }));
            setSymptomsTableData(symptomsTable[activeID]);
          } else {
            setSymptomsTable(newFeature);
            setSymptomsTableData(symptomsTable[activeID]);
          }
        }
      }
    } catch (err) {
      // console.log(err);
    }
  }, [activeID, symptomsTable, phenopackets]);

  useEffect(() => {
    // Want to store previously created tables rather than reprocessing them
    // each time the same sub tables are needed

    try {
      if (activeID) {
        if (complicationsTable[activeID]) {
          // The sub tables have already been created once, so set them back
          setComplicationsTableData(complicationsTable[activeID]);
        } else {
          const newFeature = ProcessFeatures(activeID, phenopackets[activeID].phenotypic_features, featureSchema, 'complication');
          if (!isEmpty(complicationsTable)) {
            // Add onto the existing dictionary of created sub
            setComplicationsTable((prevState) => ({
              ...prevState, ...newFeature,
            }));
            setComplicationsTableData(complicationsTable[activeID]);
          } else {
            setComplicationsTable(newFeature);
            setComplicationsTableData(complicationsTable[activeID]);
          }
        }
      }
    } catch (err) {
      // console.log(err);
    }
  }, [activeID, complicationsTable, phenopackets]);

  useEffect(() => {
    try {
      CreateColumns(Object.keys(symptomsTableData[0]), setSymptomsTableColumns);
    } catch (err) {
      // Need better reporting
      // console.log(err);
    }
  }, [symptomsTableData]);

  useEffect(() => {
    try {
      CreateColumns(Object.keys(complicationsTableData[0]), setComplicationsTableColumns);
    } catch (err) {
      // Need better reporting
      // console.log(err);
    }
  }, [complicationsTableData]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  const dataD = React.useMemo(() => diseaseTableData, [diseaseTableData]);
  const columnsD = React.useMemo(() => diseaseTableColumns, [diseaseTableColumns]);

  const dataS = React.useMemo(() => symptomsTableData, [symptomsTableData]);
  const columnsS = React.useMemo(() => symptomsTableColumns, [symptomsTableColumns]);

  const dataC = React.useMemo(() => complicationsTableData, [complicationsTableData]);
  const columnsC = React.useMemo(() => complicationsTableColumns, [complicationsTableColumns]);

  return (
    <div className="content">

      <Row>
          <UncontrolledAlert color="info" className="ml-auto mr-auto alert-with-icon" fade={false}>
            <span
              data-notify="icon"
              className="nc-icon nc-zoom-split"
            />

            <b>
              <span>
                <p> Search for a symptom to get started. </p>
                <p>
                  {' '}
                  A table of individuals exhibiting the searched symptom will be generated.
                  Clicking on a row will bring up more tables about the specific individual,
                  including their symptoms and associated diseases.
                </p>
              </span>
            </b>
          </UncontrolledAlert>
        </Row>

      <Row>
        <SearchBySymptom
          setSymptom={setSelectedSymptom}
        />
      </Row>
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <ClinMetadataTable
          columns={columnsM}
          data={dataM}
          metadataCallback={() => {}}
          activeMetadata={false}
          setActiveID={setActiveID}
          isMainTable
        />
      )}
      <ClinMetadataTable
        columns={columnsD}
        data={dataD}
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={() => {}}
        isMainTable={false}
      />
      <ClinMetadataTable
        columns={columnsS}
        data={dataS}
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={() => {}}
        isMainTable={false}
      />
      <ClinMetadataTable
        columns={columnsC}
        data={dataC}
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={() => {}}
        isMainTable={false}
      />
    </div>
  );
}

TableApp.propTypes = {
};
TableApp.defaultProps = {
};

export default TableApp;
