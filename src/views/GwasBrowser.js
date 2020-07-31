import React, { ReactDOM } from "react";
import { Row, Input } from "reactstrap";

// TODO: Importing from igv.esm.min.js is not working, but it works fine in the standalone test
import igv from 'igv/dist/igv.esm.js'

// Consts
import BASE_URL from "../constants/constants.js"


class GwasBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGwasName: ""
        }
        this.gwasFileList = {};
        this.igvOptions =  {
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
                dotSize: 1.5
            }
        ]}
    }
    
    /*
    * Invoked when this.state.selectedGwasName is updated
    */
    componentDidUpdate(prevState) {
        if (this.state.selectedGwasName !== prevState.selectedGwasName) {
            var igvContainer = document.getElementById('igv-div');

            this.igvOptions["tracks"][0]["name"] = this.state.selectedGwasName;
            this.igvOptions["tracks"][0]["url"] = BASE_URL + this.gwasFileList[this.state.selectedGwasName]
            igv.createBrowser(igvContainer, this.igvOptions);
        }
    }

    /**
     * Invoked when a different option of dropdown is selected.
     */
    handleGwasInputClick = (e) => {
        this.setState({ selectedGwasName: e.target.value});
    };

    /*
    * Create dropdown for gwas data files
    * This method is invoked in render()
    */
    buildGwasList() {
      // This should be replaced by an XHR request that retrieves a list of files from an API Server
      var mock_data = {
        "ANA_A2_V2_filtered": "/static/COVID19_HGI_ANA_A2_V2_20200701.txt.gz_1.0E-5.txt",
        "ANA_B1_V2": "/static/COVID19_HGI_ANA_B1_V2.gwas", 
        "ANA_B2_V2": "/static/minimal.gwas.1e-2.txt",
        "ANA_C1_V2_filtered": "/static/COVID19_HGI_ANA_C1_V2_20200701.txt.gz_1.0E-5.txt",
        "ANA_D1_V2_filtered": "/static/COVID19_HGI_ANA_D1_V2_20200701.txt.gz_1.0E-5.txt"
      }

      this.gwasFileList = mock_data;

      return Object.keys(mock_data).map((x) => {
          return (
            <option key={x} value={x}>
              {x}
            </option>
          );
        });
    }


    /**
     * Invoked when render() completes
     * By default, load the first gwas file available.
     */
    componentDidMount() {
      var igvContainer = document.getElementById('igv-div');

      // Use the first gwas file name as the initial state
      this.state.selectedGwasName = Object.keys(this.gwasFileList)[0];

      this.igvOptions["tracks"][0]["name"] = this.state.selectedGwasName;
      this.igvOptions["tracks"][0]["url"] = BASE_URL + this.gwasFileList[this.state.selectedGwasName]

      igv.createBrowser(igvContainer, this.igvOptions);
    }

    render() {
      return (
        <>
            <div className="content">
                <Row>
                    <Input onChange={this.handleGwasInputClick} type="select">
                        { this.buildGwasList()}
                    </Input>
                </Row>
                <div id="igv-div"></div>
            </div>
        </>
      );
    }
  }

//   ReactDOM.render(
//     <GwasBrowser />,
//     document.getElementById('root')
//   );

  export default GwasBrowser;
