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
 * @param {function} config.shouldUpdate function for is need update
 * @param {function} config.didUpdate function for after set state
 * @returns {undefined} nothing
 */
exports.init = function init(config) {
  state.__container__[config.name] = config.defaultValue;
  Object.defineProperty(state, config.name, {
    get: function get() {
      config.willReceive && config.willReceive(state.__container__[config.name]);
      return state.__container__[config.name];
    },
    set: function set(value) {
      config.willUpdate && config.willUpdate(state.__container__[config.name], value);
      if (config.shouldUpdate)
        if (config.shouldUpdate(state.__container__[config.name], value) === false) return;
      state.__container__[config.name] = value;
      config.didUpdate && config.didUpdate(value);
    }
  });
}

/**
 * state container
 */
exports.state = state;