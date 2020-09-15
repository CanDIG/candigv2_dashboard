import React from 'react';
import PropTypes from 'prop-types';
import {
  useTable, useSortBy, usePagination, useFilters,
  useGlobalFilter, useGroupBy, useExpanded,
} from 'react-table';

// reactstrap components
import { Card, Row } from 'reactstrap';
import Styles from '../../assets/css/StyledComponents/TableStyled';
import { DefaultColumnFilter, FuzzyTextFilterFn } from '../Filters/filters';

import PaginationBar from './Pagination';

FuzzyTextFilterFn.autoRemove = (val) => !val;

function ChordSubTable({ columns, data }) {
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
    page, canPreviousPage, canNextPage, pageOptions, pageCount,
    gotoPage, nextPage, previousPage, setPageSize,
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
    return ({});
  }

  function handleAggregation(cell, row) {
    if (cell.isGrouped) {
      return (
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
      {data.length > 0
        ? (
          <>
          <Row>
          <Styles>

            <Card>
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            <div>
                              {column.canGroupBy ? (
                              // If the column can be grouped, add a toggle
                                <span {...column.getGroupByToggleProps()}>
                                  {column.isGrouped ? '🛑 ' : '👊 '}
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

            </Card>
            </Styles>

          </Row>
          <Row>
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
        )
        : <></>}
    </>
  );
}

ChordSubTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};
ChordSubTable.defaultProps = {
  columns: [],
  data: [],
};

export default ChordSubTable;
