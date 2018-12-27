import Firebase from '../components/Firebase';

class UserController {
  user(uid) {
    Firebase.db.ref(`users/${uid}`);
  }

  users() {
    this.db.ref('users');
  }
}

const userController = new UserController();

export {userController};