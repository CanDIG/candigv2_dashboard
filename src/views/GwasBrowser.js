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
            selectedGwasName: "",
            selectedGwasURL: "",
        }
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
                max: 25,
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
    * It is invoked immediately after updating occurs.
    */
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedGwasURL !== prevState.selectedGwasURL) {
            var igvContainer = document.getElementById('igv-div');
            this.igvOptions["tracks"][0]["url"] = this.state.selectedGwasURL;
            return igv.createBrowser(igvContainer, this.igvOptions);
        }
    }


    handleTableClick = (e) => {
        // this.setState({ selectedGwasName: e.target.key})
        this.setState({ selectedGwasURL: e.target.value});
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

    // this.setState({ selectedGwasName: Object.keys(mock_data)[0]})
    // this.setState({ selectedGwasURL: mock_data[Object.keys(mock_data)[0]]})

    return Object.keys(mock_data).map((x) => {
      return (
        <option key={x} value={BASE_URL + mock_data[x]}>
          {x}
        </option>
      );
    });
  }


    componentDidMount() {
      var igvContainer = document.getElementById('igv-div');
      this.igvOptions["tracks"][0]["url"] = this.state.selectedGwasURL;
      return igv.createBrowser(igvContainer, this.igvOptions);
    }

    render() {
      return (
        <>
            <div className="content">
                <Row>
                    <Input onChange={this.handleTableClick} type="select">
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
