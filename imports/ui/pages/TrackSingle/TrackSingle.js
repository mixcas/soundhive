import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TorrentPlayer from '../../components/TorrentPlayer/TorrentPlayer';
import Tracks from '../../../api/Tracks/Tracks';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

//import './TrackSingle.scss';

const renderTrack = (doc, match, history) => (doc ? (
  <div className="TrackSingle">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ doc && doc.title }</h4>
      <TorrentPlayer torrentId={doc.infoHash} magnetUri={doc.magnetUri} />
    </div>
  </div>
) : <NotFound />);

const TrackSingle = ({ loading, doc, match, history }) => (
  !loading ? renderTrack(doc, match, history) : <Loading />
);

TrackSingle.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const trackId = match.params._id;
  const subscription = Meteor.subscribe('tracks.single', trackId);

  return {
    loading: !subscription.ready(),
    doc: Tracks.findOne(trackId) || {},
  };
}, TrackSingle);
