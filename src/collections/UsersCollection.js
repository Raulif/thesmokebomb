import firebase from '../components/Firebase';

class UsersCollection {
  _users = [];
  constructor() {
    this.getUsersFromDB();
  }

  user(uid) {
    if (this._users.length > 0) {
      return this._users.find(u => u.id === uid);
    } else {
      return firebase.db.ref(`users/${uid}`).on('value', snapshot => {
        if (snapshot) {
          return snapshot.val()
        } else {
          return undefined;
        }
      });
    }
  }

  get users() {
    return this._users.length > 0 ? this._users : this.getUsersFromDB();
  }

  getUsersFromDB() {
    this._users = firebase.db.ref('users').on('value', snapshot => {
      const usersObject = snapshot.val();
      if (usersObject) {
        return Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          id: key
        }));
      } else {
        return [];
      }
    })
  }
}

const usersCollection = new UsersCollection();

export {usersCollection};