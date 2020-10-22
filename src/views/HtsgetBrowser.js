import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Row, Input, UncontrolledAlert } from 'reactstrap';
import HtsgetInstance from '../components/IGV/HtsgetInstance';
import { notify, NotificationAlert } from '../utils/alert';

// Consts
import { DRS } from '../constants/constants';

function HtsgetBrowser({ datasetId }) {
  /** *
   * A functional component that renders a view with a IGV.js browser.
   */
  const [selectedGwasName, setSelectedGwasName] = useState('');
  const [selectedGwasUrl, setSelectedGwasUrl] = useState('');
  const [gwasDropdown, setGwasDropdown] = useState([]);
  const [gwasDataObj, setGwasDataObj] = useState({});
  const notifyEl = useRef(null);

  const disabledElementList = [
    <option key="disabled" value="disabled" disabled>
      Select a BAM Sample...
    </option>,
  ];

  useEffect(() => {
    fetch(`${DRS}/search?fuzzy_name=.bam`)
      .then((response) => response.json())
      .then((data) => {
        const tmpDataObj = {};
        // File name is set as key, while its url is set as the value
        data.forEach((element) => {
          tmpDataObj[element.name] = element.access_methods[0].access_url.url;
        });

        const gwasList = Object.keys(tmpDataObj).map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ));

        setGwasDataObj(tmpDataObj);
        setGwasDropdown(gwasList);
      })
      .catch(() => {
        notify(
          notifyEl,
          'No BAM Samples are available.',
          'warning',
        );
      });
  }, [selectedGwasName]);

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
              <span>
                <p> Reminders: </p>
                <p> Select a sample to get started. </p>
              </span>
            </b>
          </UncontrolledAlert>
        </Row>

        <Input
          defaultValue="disabled"
          onChange={(e) => {
            setSelectedGwasName(e.currentTarget.value);
            setSelectedGwasUrl(gwasDataObj[e.currentTarget.value]);
          }}
          type="select"
        >
          { disabledElementList.concat(gwasDropdown) }
        </Input>

        <HtsgetInstance
          selectedGwasName={selectedGwasName}
          selectedGwasUrl={selectedGwasUrl}
          datasetId={datasetId}
        />
      </div>
    </>
  );
}

HtsgetBrowser.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default HtsgetBrowser;
