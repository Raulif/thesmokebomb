class GameController {
  _running = false;
  _players = [];

  startGame() {
    this._running = true;
  }

  endGame() {
    this._running = false;
  }

  get players() {
    return this._players;
  }

  removePlayer(userId) {
    const removeAtIndex = this._players.indexOf(p => p.id === userId);
    this._players.splice(1, removeAtIndex);
  }

  addPlayer(user) {
    this._players.push(user);
  }
}

const gameController = new GameController();

export {gameController};