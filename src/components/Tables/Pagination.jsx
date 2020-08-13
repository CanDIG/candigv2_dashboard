import React, { useState } from 'react';
import PropTypes from 'prop-types';


// reactstrap components
import {
  Button, InputGroup, InputGroupAddon,
  Input, InputGroupText, InputGroupButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem,
} from 'reactstrap';


export function PaginationBar(props) {
    const {
      gotoPage, previousPage, nextPage, canPreviousPage,
      canNextPage, pageOptions, state: { pageIndex, pageSize },
      pageCount, setPageSize
  
    } = props.paginationFxns;
  
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  
    console.log(props)
    return (
      <div className="pagination">
      <InputGroup>
        <InputGroupAddon className="pageControls" addonType="prepend">
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            &lt; &lt;
          </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            &lt;
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            &gt;
          </Button>
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            &gt;&gt;
          </Button>
          <InputGroupText className="pageCountOuter">
            Page
            {' '}
            <strong className="pageCountBox">
              {pageIndex + 1}
              {' '}
              of
              {' '}
              {pageOptions.length}
            </strong>
          </InputGroupText>
          <InputGroupText className="goToPage">
            Go to page:
          </InputGroupText>
        </InputGroupAddon>
        <Input
          className="tablePageInput"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageCounter = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageCounter);
          }}
        />
        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
          <DropdownToggle
            caret
            style={{
              marginTop: '0%',
              marginBottom: '0%',
              marginLeft: '0%',
            }}
          >
            Show
            {' '}
            {pageSize}
          </DropdownToggle>
          <DropdownMenu onClick={(e) => {
            setPageSize(Number(e.target.value));
          }}
          >
            {[10, 20, 30, 40, 50].map((rowCount) => (
              <DropdownItem
                key={rowCount}
                value={rowCount}
              >
                Show
                {' '}
                {rowCount}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
    </div>
    );
  }