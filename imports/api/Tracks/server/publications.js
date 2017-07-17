import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Tracks from '../Tracks';

Meteor.publish('tracks', function tracks() {
	return Tracks.find({});
});

// Note: tracks.view is also used when editing an existing track.
Meteor.publish('tracks.single', function singleTrack(trackId) {
	check(trackId, String);
	return Tracks.find({ _id: trackId });
});
