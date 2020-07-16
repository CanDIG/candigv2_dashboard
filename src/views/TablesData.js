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





function CreateColumns(metadataType, columnNames) {
  var columnList = [];
  const topHeader = metadataType
  const topHeaderCapitalized = topHeader.charAt(0).toLocaleUpperCase + topHeader.slice(1)

  for (let item in columnNames) {
    var value = columnNames[item];
    var column = {
      Header: (value.charAt(0).toLocaleUpperCase() + value.slice(1)),
      accessor: value
    }
    columnList.push(column)
  }


  return columnList
}

// function getMetadataData(props) {
//   var data;
//   var columns;
//   data = React.useMemo(() => PATIENT["results"][props.selectedMetadata], [])

//   console.log(data)
  
//   columns = Object.keys(data[0]);
//   console.log(columns)

//   return data

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



function TableApp() {

  const [selectedMetadata, setSelectedMetadata] = useState("Types");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  React.useEffect(() => {
    //fetch data
    try  {
      setData(PATIENT["results"][selectedMetadata]);
    }
    catch(err) {
      console.log(err)
      setData([])
    }
    }, [selectedMetadata, data]
  )

  React.useEffect(() => {
    //Separate Effect since state change is async and columns depends on data - Not entirely sure if necessary
    try  {
      setColumns(CreateColumns(selectedMetadata, Object.keys(data[0])))
    }
    catch(err) {
      console.log(err)
      setColumns([])
    }
    }, [selectedMetadata, data]
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
