import React, {Component} from 'react';
import {withAuthorization} from '../Session';

const authCondition = authUser => !!authUser;

const HomePage = () => {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible only to signed in users</p>
      </div>
    )
};

export default withAuthorization(authCondition)(HomePage);