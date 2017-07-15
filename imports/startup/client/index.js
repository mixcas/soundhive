import 'idb.filesystem.js';
import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import '../../modules/filer';
import '../../modules/webtorrent';
import App from '../../ui/layouts/App/App';

import '../../ui/stylesheets/app.scss';

Meteor.startup(() => render(<App />, document.getElementById('react-root')));
