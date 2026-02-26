import { onMount } from 'solid-js';
import { render } from 'solid-js/web'
import type { RouteSectionProps } from '@solidjs/router'
import { Router, Route, A } from '@solidjs/router'
import SpatialNavigator from '@core/spatialnavigator';
import { useActiveSpatialNavigationContext } from '@core/spatialnavigator/hooks';
import type { SpatialNavigationInput } from '@core/spatialnavigator/types';
import Home from '@pages/home'
import './App.css'

function App(props: RouteSectionProps) {
  const [_, setActiveContext] = useActiveSpatialNavigationContext();
  // set default navigation context
  onMount(() => setActiveContext("preview-actions"));

  return (
    <div class="page">
      <nav>
        <A href="/home" textContent={1} />
        <A href="/search" textContent={2} />
        <A href="/other" textContent={3} />
      </nav>
      <main>{props.children}</main>
    </div>
  );
}

render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
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
  if (nav_event) SpatialNavigator.dispatchNavigationEvent(nav_event);

});

window.addEventListener("unhandledSpatialInput", () => {
  console.log("Play earcon for unhandled spatial input");
});
