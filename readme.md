# jetstate

[![NPM](https://nodei.co/npm/jetstate.png)](https://nodei.co/npm/jetstate/)

[![install size](https://packagephobia.now.sh/badge?p=jetstate)](https://packagephobia.now.sh/result?p=jetstate) [![dependencies](https://david-dm.org/uxitten/jetstate.svg)](https://david-dm.org/uxitten/jetstate.svg)


<a href="https://www.npmjs.com/package/jetstate">
  <img src="https://img.shields.io/npm/v/jetstate.svg" alt="Version">
</a>

<a href="https://www.npmjs.com/package/jetstate">
  <img src="https://img.shields.io/npm/l/jetstate.svg" alt="License">
</a>

<a href="https://www.npmjs.com/package/jetstate">
  <img src="https://img.shields.io/npm/dm/jetstate.svg" alt="Downloads">
</a>

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