import moment from 'moment';

class BombController {
  _active = false;
  _bomber = undefined;
  _disposer = undefined;
  _activationTime = undefined;
  _deactivationTime = undefined;

  activate() {
    if(this._active) {
      return;
    }
    this._active = true;
    this._activationTime = new Date();
  }

  deactivate() {
    if(!this._active) {
      return;
    }
    this._active = false;
    this._deactivationTime = new Date();
  }

  get timeLapse() {
    if(!this._activationTime || !this._deactivationTime) {
      return;
    }
    const duration = moment.duration(moment(this._deactivationTime).diff(moment(this._activationTime)));
    return {
      hours: duration.asHours(),
      minutes: duration.asMinutes(),
      seconds: duration.asSeconds()
    };
  }

  set bomber(user) {
    this._bomber = user;
  }

  get bomber() {
    return this._bomber;
  }

  set disposer(user) {
    this._disposer = user;
  }

  get disposer() {
    return this._disposer;
  }

  set activateAndDefineBomber(user) {
    if(this._active) {
      return;
    }
    this.activate();
    this.bomber = user;
  }

  set deactivateAndDefineDisposer(user) {
    if(!this._active) {
      return;
    }
    this.deactivate();
    this.disposer = user;
  }
}

const bombController = new BombController();

export {bombController};