/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class TrackUpload extends React.Component {
  constructor() {
    super(props);
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

  handleFileOnChange() {
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
              onchange={this.handleFileOnChange}
              placeholder='Select File'
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Add Track</Button>
        </form>
      </div>
    );
  }
};

export default TrackUpload;
