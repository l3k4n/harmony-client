import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import App from './App.tsx'
import Detail from './Detail.tsx'
import SpatialNavigator from "./lib/spatialnavigator"
import { SpatialNavigationInput } from './lib/spatialnavigator/types.ts'
import './index.css'

render(() => (
  <Router>
    <Route path="/home" component={App} />
    <Route path="/detail/:id" component={Detail} />
  </Router>
), document.getElementById('root')!);

const keydown_map: Record<string, SpatialNavigationInput> = {
  "ArrowUp": "up",
  "ArrowDown": "down",
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "Enter": "enter",
  "Backspace": "back",
}

window.addEventListener('keydown', (event) => {
  const nav_event = keydown_map[event.key];
  if (nav_event) {
    SpatialNavigator.dispatchNavigationEvent(nav_event);
  }
});

window.addEventListener("unhandledSpatialInput", () => {
  console.log("Play earcon for unhandled spatial input");
});
