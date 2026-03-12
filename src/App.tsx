import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import WithLoader, { PageLoader } from '@components/loader';
import SpatialNavigator from '@core/spatialnavigator';
import type { SpatialNavigationInput } from '@core/spatialnavigator/types';
import Home from '@pages/home';
import Details from '@pages/details';
import Watch from '@pages/watch';
import { initialAppDataLoaded } from '@resources/initialAppData';
import { PageRoot, WithNav, WithoutNav } from './pagetemplate';
import './App.css';

render(
  () => (
    <WithLoader
      name="loader-transition"
      done={initialAppDataLoaded}
      loader={PageLoader}
    >
      <Router root={PageRoot}>
        <Route component={WithNav}>
          <Route path="/" component={Home} />
          <Route path="/details/:id" component={Details} />
        </Route>
        <Route component={WithoutNav}>
          <Route path="/watch/:id" component={Watch} />
        </Route>
      </Router>
    </WithLoader>
  ),
  document.getElementById('root')!,
);

if (import.meta.env.VITE_TARGET_TV) {
  const keydown_map: Record<string, SpatialNavigationInput> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    Enter: 'enter',
    ' ': 'enter',
    Backspace: 'back',
  };

  window.addEventListener('keydown', (event) => {
    const nav_event = keydown_map[event.key];
    if (nav_event) {
      event.preventDefault();
      SpatialNavigator.dispatchNavigationEvent(nav_event);
    }
  });

  window.addEventListener('unhandledSpatialInput', () => {
    console.log('Play earcon for unhandled spatial input');
  });
}
