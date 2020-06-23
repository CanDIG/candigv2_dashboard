import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DatasetsDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  let datasets = props.props
  let list = []
  for(const property in datasets){
    list.push(<DropdownItem key={datasets[property].id}>{datasets[property].name}</DropdownItem>)
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Datasets
        </DropdownToggle>
      <DropdownMenu>
          {list}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DatasetsDropdown;