import { createSignal, For, Show } from 'solid-js';
import { useActiveSpatialNavigationContext } from '@core/spatialnavigator/hooks';
import type { Media } from '@api/types';
import { Gallery } from './gallery';
import { ShowcaseActions } from './showcaseactions';
import './style.css';

interface HomeProps {
 showcaseList: Media.Details[];
 categoryList: Media.Category[];
}

export default function Home(props: HomeProps) {
  const [previewData] = createSignal(props.showcaseList[0]);
  const [activeContext] = useActiveSpatialNavigationContext();

  const preview_mode = () => {
    return activeContext() == 'preview-actions' ? 'showcase' : 'brief';
  };

  return (
    <section class="home-page" data-preview-mode={preview_mode()}>
      <img
        aria-label="bg image"
        class="preview-bg-img"
        src={previewData().backdrop_url}
      />
      <div class="preview-bg-overlay" />

      <div class="preview-body">
        <h1 class="preview-body-title">{previewData().title}</h1>
        <ul class="preview-body-tags">
          <li>{format_year(previewData().release_date)}</li>
          <Show when={previewData().is_movie}>
            <li>{format_runtime(previewData().movie!.runtime_mins)}</li>
          </Show>
          <li>4K</li>
          <li>{previewData().is_movie ? "M" : "S"}</li>
          <li>TV-PG</li>
          <Show when={!previewData().is_movie}>
            <li>{format_season_episodes(previewData().series!)}</li>
          </Show>
          <For each={previewData().genres}>
            {(g) => <li data-genre>{g}</li>}
          </For>
        </ul>
        <p class="preview-body-desc">{previewData().description}</p>
        <ShowcaseActions />
      </div>

      <Gallery categories={props.categoryList} />
    </section>
  );
}

const format_year = (s: string) => {
  return s ? new Date(s).getFullYear() : "BAD_DATE";
}

const format_runtime = (r: number) => {
  const h = Math.floor(r / 60);
  const m = r % 60;

  if (h && m) return `${h}h ${m}m`;
  else if (h) return `${h}h`;
  else return `${m}m`;
}

const format_season_episodes = (s: Media.SeriesDetails) => {
  if (!s.mono_season) return `${s.seasons.length}`;
  return `${s.seasons.length ? s.seasons[0].episodes : 0} episodes`;
}
