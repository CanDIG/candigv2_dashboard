import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import BASE_URL from '../constants/constants';
import VariantsTable from '../components/Tables/VariantsTable';

import { notify, NotificationAlert } from '../utils/alert';

import '../assets/css/VariantsSearch.css';

function VariantsSearch({ datasetId }) {
  const [rowData, setRowData] = useState([]);
  const [hideVariantsTable, setHideVariantsTable] = useState(false);
  const notifyEl = useRef(null);

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
        setHideVariantsTable(true);
        setRowData(data.results.variants);
      }).catch(() => {
        setRowData([]);
        notify(
          notifyEl,
          'No variants were found.',
          'warning',
        );
      });
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notifyEl} />

        <Form inline onSubmit={formHandler}>
          <FormGroup>
            <Label for="start">Start</Label>
            <Input required type="number" id="start" />
          </FormGroup>

          <FormGroup>
            <Label for="end">End</Label>
            <Input required type="number" id="end" />
          </FormGroup>

          <FormGroup>
            <Label for="referenceName">Reference Name</Label>
            <Input required type="text" id="referenceName" />
          </FormGroup>

          <Button>Search</Button>
        </Form>

        {hideVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : null }
      </div>
    </>
  );
}

VariantsSearch.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default VariantsSearch;
