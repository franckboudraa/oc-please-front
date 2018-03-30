import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      form: {},
      address: ''
    };
    this.onAddressChange = address => this.setState({ address });
  }

  handleChange = (e, { name, value }) =>
    this.setState({ form: { ...this.state.form, [name]: value } });

  render() {
    const { address, form } = this.state;
    const { loading, error, success, error_message, id } = this.props.requests;
    const inputProps = {
      value: address,
      onChange: this.onAddressChange,
      placeholder: 'Location',
      required: true
    };
    if (success && id) {
      return (
        <Redirect
          to={{
            pathname: `/r/${id}`,
            state: { from: this.props.location }
          }}
        />
      );
    }
    return (
      <Form
        loading={loading}
        error={error}
        onSubmit={() => this.props.submitRequest({ address, ...form })}
      >
        <Message error>
          <h2>Oops!</h2> {error_message}
        </Message>
        <Form.Input
          label="Title"
          placeholder="A short title for your request"
          required
          name="title"
          onChange={this.handleChange}
          value={form.title || ''}
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
          label="Description"
          placeholder="Detailed description of your request"
          autoHeight
          required
          name="description"
          onChange={this.handleChange}
          value={form.description || ''}
        />
        <div className="required field">
          <label>Location</label>
          <PlacesAutocomplete inputProps={inputProps} />
        </div>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { submitRequest })(RequestNewForm);
