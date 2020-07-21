/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useRef } from "react";
import { 
  useTable,
  useSortBy,
  useResizeColumns,
  useFlexLayout,
  useRowSelect
} from 'react-table'
import styled from 'styled-components'
import BASE_URL from 'constants/constants'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Container
} from "reactstrap";

import Dropdown from "../components/Dropdown/ClinMetadataDropdown.js"
import PATIENT from "constants/patients"

const Styles = styled.div`
padding: 1rem;
${'' /* These styles are suggested for the table fill all available space in its containing element */}
display: block;
${'' /* These styles are required for a horizontaly scrollable table overflow */}
overflow: auto;

  table {
    border-spacing: 0;
    border: 1px solid black;

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }


    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />

    // return <Button color="primary" onClick={() => onCheckboxBtnClick(1)}></Button>

  }
)

function TableC({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <>
    <Card>
      <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        <Container>
        <Row xs="2">
        {allColumns.map(column => (
          <Col key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </Col>
          
        ))}
        </Row>
        </Container>
        <br />
      </div>
      </Card>
      <Card>
        <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      </Styles>
      </Card>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

function CreateColumns(columnNames, cb) {
  var columnList = [];
  console.log(columnNames);
  for (let item in columnNames) {
    var value = columnNames[item];
    var column = {
      Header: (value.charAt(0).toLocaleUpperCase() + value.slice(1)),
      accessor: value
    }
    columnList.push(column)
  }
  cb(columnList)
}

function getMetadataData(datasetId, metadata, cb) {
  var datasets = [];
  console.log("Calling")
  return fetch(BASE_URL + "/"+ metadata +"/search", {
    method: "POST",
    body: JSON.stringify({datasetId: datasetId}),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) { 
      if (!response.ok) {
        console.log(response)
      } else {
        return response.json()
  }})
     .then(data => {
       //console.log(data);
       //data = JSON.parse(data);
       for (let i = 0; i < data.results[metadata].length; i++) {
        datasets.push(data.results[metadata][i]);
       }
       console.log([datasets]);
       cb(datasets)
     })
}


function TableApp(props) {

  const [selectedMetadata, setSelectedMetadata] = useState("patients");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  React.useEffect(() => {
    //fetch data
    try  {
      // setData(PATIENT["results"][selectedMetadata]);
      // Use above for local debugging
      
      getMetadataData(props.datasetId, selectedMetadata, setData)

    }
    catch(err) {
      console.log(err);
      console.log(data);
    }
    }, [selectedMetadata]
  )

  React.useEffect(() => {
     //Separate Effect since state change is async and columns depends on data - Not entirely sure if necessary
     try  {
      CreateColumns(Object.keys(data[0]), setColumns)
     }
     catch(err) {
       console.log(err)
       
  //     setColumns([])
     }
     }, [data]
  )


  const dataM = React.useMemo(() => data, [data])
  // const columnsM = React.useMemo (
  //   () =>[
  //     {
  //       Header: selectedMetadata,
  //       columns: columns
  //     }
  //   ],
  //   [selectedMetadata, columns]
  // )
  const columnsM = React.useMemo (() => columns, [columns])


  return (
        <div className="content">


          <Row>

              <Dropdown metadataCallback = {setSelectedMetadata}/>
              </Row>


<Row>
            <TableC columns={columnsM} data={dataM} />
          </Row>
      

          
        </div>
      
  )
}

export default TableApp;
