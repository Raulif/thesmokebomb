import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {SignUpLink} from "../SignUp";
import {withFirebase} from "../Firebase";
import {PasswordForgetLink} from "../PasswordForget";
import * as ROUTES from '../../constants/routes';
import styles from './styles';

class SignInPage extends Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink/>
      </div>
    )
  }
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    this.props.firebase.doSignInUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      }).catch(error => {
        // If it fails to connect for no reason, disable the HTTP Everywhere on Chrome. (!!!!!)
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {email, password, error} = this.state;
    // const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input name='email'
               value={email}
               onChange={this.onChange.bind(this)}
               placeholder="Enter email"
               type="text" />
        <input name="password"
               type="password"
               onChange={this.onChange.bind(this)}
               placeholder="Enter password"
               value={password} />
        <button disabled={false}>
          Sign in
        </button>
        {error && <p style={styles.error}>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export {SignInForm};