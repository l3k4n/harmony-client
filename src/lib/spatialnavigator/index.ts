import type { SpatialNavigationInput } from "./types";
import { Registry } from "./context";

function dispatchNavigationEvent(ev: SpatialNavigationInput) {
  const ctx = Registry.getActiveContext();
  if (!ctx) return;

  switch (ev) {
    case "enter":
    case "back":
      ctx.dispatch("onAction", ev);
      break;
    default:
      ctx.dispatch("onDirection", ev);
  }
}

export default {
  dispatchNavigationEvent,
};
