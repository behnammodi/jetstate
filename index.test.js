const { init, state } = require('./index');

init({
  name: 'time',
  defaultValue: new Date().getTime(),
  willReceive: value => {
    console.log('willReceive time', value);
  },
  willUpdate: (previousValue, nextValue) => {
    console.log('willUpdate', previousValue, nextValue);
  },
  didUpdate: value => {
    console.log('didUpdate', value);
  }
});

setTimeout(() => {
  var time = state.time;
}, 2000);

setTimeout(() => {
  state.time = new Date().getTime();
}, 4000);