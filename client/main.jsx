import React from 'react'
import ReactDOM from 'react-dom'
import Root from './config/root'

import './assets/scss/main.scss'
import './sw'


const target = document.getElementById('root')

ReactDOM.render(<Root />, target)
