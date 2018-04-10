import React, { PureComponent } from 'react';

import { Form } from 'semantic-ui-react';

class RequestHelpForm extends PureComponent {
  render() {
    //const { request } = this.props;
    return (
      <Form>
        <Form.TextArea autoHeight />
        <Form.Button floated="left">Back to request summary</Form.Button>
        <Form.Button floated="right">Submit</Form.Button>
      </Form>
    );
  }
}

export default RequestHelpForm;
