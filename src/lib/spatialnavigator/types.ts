export type SpatialDirection = "up" | "down" | "left" | "right";

export type SpatialAction = "enter" | "back"

export type SpatialNavigationInput = SpatialDirection | SpatialAction;

export interface SpatialNavigationEventMap {
  "navigationEnter": null;
  "navigationExit": null;
  "onDirection": SpatialDirection;
  "onAction": SpatialAction;
}
