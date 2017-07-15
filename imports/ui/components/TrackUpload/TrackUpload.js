/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class TrackUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      magnetUri: '',
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
      },
      messages: {
        file: {
          required: 'Need a file in here, Seuss.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });

  }

  handleFileOnChange(e) {
    const component = this;

    var file = e.target.files[0];

    if (component.validateMp3(file)) {

      filer.write('/seedingTracks/' + file.name, {data: file, type: file.type}, (fileEntry, fileWriter) => {

        filer.open(fileEntry.fullPath, function(file) {
          debugger;

          client.seed(file, torrent => {
            let magnetUri = torrent.magnetURI;

            component.magnetUri.value = magnetUri;

            component.setState({magnetUri});
          });
        }, function(err) {
          console.log(err);
        });

      }, (error) => {
        console.log(err);
      });
    } else {
      Bert.alert('Select an MP3 file', 'danger');
      component.file.value = '';
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

            {this.state.magnetUri !== '' ? <Alert bsStyle="success">
              <strong>Torrent generated!</strong> Magnet link: <a href={this.state.magnetUri}>{this.state.magnetUri}</a>
            </Alert> : ''}

            <input
              type='hidden'
              name='magnetUri'
              ref={magnetUri => (this.magnetUri = magnetUri)}
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Add Track</Button>
        </form>
      </div>
    );
  }
};

export default TrackUpload;
