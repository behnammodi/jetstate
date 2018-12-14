"use strict";

exports.__esModule = true;
var state = {
  __container__: {},
};

/**
 * init new state
 * @param {object} config 
 * @param {string} config.name name state
 * @param {any} config.defaultValue default value 
 * @param {function} config.willReceive function for before get state
 * @param {function} config.willUpdate function for before set state
 * @param {function} config.didUpdate function for after set state
 * @returns {undefined} nothing
 */
exports.init = function init(config) {
  var name = config.name;
  var defaultValue = config.defaultValue;
  var willReceive = config.willReceive;
  var willUpdate = config.willUpdate;  
  var didUpdate = config.didUpdate;

  state.__container__[name] = defaultValue;
  Object.defineProperty(state, name, {
    get() {
      willReceive && willReceive(state.__container__[name]);
      return state.__container__[name];
    },
    set(value) {
      willUpdate && willUpdate(state.__container__[name], value)
      state.__container__[name] = value;
      didUpdate && didUpdate(value);
    }
  })
}

/**
 * state container
 */
exports.state = state;