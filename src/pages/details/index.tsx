import { createResource, For, Show } from 'solid-js';
import './style.css';
import { FetchDetails } from '@api/media';
import format from '@api/format';
import WithLoader, { PageLoader } from '@components/loader';
import { DetailsActions } from './actions';
import { useParams } from '@solidjs/router';

export default function Details() {
	const params = useParams();
	const [details] = createResource(async () => {
		const res = await FetchDetails(params.id || '');
		if (!res.success) throw new Error(res.err);
		return res.data;
	});

	return (
		<WithLoader
			name="loader-transition"
			done={() => !details.loading}
			loader={PageLoader}
		>
			<section class="details-page">
				<img
					aria-label="bg image"
					class="bg-img"
					src={details()?.backdrop_url}
				/>
				<div class="bg-overlay" />

				<div class="preview-body">
					<h1 class="preview-body-title">{details()?.title}</h1>
					<ul class="preview-body-tags">
						<li>{format.realease_year(details()!)}</li>
						<li>{details()?.status}</li>
						<Show when={details()?.is_movie}>
							<li>{format.runtime(details()!.movie!)}</li>
						</Show>
						<Show when={!details()?.is_movie && details()?.series}>
							<li>{format.num_season_episodes(details()!.series!)}</li>
						</Show>
						<For each={details()?.genres}>{(g) => <li data-genre>{g}</li>}</For>
					</ul>
					<p class="preview-body-desc">{details()?.description}</p>
					<DetailsActions is_series={!details()?.is_movie} />
				</div>
			</section>
		</WithLoader>
	);
}
