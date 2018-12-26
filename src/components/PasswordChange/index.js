import React, { Component } from 'react';
import {withFirebase} from "../Firebase";

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {passwordOne} = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => this.setState({ error }));
    event.preventDefault();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {passwordOne, passwordTwo, error} = this.state;
    const isInvalid = passwordOne !== passwordTwo && passwordOne !== '';
    return (
      <form onSubmit={this.onSubmit}>
        <input value={passwordOne}
               name="passwordOne"
               onChange={this.onChange}
               placeholder="Enter new password"
               type="password" />

        <input value={passwordTwo}
               name="passwordTwo"
               onChange={this.onChange}
               placeholder="Confirm new password"
               type="password" />
        <button type="submit" disabled={isInvalid}>Reset My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default PasswordChangeForm;