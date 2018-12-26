import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import {AuthUserContext} from '../Session';

const Navigation = ({ authUser }) => {
    return (
      <div>
          <AuthUserContext.Consumer>
            {authUser => authUser ?
              <NavigationAuth /> :
              <NavigationNoAuth /> }
          </AuthUserContext.Consumer>
      </div>
    );
};

const NavigationAuth = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
              <Link to={ROUTES.GAME}>Game</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
  );
};

const NavigationNoAuth = () => {
    return (
        <ul>
            <li>
              <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
        </ul>
    );
};

export default Navigation;