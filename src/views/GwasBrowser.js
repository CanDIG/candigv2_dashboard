import React from "react";

import { Row, Input } from "reactstrap";

// Not sure why igv.esm.min.js is not working, it works fine in the standalone test
import igv from 'igv/dist/igv.esm.js'

class GwasBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGwas: ""
        }
    }
    
    /*
    * It is invoked immediately after updating occurs.
    */
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedGwas !== prevState.selectedGwas) {
            var igvContainer = document.getElementById('igv-div');
            var igvOptions = {
              genome: 'hg38', 
              tracks: [
                {
                    type: "gwas",
                    format: "gwas",
                    name: "GWAS sample",
                    url: this.state.selectedGwas,
                    indexed: false,
                    height: 300,
                    max: 25,
                    columns: {
                        chromosome: 1,
                        position: 2,
                        value: 5
                    },
                    dotSize: 1.5
                }
            ]};
            return igv.createBrowser(igvContainer, igvOptions);
            
        }
    }

    /*
    */

    handleTableClick = (e) => {
        this.setState({ selectedGwas: e.target.value});
    };


    componentDidMount() {
      var igvContainer = document.getElementById('igv-div');
      var igvOptions = {
        genome: 'hg38', 
        tracks: [
          {
              type: "gwas",
              format: "gwas",
              name: "GWAS sample",
              url: "http://ga4ghdev01.bcgsc.ca:20127/static/minimal.gwas.1e-2.txt",
              indexed: false,
              height: 300,
              max: 25,
              columns: {
                  chromosome: 1,
                  position: 2,
                  value: 5
              },
              dotSize: 1.5
          }
      ]};
      return igv.createBrowser(igvContainer, igvOptions);
    }
    render() {
      return (
        <>
            <div className="content">
                <Row>
                    <Input onChange={this.handleTableClick} type="select">
                        <option key={"1"} value={"http://ga4ghdev01.bcgsc.ca:20127/static/minimal.gwas.1e-2.txt"}>Sample 1</option>
                        <option key={"2"} value={"http://ga4ghdev01.bcgsc.ca:20127/static/COVID19_HGI_ANA_B1_V2.gwas"}>Sample 2</option>
                    </Input>
                </Row>

                <div id="igv-div"></div>
            </div>
        </>
      );
    }
  }

  export default GwasBrowser;
