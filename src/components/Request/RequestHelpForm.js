import React, { PureComponent } from 'react';

import { Form } from 'semantic-ui-react';

class RequestHelpForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        message: ''
      }
    };
  }

  handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value } });

  render() {
    //const { request } = this.props;
    const { message } = this.state.form;
    return (
      <Form onSubmit={() => this.props.submitHelpRequest(message)}>
        <Form.TextArea
          name="message"
          autoHeight
          minLength={10}
          maxLength={300}
          value={message}
          onChange={this.handleChange}
          required
        />
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
