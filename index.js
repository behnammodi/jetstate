'use strict';

exports.__esModule = true;
var state = {
  __container__: {}
};

/**
 * @description init new state
 * @public
 * @version 1.3.0
 * @param {object} config
 * @param {string} config.name name state
 * @param {any} config.defaultValue default value
 * @param {function} config.willUpdate function for before set state
 * @param {function} config.shouldUpdate function for is need update
 * @param {function} config.didUpdate function for after set state
 * @returns {undefined} nothing
 */
exports.init = function init(config) {
  state.__container__[config.name] = config.defaultValue;
  Object.defineProperty(state, config.name, {
    get: function get() {
      return state.__container__[config.name];
    },
    set: function set(value) {
      if (config.shouldUpdate)
        if (
          config.shouldUpdate(state.__container__[config.name], value) === false
        )
          return;

      config.willUpdate &&
        config.willUpdate(state.__container__[config.name], value);
      state.__container__[config.name] = value;
      config.didUpdate && config.didUpdate(value);
    }
  });
};

/**
 * @description state container
 * @public
 * @version 1.2.0
 */
exports.state = state;
