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
var time=init({
  name: 'time',
  defaultValue: {
    minutes:new Date().getMinutes(),
    hours:new Date().getHours()
  },
  willReceive: value => {
    console.log('willReceive time', value);
  },
  willUpdate: (previousValue, nextValue) => {
    console.log('willUpdate', previousValue, nextValue);
  },
  shouldUpdate: (previousValue, nextValue) => {
    if (typeof nextValue 'object') return true;
    else return false
  },
  didUpdate: value => {
    console.log('didUpdate', value);
  }
});
..
// with this code, willReceive is run
state.time;
// or
time.get();
// return {hours,minutes}
..
// you can get an item
time.get("hours");
// return hours
..

//with this code, willUpdate is run and then all added didUpdate is run
state.time = {minutes:new Date().getMinutes()};
//or
time.set({minutes:new Date().getMinutes()})
//now state time is {hours,minutes}
..
// you can remove an item
time.remove("hours");
// return {minutes}
```

## change inited

```javascript
// change willReceive
time.willReceive=function(value){
  console.log('new will receive', value);
}

..
// add another didUpdate
time.addDidUpdate=function(value){
  console.log('second didUpdate', value);
}
//when set state all added didUpdate is run
```
