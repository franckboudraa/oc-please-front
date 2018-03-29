import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import { submitIdentity } from '../../actions';

import { Button, Icon, Grid, Segment } from 'semantic-ui-react';

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
    console.log(this.props);
    return (
      <Grid centered container className="mt-5" stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment textAlign="center">
              <h1 className="josefin">Welcome on Please!</h1>
              <h2 className="josefin">
                Please upload your ID before using our service:
              </h2>
              <ReactFilestack
                apikey={FILESTACK_KEY}
                options={options}
                onSuccess={this.onSuccess}
                render={({ onPick }) => (
                  <Button
                    icon
                    color="green"
                    className="mb-5 mt-4"
                    onClick={onPick}
                  >
                    <Icon name="upload" /> Upload my ID
                  </Button>
                )}
              />
              <p>You must upload a government-approved ID.</p>
              <p>File size must be less than 5 MB.</p>
              <p>Accepted types: png, jpg, pdf</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null, { submitIdentity })(UserIDUpload);
