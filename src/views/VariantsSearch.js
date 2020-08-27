import React, { useState }from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import BASE_URL from 'constants/constants';
import { CHORD_METADATA_URL } from 'constants/constants';

function VariantsSearch({ datasetId }) {

    let chord_data_cache = []
    let retrieved = false;

    if (retrieved === false) {
        fetch(`${CHORD_METADATA_URL}/api/individuals?page_size=100`)
        .then(response => response.json())
        .then((data) => {
            chord_data_cache = data["results"];
        });

        retrieved = true
    }


    const columnDefs = [
        { headerName: "referenceName", field: "referenceName" },
        { headerName: "start", field: "start" },
        { headerName: "end", field: "end" },
        { headerName: "referenceBases", field: "referenceBases" },
        { headerName: "alternateBases", field: "alternateBases" }
    ];

    const individualsColumnDefs= [
        { headerName: "ID", field: "id" },
        { headerName: "Sex", field: "sex" },
        { headerName: "Ethnicity", field: "ethnicity" },
    ];

    const [individualsRowData, setIndividualsRowData] = useState([])

    const [rowData, setRowData] = useState([]);
    const gridOptions = {
        defaultColDef: {
          editable: false,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 20,
          minHeight: 300
        },
        debug: true,
        onSelectionChanged: onSelectionChanged,
        rowSelection: 'single',
        rowData: null,
        rowGroupPanelShow: 'always',
        pivotPanelShow: 'always',
        enableRangeSelection: true,
        paginationAutoPageSize: false,
        pagination: true
      };

    function onSelectionChanged() {
        var selectedRows = gridOptions.api.getSelectedRows();

        console.log(datasetId)

        fetch(`${BASE_URL}/search`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "datasetId": "WyJjYW5jb2dlbiJd",
                    "logic": {
                        "id": "A"
                    },
                    "components": [
                        {
                            "id": "A",
                            "variants": {
                                "start": selectedRows[0].start,
                                "end": selectedRows[0].end,
                                "referenceName": selectedRows[0].referenceName
                            }
                        }
                    ],
                    "results": [
                        {
                            "table": "patients"
                        }
                    ]
                })
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.results !== undefined){

                    let patientList = []
                    let resultList = []

                    for (let i = 0; i < data.results["patients"].length; i++){
                        patientList.push(data.results["patients"][i]["patientId"])
                    }

                    for (let i = 0; i < chord_data_cache.length; i++) {
                        if(patientList.includes(chord_data_cache[i]["id"])) {
                            resultList.push(chord_data_cache[i]);
                        }
                    }

                    console.log(patientList)
                    console.log(resultList)
                    console.log(chord_data_cache)

                    setIndividualsRowData(resultList);
                }
            });
    }
    
    function formHandler(e) {
        e.preventDefault(); // Prevent form submission

        fetch(`${BASE_URL}/variants/search`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              start: e.target.start.value,
              end: e.target.end.value,
              referenceName: e.target.referenceName.value,
              datasetId: datasetId
            }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.results !== undefined){
                    setRowData(data.results["variants"]);
                }
            });
    }

    return (
        <>
        <div className="content">

            <Form onSubmit={formHandler}>
                <FormGroup>
                    <Label for="start">Start</Label>
                    <Input required type="text" name="start" id="start" placeholder="Start location of a variant." />
                </FormGroup>

                <FormGroup>
                    <Label for="end">End</Label>
                    <Input required type="text" name="end" id="end" placeholder="End location of a variant." />
                </FormGroup>

                <FormGroup>
                    <Label for="referenceName">Reference Name</Label>
                    <Input required type="text" name="referenceName" id="referenceName" placeholder="Reference Name. This includes
                    somatic and sex chromosomes, as well as mitochondria identifiers." />
                </FormGroup>

                <Button>Search</Button>
            </Form>

            <div className="ag-theme-alpine" style={ {height: '400px', width: '100%'} }>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    gridOptions={gridOptions}>
                </AgGridReact>
            </div>

            <div className="ag-theme-alpine" style={ {height: '400px', width: '100%', marginTop: '50px'} }>
                <AgGridReact
                    columnDefs={individualsColumnDefs}
                    rowData={individualsRowData}>
                </AgGridReact>
            </div>

        </div>
        </>
    )
}


export default VariantsSearch;