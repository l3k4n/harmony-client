import { Accessor, JSX } from "solid-js";
import "./style.css"

interface ScrollableContainerProps {
  ref?: HTMLElement | ((el: HTMLElement) => void) | undefined
  horizontal: boolean;
  children: JSX.Element;
  pos: Accessor<number>;
}

export default function ScrollableContainer(props: ScrollableContainerProps) {
  const axis = props.horizontal ? "X" : "Y";

  return (
    <div class="scroll-container-wrapper">
      <div
        ref={props.ref as HTMLDivElement}
        class="scroll-container" 
        children={props.children}
        style={{
          "grid-auto-flow": props.horizontal ? "column" : "row",
          "transform": `translate${axis}(${props.pos()}px)`
        }}
      />
    </div>
  )
}
