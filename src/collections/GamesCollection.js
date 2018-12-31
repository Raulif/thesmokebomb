import moment from 'moment';
import firebase from '../components/Firebase';

class GamesCollection {
  _games = [];
  constructor() {
    this.getGamesFromDB();
  }

  game(gid) {
    if (this._games.length > 0) {
      return this._games.find(u => u.id === gid);
    } else {
      return firebase.db.ref(`games/${gid}`).on('value', snapshot => {
        if (snapshot) {
          return snapshot.val()
        } else {
          return undefined;
        }
      });
    }
  }

  runningGameOfUser(uid) {
    const userGames = this._games.filter(g => g._players.includes(p => p.id === uid) && g._running);
    return userGames.reduce((prev, current) => {
      return moment(prev.startDate).isBefore(current.startDate) ? prev : current;
    });
  }

  getGamesFromDB() {
    this._games = firebase.db.ref('games').on('value', snapshot => {
      const gamesObject = snapshot.val();
      if (gamesObject) {
        return Object.keys(gamesObject).map(key => ({
          ...gamesObject[key],
          id: key
        }));
      } else {
        return [];
      }
    })
  }
}