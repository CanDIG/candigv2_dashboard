import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const url = "http://ga4ghdev01.bcgsc.ca:20127"

class DatasetsDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedDataset: "Datasets",
      selectedDataSetId: ""
    }
  }

  componentDidMount() {
    fetch(url + "/datasets/search", {
      method: "post"
    })
      .then(response => response.json())
      .then(data => {
        let datasets = {}
        for (let i = 0; i < data.results.datasets.length; i++) {
          datasets[i] = data.results.datasets[i]
        }
        this.setState({ datasets: datasets })
        this.setState({ selectedDataSetId: datasets[0].id })
        this.setState({ selectedDataset: datasets[0].name })
        this.updateParentState(datasets[0].name, datasets[0].id)
      })
  }

  updateParentState(datasetName, datasetId) {
    this.props.updateState({
      datasetName: datasetName,
      datasetId: datasetId
    })

  }

  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleClick = (e) => {
    this.setState({
      selectedDataset: e.currentTarget.textContent,
      selectedDataSetId: e.currentTarget.id
    });
    this.updateParentState(e.currentTarget.textContent, e.currentTarget.id)
  }

  render() {
    const datasets = this.state.datasets

    const datasetList = []
    for (const property in datasets) {
      datasetList.push(
        <DropdownItem
          default onClick={this.handleClick}
          key={datasets[property].id}
          id={datasets[property].id}>
          {datasets[property].name}
        </DropdownItem>)
    }
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret nav>
          {this.state.selectedDataset}
        </DropdownToggle>
        <DropdownMenu>
          {datasetList}
        </DropdownMenu>
      </Dropdown>
    );

  }
}

export default DatasetsDropdown;