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
  willUpdate: (previousValue, nextValue) => {
    console.log('willUpdate', previousValue, nextValue);
  },
  shouldUpdate: (previousValue, nextValue) => {
    if (typeof nextValue 'number') return true;
    else return false        
  },
  didUpdate: value => {
    console.log('didUpdate', value);
  }
});

var time = state.time;

//with this code, willUpdate is run and then didUpdate is run
state.time = new Date().getTime();
```