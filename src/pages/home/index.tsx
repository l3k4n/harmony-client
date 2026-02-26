import { createSignal } from 'solid-js';
import { useActiveSpatialNavigationContext } from '@core/spatialnavigator/hooks';
import type { Show } from '@core/tmp_data';
import { featuredShows } from '@core/tmp_data';
import { Gallery } from './gallery';
import { ShowcaseActions } from './showcaseactions';
import './style.css';

export default function Home() {
  const [previewData, _] = createSignal<Show>(featuredShows[0]);
  const [activeContext, __] = useActiveSpatialNavigationContext();

  const preview_mode = () => {
    return activeContext() == 'preview-actions' ? 'showcase' : 'brief';
  };

  return (
    <section class="home-page" data-preview-mode={preview_mode()}>
      <img
        aria-label="bg image"
        class="preview-bg-img"
        src={previewData().backdrop}
      />
      <div class="preview-bg-overlay" />

      <div class="preview-body">
        <h1 class="preview-body-title">{previewData().title}</h1>
        <ul class="preview-body-tags">
          <li>{previewData().year}</li>
          <li>{previewData().duration}</li>
          <li>4K</li>
          <li>TV-PG</li>
          <li>12 Seasons</li>
          <li data-genre>Action</li>
          <li data-genre>Adventure</li>
        </ul>
        <p class="preview-body-desc">{previewData().description}</p>
        <ShowcaseActions />
      </div>

      <Gallery />
    </section>
  );
}
