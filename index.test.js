const { init, state } = require('./index');

init({
  name: 'time',
  defaultValue: new Date().getTime(),
  willReceive: (value) => {
    console.log('willReceive time', value);
  },
  willUpdate: (previous, next) => {
    console.log('willUpdate', previous, next);
  },
  didUpdate: (value) => {
    console.log('didUpdate', value);
  }
});

setTimeout(() => {
  var time = state.time;
}, 2000);

setTimeout(() => {
  state.time = new Date().getTime();
}, 4000);