import React, {
  useState, forwardRef, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {
  Card, Row, Button, Container, InputGroup, InputGroupAddon,
  InputGroupText, Collapse, Col
} from 'reactstrap';

import  ClinMetadataDropdown  from '../Dropdown/ClinMetadataDropdown';
import { GlobalFilter } from '../Filters/filters';
import Style from 'assets/css/StyledComponents/ColumnControlStyled'


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
  metadataCallback, toggleHideAllColumns,
  preGlobalFilteredRows, setGlobalFilter, state, allColumns,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);
  return (
    <>
    <Style>
      <Row>
        <Col>
        <InputGroup>
          <InputGroupAddon className="dataControl" addonType="prepend">
            <ClinMetadataDropdown className="dataDropdown" metadataCallback={metadataCallback} />
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
        </Col>

      </Row>
      <Row>
      <Col>

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
        </Col>
      </Row>
      </Style>
    </>
  );
}

DataControl.propTypes = {
  metadataCallback: PropTypes.func,
  toggleHideAllColumns: PropTypes.func,
  preGlobalFilteredRows: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  state: PropTypes.arrayOf(PropTypes.object),
  allColumns: PropTypes.arrayOf(PropTypes.object),
};
DataControl.defaultProps = {
  metadataCallback: () => {},
  toggleHideAllColumns: () => {},
  preGlobalFilteredRows: () => {},
  setGlobalFilter: () => {},
  state: [],
  allColumns: [],
};

export default DataControl;
