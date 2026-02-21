import { featuredShows } from "../tmp_data.ts"
import "./previewer.css"

function Hero() {
  const hero = featuredShows[0];

  return (
    <div class="previewer">
      <img class="previewer-bg-img" src={hero.backdrop} alt={hero.title} />
      <div class="previewer-bg-overlay" />
      <div class="previewer-content">
        <h1>{hero.title}</h1>
        <ul class="previewer-tags">
          <li>2004</li>
          <li>1h 30m</li>
          <li>4K</li>
          <li>TV-PG</li>
          <li>12 Seasons</li>
          <li data-genre>Action</li>
          <li data-genre>Adventure</li>
        </ul>
        <p>{hero.description}</p>
        <div class="previewer-actions">
          <a>Play</a>
          <button>More Info</button>
        </div>
      </div>
      <div class="previewer-legacy-v-spacer"></div>
    </div>
  )
}

export default Hero
