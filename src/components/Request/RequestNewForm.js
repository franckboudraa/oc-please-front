import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import { submitRequest } from '../../actions';
import { Form, Message } from 'semantic-ui-react';

const options = [
  { key: 's', text: 'Service', value: 's' },
  { key: 'm', text: 'Material', value: 'm' }
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
    const { loading, error, success, error_message } = this.props.requests;
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
        success={success}
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
          name="type"
          onChange={this.handleChange}
          value={form.type || ''}
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
