import React, { PureComponent } from 'react';

import { Form } from 'semantic-ui-react';

class RequestHelpForm extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Form>
        <Form.TextArea autoHeight />
      </Form>
    );
  }
}

export default RequestHelpForm;
