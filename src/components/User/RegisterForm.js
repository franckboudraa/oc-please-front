import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    console.log(email + ' - ' + password);

    //this.setState({ submittedName: name, submittedEmail: email })
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Header as="h1" color="grey" className="josefin">
          Register now for free!
        </Header>
        <Form onSubmit={this.handleSubmit} size="large">
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Your email address"
            name="email"
            value={email}
            onChange={this.handleChange}
            type="email"
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Enter a password"
            type="password"
            required
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <Button color="green" fluid size="large">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
