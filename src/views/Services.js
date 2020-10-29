import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

function Services({ updateState }) {
  useEffect(() => {
    updateState({ datasetVisible: false });
    return () => {
      updateState({ datasetVisible: true });
    };
  }, [updateState]);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Service Status</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Service</th>
                      <th>Service URL</th>
                      <th>Status</th>
                      <th className="text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Candig Server</td>
                      <td>http://ga4ghdev01.bcgsc.ca:20127</td>
                      <td><i className="nc-icon nc-check-2" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>Katsu Metadata Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:4000</td>
                      <td><i className="nc-icon nc-check-2" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>Htsget App</td>
                      <td>http://ga4ghdev01.bcgsc.ca:3333</td>
                      <td><i className="nc-icon nc-check-2" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>DRS Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:5000</td>
                      <td><i className="nc-icon nc-check-2" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

Services.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default Services;
