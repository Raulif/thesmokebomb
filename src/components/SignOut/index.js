import React from 'react';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase, history }) => {
  function handleSignOut() {
    firebase.doSignOut();
    history.push(ROUTES.SIGN_IN);
  }
  return (
    <button type="button" onClick={handleSignOut}>
      SignOut
    </button>
  );
};

export default compose(withRouter, withFirebase)(SignOutButton);