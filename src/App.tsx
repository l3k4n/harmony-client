import { createResource, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import { FetchCategoryList, FetchShowcaseList } from '@api/media';
import WithLoader, { PageLoader } from '@components/loader';
import SpatialNavigator from '@core/spatialnavigator';
import type { SpatialNavigationInput } from '@core/spatialnavigator/types';
import Home from '@pages/home';
import Details from '@pages/details';
import Watch from '@pages/watch';
import { PageRoot, WithNav, WithoutNav } from './pagetemplate';
import './App.css';

const [showcaseList] = createResource(async () => {
  const res = await FetchShowcaseList();
  if (!res.success) throw new Error(res.err);
  return res.data;
});

const [categoryList] = createResource(async () => {
  const res = await FetchCategoryList();
  if (!res.success) throw new Error(res.err);
  return res.data;
});

const [s, m] = createSignal(false);
setTimeout(() => m(true), 1000);
const ready = () => !showcaseList.loading && !categoryList.loading && s();

render(
  () => (
    <WithLoader name="loader-transition" done={ready} loader={PageLoader}>
      <Router root={PageRoot}>
        <Route component={WithNav}>
          <Route
            path="/"
            component={() => (
              <Home
                showcaseList={showcaseList()!}
                categoryList={categoryList()!}
              />
            )}
          />
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

const keydown_map: Record<string, SpatialNavigationInput> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'enter',
  Backspace: 'back',
};

window.addEventListener('keydown', (event) => {
  const nav_event = keydown_map[event.key];
  if (nav_event) SpatialNavigator.dispatchNavigationEvent(nav_event);
});

window.addEventListener('unhandledSpatialInput', () => {
  console.log('Play earcon for unhandled spatial input');
});
