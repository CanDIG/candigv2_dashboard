import React from 'react';
import PropTypes from 'prop-types';
import {
  useTable, useSortBy, usePagination, useFilters,
  useGlobalFilter, useGroupBy, useExpanded,
} from 'react-table';

// reactstrap components
import { Card, Row } from 'reactstrap';
import Styles from 'assets/css/StyledComponents/MetadataTableStyled';
import { DefaultColumnFilter, FuzzyTextFilterFn } from 'components/Filters/filters';

import {PaginationBar} from  'components/Tables/Pagination'
import {DataControl} from 'components/Tables/DataControls'


FuzzyTextFilterFn.autoRemove = (val) => !val;



export function ClinMetadataTable({ columns, data, metadataCallback }) {
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


  const pagination = {canPreviousPage, canNextPage, pageOptions, pageCount,
    gotoPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize },
  }
  const topBarFxns = {metadataCallback, toggleHideAllColumns, preGlobalFilteredRows, 
    setGlobalFilter, state, allColumns
  }

  return (
    <>
      <DataControl topBarFxns={topBarFxns}/>
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
            <PaginationBar paginationFxns={pagination}/>

          </Styles>
        </Card>
      </Row>
    </>
  );
}

ClinMetadataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  metadataCallback: PropTypes.func,
};
ClinMetadataTable.defaultProps = {
  columns: [],
  data: [],
  metadataCallback: () => {},
};