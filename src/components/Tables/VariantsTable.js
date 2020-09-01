import React, { useState } from 'react';

import BASE_URL, { CHORD_METADATA_URL } from '../../constants/constants';
import IndividualTable from '../Tables/IndividualTable';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function VariantsTable({ rowData, datasetId }) {
  const columnDefs = [
    { headerName: 'Reference Name', field: 'referenceName' },
    { headerName: 'Start', field: 'start' },
    { headerName: 'End', field: 'end' },
    { headerName: 'Reference Bases', field: 'referenceBases' },
    { headerName: 'Alternate Bases', field: 'alternateBases' },
  ];

  const [individualsRowData, setIndividualsRowData] = useState([]);
  let gridOptions = {};

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
              setIndividualsRowData(chordData.results);
            });
        }
      });
  }

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
    paginationAutoPageSize: false,
    pagination: true,
  };

  return (
    <>

        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            gridOptions={gridOptions}
            context={{ datasetId }}
          />
        </div>

        <IndividualTable individualsRowData={individualsRowData}></IndividualTable>

    </>
  );
}

export default VariantsTable;
