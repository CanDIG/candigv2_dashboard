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
import { useTable, useSortBy } from 'react-table'
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
} from "reactstrap";

import Dropdown from "../components/Dropdown/ClinMetadataDropdown.js"
import PATIENT from "constants/patients"

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

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

// class Tables extends React.Component {
//   constructor(props) {
//     super(props)
//     this.getMetadataName = this.getMetadataName.bind(this)
//     this.state = {
//       selectedMetadata: "None"

//     }
//   }

//   getMetadataName(metadata){
//     this.setState(
//       {selectedMetadata: metadata},
//       this.getMetadataData
//     );
//   }






//   render() {
//     return (
//       <>
//         <div className="content">
//           <Dropdown metadataCallback = {this.getMetadataName}/>

//         </div>
//       </>
//     );
//   }
// }





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

// function getMetadataData(datasetId, metadata) {
//   fetch(BASE_URL + "/" + metadata + "/search",
//     {
//       method: "POST",
//       body: JSON.stringify({datasetId: datasetId})
//     }
//   )
//     .then(response => response.json())
//     .then()
// }



function TableR({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
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
  )
}



function TableApp(props) {

  const [selectedMetadata, setSelectedMetadata] = useState("Types");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  React.useEffect(() => {
    //fetch data
    try  {
      // setData(PATIENT["results"][selectedMetadata]);
      //setData(getMetadataData(props.datasetId, selectedMetadata))
      //setColumns(CreateColumns(Object.keys(data[0])))
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
          <Dropdown metadataCallback = {setSelectedMetadata}/>
          <Styles>
            <TableR columns={columnsM} data={dataM} />
          </Styles>
          
        </div>
      
  )
}

export default TableApp;
