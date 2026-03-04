import { createSignal, For, onMount, Show } from 'solid-js';
import format from '@api/format';
import { useActiveSpatialNavigationContext } from '@core/spatialnavigator/hooks';
import { categoryList, showcaseList } from '@resources/initialAppData';
import { Gallery } from './gallery';
import { ShowcaseActions } from './showcaseactions';
import './style.css';

export default function Home() {
  const [previewData] = createSignal(showcaseList()![0]);
  const [activeContext, setActiveContext] = useActiveSpatialNavigationContext();

  // set default navigation context
  onMount(() => setActiveContext('preview-actions'));

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
          <li>{format.realease_year(previewData())}</li>
          <Show when={previewData().is_movie}>
            <li>{format.runtime(previewData().movie!)}</li>
          </Show>
          <Show when={!previewData().is_movie}>
            <li>{format.num_season_episodes(previewData().series!)}</li>
          </Show>
          <For each={previewData().genres}>
            {(g) => <li data-genre>{g}</li>}
          </For>
        </ul>
        <p class="preview-body-desc">{previewData().description}</p>
        <ShowcaseActions />
      </div>

      <Gallery categories={categoryList()!} />
    </section>
  );
}
