import { createEffect, createSignal, For, onMount } from 'solid-js';
import { A } from '@solidjs/router'
import { useActiveSpatialNavigationContext, useSpatialNavigationContext } from './lib/spatialnavigator/hooks';
import { featuredShows } from './tmp_data';
import "./App.css"
import "./App.focused.css"

function PreviewActions() {
  let container: HTMLDivElement | undefined;
  const ctx = useSpatialNavigationContext("preview-actions", () => container!);

  ctx.on("navigationEnter", () => {
    ctx.focusElement(ctx.getLastFocusedElement() || ctx.container().children[0] as HTMLElement);
    return true;
  });

  ctx.on("onDirection", (dir) => {
    const focused = ctx.getFocusedElement()!;

    switch (dir) {
      case "left":
        return ctx.focusElement(focused.previousElementSibling as HTMLElement | null);
      case "right":
        return ctx.focusElement(focused.nextElementSibling as HTMLElement | null);
      default:
        return false;
    }
  });

  return (
    <div class="preview-body-actions" ref={container}>
      <a>Play</a>
      <button>More Info</button>
    </div>
  );
}

function App() {
  const [activeContext, setActiveContext] = useActiveSpatialNavigationContext();

  createEffect(() => {
    console.log("active context changed", activeContext());
  })

  // set default navigation context
  onMount(() => setActiveContext("preview-actions"));

  const hero = featuredShows[0];

  return (
    <div class="app">
      <nav>
        <A href="/home">1</A>
        <A href="/search">2</A>
        <A href="/other">3</A>
      </nav>
      <main data-preview-media-rows={activeContext() && activeContext() != "preview-actions"}>
        <img class="preview-bg-img" src={hero.backdrop} />
        <div class="preview-bg-overlay" />

        <div class="preview-body">
          <h1 class="preview-body-title">{hero.title}</h1>
          <ul class="preview-body-tags">
            <li>2004</li>
            <li>1h 30m</li>
            <li>4K</li>
            <li>TV-PG</li>
            <li>12 Seasons</li>
            <li data-genre>Action</li>
            <li data-genre>Adventure</li>
          </ul>
          <p class="preview-body-desc">{hero.description}</p>
          <PreviewActions />
        </div>

        <div class="media-rows">
          <For each={Array.from({ length: 4 })} children={(_, i) => <Row key={i()} />} />
        </div>
      </main>
    </div>
  )
}

function RowItem() {
  return (
    <div class="row-item">
      <img src="https://picsum.photos/seed/movie1/400/600" />
    </div>
  )
}

function Row(props: { key: number }) {
  let container: HTMLTableRowElement | undefined;
  const ctx = useSpatialNavigationContext("row" + props.key, () => container!);
  const [focusedIndex, setFocusedIndex] = createSignal(0);

  const focusRowItemElement = (element: HTMLElement | null) => {
    if (!element || !ctx.focusElement(element)) return false;
    const idx = Array.from(container!.children).indexOf(element);
    setFocusedIndex(idx);
    return true;
  }

  ctx.on("onDirection", (dir) => {
    const focused = ctx.getFocusedElement()!;

    switch (dir) {
      case "left":
        return focusRowItemElement(focused.previousElementSibling as HTMLElement | null);
      case "right":
        return focusRowItemElement(focused.nextElementSibling as HTMLElement | null);
      default:
        return false;
    }
  });

  ctx.on("navigationEnter", () => {
    return focusRowItemElement(container!.children.item(focusedIndex()) as HTMLElement | null);
  });

  createEffect(() => {
    focusRowItemElement(container!.children.item(focusedIndex()) as HTMLElement | null);
  });

  return (
    <div class="row">
      <h3>Trending</h3>
      <div class="row-item-list" ref={container} style={{ "--focused-index": focusedIndex() }}>
        <For each={Array.from({ length: 20 })} children={() => <RowItem />} />
      </div>
    </div>
  )
}
export default App;
