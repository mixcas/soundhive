import Filer from 'filer.js';
import WebTorrent from 'webtorrent/webtorrent.min';

// Set Filer
filer = new Filer();
client = new WebTorrent();

filer.init({persistent: true, size: 100 * 1024 * 1024}, (fs) => {
  filer.mkdir('seedingTracks', false, dirEntry => {
    console.log('Seeding Tracks dir created');
  });

  // Get list of all seeding tracks
  filer.ls('seedingTracks', entries => {

    // For each seeding files
    _.each(entries, fileEntry => {

      // Open file
      filer.open(fileEntry.fullPath, file => {

        // Start seeding
        client.seed(file, torrent => {
          console.log('Seeding: ', file.name);
          console.log('hash: ', torrent.infoHash);
        });

      }, function(err) {
        console.log(err);
      });
    });

  }, err => console.log(err) );
}, err => {
  console.log(err);
});
