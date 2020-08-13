import React, { 
    useState, forwardRef, useRef, useEffect 
} from 'react';

import {
    Card, Row, Button, Container, InputGroup, InputGroupAddon,
    InputGroupText, Collapse,
} from 'reactstrap';

import { ClinMetadataDropdown } from 'components/Dropdown/ClinMetadataDropdown';
import { GlobalFilter } from 'components/Filters/filters';

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

export function DataControl(props) {
    const {
      metadataCallback, toggleHideAllColumns,
      preGlobalFilteredRows, setGlobalFilter, state, allColumns
    } = props.topBarFxns;
  
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);
    return (
      <>
      <Row>
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
    </>
    );
  }