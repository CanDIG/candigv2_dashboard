import React, { useState, useEffect } from 'react';
import { Row, Input, UncontrolledAlert } from 'reactstrap';
import GwasInstance from '../components/IGV/GwasInstance';

// Consts
import { DRS } from '../constants/constants';

function GwasBrowser() {
  /** *
   * A functional component that renders a view with a IGV.js browser.
   */
  const [selectedGwasName, setSelectedGwasName] = useState('');
  const [selectedGwasUrl, setSelectedGwasUrl] = useState('');
  const [gwasDropdown, setGwasDropdown] = useState([]);
  const [gwasDataObj, setGwasDataObj] = useState({});

  const disabledElementList = [
    <option key="disabled" value="disabled" disabled>
      Select a GWAS Sample...
    </option>
  ];

  useEffect(() => {

      fetch(`${DRS}/search?fuzzy_name=.gwas`)
      .then((response) => response.json())
      .then((data) => {

        let tmp_data_obj = {};
        // File name is set as key, while its url is set as the value
        data.forEach(element => {
          tmp_data_obj[element['name']] = element['access_methods'][0]['access_url']['url']    
        });

        const gwasList = Object.keys(tmp_data_obj).map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ));

        setGwasDataObj(tmp_data_obj);
        setGwasDropdown(gwasList);
  
      })
      .catch((err) => {
        console.log(err);
      });

}, [selectedGwasName]);


  return (
    <>
      <div className="content">
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
                <p>
                  {' '}
                  To adjust the range of data, click on the setting icon on the right of the track
                  and select &quot;Autoscale&quot;, or manually adjust the range by
                  clicking on &quot;Set data range&quot;.
                </p>
                <p> To adjust the height of the track, use &quot;Set track height&quot;. </p>
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

        <GwasInstance selectedGwasName={selectedGwasName} selectedGwasUrl={selectedGwasUrl} />
      </div>
    </>
  );
}

export default GwasBrowser;
