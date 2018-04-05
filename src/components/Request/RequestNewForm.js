import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete';

import { submitRequest } from '../../actions';
import { Form, Message } from 'semantic-ui-react';

const options = [
  { key: 'task', text: 'Service', value: 'task' },
  { key: 'need', text: 'Material', value: 'need' }
];

class RequestNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: ''
      },
      address: ''
    };
    this.onAddressChange = address => this.setState({ address });
  }

  handleChange = (e, { name, value }) =>
    this.setState({ form: { ...this.state.form, [name]: value } });

  submitForm = form => {
    this.props.submitRequest(form); // redux action (send form to backend)
    this.props.onFormSubmit(); // RequestNew local state (set submittedForm to true)
  };

  render() {
    const { address, form } = this.state;
    const { loading, error, error_message } = this.props.requests;
    const inputProps = {
      value: address,
      onChange: this.onAddressChange,
      placeholder: 'Location',
      required: true
    };

    return (
      <Form
        loading={loading}
        error={error}
        onSubmit={() => this.submitForm({ address, ...form })}
      >
        <Message error>
          <h2>Oops!</h2> {error_message}
        </Message>
        <Form.Input
          label={
            form.title.length ? `Title (${form.title.length}/60)` : 'Title'
          }
          placeholder="A short title for your request"
          required
          name="title"
          onChange={this.handleChange}
          value={form.title}
          minLength={10}
          maxLength={60}
        />
        <Form.Select
          fluid
          label="Type"
          options={options}
          placeholder="Request type"
          required
          name="reqtype"
          onChange={this.handleChange}
          value={form.reqtype || ''}
        />
        <Form.TextArea
          label={
            form.description.length
              ? `Description (${form.description.length}/300)`
              : 'Description'
          }
          placeholder="Detailed description of your request"
          autoHeight
          required
          name="description"
          onChange={this.handleChange}
          value={form.description || ''}
          minLength={10}
          maxLength={300}
        />
        <div className="required field">
          <label>Location</label>
          <PlacesAutocomplete inputProps={inputProps} />
        </div>
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { submitRequest })(RequestNewForm);
