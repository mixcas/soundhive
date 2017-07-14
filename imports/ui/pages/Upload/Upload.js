import React from 'react';
import PropTypes from 'prop-types';
import TrackUpload from '../../components/TrackUpload/TrackUpload';

import './Upload.scss';

const Upload = ({ history }) => (
  <div className="NewDocument">
    <h4 className="page-header">Upload New Track</h4>
    <TrackUpload history={history} />
  </div>
);

Upload.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Upload;
