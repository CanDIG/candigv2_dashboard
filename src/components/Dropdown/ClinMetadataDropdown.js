import React from 'react';
import { ButtonDropdown ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// Consts
import { CLIN_METADATA } from 'constants/constants'

class ClinMetadataDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedMetadata: "Types"
    }
  }


  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleClick = (e) => {
    const click = e.currentTarget;
    this.setState({
      selectedMetadata: click.textContent,
    }, () => 
      this.sendMetadata(click.textContent)
    );

  }

  sendMetadata = () => {
    this.props.metadataCallback(this.state.selectedMetadata)
  }

  render() {
    const metadata = CLIN_METADATA

    const metadataList = []
    var item;
    for (item of metadata) {
      metadataList.push(
        <DropdownItem
          default onClick={this.handleClick}
          key={item}>
          {item}
        </DropdownItem>)
    }
    return (
      <ButtonDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.selectedMetadata}
        </DropdownToggle>
        <DropdownMenu>
          {metadataList}
        </DropdownMenu>
      </ButtonDropdown>
    );

  }
}

export default ClinMetadataDropdown;