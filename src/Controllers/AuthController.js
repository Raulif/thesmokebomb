import firebase from '../components/Firebase';

class AuthController {
  _currentUser = firebase.auth.currentUser;

  doCreateUserWithEmailAndPassword(email, password) {
    firebase.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInUserWithEmailAndPassword(email, password){
    firebase.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    firebase.auth.signOut();
    this._currentUser = undefined;
  }

  doPasswordReset(email) {
    firebase.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(newPassword) {
    firebase.auth.currentUser.updatePassword(newPassword);
  }

  get currentUser() {
    return this._currentUser;
  }
}

const authController = new AuthController();

export {authController};