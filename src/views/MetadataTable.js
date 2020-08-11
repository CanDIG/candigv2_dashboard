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
import React, { useState } from "react";
import { 
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  useExpanded,
} from 'react-table'
import styled from 'styled-components'
import BASE_URL from 'constants/constants'
import {
  GlobalFilter,
  DefaultColumnFilter,
  FuzzyTextFilterFn

} from 'components/Filters/filters'

// reactstrap components
import {
  Card,
  Row,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  
} from "reactstrap";

import MetaDropdown from "components/Dropdown/ClinMetadataDropdown.js"

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
`


const IndeterminateButton = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <Button ref={resolvedRef} {...rest} />
  }
)

FuzzyTextFilterFn.autoRemove = val => !val


function Table({ columns, data, metadataCallback }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: FuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )


  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
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
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
    filterTypes,
    defaultColumn
  },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
  )


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <>
    <Row >
    <InputGroup>
    <InputGroupAddon className="tableControls" addonType="prepend">
        <MetaDropdown className="dataDropdown" metadataCallback = {metadataCallback}/>
        <IndeterminateButton className="toggleAll" onClick={() => toggleHideAllColumns()}> Toggle all </IndeterminateButton>
        <Button className="toggleColumn" color="primary" onClick={toggleIsCollapsed}> Column Toggles </Button>
        <InputGroupText className="globalSearchText">Search</InputGroupText>
      </InputGroupAddon>
      <GlobalFilter className="globalSearchBar"
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
      </InputGroup>
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
                <th {...column.getHeaderProps()}>
                <div>
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '🛑 ' : '👊 '}
                    </span>
                  ) : null}
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </div>
                {/* Render the columns filter UI */}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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
                  return (
                  <td {...cell.getCellProps()}
                    style={{
                      background: cell.isGrouped
                        ? '#0aff0082'
                        : cell.isAggregated
                        ? '#ffa50078'
                        : cell.isPlaceholder
                        ? '#ff000042'
                        : 'white',
                    }}
                  >{cell.isGrouped ? (
                    // If it's a grouped cell, add an expander and row count
                    <>
                      <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? '👇' : '👉'}
                      </span>{' '}
                      {cell.render('Cell')} ({row.subRows.length})
                    </>
                  ) : cell.isAggregated ? (
                    // If the cell is aggregated, use the Aggregated
                    // renderer for cell
                    cell.render('Aggregated')
                  ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                    // Otherwise, just render the regular cell
                    cell.render('Cell')
                  )}
                  </td>
                  )
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
      accessor: value,
      filter: 'fuzzyText',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} `,
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
      getMetadataData(props.datasetId, selectedMetadata, setData)
    }
    catch(err) {
      console.log(err);
    }
    }, [selectedMetadata, props.datasetId]
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
            <Table columns={columnsM} data={dataM} metadataCallback={setSelectedMetadata}/>
        </div>
  )
}

export default TableApp;
