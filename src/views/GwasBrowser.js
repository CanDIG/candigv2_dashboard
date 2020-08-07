import React, { useRef, useState, useEffect } from "react";
import { Row, Input } from "reactstrap";

// TODO: Importing from igv.esm.min.js is not working, but it works fine in the standalone test
import igv from 'igv/dist/igv.esm.js'

// Consts
import BASE_URL from "../constants/constants.js"


function GwasBrowser() {
  /***
   * A functional component that renders an IGV.js instance
   */
  const [selectedGwasName, setSelectedGwasName] = useState("");
  const igvBrowser = useRef(null);
  const igvOptions = {
    genome: 'hg38',
    tracks: [
      {
          type: "gwas",
          format: "gwas",
          name: "",
          url: "",
          indexed: false,
          height: 300,
          columns: {
              chromosome: 1,
              position: 2,
              value: 5
          },
          dotSize: 1.8
      }
  ]};

  const mock_data = {
    "ANA_A2_V2_filtered": "/static/COVID19_HGI_ANA_A2_V2_20200701.txt.gz_1.0E-5.txt",
    "ANA_B1_V2": "/static/COVID19_HGI_ANA_B1_V2.gwas", 
    "ANA_B2_V2": "/static/minimal.gwas.1e-2.txt",
    "ANA_C1_V2_filtered": "/static/COVID19_HGI_ANA_C1_V2_20200701.txt.gz_1.0E-5.txt",
    "ANA_D1_V2_filtered": "/static/COVID19_HGI_ANA_D1_V2_20200701.txt.gz_1.0E-5.txt"
  }

  const disabledElementList = [
    <option key="disabled" value="disabled" disabled>
      Select a GWAS Sample...
    </option>
  ]

  const gwasList = Object.keys(mock_data).map((x) => {
    return (
      <option key={x} value={x}>
        {x}
      </option>
    );
  });

  useEffect(() => {
    // Remove an existing browser instance
    if (igv.getBrowser() !== undefined) {
      igv.removeBrowser(igv.getBrowser());
    }

    // Do not create new browser instance when nothing is selected
    // This resolves a bug when two IGV instances are rendered
    if (selectedGwasName !== "") {
      igvOptions["tracks"][0]["name"] = selectedGwasName;
      igvOptions["tracks"][0]["url"] = BASE_URL + mock_data[selectedGwasName];
      igv.createBrowser(igvBrowser.current, igvOptions);
    }
  })

  return (
    <>
        <div className="content">
            <Row>
                <Input defaultValue={'disabled'}
                  onChange={(e) => {
                    setSelectedGwasName(e.currentTarget.value);
                  }}
                  type="select">
                  { disabledElementList.concat(gwasList) }
                </Input>
            </Row>
            <div ref={igvBrowser}></div>
        </div>
    </>
  );
}

export default GwasBrowser;
