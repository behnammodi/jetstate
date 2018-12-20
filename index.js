"use strict";
const { emit, on } = require("jetemit");
exports.__esModule = true;
var state = {};

class Action {
  constructor(config) {
    this.data = config.defaultValue;
    this.name = config.name || new Date().getTime().toString();
    this._willReceive = config.willReceive;
    this._willUpdate = config.willUpdate;
    this._shouldUpdate = config.shouldUpdate;
    this.addDidUpdate(config.didUpdate);
    config.name &&
      Object.defineProperty(state, config.name, {
        get: this.get,
        set: this.set
      });
  }
  /**
   * @param {function} callback function for before get state
   */
  set willReceive(callback) {
    this._willReceive = callback;
  }
  /**
   * @param {function} callback function for before set state
   */
  set willUpdate(callback) {
    this._willUpdate = callback;
  }
  /**
   * @param {function} callback function for is need update
   */
  set shouldUpdate(callback) {
    this._shouldUpdate = callback;
  }
  set = value => {
    let newData = null;
    if (typeof this.data == "object" && typeof value == "object")
      newData = { ...this.data, ...value };
    else newData = value;

    this._willUpdate && this._willUpdate(this.data, newData);
    if (this._shouldUpdate) if (!this._shouldUpdate(this.data, newData)) return;
    emit(this.name, newData); //run didupdate functions
    this.data = newData;
  };
  get = key => {
    this._willReceive && this._willReceive(this.data);

    if (key)
      if (typeof this.data == "object") return this.data[key];
      else return undefined;
    return this.data;
  };
  remove(key) {
    if (key) {
      this.data[key] && delete this.data[key];
    } else this.data = null;
    return this.data;
  }
  /**
   * @param {function} callback function for after set state
   * @returns {function} function for unsubscribe
   */
  addDidUpdate(callback) {
    return on(this.name, callback);
  }
}
/**
 * init new state
 * @param {object} config
 * @param {string} config.name name state
 * @param {any} config.defaultValue default value
 * @param {function} config.willReceive function for before get state
 * @param {function} config.willUpdate function for before set state
 * @param {function} config.shouldUpdate function for is need update
 * @param {function} config.didUpdate function for is need update
 * @returns {Action} state object for work with this state
 */
exports.init = function init(config) {
  config = typeof config == "object" ? config : {};
  return new Action(config);
};
/**
 * state container
 */
exports.state = state;
