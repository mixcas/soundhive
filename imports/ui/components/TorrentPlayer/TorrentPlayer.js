/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';

class TorrentPlayer extends React.Component {
  componentDidMount() {

    // Check if torrent already exists (downlaoding or seeding)
    let torrent = client.get(this.props.torrentId);

    if (torrent) {

      // Is torrent ready to be used
      if(torrent.ready) {
        // Get the mp3 file
        var file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp3')
        })

        // Append file to #PlayerContainer
        file.appendTo('#PlayerContainer', (err,elem) => {
          if (err) throw err // file failed to download or display in the DOM
        });

      } else { // Torrent is not ready to be used

        // Listen for `torrent` event.
        client.on('torrent', torrent => {

          // Get the mp3 file
          var file = torrent.files.find(function (file) {
            return file.name.endsWith('.mp3')
          })

          // Append file to #PlayerContainer
          file.appendTo('#PlayerContainer', (err,elem) => {
            if (err) throw err // file failed to download or display in the DOM
          });

        })
      }

    } else { // Torrent doesn't exists

      // Add torrent to start downloading/seeding
      client.add(this.props.magnetUri, function (torrent) {

        // Get the mp3 file
        var file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp3')
        })

        // Listen for `done` event.
        torrent.on('done', () => {

          // Get the file's buffer
          file.getBuffer( (err,buffer) => {

            // Write the file in localStorage
            filer.write('/seedingTracks/' + file.name, {data: buffer, type: file.type}, (fileEntry, fileWriter) => {
              console.log('Saved:', file.name);
            });
          });
        });

        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
        file.appendTo('#PlayerContainer')
      })
    }
  }

  fileExists(torrentId) {
    let torrent = client.get(this.props.torrentId);

    return torrent && torrent.done;
  }

  render() {
    const { doc } = this.props;

    return (
      <div id='PlayerContainer'></div>
    );
  }
};

export default TorrentPlayer;
