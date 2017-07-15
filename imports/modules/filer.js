import Filer from 'filer.js';

// Set Filer
filer = new Filer();
filer.init({persistent: true, size: 100 * 1024 * 1024}, (fs) => {
  filer.mkdir('seedingTracks', false, dirEntry => {
    console.log('Seeding Tracks dir created');
  });
}, err => {
  console.log(err);
});

let createTracksDir = () => {
};
