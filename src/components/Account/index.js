import React from 'react';
import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from '../PasswordChange';
import {withAuthorization, AuthUserContext} from '../Session';

const authCondition = authUser => !!authUser;

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withAuthorization(authCondition)(AccountPage);