import firebase from '../components/Firebase';

// TODO Create class instance passing AuthUser id!!
// TODO Move edit stuff to Teams Controller ???

class TeamsCollection {
  constructor(uid) {
    this.getTeamsFromDB(uid);
  }
  _teams = [];

  getTeamsFromDB(uid) {
    // fetches teams from DB and returns only those containing uid in participants property
    this._teams = firebase.db.ref('teams').on('value', snapshot => {
      const teamsObject = snapshot.val();
      if (teamsObject) {
        return Object.keys(teamsObject).map(key => {
          const {participants} = teamsObject[key];
          if (participants.includes(uid)) {
            return {
              ...teamsObject[key],
              id: key
            };
          }
        });
      }
    })
  }

  addParticipantToTeamOnDB(tid, uid) {
    if (this._teams.length > 0) {
      const idx = this._teams.findIndex(t => t.id === tid);
      if (idx !== -1) {
        this._teams[idx].participants.push(uid);
        firebase.db.ref(`teams/${tid}`).set({
          participants: this._teams[idx].participants
        });
      }
    }
  }

  createNewTeamOnDB(teamInfo, uid) {}
}

export {TeamsCollection};
