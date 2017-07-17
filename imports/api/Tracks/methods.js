import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Tracks from './Tracks';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'tracks.insert': function tracksInsert(doc) {
    check(doc, {
      title: String,
      magnetUri: String,
      infoHash: String,
      genre: String,
      tags: String,
      description: String,
    });

    try {
      return Tracks.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'tracks.update': function tracksUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      magnetUri: String,
      infoHash: String,
      genre: String,
      tags: String,
      description: String,
    });

    try {
      const trackId = doc._id;
      Tracks.update(trackId, { $set: doc });
      return trackId; // Return _id so we can redirect to track after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'tracks.remove': function tracksRemove(trackId) {
    check(trackId, String);

    try {
      return Tracks.remove(trackId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'tracks.insert',
    'tracks.update',
    'tracks.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
