import React from 'react';
import PropTypes from 'prop-types';
import { useAsyncDebounce } from 'react-table';
import matchSorter from 'match-sorter';
import { Input } from 'reactstrap';
import {FilterStyle} from 'assets/css/StyledComponents/ChordTableStyled'

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((search) => {
    setGlobalFilter(search || undefined);
  }, 200);

  return (
    // <FilterStyle>
    <Input
      className="globalFilter"
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`${count} records...`}
      style={{
        fontSize: '1.1rem',
        border: '0',
        marginTop: '0%',
        marginBottom: '0%',
      }}
    />
    // </FilterStyle>
  );
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.arrayOf(PropTypes.object),
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
};

GlobalFilter.defaultProps = {
  preGlobalFilteredRows: [],
  globalFilter: '',
  setGlobalFilter: () => {},
};

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

DefaultColumnFilter.propTypes = {
  column: PropTypes.arrayOf(PropTypes.object),
};

DefaultColumnFilter.defaultProps = {
  column: [],
};

export function FuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
