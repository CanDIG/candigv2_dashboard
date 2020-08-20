import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// TODO: Importing from igv.esm.min.js is not working
import igv from 'igv/dist/igv.esm';

function GwasInstance({ selectedGwasName, selectedGwasUrl }) {
  /** *
    * A functional component that returns an IGV.js instance dedicated to rendering GWAS data.
    */
  const igvBrowser = useRef(null);
  const igvOptions = {
    genome: 'hg38',
    tracks: [
      {
        type: 'gwas',
        format: 'gwas',
        name: '',
        url: '',
        indexed: false,
        height: 300,
        columns: {
          chromosome: 1,
          position: 2,
          value: 5,
        },
        dotSize: 2.2,
      },
    ],
  };

  useEffect(() => {
    // Remove existing browser instances
    igv.removeAllBrowsers();

    // Do not create new browser instance on page load as no sample is selected.
    if (selectedGwasName !== '') {
      igvOptions.tracks[0].name = selectedGwasName;
      igvOptions.tracks[0].url = selectedGwasUrl;
      igv.createBrowser(igvBrowser.current, igvOptions);
    }
  }, [selectedGwasName]);

  return (
    <div
      className="ml-auto mr-auto"
      style={{ background: 'white', marginTop: '15px' }}
      ref={igvBrowser}
    />
  );
}

GwasInstance.propTypes = {
  selectedGwasName: PropTypes.string.isRequired,
  selectedGwasUrl: PropTypes.string.isRequired,
};

export default GwasInstance;
