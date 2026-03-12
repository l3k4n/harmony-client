import { For, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import type { Media } from '@api/types';
import ScrollableContainer, { TvInfiniteGalleryRow } from '@components/scrollablecontainer';

interface GalleryProps {
  categories: Media.Category[];
}

const GalleryRow = TvInfiniteGalleryRow;

export function Gallery(props: GalleryProps) {
  const [pos, setPos] = createSignal(0);
  const scrollTo = (e: HTMLElement) => setPos(-e.offsetTop);
  const navigate = useNavigate();

  return (
    <div class="gallery">
      <ScrollableContainer pos={pos} horizontal={false}>
        <For each={props.categories}>
          {(category) => (
            <div class="gallery-row">
              <h3>{category.label}</h3>
              <GalleryRow
                each={category.media}
                start_index={0}
                visible_window={7}
                spatial_name={`gallery-row-${category.label}`}
                on_focus={console.log}
                on_click={(media) => navigate(`/details/${media.id}`)}
                children={(media) => (
                  <div class="gallery-row-item">
                    <img alt="" src={media.poster_url} />
                  </div>
                )}
              />
            </div>
          )}
        </For>
      </ScrollableContainer>
    </div>
  );
}
