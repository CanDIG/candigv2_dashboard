import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';

import BASE_URL, { CHORD_METADATA_URL } from '../constants/constants';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function VariantsSearch({ datasetId }) {
  const columnDefs = [
    { headerName: 'Reference Name', field: 'referenceName' },
    { headerName: 'Start', field: 'start' },
    { headerName: 'End', field: 'end' },
    { headerName: 'Reference Bases', field: 'referenceBases' },
    { headerName: 'Alternate Bases', field: 'alternateBases' },
  ];

  const individualsColumnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Sex', field: 'sex' },
    { headerName: 'Ethnicity', field: 'ethnicity' },
    { headerName: 'Karyotypic Sex', field: 'karyotypic_sex' },
    { headerName: 'Height', field: 'height' },
    { headerName: 'Weight', field: 'weight' },
    { headerName: 'Education', field: 'education' },
  ];

  const [individualsRowData, setIndividualsRowData] = useState([]);
  const [rowData, setRowData] = useState([]);
  let gridOptions = {};

  const extraFieldHandler = (results) => {
    const processedResults = [];

    if (results === undefined) {
      return [];
    }

    for (let i = 0; i < results.length; i += 1) {
      const tempObj = results[i];
      tempObj.height = results[i].extra_properties.height;
      tempObj.weight = results[i].extra_properties.height;
      tempObj.education = results[i].extra_properties.education;

      processedResults.push(tempObj);
    }

    return processedResults;
  };

  function onSelectionChanged() {
    const selectedRows = gridOptions.api.getSelectedRows();

    fetch(`${BASE_URL}/search`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          datasetId: gridOptions.context.datasetId,
          logic: {
            id: 'A',
          },
          components: [
            {
              id: 'A',
              variants: {
                start: selectedRows[0].start,
                end: selectedRows[0].end,
                referenceName: selectedRows[0].referenceName,
              },
            },
          ],
          results: [
            {
              table: 'patients',
              fields: ['patientId'],
            },
          ],
        },
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results !== undefined) {
          let patientParams = '';

          for (let i = 0; i < data.results.patients.length; i += 1) {
            patientParams += `id=${data.results.patients[i].patientId}&`;
          }

          fetch(`${CHORD_METADATA_URL}/api/individuals?${patientParams}`)
            .then((response) => response.json())
            .then((chordData) => {
              setIndividualsRowData(extraFieldHandler(chordData.results));
            });
        }
      });
  }

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    fetch(`${BASE_URL}/variants/search`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: e.target.start.value,
        end: e.target.end.value,
        referenceName: e.target.referenceName.value,
        datasetId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results !== undefined) {
          setRowData(data.results.variants);
        }
      });
  };

  gridOptions = {
    defaultColDef: {
      editable: false,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 20,
      minHeight: 300,
    },
    debug: true,
    onSelectionChanged,
    rowSelection: 'single',
    rowData: null,
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    paginationAutoPageSize: true,
    pagination: true,
  };

  const individualsGridOptions = {
    defaultColDef: {
      editable: false,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 20,
      minHeight: 300,
    },
    paginationAutoPageSize: true,
    pagination: true,
  };

  return (
    <>
      <div className="content">

        <Form inline onSubmit={formHandler}>
          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="start">Start</Label>
            <Input required type="text" name="start" id="start" placeholder="" />
          </FormGroup>

          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="end">End</Label>
            <Input required type="text" name="end" id="end" placeholder="" />
          </FormGroup>

          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="referenceName">Reference Name</Label>
            <Input required type="text" name="referenceName" id="referenceName" placeholder="" />
          </FormGroup>

          <Button>Search</Button>
        </Form>

        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            gridOptions={gridOptions}
            context={{ datasetId }}
          />
        </div>

        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '50px' }}>
          <AgGridReact
            columnDefs={individualsColumnDefs}
            rowData={individualsRowData}
            gridOptions={individualsGridOptions}
          />
        </div>

      </div>
    </>
  );
}

VariantsSearch.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default VariantsSearch;
