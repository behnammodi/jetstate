# jetstate
state managment

## install
```npm
npm i jetstate --save
```

## use
```javascript
import { init, state } from 'jetstate';

/**
 * initial new state
 */
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

// with this code, willReceive is run
var time = state.time;

//with this code, willUpdate is run and then didUpdate is run
state.time = new Date().getTime();
```