import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BASE_URL from "../../constants/constants";

/*
 * Dropdown component listing all the available Datasets
 */
function DatasetsDropdown({ updateState }) {
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedDataSetId, setSelectedDatasetId] = useState("");
  const [datasets, setDatasets] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  /*
   * Fetch dataset information from the server after the Dropdown component is added to the DOM
   * and update both parent and local state
   */
  useEffect(() => {
    if (!selectedDataset) {
      fetch(BASE_URL + "/datasets/search", {
        method: "post",
      })
        .then((response) => response.json())
        .then((data) => {
          let datasetsList = {};
          for (let i = 0; i < data.results.datasets.length; i++) {
            datasetsList[data.results.datasets[i].id] =
              data.results.datasets[i];
          }
          setDatasets(datasetsList);
          const firstDataset = datasetsList[Object.keys(datasetsList)[0]];
          setSelectedDataset(firstDataset.name);
          setSelectedDatasetId(firstDataset.id);
          updateParentState(firstDataset.name, firstDataset.id);
        });
    }
  });

  /*
   * Update the datasetName and datasetId on the parent component
   * @param {string} datasetName
   * @param {string} datasetId
   */
  function updateParentState(datasetName, datasetId) {
    updateState({
      datasetName: datasetName,
      datasetId: datasetId,
    });
  }
  /*
   * Update both parent and local components state
   */
  function handleClick(e) {
    setSelectedDataset(e.currentTarget.textContent);
    setSelectedDatasetId(e.currentTarget.id);
    updateParentState(e.currentTarget.textContent, e.currentTarget.id);
  }

  const datasetList = [];
  // This loop builds the dropdown items list
  for (const property in datasets) {
    datasetList.push(
      <DropdownItem
        default
        onClick={handleClick}
        key={datasets[property].id}
        id={datasets[property].id}
      >
        {datasets[property].name}
      </DropdownItem>
    );
  }
  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      style={{
        borderRadius: "25px",
        backgroundColor: "#212120",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <DropdownToggle caret nav style={{ color: "white", fontSize: 12 }}>
        {selectedDataset}
      </DropdownToggle>
      <DropdownMenu>{datasetList}</DropdownMenu>
    </Dropdown>
  );
}

export default DatasetsDropdown;
