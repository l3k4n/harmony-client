import { SpatialDirection, SpatialNavigationEventMap } from "./types";

class SpatialNavigationContextRegistry {
  #internal_active_ctx: string | null = null;
  #context_map = new Map<string, SpatialNavigationContext>();
  #context_change_listeners = new Set<(name: string) => void>();

  addContextChangeEvent(cb: (name: string) => void) {
    this.#context_change_listeners.add(cb);
  }

  removeContextChangeEvent(cb: (name: string) => void) {
    this.#context_change_listeners.delete(cb);
  }

  isActive(name: string) {
    return this.#internal_active_ctx == name;
  }

  hasActiveContext() {
    return !!this.#internal_active_ctx;
  }

  getActiveContext(): SpatialNavigationContext | null {
    return this.context(this.#internal_active_ctx!);
  }

  setActiveContext(ctx: SpatialNavigationContext) {
    if (ctx.name() == this.#internal_active_ctx) return;

    if (this.#internal_active_ctx) {
      // release old context
      this.#context_map.get(this.#internal_active_ctx)!.dispatch("navigationExit", null);
    }

    // activate new context
    this.#internal_active_ctx = ctx.name();
    ctx.dispatch("navigationEnter", null);
    this.#context_change_listeners.forEach((cb) => cb(ctx.name()));
  }

  register(name: string, ctx: SpatialNavigationContext) {
    if (this.#context_map.has(name)) {
      console.warn(`duplicate spatial navigation context name '${name}'`);
      return;
    }

    this.#context_map.set(name, ctx);
  }

  context(name: string) {
    if (!this.#context_map.has(name)) return null;
    return this.#context_map.get(name)!;
  }

  findTarget(start: HTMLElement, dir: SpatialDirection) {
    let bestTarget = null;
    let minDistance = Infinity;

    const startBounds = start.getBoundingClientRect();

    for (const [_, ctx] of this.#context_map) {
      const targetEl = ctx.container();
      if (targetEl === start) continue;

      const targetBounds = targetEl.getBoundingClientRect();
      let distance = Infinity;
      let inLane = false;

      switch (dir) {
        case "left":
          inLane = targetBounds.right <= startBounds.left && // Is to the left
            targetBounds.bottom > startBounds.top &&
            targetBounds.top < startBounds.bottom;
          distance = startBounds.left - targetBounds.right;
          break;

        case "right":
          inLane = targetBounds.left >= startBounds.right && // Is to the right
            targetBounds.bottom > startBounds.top &&
            targetBounds.top < startBounds.bottom;
          distance = targetBounds.left - startBounds.right;
          break;

        case "up":
          inLane = targetBounds.bottom <= startBounds.top &&
            targetBounds.right > startBounds.left &&
            targetBounds.left < startBounds.right;
          distance = startBounds.top - targetBounds.bottom;
          break;

        case "down":
          inLane = targetBounds.top >= startBounds.top &&
            targetBounds.right > startBounds.left &&
            targetBounds.left < startBounds.right;
          distance = targetBounds.top - startBounds.bottom;
          break;
      }

      if (inLane && distance >= 0 && distance < minDistance) {
        minDistance = distance;
        bestTarget = ctx;
      }
    }
    return bestTarget;
  }
};

export const Registry = new SpatialNavigationContextRegistry();

// Note: This implementation of spatial navigation has 2 main constraints:
// 1. The context container element *MUST* never collide with other contexts
// 2. The path from one context to another must intersect in the movement direction
// All in all for navigaiton to work properly contexts should intersect in at most 1 axis
export class SpatialNavigationContext {
  container: () => HTMLElement;
  name: () => string;
  #event_map: {
    [K in keyof SpatialNavigationEventMap]?: (data: SpatialNavigationEventMap[K]) => boolean;
  } = {};
  #last_focused_element: HTMLElement | null = null;

  constructor(name: string, container: () => HTMLElement) {
    this.name = () => name;
    this.container = container;
  }

  on<K extends keyof SpatialNavigationEventMap>(
    type: K,
    callback: (data: SpatialNavigationEventMap[K]) => boolean
  ): void {
    // @ts-ignore
    this.#event_map[type] = callback;
  }

  dispatch<K extends keyof SpatialNavigationEventMap>(
    type: K,
    data: SpatialNavigationEventMap[K]
  ): void {
    if (!this.#event_map[type]) return;

    if (type == "onDirection" || type == "onAction") {
      const focused = this.getFocusedElement();
      if (!focused || !this.container().contains(focused)) {
        console.warn(`SpatialEvent type '${type}' decayed to a 'navigationEnter' event,`
          + "because the context did not contain the focused element");
        this.#event_map["navigationEnter"]?.(null);
        return
      }
    }

    const event_handled = this.#event_map[type](data);
    if (event_handled) return;

    // handle when context fails to handle an event

    if (type == "onDirection") {
      const ctx = Registry.findTarget(this.container(), data as SpatialDirection);
      if (ctx) {
        Registry.setActiveContext(ctx);
        return;
      }
    }

    window.dispatchEvent(new Event("unhandledSpatialInput"))
  }

  removeAllEvents(): void {
    this.#event_map = {};
  }

  focusElement(element?: HTMLElement | null): boolean {
    if (!element) return false;
    // context is not focused
    if (!Registry.isActive(this.name())) return false;
    // prevent focus leaving context
    if (!this.container().contains(element)) return false;

    const prev = document.querySelector("[spatial-focus]")
    if (prev) prev.removeAttribute("spatial-focus");

    element.focus();
    element.setAttribute("spatial-focus", "");
    this.#last_focused_element = element;
    return true
  }

  getFocusedElement() {
    return this.container().querySelector("[spatial-focus]") as HTMLElement | null;
  }

  getLastFocusedElement() {
    return this.#last_focused_element;
  }
}
