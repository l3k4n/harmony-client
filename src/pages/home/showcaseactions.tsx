import { useSpatialNavigationContext } from '@core/spatialnavigator/hooks';

export function ShowcaseActions() {
  let container: HTMLDivElement | undefined;
  const ctx = useSpatialNavigationContext('preview-actions', () => container!);

  ctx.on('navigationEnter', () => {
    return ctx.focusElement(
      ctx.getLastFocusedElement() ||
        (ctx.container().children[0] as HTMLElement),
    );
  });

  ctx.on('onDirection', (dir) => {
    const focused = ctx.getFocusedElement()!;

    switch (dir) {
      case 'left':
        return ctx.focusElement(
          focused.previousElementSibling as HTMLElement | null,
        );
      case 'right':
        return ctx.focusElement(
          focused.nextElementSibling as HTMLElement | null,
        );
      default:
        return false;
    }
  });

  return (
    <div class="preview-body-actions" ref={container}>
      <a href="/details">Play</a>
      <button type="button">More Info</button>
    </div>
  );
}
