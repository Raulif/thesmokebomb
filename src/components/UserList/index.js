import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserList extends Component {
  render() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          const {uid, email, username} = user;
         return (
           <li key={index}>
             <span><strong>ID:</strong>{uid}</span>
             <span><strong>Email:</strong>{email}</span>
             <span><strong>Username:</strong>{username}</span>
           </li>
         );
       })}
      </ul>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array
};

export {UserList};