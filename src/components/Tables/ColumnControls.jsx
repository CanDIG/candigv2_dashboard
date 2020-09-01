import React, {
  useState, forwardRef, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {
  Card, Row, Button, Container, InputGroup, InputGroupAddon,
  InputGroupText, Collapse,
} from 'reactstrap';

import { GlobalFilter } from '../Filters/filters';

const IndeterminateButton = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Button ref={resolvedRef} {...rest} />;
  },
);

IndeterminateButton.propTypes = {
  indeterminate: PropTypes.bool,
};
IndeterminateButton.defaultProps = {
  indeterminate: false,
};

function DataControl({
  toggleHideAllColumns, preGlobalFilteredRows,
  setGlobalFilter, state, allColumns,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);
  return (
    <>
      <Row>
        <InputGroup>
          <InputGroupAddon className="dataControl" addonType="prepend">
            <IndeterminateButton className="toggleAll" onClick={() => toggleHideAllColumns()}> Toggle all </IndeterminateButton>
            <Button className="toggleColumn" color="primary" onClick={toggleIsCollapsed}> Column Toggles </Button>
            <InputGroupText className="globalSearchText">Search</InputGroupText>
          </InputGroupAddon>
          <GlobalFilter
            className="globalSearchBar"
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter || ''}
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
    </>
  );
}

DataControl.propTypes = {
  toggleHideAllColumns: PropTypes.func,
  preGlobalFilteredRows: PropTypes.arrayOf(PropTypes.object),
  setGlobalFilter: PropTypes.func,
  state: PropTypes.object,
  allColumns: PropTypes.arrayOf(PropTypes.object),
};
DataControl.defaultProps = {
  toggleHideAllColumns: () => {},
  preGlobalFilteredRows: [],
  setGlobalFilter: () => {},
  state: {},
  allColumns: [],
};

export default DataControl;
