import React, { useState } from 'react';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

// Consts
import { CLIN_METADATA } from '../../constants/constants';

function ClinMetadataDropdown({ metadataCallback, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('patients');

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleClick = (entry) => {
    setSelected(entry);
    metadataCallback(entry);
  };

  console.log(isActive)

  const metadataList = [];
  CLIN_METADATA.forEach((entry) => {
    const capitalized = (entry.charAt(0).toLocaleUpperCase() + entry.slice(1));
    const displayName = [...capitalized.matchAll(/[A-Z]{1}[a-z]*/g)].join(' ');
    metadataList.push(
      <DropdownItem
        onClick={() => handleClick(entry)}
        key={entry}
      >
        {displayName}
      </DropdownItem>,
    );
  });
  if (isActive) {
    return (
      <ButtonDropdown direction="down" isOpen={isOpen} toggle={toggleOpen}>
        <DropdownToggle caret>
          {selected}
        </DropdownToggle>
        <DropdownMenu>
          {metadataList}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  return (<></>)

}

ClinMetadataDropdown.propTypes = {
  metadataCallback: PropTypes.func,
};

ClinMetadataDropdown.defaultProps = {
  metadataCallback: () => {},
};

export default ClinMetadataDropdown;
