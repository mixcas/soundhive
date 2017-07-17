/* eslint-disable max-len, no-return-assign */

import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, HelpBlock, FormControl, Checkbox } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class TrackUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      magnetUri: '',
      infoHash: '',
    };

    this.handleFileOnChange = this.handleFileOnChange.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        file: {
          required: true,
        },
        title: {
          required: true,
        },
      },
      messages: {
        file: {
          required: 'Need a file in here, Seuss.',
        },
        title: {
          required: 'Need a title in here, Seuss.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });

  }
  handleSubmit() {
    const { history } = this.props;
    const existingTrack = this.props.doc && this.props.doc._id;
    const methodToCall = existingTrack ? 'tracks.update' : 'tracks.insert';
    const doc = {
      title: this.title.value.trim(),
      magnetUri: this.state.magnetUri.trim(),
      infoHash: this.state.infoHash.trim(),
      genre: this.genre.value.trim(),
      tags: this.tags.value.trim(),
      description: this.description.value.trim(),
    };

    if (existingTrack) doc._id = existingTrack;

    Meteor.call(methodToCall, doc, (error, trackId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingTrack ? 'Track updated!' : 'Track added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/track/${trackId}`);
      }
    });
  }

  handleFileOnChange(e) {
    const component = this;

    var file = e.target.files[0];
    if (file) {
      if (component.validateMp3(file)) {

        filer.write('/seedingTracks/' + file.name, {data: file, type: file.type}, (fileEntry, fileWriter) => {

          filer.open(fileEntry.fullPath, function(file) {
            client.seed(file, torrent => {
              let filename = file.name;
              let magnetUri = torrent.magnetURI;
              let infoHash = torrent.infoHash;

              component.setState({magnetUri, infoHash});

              component.title.value = filename;

              Bert.alert('Torrent generated', 'success');
            });
          }, function(err) {
            console.log(err);
          });

        }, (err) => {
          console.log(err);
        });
      } else {
        Bert.alert('Select an MP3 file', 'danger');
        component.file.value = '';
      }
    }
  }

  validateMp3(file) {
    let filename = file.name;
    let idx = filename.lastIndexOf('.');

    if (idx !== -1 && filename.substring(idx) === '.mp3') {
      return true;
    }

    return false;
  }

  render() {
    const { doc } = this.props;
    return (
      <div className='TrackUpload'>
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <FormGroup>
            <ControlLabel>File</ControlLabel>
            <input
              type='file'
              className='form-control'
              name='file'
              ref={file => (this.file = file)}
              onChange={this.handleFileOnChange}
              placeholder='Select File'
            />
            {this.state.magnetUri && <HelpBlock>Magnet link: <a href={this.state.magnetUri}>{this.state.magnetUri}</a></HelpBlock>}
          </FormGroup>

          { this.state.magnetUri && <div>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <input
                type='text'
                className='form-control'
                name='title'
                ref={title => (this.title = title)}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Genre</ControlLabel>
              <input
                id='genre'
                name='genre'
                ref={genre => (this.genre = genre)}
                className='form-control'
                type='text'
                label='Genre'
                placeholder='Enter text'
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Tags</ControlLabel>
              <input
                id='tags'
                name='tags'
                ref={tags => (this.tags = tags)}
                className='form-control'
                type='text'
                label='Tags'
                placeholder='Comma, Separated, Tags'
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <textarea
                id='description'
                name='description'
                className='form-control'
                ref={description => (this.description = description)}
                label='Description'
              ></textarea>
            </FormGroup>

            <Button type='submit' bsStyle='success'>Add Track</Button>
          </div> }
        </form>
      </div>
    );
  }
};

export default TrackUpload;
