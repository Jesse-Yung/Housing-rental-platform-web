import React from 'react'
import { render } from 'react-dom'
import App from './App'

const container = document.createElement('div')
container.id = 'application'
document.body.appendChild(container)
render(<App />, container)
