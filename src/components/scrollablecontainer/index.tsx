import type { Accessor, JSX } from 'solid-js';
import { batch, onMount, Index, createSignal, createEffect, on, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import './style.css';

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

interface ScrollableContainerProps2<T> {
  ref?: HTMLElement | ((el: HTMLElement) => void) | undefined;
  enable_scrollbars?: boolean;
  horizontal: boolean;
  pos: Accessor<number>;

  each?: T[];
  children: (item: T) => JSX.Element;
}

export function ScrollableContainer2<T>(_: ScrollableContainerProps2<T>) {
  const CARD_WIDTH = 200;
  const CARD_GAP = 16;
  const FULL_WIDTH = CARD_WIDTH + CARD_GAP;
  const DATASET_SIZE = 20; // The "virtual" length (1 to 100)
  const VISIBLE_WINDOW_SIZE = 12;     // The number of physical DOM nodes
  const CYCLE_WIDTH = FULL_WIDTH * DATASET_SIZE;

  function createTween(target: () => number, { ease = (t: number) => t, duration = 100 }): () => number {
    const [current, setCurrent] = createSignal(target());
    let start: number;
    let startValue: number;
    let delta: number;
    let cancelId: number;

    function tick(t: number) {
      const elapsed = t - start;

      if (elapsed < duration) {
        setCurrent(startValue + ease(elapsed / duration) * delta);
        cancelId = requestAnimationFrame(tick);
      } else {
        setCurrent(target());
      }
    }

    createEffect(
      on(
        target,
        () => {
          start = performance.now();
          startValue = current();
          delta = target() - startValue;
          cancelId = requestAnimationFrame(tick);
          onCleanup(() => cancelAnimationFrame(cancelId));
        },
        { defer: true },
      ),
    );

    return current;
  }


  const [scrollX, setScrollX] = createSignal(0);
  const tweenedScrollX = createTween(scrollX, {
    duration: 500,
    ease: (t) => 0.5 - Math.cos(Math.PI * t) / 2
  });
  const [data, setData] = createStore(
    Array.from({ length: VISIBLE_WINDOW_SIZE }).map((_, i) => ({ text: i + 1 }))
  );

  let container: HTMLDivElement | undefined;
  let track: HTMLDivElement | undefined;
  let startCardIdx = 0;

  const run = (delta: number) => {
    batch(() => {
      const scrollCycleOffset = Math.max(0, (scrollX() + delta) % CYCLE_WIDTH);
      const prevStartCardIdx = Math.floor(scrollCycleOffset / FULL_WIDTH);

      setScrollX(scrollCycleOffset);

      // only update the list items if start index changes
      if (prevStartCardIdx != startCardIdx) {
        startCardIdx = prevStartCardIdx;

        for (let i = 0; i < VISIBLE_WINDOW_SIZE; i++) {
          setData(i, "text", ((startCardIdx + i) % DATASET_SIZE) + 1);
        }
      }
    })
  }

  onMount(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // window.requestAnimationFrame(() => run(e.deltaX));
    };

    window.onkeydown = (e) => {
      if (e.key == "ArrowRight") run(FULL_WIDTH);
      if (e.key == "ArrowLeft") run(-FULL_WIDTH);
    }
  });

  return (
    <div class="h-[200px] bg-gray-100 overflow-hidden relative">
      <div ref={container} class="master-stage">
        <div ref={track} class="virtual-track" style={{ transform: `translateX(${-tweenedScrollX() % FULL_WIDTH}px)` }}>
          <Index
            each={data}
            children={(item) => <div class="card">Explorer #{item().text}</div>}
          />
        </div>
      </div>
    </div>
  );
}
