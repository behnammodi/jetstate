const { init, state } = require('./index');

init({
  name: 'counter',
  defaultValue: 1,
  willReceive: value => {
    console.log('willReceive counter', value);
  },
  willUpdate: (previousValue, nextValue) => {
    console.log('willUpdate', previousValue, nextValue);
  },
  shouldUpdate: (previousValue, nextValue) => {
    console.log(
      'shouldUpdate',
      previousValue,
      nextValue,
      'result:',
      previousValue < nextValue
    );
    if (previousValue < nextValue) return true;
    else return false;
  },
  didUpdate: value => {
    console.log('didUpdate', value);
  }
});

setTimeout(() => {
  var counter = state.counter;
}, 2000);

setTimeout(() => {
  state.counter = 2;
}, 4000);

setTimeout(() => {
  state.counter = 0;
}, 6000);

setTimeout(() => {
  var counter = state.counter;
}, 8000);
