import type { Accessor, JSX } from 'solid-js';
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
