import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import BASE_URL from 'constants/constants';

function VariantsSearch({ datasetId, datasetName }) {

    function formHandler(e) {
        e.preventDefault(); // Prevent form submission

        fetch(`${BASE_URL}/variants/search`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              start: e.target.start.value,
              end: e.target.end.value,
              referenceName: e.target.referenceName.value,
              datasetId: datasetId
            }),
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }


    return (
        <>
        <div className="content">

            <Form onSubmit={formHandler}>
                <FormGroup>
                    <Label for="start">Start</Label>
                    <Input required type="text" name="start" id="start" placeholder="Start location of a variant." />
                </FormGroup>

                <FormGroup>
                    <Label for="end">End</Label>
                    <Input required type="text" name="end" id="end" placeholder="End location of a variant." />
                </FormGroup>

                <FormGroup>
                    <Label for="referenceName">Reference Name</Label>
                    <Input required type="text" name="referenceName" id="referenceName" placeholder="Reference Name. This includes
                    somatic and sex chromosomes, as well as mitochondria identifiers." />
                </FormGroup>

                <Button>Search</Button>
            </Form>

        </div>
        </>
    )
}


export default VariantsSearch;