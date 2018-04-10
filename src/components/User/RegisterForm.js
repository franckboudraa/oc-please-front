import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';

import { submitRegisterForm } from '../../actions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
        first_name: '',
        last_name: ''
      }
    };
  }

  handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value } });

  handleSubmit = () => {
    const { form } = this.state;
    this.props.submitRegisterForm(form);
  };

  render() {
    const { form } = this.state;
    const { loading, error, message, success } = this.props.register;
    return !success ? (
      <div className="mt-3">
        <Message attached header="Welcome on Please!" content="Fill out the form below to register (it's free!)" />
        <Form
          onSubmit={this.handleSubmit}
          loading={loading}
          success={success}
          error={error}
          size="large"
          className="attached fluid segment"
        >
          <Form.Group widths="equal">
            <Form.Input
              name="first_name"
              placeholder="First name"
              icon="user"
              iconPosition="left"
              minLength={2}
              maxLength={20}
              value={form.first_name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              name="last_name"
              placeholder="Last name"
              icon="user"
              iconPosition="left"
              minLength={2}
              maxLength={20}
              value={form.last_name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Input
            icon="at"
            iconPosition="left"
            placeholder="Your email address"
            name="email"
            value={form.email}
            onChange={this.handleChange}
            type="email"
            disabled={success}
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Enter a password"
            type="password"
            required
            name="password"
            minLength={6}
            maxLength={50}
            value={form.password}
            disabled={success}
            onChange={this.handleChange}
          />
          <Message error header="Oops!" content={message} />
          <Form.Button disabled={success} color="green" fluid size="large">
            Register
          </Form.Button>
        </Form>
      </div>
    ) : (
      <Message success header="Welcome!" content={message} />
    );
  }
}

function mapStateToProps({ register }) {
  return { register };
}

export default connect(mapStateToProps, { submitRegisterForm })(RegisterForm);
