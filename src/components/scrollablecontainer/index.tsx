import type { Accessor, JSX } from 'solid-js';
import { createSignal, Index, onMount } from 'solid-js';
import './style.css';
import { useSpatialNavigationContext } from '@core/spatialnavigator/hooks';

interface ScrollableContainerProps {
  ref?: HTMLElement | ((el: HTMLElement) => void) | undefined;
  enable_scrollbars?: boolean;
  horizontal: boolean;
  children: JSX.Element;
  pos: Accessor<number>;
}

export default function ScrollableContainer(props: ScrollableContainerProps) {
  const axis = props.horizontal ? 'X' : 'Y';

  return (
    <div
      class="scroll-container-wrapper"
      style={props.enable_scrollbars ? 'overflow: auto;' : ''}
    >
      <div
        ref={props.ref as HTMLDivElement}
        class="scroll-container"
        children={props.children}
        style={{
          'flex-direction': props.horizontal ? 'row' : 'column',
          transform: `translate${axis}(${props.pos()}px)`,
        }}
      />
    </div>
  );
}

interface SpatialNavigationGalleryRowProps<T> {
  each: T[];
  start_index: number;
  visible_window: number;
  spatial_name: string;
  on_focus?: (item: T) => void;
  on_click?: (item: T) => void;
  children: (item: T) => JSX.Element;
}

export function TvInfiniteGalleryRow<T>(props: SpatialNavigationGalleryRowProps<T>) {
  // adds `OVERFLOW` items out of view, before and after all items,
  // so the list never removes from the visible window
  const OVERFLOW = 1;

  let row: HTMLDivElement | undefined;
  const [currentIndex, setCurrentIndex] = createSignal(props.start_index);
  const [itemSize, setItemSize] = createSignal(0);

  onMount(() => {
    // assuming every item has the same size
    const el = get_element_ref(0);
    setItemSize(el?.getBoundingClientRect()?.width || 0);
  })

  const get_virtual_index = (pos: number) => {
    return currentIndex() - OVERFLOW + pos;
  }

  const get_scroll_offset_percent = () => (currentIndex() - 1) * 100;
  const get_track_scroll_offset_percent = () => -currentIndex() * itemSize();

  const get_item_index = (pos: number) => {
    const len = props.each.length;
    return ((get_virtual_index(pos) % len) + len) % len;
  }

  const get_element_ref = (pos: number) => {
    return (row!.firstChild! as HTMLElement).children.item(pos) as HTMLElement | null;
  }

  const first_index_active = () => {
    return get_item_index(0) == (props.each.length - OVERFLOW) % props.each.length
  }

  const ctx = useSpatialNavigationContext(props.spatial_name, () => row!);

  ctx.on('navigationEnter', () => ctx.focusElement(get_element_ref(0 + OVERFLOW)));

  ctx.on('onDirection', (dir) => {
    if (dir != "left" && dir != "right") return false;
    if (dir == "left" && first_index_active()) return false;
    setCurrentIndex(currentIndex() + (dir == "left" ? -1 : 1));
    props.on_focus?.(props.each[get_item_index(0 + OVERFLOW)])
    return true;
  });

  ctx.on('onAction', (action) => {
    if (action == 'enter' && props.on_click) {
      props.on_click(props.each[get_item_index(0 + OVERFLOW)]);
      return true;
    }

    return false;
  })

  // never updates, only exists so solid creates the right number of nodes
  const indices = Array.from({ length: props.visible_window + (OVERFLOW * 2) });

  return (
    <div class="tv-gallery-row" ref={row}>
      <div
        class="tv-gallery-row-track"
        style={{ transform: `translateX(${get_track_scroll_offset_percent()}px)` }}
        children={
          <Index each={indices}>
            {(_, i) => (
              <button
                type="button"
                class="tv-gallery-row-item"
                style={{ transform: `translateX(${get_scroll_offset_percent()}%)` }}
                children={props.children(props.each[get_item_index(i)])}
              />
            )}
          </Index>
        }
      />
      <div class="active-item-indicator" />
    </div>
  );
}
