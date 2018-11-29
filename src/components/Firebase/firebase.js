import {app} from 'firebase';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

export default class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(config);
    this.auth = app.auth();
  }

  createUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password).then(console.log).catch(console.log);
  };

  signInUserWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password).then(console.log).catch(console.log);
  };

  signOut = () => this.auth.signOut().then(console.log).catch(console.log);

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (newPassword) => this.auth.currentUser.updatePassword(newPassword);
}
