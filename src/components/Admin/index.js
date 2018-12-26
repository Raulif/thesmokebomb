import React, {Component} from 'react';
import {compose} from 'recompose';
import {withFirebase} from "../Firebase";
import {UserList} from "../UserList";
import withAuthorization from "../Session/withAuthorization";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, users: []}
  }

  componentDidMount() {
    this.setState({loading: true});

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      if (usersObject) {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key
        }));
        this.setState({
          users: usersList,
          loading: false
        })
      } else {
        this.setState({ loading: false });
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin Page</h1>
        <p>User List:</p>
        {!loading && users.length > 0 && <UserList users={this.state.users} />}
        {!loading && users.length === 0 && <p>No users registered yet</p>}
        {loading && <p>Loading...</p>}
      </div>
    )
  }
}

const authCondition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(authCondition))(AdminPage);