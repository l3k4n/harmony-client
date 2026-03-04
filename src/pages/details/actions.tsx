import { onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useActiveSpatialNavigationContext, useSpatialNavigationContext } from '@core/spatialnavigator/hooks';

export function DetailsActions(props: { id: string, is_series: boolean }) {
	const [_, setActiveContext] = useActiveSpatialNavigationContext();
	const navigate = useNavigate();

	let container: HTMLDivElement | undefined;
	const ctx = useSpatialNavigationContext('details-actions', () => container!);

	ctx.on('navigationEnter', () => {
		return ctx.focusElement(
			ctx.getLastFocusedElement() ||
			(ctx.container().children[0] as HTMLElement),
		);
	});

	ctx.on('onDirection', (dir) => {
		const focused = ctx.getFocusedElement()!;

		switch (dir) {
			case 'up':
				return ctx.focusElement(
					focused.previousElementSibling as HTMLElement | null,
				);
			case 'down':
				return ctx.focusElement(
					focused.nextElementSibling as HTMLElement | null,
				);
			default:
				return false;
		}
	});

	onMount(() => setActiveContext('details-actions'));

	return (
		<div class="details-actions" ref={container}>
			<button type="button" onclick={() => navigate(`/watch/${props.id}`)} >Play</button>
			<Show when={props.is_series}>
				<button type="button">
					Episodes
				</button>
				<button type="button">Follow series</button>
			</Show>
			<button type="button">Add to watchlist</button>
			<button type="button">Trailers</button>
		</div>
	);
}
