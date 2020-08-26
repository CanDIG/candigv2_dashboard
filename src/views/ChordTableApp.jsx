import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {CHORD_METADATA_URL} from '../constants/constants';
import {ProcessMetadata, ProcessDieases} from "components/Processing/CHORD"
import ClinMetadataTable from '../components/Tables/ClinMetadataTable';

// import INDIVIDUALS from "constants/individuals_local"
import ChordMetadataTable from 'components/Tables/ChordMetadataTable';
import ChordSubTable from 'components/Tables/ChordSubTable';
import { ProcessDiseases } from 'components/Processing/CHORD';

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
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
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
      setPhenopackets(phenopackets)
    });
}

function TableApp({  }) {
  // const [selectedMetadata, setSelectedMetadata] = useState('patients');
  const [data, setData] = useState([]);
  const [phenopackets, setPhenopackets] = useState({})
  const [columns, setColumns] = useState([]);
  const [diseases, setDiseases] = useState({});
  const [activeID, setActiveID] = useState("");
  const [diseaseTableData, setDiseaseTableData] = useState([]);
  const [diseaseTableColumns, setDiseaseTableColumns] = useState([]);

  React.useEffect(() => {
    // fetch data
    try {
      getMetadataData(setData, setPhenopackets);
      // const [tdatasets, tphenopackets] = ProcessMetadata(INDIVIDUALS.results);
      // console.log(tdatasets, tphenopackets)
      // setData(tdatasets);
      // setPhenopackets(tphenopackets);
    } catch (err) {
      //Need better reporting
      console.log(err);
    }
  }, []);

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

  React.useEffect(() => {
    try {
      if (activeID) {
        if (diseases[activeID]) {
          console.log("SETTING")
          setDiseaseTableData(diseases[activeID])
        } else {
          //create disease level table
          console.log(phenopackets[activeID])
          const newDisease = ProcessDiseases(activeID, phenopackets[activeID].diseases)
          if (!isEmpty(diseases)) {
            setDiseases((prevState) => ({
               ...prevState, ...newDisease
            }))
            setDiseaseTableData(diseases[activeID])

          } else {
            console.log("DEBUG")
            console.log(newDisease)
            setDiseases(newDisease)
            setDiseaseTableData(diseases[activeID])

          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [activeID, diseases, phenopackets, render])

  React.useEffect(() => {
    try {
      CreateColumns(Object.keys(diseaseTableData[0]), setDiseaseTableColumns);
    } catch (err) {
      //Need better reporting
      console.log(err);
    }
  }, [diseaseTableData]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  const dataD = React.useMemo(() => diseaseTableData, [diseaseTableData])
  const columnsD = React.useMemo(() => diseaseTableColumns, [diseaseTableColumns])

  return (
    <div className="content">
      <ChordMetadataTable columns={columnsM} data={dataM} setActiveID={setActiveID} />
      <ChordSubTable columns={columnsD} data={dataD} render={render}/>
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
