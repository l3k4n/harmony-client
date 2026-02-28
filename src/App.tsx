import { createResource, createSignal, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import type { RouteSectionProps } from '@solidjs/router';
import { Router, Route, A } from '@solidjs/router';
import { FetchCategoryList, FetchShowcaseList } from '@api/media';
import WithLoader, { PageLoader } from '@components/loader';
import SpatialNavigator from '@core/spatialnavigator';
import { useActiveSpatialNavigationContext } from '@core/spatialnavigator/hooks';
import type { SpatialNavigationInput } from '@core/spatialnavigator/types';
import Home from '@pages/home';
import './App.css';

function App(props: RouteSectionProps) {
  // set default navigation context
  const [_, setActiveContext] = useActiveSpatialNavigationContext();
  onMount(() => setActiveContext('preview-actions'));

  return (
    <div class="page">
      <nav>
        <A href="/" textContent={1} />
        <A href="/search" textContent={2} />
        <A href="/other" textContent={3} />
      </nav>
      <main>{props.children}</main>
    </div>
  );
}

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
      <Router root={App}>
        <Route
          path="/"
          component={() => (
            <Home
              showcaseList={showcaseList()!}
              categoryList={categoryList()!}
            />
          )}
        />
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
