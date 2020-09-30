import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  useTable, useSortBy, usePagination, useFilters,
  useGlobalFilter, useGroupBy, useExpanded,
} from 'react-table';

// reactstrap components
import { Row } from 'reactstrap';
import Styles from '../../assets/css/StyledComponents/TableStyled';
import { DefaultColumnFilter, FuzzyTextFilterFn, SelectColumnFilter } from '../Filters/filters';

import PaginationBar from './Pagination';
import DataControl from './DataControls';

FuzzyTextFilterFn.autoRemove = (val) => !val;

function TableHeader({headerGroups, getColumnSortSymbol}) {


  return (
    <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th scope="row" {...column.getHeaderProps()}>
            <div>
              {column.canGroupBy ? (
              // If the column can be grouped, add a toggle
                <span {...column.getGroupByToggleProps()}>
                  {column.isGrouped ? '➖' : '➕ '}
                </span>
              ) : null}
              <span {...column.getSortByToggleProps()}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                {getColumnSortSymbol(column)}
              </span>
            </div>
            {/* Render the columns filter UI */}
            <div>{column.canFilter ? column.render('Filter') : null}</div>
          </th>

        ))}
      </tr>

    ))}
  </thead>
  )

}


function ClinMetadataTable({ columns, data, metadataCallback, columnSchema }) {
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
      select: SelectColumnFilter,
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

  console.log(columns)

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
    initialState: { 
      pageIndex: 0,
      hiddenColumns: columns.filter(column => column.hidden).map(column => column.accessor) 
    },
    filterTypes,
    defaultColumn,
    
  },
  useFilters, useGlobalFilter, useGroupBy,
  useSortBy, useExpanded, usePagination);

  const [rowFilterVisible, setRowFilterVisible] = useState(true)

  function toggleRowFilterVisible() {
    setRowFilterVisible(!rowFilterVisible)
  }

  const [rowAggregationVisible, setRowAggregationVisible] = useState(true)

  function toggleRowAggregationVisible() {
    setRowAggregationVisible(!rowAggregationVisible)
  }


  function getColumnSortSymbol(column) {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return (' 🔽');
      }
      return (' 🔼');
    }
    return ('');
  }

  function getCellStyle(cell) {
    if (cell.isGrouped) {
      return ({ background: '#0aff0082' });
    } if (cell.isAggregated) {
      return ({ background: '##ffa50078' });
    } if (cell.isPlaceholder) {
      return ({ background: '#ff000042' });
    }
    return ({ });
  }

  function handleAggregation(cell, row) {
    if (cell.isGrouped) {
      return (
        <>
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '🟢' : '🔵'}
          </span>
          {' '}
          {cell.render('Cell')}
          {' '}
          (
          {row.subRows.length}
          )
        </>
      );
    } if (cell.isAggregated) {
      return cell.render('Aggregated');
    } if (cell.isPlaceholder) {
      return null;
    }
    return cell.render('Cell');
  }


  return (
    <>
      <DataControl
        metadataCallback={metadataCallback}
        toggleHideAllColumns={toggleHideAllColumns}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        state={state}
        allColumns={allColumns}
        toggleRowFilter={toggleRowFilterVisible}
        toggleRowAggregation={toggleRowAggregationVisible}
      />
      <Row>

        <Styles rowFilter={rowFilterVisible} rowAggregation={rowAggregationVisible}>
          <table {...getTableProps()} >
            <TableHeader 
              headerGroups={headerGroups} 
              getColumnSortSymbol={getColumnSortSymbol} 
             />
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={getCellStyle(cell)}
                      >
                        {handleAggregation(cell, row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Styles>
        <PaginationBar
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          pageIndex={pageIndex}
        />

      </Row>
    </>
  );
}

ClinMetadataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  metadataCallback: PropTypes.func,
  columnSchema: PropTypes.object
};
ClinMetadataTable.defaultProps = {
  columns: [],
  data: [],
  metadataCallback: () => {},
  columnSchema: {}
};

export default ClinMetadataTable;
