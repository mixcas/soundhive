import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracks from '../../../api/Tracks/Tracks';
import Loading from '../../components/Loading/Loading';

import './Stream.scss';

const Stream = ({ loading, tracks, match, history }) => (!loading ? (
  <div className="Stream">
    <div className="page-header clearfix">
      <h4 className="pull-left">Stream</h4>
      <Link className="btn btn-success pull-right" to={`/upload`}>Upload track</Link>
    </div>
    {tracks.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tracks.map(({ _id, title, createdAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>{monthDayYearAtTime(createdAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`track/${_id}`)}
                block
              >View</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No tracks yet!</Alert>}
  </div>
) : <Loading />);

Stream.propTypes = {
  loading: PropTypes.bool.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('tracks');
  return {
    loading: !subscription.ready(),
    tracks: Tracks.find().fetch(),
  };
}, Stream);
