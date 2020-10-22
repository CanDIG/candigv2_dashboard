import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// TODO: Importing from igv.esm.min.js is not working
import igv from 'igv/dist/igv.esm';
import {  NotificationAlert } from '../../utils/alert';

function HtsgetInstance({ selectedGwasName, selectedGwasUrl, datasetId }) {
  /** *
   * A functional component that returns an IGV.js instance dedicated to rendering GWAS data.
   */
  const igvBrowser = useRef(null);
  const notifyEl = useRef(null);

  useEffect(() => {
    const igvOptions = {
      genome: 'hg38',
      tracks: [
        {
          type: 'alignment',
          sourceType: 'htsget',
          name: '',
          url: 'http://ga4ghdev01.bcgsc.ca:3333',
          endpoint: '/htsget/v1/reads/',
          id: ''
        },
      ],
    };

    igv.removeAllBrowsers(); // Remove existing browser instances

    // Do not create new browser instance on page load as no sample is selected.
    if (selectedGwasName !== '') {
      igvOptions.tracks[0].name = selectedGwasName;
      igvOptions.tracks[0].id = selectedGwasName;

      igv.createBrowser(igvBrowser.current, igvOptions)
    }
  }, [selectedGwasName, selectedGwasUrl, datasetId]);

  return (
    <>
      <NotificationAlert ref={notifyEl} />

      <div
        style={{ background: 'white', marginTop: '15px', marginBottom: '15px' }}
        ref={igvBrowser}
      />
    </>
  );
}

HtsgetInstance.propTypes = {
  selectedGwasName: PropTypes.string.isRequired,
  selectedGwasUrl: PropTypes.string.isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default HtsgetInstance;
