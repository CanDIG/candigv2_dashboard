import React, {
    useState, forwardRef, useRef, useEffect,
  } from 'react';
import PropTypes from 'prop-types';
  
import {
    Row, Button, ButtonDropdown, DropdownToggle,
    InputGroup, InputGroupAddon, DropdownMenu,
    InputGroupText, Col, DropdownItem, Dropdown,
    Input,
  } from 'reactstrap';
import Style from '../assets/css/StyledComponents/ColumnControlStyled';
import {searchSymptom, fetchIndividuals} from 'api/api';
import { notify, NotificationAlert } from '../utils/alert';

import { CHORD_METADATA_URL } from '../constants/constants';
import RESPONSE from 'constants/phenoResp';
import ClinMetadataTable from 'components/Tables/ClinMetadataTable';
import {
    ProcessMetadata, ProcessData, diseaseSchema, 
    featureSchema, ProcessPhenopackets, ProcessSymptoms
  } from '../components/Processing/ChordSchemas';

  import LoadingIndicator, {
    trackPromise,
    usePromiseTracker,
  } from '../components/LoadingIndicator/LoadingIndicator';

import {SearchBySymptom} from 'components/Queries/KatsuSymptoms'

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

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
}

function getMetadataData(setData, setPhenopackets) {
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
      const [dataset, phenopackets] = ProcessMetadata(data.results);
      setData(dataset);
      setPhenopackets(phenopackets);
    });
}

const MOCKED = (query) => {
    console.log(query === 'fatigue')
    if (query === 'fatigue') {
        return RESPONSE.results
    }

    return {}
}

function TableApp({ }) {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [symptoms, setSymptoms] = useState([]);
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

  const notifyEl = useRef(null);


  useEffect(() => {
    try {
      trackPromise(
        fetchIndividuals()
          .then((dataResponse) => {
            const [_, phenopacketS] = ProcessMetadata(dataResponse.results);
            const symptomS = ProcessSymptoms(phenopacketS)
            console.log(symptomS)
            setSymptoms(symptomS)
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
      console.log(err)
    }
  }, [symptoms]);

  React.useEffect(() => {
    // fetch data
    try {
      trackPromise(
        searchSymptom()
          .then((data) => {
            const [tdatasets, tphenopackets] = ProcessPhenopackets(data)
            console.log(tdatasets, tphenopackets);

            setData(tdatasets);
            setPhenopackets(tphenopackets);
          })
      )

    } catch (err) {
      // Need better reporting
      console.log(err);
    }
  }, [selectedSymptom]);

  React.useEffect(() => {
    // Separate Effect since state change is async and columns depends on data
    // Not entirely sure if necessary
    try {
      CreateColumns(Object.keys(data[0]), setColumns);
    } catch (err) {
      // Need better reporting
      console.log(err);
    }
  }, [data]);

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
      CreateColumns(Object.keys(diseaseTableData[0]), setDiseaseTableColumns);
    } catch (err) {
      // Need better reporting
      console.log(err);
    }
  }, [diseaseTableData]);

  React.useEffect(() => {
    try {
      if (activeID) {
        if (features[activeID]) {
          setFeaturesTableData(features[activeID]);
        } else {
          console.log(phenopackets[activeID]);

          const newFeature = ProcessData(activeID, phenopackets[activeID].phenotypic_features, featureSchema);
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
      CreateColumns(Object.keys(featuresTableData[0]), setFeaturesTableColumns);
    } catch (err) {
      // Need better reporting
      console.log(err);
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
      <Row>
        <SearchBySymptom
            setSymptom={setSelectedSymptom}
        
        />
            
        
      </Row>
      <ClinMetadataTable 
        columns={columnsM} 
        data={dataM}
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={setActiveID}
        isMainTable={true} 
      />
      <ClinMetadataTable 
        columns={columnsD} 
        data={dataD}
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={() => {}}
        isMainTable={false} 
      />
      <ClinMetadataTable
        columns={columnsF}
        data={dataF} 
        metadataCallback={() => {}}
        activeMetadata={false}
        setActiveID={() => {}}
        isMainTable={false} 
      />
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


