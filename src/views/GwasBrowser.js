import React, { useState } from "react";
import { Row, Input, UncontrolledAlert } from "reactstrap";
import GwasInstance from "../components/IGV/GwasInstance.js"

// Consts
import BASE_URL from "../constants/constants.js"


function GwasBrowser() {
  /***
   * A functional component that renders a view with a IGV.js browser.
   */
  const [selectedGwasName, setSelectedGwasName] = useState("");
  const [selectedGwasUrl, setSelectedGwasUrl] = useState("");

  const mock_data = {
    "ANA_A2_V2_filtered": "/static/COVID19_HGI_ANA_A2_V2_20200701.txt.gz_1.0E-5.txt",
    "ANA_B1_V2": "/static/COVID19_HGI_ANA_B1_V2.gwas", 
    "ANA_B2_V2": "/static/minimal.gwas.1e-2.txt",
    "ANA_C1_V2_filtered": "/static/COVID19_HGI_ANA_C1_V2_20200701.txt.gz_1.0E-5.txt",
    "ANA_D1_V2_filtered": "/static/COVID19_HGI_ANA_D1_V2_20200701.txt.gz_1.0E-5.txt"
  };

  const disabledElementList = [
    <option key="disabled" value="disabled" disabled>
      Select a GWAS Sample...
    </option>
  ];

  const gwasList = Object.keys(mock_data).map((x) => {
    return (
      <option key={x} value={x}>
        {x}
      </option>
    );
  });

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
                      <p> To adjust the range of data, click on the setting icon on the right of the track 
                      and select "Autoscale", or manually adjust the range by clicking on "Set data range".</p>
                      <p> To adjust the height of the track, use "Set track height". </p>
                    </span>
                  </b>
              </UncontrolledAlert>
            </Row>

            <Input defaultValue={'disabled'}
              onChange={(e) => {
                setSelectedGwasName(e.currentTarget.value);
                setSelectedGwasUrl(BASE_URL + mock_data[e.currentTarget.value]);
              }}
              type="select">
              { disabledElementList.concat(gwasList) }
            </Input>

            <GwasInstance selectedGwasName={selectedGwasName} selectedGwasUrl={selectedGwasUrl} />
        </div>
    </>
  );
}

export default GwasBrowser;