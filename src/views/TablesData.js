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
  useRowSelect,
  usePagination
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
  Container,
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Collapse,
  ButtonToggle
} from "reactstrap";

import MetaDropdown from "../components/Dropdown/ClinMetadataDropdown.js"
import PATIENT from "constants/patients"

const Styles = styled.div`
  padding: 1rem;
  overflow: auto;

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

  .pageCountBox {
    margin-left: .3rem;
    // padding: 10px 10px 10px 10px;
  }

  //Need to figure out how to do this for individual inputs

  .form-group .input-group-prepend .input-group-text, 
  .form-group .input-group-append .input-group-text, 
  .input-group .input-group-prepend .input-group-text, 
  .input-group .input-group-append .input-group-text {
    padding: 10px 10px 10px 10px;
  }

  .pageCountOuter {
    background-color: #e9ecef;
  }

  .goToPage {
    background-color: #e9ecef;
  }

  .tablePageInput {
    min-width: 0px;
    width: 10%;
    flex: none
  }

  .input-group .input-group-prepend .btn {
    
    margin-top: 0%;
    margin-bottom: 0%;
    margin-left: 0%;
    margin-right: 0%;
  
  }

  // .pagination {
  //   padding: 0.5rem;
  // }
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

const IndeterminateButton = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <Button ref={resolvedRef} {...rest} />

    // return <Button color="primary" onClick={() => onCheckboxBtnClick(1)}></Button>
  }
)


function TableC({ columns, data, metadataCallback }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    toggleHideAllColumns,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
    useSortBy,
    usePagination,

  )


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const [dropdownColumnsOpen, setDropdownColumnsOpen] = useState(false);
  const toggleDropDownColumns = () => setDropdownColumnsOpen(!dropdownColumnsOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);



  // Render the UI for your table
  return (
    <>
    <Row xs="6">
      <ButtonGroup>
      <MetaDropdown metadataCallback = {metadataCallback}/>
        <IndeterminateButton onClick={() => toggleHideAllColumns()} > Toggle all </IndeterminateButton>
        <Button color="primary" onClick={toggleIsCollapsed}>Column Toggles</Button>
      </ButtonGroup>
      

    </Row>
    <Row>

    <Collapse isOpen={isCollapsed}>

      <Card>
        <Container>
        {allColumns.map(column => (
               <Button onClick={() => column.toggleHidden()} key={column.id} active={column.isVisible}> {column.id} </Button>
        ))}



        </Container>
      </Card>
      </Collapse>
      </Row>
      <Row>
      <Card>
        <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
              
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      <div className="pagination">

        <InputGroup> 
        <InputGroupAddon className="pageControls" addonType="prepend">
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} >  &lt; &lt; </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}> &lt; </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>&gt; </Button>
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>&gt;&gt; </Button>
          <InputGroupText className="pageCountOuter">
          Page <strong className="pageCountBox">{pageIndex + 1} of {pageOptions.length}</strong>
        </InputGroupText>
        <InputGroupText className="goToPage">
          Go to page:
        </InputGroupText>
        </InputGroupAddon>
        <Input
            className="tablePageInput"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
        />
        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}  >
          <DropdownToggle caret style={{
            marginTop: "0%",
            marginBottom: "0%",
            marginLeft: "0%"
        }}>
            Show {pageSize} 
          </DropdownToggle>
          <DropdownMenu onClick={e => {
              setPageSize(Number(e.target.value))
            }}>
          {[10, 20, 30, 40, 50].map(pageSize => (
            <DropdownItem 
            key={pageSize} 
            value={pageSize}
            >
              Show {pageSize}
            </DropdownItem>
          ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
        </InputGroup>

      </div>
      </Styles>
      </Card>
      </Row>
    </>
  )
}



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
     }
     }, [data]
  )

  const dataM = React.useMemo(() => data, [data])
  const columnsM = React.useMemo (() => columns, [columns])


  return (
        <div className="content">


            <TableC columns={columnsM} data={dataM} metadataCallback = {setSelectedMetadata}/>
        </div>
  )
}

export default TableApp;
