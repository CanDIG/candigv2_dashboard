import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import BASE_URL from '../constants/constants';
import VariantsTable from '../components/Tables/VariantsTable';

function VariantsSearch({ datasetId }) {
  const [rowData, setRowData] = useState([]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    fetch(`${BASE_URL}/variants/search`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: e.target.start.value,
        end: e.target.end.value,
        referenceName: e.target.referenceName.value,
        datasetId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results !== undefined) {
          setRowData(data.results.variants);
        }
      });
  };

  return (
    <>
      <div className="content">

        <Form inline onSubmit={formHandler}>
          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="start">Start</Label>
            <Input required type="text" name="start" id="start" placeholder="" />
          </FormGroup>

          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="end">End</Label>
            <Input required type="text" name="end" id="end" placeholder="" />
          </FormGroup>

          <FormGroup style={{ marginRight: '20px' }}>
            <Label style={{ marginRight: '10px' }} for="referenceName">Reference Name</Label>
            <Input required type="text" name="referenceName" id="referenceName" placeholder="" />
          </FormGroup>

          <Button>Search</Button>
        </Form>

        <VariantsTable rowData={rowData} datasetId={datasetId}></VariantsTable>>
      </div>
    </>
  );
}

VariantsSearch.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default VariantsSearch;
