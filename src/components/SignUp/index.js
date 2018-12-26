import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>
    );
  }
}

const SignUpLink = () => {
  return <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up!</Link></p>;
};


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: undefined
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    console.log(this.props);
    const { username, email, passwordOne } = this.state;
    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create user on db
        return this.props.firebase
          .user(authUser.user.uid)
          .set({username, email})
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      }).catch(error => {
        console.log(error);
        this.setState({error})
      });
    // event.preventDefault() prevents a reload of the browser which otherwise would be a natural behavior when using a submit in a form.
    event.preventDefault();
  };// take email and password from state and send it through Firebase.ContextConsumer;

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    // const isInvalid = !username.trim() || !email.trim() || passwordOne !== passwordTwo || !passwordOne.trim();
    const isInvalid = false;
    return(
      <form onSubmit={this.onSubmit}>
        <input value={username} name="username" onChange={this.onChange} type="text" placeholder="Enter your User Name" />
        <input value={email} name="email" onChange={this.onChange} type="text" placeholder="Enter your Email" />
        <input value={passwordOne} name="passwordOne" onChange={this.onChange} type="password" placeholder="Enter your Password" />
        <input value={passwordTwo} name="passwordTwo" onChange={this.onChange} type="password" placeholder="Confirm your Password" />
        <button disabled={isInvalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignUpFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};


const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };