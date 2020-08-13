import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useTable, useSortBy, usePagination, useFilters,
  useGlobalFilter, useGroupBy, useExpanded,
} from 'react-table';

// reactstrap components
import {
  Card, Row, Button, Container, InputGroup, InputGroupAddon,
  Input, InputGroupText, InputGroupButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Collapse,
} from 'reactstrap';

import BASE_URL from '../constants/constants';
import { ClinMetadataDropdown } from '../components/Dropdown/ClinMetadataDropdown';
import Styles from '../assets/css/StyledComponents/MetadataTableStyled';
import {
  GlobalFilter, DefaultColumnFilter, FuzzyTextFilterFn,
} from '../components/Filters/filters';
import {PaginationBar} from  '../components/Tables/Pagination'
import PATIENT from 'constants/patients_local';

const IndeterminateButton = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Button ref={resolvedRef} {...rest} />;
  },
);

FuzzyTextFilterFn.autoRemove = (val) => !val;


function Table({ columns, data, metadataCallback }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: FuzzyTextFilterFn,
      text: (rows, id, filterValue) => rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true;
      }),
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow,
    allColumns, toggleHideAllColumns, state, page,
    canPreviousPage, canNextPage, pageOptions, pageCount,
    gotoPage, nextPage, previousPage, setPageSize, preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
    filterTypes,
    defaultColumn,
  },
  useFilters, useGlobalFilter, useGroupBy,
  useSortBy, useExpanded, usePagination);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  const pagination = {canPreviousPage, canNextPage, pageOptions, pageCount,
    gotoPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize },
  }

  return (
    <>
      <Row>
        <InputGroup>
          <InputGroupAddon className="tableControls" addonType="prepend">
            <ClinMetadataDropdown className="dataDropdown" metadataCallback={metadataCallback} />
            <IndeterminateButton className="toggleAll" onClick={() => toggleHideAllColumns()}> Toggle all </IndeterminateButton>
            <Button className="toggleColumn" color="primary" onClick={toggleIsCollapsed}> Column Toggles </Button>
            <InputGroupText className="globalSearchText">Search</InputGroupText>
          </InputGroupAddon>
          <GlobalFilter
            className="globalSearchBar"
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
              {allColumns.map((column) => (
                <Button
                  onClick={() => column.toggleHidden()}
                  key={column.id}
                  active={column.isVisible}
                >
                  {' '}
                  {column.id}
                  {' '}
                </Button>
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
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
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
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            background: cell.isGrouped
                              ? '#0aff0082'
                              : cell.isAggregated
                                ? '#ffa50078'
                                : cell.isPlaceholder
                                  ? '#ff000042'
                                  : 'white',
                          }}
                        >
                          {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? '👇' : '👉'}
                              </span>
                              {' '}
                              {cell.render('Cell')}
                              {' '}
                              (
                              {row.subRows.length}
                              )
                            </>
                          ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                          // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                            cell.render('Cell')
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <PaginationBar paginationFxns={pagination}></PaginationBar>

          </Styles>
        </Card>
      </Row>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  metadataCallback: PropTypes.func,
};
Table.defaultProps = {
  columns: [],
  data: [],
  metadataCallback: () => {},
};

function CreateColumns(columnNames, cb) {
  const columnList = [];
  for (const item in columnNames) {
    const name = columnNames[item];
    const column = {
      Header: (name.charAt(0).toLocaleUpperCase() + name.slice(1)),
      accessor: name,
      filter: 'fuzzyText',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} `,
    };
    columnList.push(column);
  }
  cb(columnList);
}

function getMetadataData(datasetId, metadata, cb) {
  const datasets = [];
  return fetch(`${BASE_URL}/${metadata}/search`, {
    method: 'POST',
    body: JSON.stringify({ datasetId }),
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
      for (let i = 0; i < data.results[metadata].length; i++) {
        datasets.push(data.results[metadata][i]);
      }
      cb(datasets);
    });
}

function TableApp({ datasetId }) {
  const [selectedMetadata, setSelectedMetadata] = useState('patients');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  React.useEffect(() => {
    // fetch data
    try {
      getMetadataData(datasetId, selectedMetadata, setData);
    } catch (err) {
      console.log(err);
    }
  }, [selectedMetadata, datasetId]);

  React.useEffect(() => {
    // Separate Effect since state change is async and columns depends on data
    // Not entirely sure if necessary
    try {
      CreateColumns(Object.keys(data[0]), setColumns);
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  const dataM = React.useMemo(() => data, [data]);
  const columnsM = React.useMemo(() => columns, [columns]);

  return (
    <div className="content">
      <Table columns={columnsM} data={dataM} metadataCallback={setSelectedMetadata} />
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
