import React from 'react'
import ReactDOM from 'react-dom'
import { MyApp } from './MyApp'

let el = document.getElementById('main-js')
console.log('Hello World from page2 test -a main file!')

if (el) {
  ReactDOM.render(<MyApp />, el)
}
