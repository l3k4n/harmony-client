import type { RouteSectionProps } from '@solidjs/router';
import { Transition } from 'solid-transition-group';
import { A } from '@solidjs/router';

// NOTE:
// page with nav was separated from pages without becuase, when switching
// between pages, adding and removing the nav caused the page layout to shift around

export function PageRoot(props: RouteSectionProps) {
  return <Transition name="page-transition" mode="outin" children={props.children} />;
}

export function WithNav(props: RouteSectionProps) {
  return (
    <div class="page">
      <nav>
        <A href="/" textContent={1} />
        <A href="/details/a" textContent={2} />
        <A href="/watch/a" textContent={3} />
      </nav>
      <main>
        <Transition name="page-transition">{props.children}</Transition>
      </main>
    </div>
  );
}

export function WithoutNav(props: RouteSectionProps) {
  return (
    <div class="page">
      <main>
        <Transition name="route-transition">{props.children}</Transition>
      </main>
    </div>
  );
}
