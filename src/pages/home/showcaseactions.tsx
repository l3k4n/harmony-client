import type { Accessor } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useSpatialNavigationContext } from '@core/spatialnavigator/hooks';

export function ShowcaseActions(props: { id: Accessor<string> }) {
  let container: HTMLDivElement | undefined;
  const ctx = useSpatialNavigationContext('preview-actions', () => container!);
  const navigate = useNavigate();

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

  ctx.on('onAction', (action) => {
    if (action != "enter") return false;
    ctx.getFocusedElement()!.click();
    return true;
  });

  return (
    <div class="preview-body-actions" ref={container}>
      <button type="button" onclick={() => navigate(`/watch/${props.id()}`)}>
        Play
      </button>
      <button type="button" onclick={() => navigate(`/details/${props.id()}`)}>
        More Info
      </button>
    </div>
  );
}
