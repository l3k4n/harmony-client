import { createSignal, onCleanup, onMount } from "solid-js";
import { Registry, SpatialNavigationContext } from "./context";

export function useSpatialNavigationContext(name: string, container: () => HTMLElement) {
  const ctx = new SpatialNavigationContext(name, container);
  Registry.register(name, ctx);
  onCleanup(() => {
    // TODO: find next focus target
    // TODO: remove context from registry
  });
  return ctx;
}

type ActiveContextSignal = [() => string | null, (name: string) => void]
export function useActiveSpatialNavigationContext(): ActiveContextSignal {
  const [get, set] = createSignal<string | null>(null);
  const handler = (name: string) => set(name);

  Registry.addContextChangeEvent(handler);
  onCleanup(() => Registry.removeContextChangeEvent(handler));

  const setActiveContext = (name: string) => {
    const ctx = Registry.context(name);
    if (ctx) Registry.setActiveContext(ctx);
  }

  return [get, setActiveContext];
}

