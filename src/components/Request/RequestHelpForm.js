import React, { PureComponent } from 'react';

import { Form } from 'semantic-ui-react';

class RequestHelpForm extends PureComponent {
  render() {
    //const { request } = this.props;
    return (
      <Form>
        <Form.TextArea autoHeight minLength={10} maxLength={300} required />
        <span style={{ textAlign: 'center' }}>
          <Form.Button color="green" inline>
            Submit
          </Form.Button>
        </span>
      </Form>
    );
  }
}

export default RequestHelpForm;
