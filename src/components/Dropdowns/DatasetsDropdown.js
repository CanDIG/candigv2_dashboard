import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import BASE_URL from '../../constants/constants';

/*
 * Dropdown component listing all the available Datasets
 * @param{func} A method that updates the state on the parent
 */
function DatasetsDropdown({ updateState }) {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [datasets, setDatasets] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  /*
   * Update the datasetName and datasetId on the parent component
   * @param {string} datasetName
   * @param {string} datasetId
   */
  function updateParentState(datasetName, datasetId) {
    updateState({
      datasetName,
      datasetId,
    });
  }

  /*
   * Fetch dataset information from the server after the Dropdown component is added to the DOM
   * and update both parent and local state
   */
  useEffect(() => {
    if (!selectedDataset) {
      fetch(`${BASE_URL}/datasets/search`, {
        method: 'post',
      })
        .then((response) => response.json())
        .then((data) => {
          const datasetsList = {};
          for (let i = 0; i < data.results.datasets.length; i += 1) {
            datasetsList[data.results.datasets[i].id] = data.results.datasets[i];
          }
          setDatasets(datasetsList);
          const firstDataset = datasetsList[Object.keys(datasetsList)[0]];
          setSelectedDataset(firstDataset.name);
          updateParentState(firstDataset.name, firstDataset.id);
        });
    }
  });

  /*
   * Update both parent and local components state
   */
  function handleClick(e) {
    setSelectedDataset(e.currentTarget.textContent);
    updateParentState(e.currentTarget.textContent, e.currentTarget.id);
  }

  // This loop builds the dropdown items list
  const datasetList = Object.keys(datasets).map((key) => (
    <DropdownItem
      default
      onClick={handleClick}
      key={key}
      id={key}
    >
      {datasets[key].name}
    </DropdownItem>
  ));

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      style={{
        borderRadius: '25px',
        backgroundColor: '#212120',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <DropdownToggle caret nav style={{ color: 'white', fontSize: 12 }}>
        {selectedDataset}
      </DropdownToggle>
      <DropdownMenu>{datasetList}</DropdownMenu>
    </Dropdown>
  );
}

DatasetsDropdown.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default DatasetsDropdown;
