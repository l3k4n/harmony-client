import type { Accessor, Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import { Transition } from 'solid-transition-group';
import './style.css';

interface WithLoaderProps {
  name: string;
  done: Accessor<boolean>;
  loader: Component;
  children: JSX.Element;
}

export default function WithLoader(props: WithLoaderProps) {
  return (
    <Transition name={props.name}>
      <Show
        when={props.done()}
        fallback={<props.loader />}
        children={props.children}
      />
    </Transition>
  );
}

export function PageLoader() {
  return (
    <div class="loader-wrapper">
      <div class="loader">
        <div class="logo">
          <span>Harm</span>
          <div class="blob"></div>
          <span>ny</span>
        </div>
        <div class="slider">
          <div class="bar"></div>
        </div>
      </div>
    </div>
  );
}
