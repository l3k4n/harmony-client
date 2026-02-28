import { For, createSignal } from 'solid-js';
import type { Media } from '@api/types';
import ScrollableContainer from '@components/scrollablecontainer';
import { useSpatialNavigationContext } from '@core/spatialnavigator/hooks';

interface GalleryProps {
  categories: Media.Category[]
}

export function Gallery(props: GalleryProps) {
  const [pos, setPos] = createSignal(0);
  const scrollTo = (e: HTMLElement) => setPos(-e.offsetTop);

  return (
    <div class="gallery">
      <ScrollableContainer pos={pos} horizontal={false}>
        <For each={props.categories}>
          {(c) => <GalleryRow category={c} focusElement={scrollTo} />}
        </For>
      </ScrollableContainer>
    </div>
  );
}

interface GalleryRowProps {
  category: Media.Category,
  focusElement: (e: HTMLElement) => void;
}

export function GalleryRow(props: GalleryRowProps) {
  let row_container: HTMLDivElement | undefined;
  let scroll_container: HTMLElement | undefined;
  const ctx = useSpatialNavigationContext(
    `gallery-row-${props.category.label}`,
    () => scroll_container!,
  );
  const [scrollPos, setScrollPos] = createSignal(0);

  const updateFocusedElement = (next?: HTMLElement | null) => {
    if (!next) return false;
    setScrollPos(-next.offsetLeft);
    props.focusElement(row_container!);
    return ctx.focusElement(next);
  };

  ctx.on('navigationEnter', () =>
    updateFocusedElement(
      ctx.getLastFocusedElement() ||
        (ctx.container().children[0] as HTMLElement),
    ),
  );

  ctx.on('onDirection', (dir) => {
    const focused = ctx.getFocusedElement()!;
    switch (dir) {
      case 'left':
        return updateFocusedElement(
          focused.previousElementSibling as HTMLElement | undefined,
        );
      case 'right':
        return updateFocusedElement(
          focused.nextElementSibling as HTMLElement | undefined,
        );
      default:
        return false;
    }
  });

  return (
    <div class="gallery-row" ref={row_container}>
      <h3>{props.category.label}</h3>
      <ScrollableContainer
        pos={scrollPos}
        ref={scroll_container}
        horizontal={true}
      >
        <For each={props.category.media}>
          {(m) => (
            <div class="gallery-row-item">
              <img alt="" src={m.poster_url} />
            </div>
          )}
        </For>
      </ScrollableContainer>
    </div>
  );
}
