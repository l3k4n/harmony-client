import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import App from './App.tsx'
import Detail from './Detail.tsx'
import './index.css'

const root = document.getElementById('root')

if (root) {
  render(() => (
    <Router>
      <Route path="/home" component={App} />
      <Route path="/detail/:id" component={Detail} />
    </Router>
  ), root)
}
