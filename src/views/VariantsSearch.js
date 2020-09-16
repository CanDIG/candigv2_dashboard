import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input, Row, UncontrolledAlert,
} from 'reactstrap';

import BASE_URL from '../constants/constants';
import VariantsTable from '../components/Tables/VariantsTable';

import { notify, NotificationAlert } from '../utils/alert';

import '../assets/css/VariantsSearch.css';

function VariantsSearch({ datasetId }) {
  const [rowData, setRowData] = useState([]);
  const [displayVariantsTable, setDisplayVariantsTable] = useState(false);
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
        setDisplayVariantsTable(true);
        setRowData(data.results.variants);
      }).catch(() => {
        setRowData([]);
        setDisplayVariantsTable(false);
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

        <Row>
          <UncontrolledAlert color="info" className="ml-auto mr-auto alert-with-icon" fade={false}>
            <span
              data-notify="icon"
              className="nc-icon nc-bell-55"
            />

            <b>
              <p> Reminders: </p>
              <p> You will need to supply values for all three fields. </p>
              <p>
                If variants exist for your search request, you may click on any row of the variants
                table to search for a list of individuals associated with them.
              </p>
            </b>
          </UncontrolledAlert>
        </Row>

        <Form style={{ justifyContent: 'center' }} inline onSubmit={formHandler}>
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

        {displayVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : null }
      </div>
    </>
  );
}

VariantsSearch.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default VariantsSearch;
