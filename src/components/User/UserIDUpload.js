import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import { submitIdentity } from '../../actions';

import {
  Button,
  Header,
  Icon,
  Grid,
  Message,
  Segment
} from 'semantic-ui-react';

const FILESTACK_KEY = process.env.REACT_APP_FILESTACK_KEY;
const options = {
  accept: ['image/*', '.pdf'],
  maxFiles: 1,
  fromSources: [
    'local_file_system',
    'googledrive',
    'dropbox',
    'gmail',
    'onedrive'
  ],
  maxSize: 5 * 1024 * 1024
};

class UserIDUpload extends Component {
  onSuccess = ({ filesUploaded }) => {
    if (filesUploaded.length) {
      //console.log(filesUploaded[0].url);
      this.props.submitIdentity(
        this.props.auth.user.id,
        this.props.auth.token,
        filesUploaded[0].url
      );
    }
  };
  render() {
    return (
      <Grid centered container className="mt-5" stackable>
        <Grid.Row>
          <Grid.Column textAlign="center" width={10}>
            <Header as="h1" className="josefin rem-3 mb-5" color="green">
              Welcome on Please!
            </Header>
            <Segment textAlign="center" padded>
              <h3>Please upload your ID before using our service:</h3>
              <ReactFilestack
                apikey={FILESTACK_KEY}
                options={options}
                onSuccess={this.onSuccess}
                render={({ onPick }) => (
                  <Button icon color="green" onClick={onPick}>
                    <Icon name="upload" /> Upload my ID
                  </Button>
                )}
              />
              <Message>
                <li>You must upload a government-approved ID.</li>
                <li>File size must be less than 5 MB.</li>
                <li>Accepted types: png, jpg, pdf</li>
              </Message>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null, { submitIdentity })(UserIDUpload);
