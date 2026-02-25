import { createSignal, For, onMount } from 'solid-js';
import { A } from '@solidjs/router'
import { useActiveSpatialNavigationContext, useSpatialNavigationContext } from '@/lib/spatialnavigator/hooks';
import ScrollableContainer from './components/scrollablecontainer';
import { featuredShows, shows } from './tmp_data';
import "./App.css"
import "./App.focused.css"

function PreviewActions() {
  let container: HTMLDivElement | undefined;
  const ctx = useSpatialNavigationContext("preview-actions", () => container!);

  ctx.on("navigationEnter", () => {
    return ctx.focusElement(ctx.getLastFocusedElement() || ctx.container().children[0] as HTMLElement);
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
  const [pos, setPos] = createSignal(0);

  const preview_mode = () => activeContext() == "preview-actions" ? "showcase" : "brief";
  const set_fn = (e: HTMLElement) => setPos(-e.offsetTop);

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
      <main data-preview-mode={preview_mode()}>
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
          <ScrollableContainer pos={pos} class="row-item-list" horizontal={false}>
            <For each={Array.from({ length: 4 })} children={(_, i) => <Row key={i()} set={set_fn} />} />
          </ScrollableContainer>
        </div>
      </main>
    </div>
  )
}

function Row(props: { key: number, set: (e: HTMLElement) => void; }) {
  let row_container: HTMLDivElement | undefined;
  let scroll_container: HTMLElement | undefined;
  const ctx = useSpatialNavigationContext(props.key.toString(), () => scroll_container!);
  const [scrollPos, setScrollPos] = createSignal(0);

  const updateFocusedElement = (next?: HTMLElement | null) => {
    if (!next) return false;
    setScrollPos(-next.offsetLeft);
    props.set(row_container!);
    return ctx.focusElement(next);
  }

  ctx.on("navigationEnter", () => updateFocusedElement(
    ctx.getLastFocusedElement() || ctx.container().children[0] as HTMLElement
  ));

  ctx.on("onDirection", (dir) => {
    const focused = ctx.getFocusedElement()!;
    switch (dir) {
      case "left": return updateFocusedElement(focused.previousElementSibling as HTMLElement | undefined);
      case "right": return updateFocusedElement(focused.nextElementSibling as HTMLElement | undefined);
      default: return false;
    }
  });

  return (
    <div class="row" ref={row_container}>
      <h3>Trending</h3>
      <ScrollableContainer pos={scrollPos} class="row-item-list" ref={scroll_container} horizontal={true}>
        <For each={shows} children={(i) => <div class="row-item"><img src={i.image} /></div>} />
      </ScrollableContainer>
    </div>
  )
}
export default App;
