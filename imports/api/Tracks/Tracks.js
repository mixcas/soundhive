/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Tracks = new Mongo.Collection('Tracks');

Tracks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tracks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Tracks.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this track belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this track was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this track was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  magnetUri: {
    type: String,
    label: 'File\'s Magner URI',

  },
  title: {
    type: String,
    label: 'The title of the track.',
  },
  infoHash: {
    type: String,
    label: 'Torrent hash',
  },
  genre: {
    type: String,
    label: 'Track genre',
  },
  description: {
    type: String,
    label: 'Track\'s description',
  },
});

Tracks.attachSchema(Tracks.schema);

export default Tracks;
