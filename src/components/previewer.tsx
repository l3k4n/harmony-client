import { featuredShows } from "../tmp_data.ts"
import "./previewer.css"

function RowItem() {
  const data = {
    id: 1,
    title: "Echoes of Tomorrow",
    genre: "Sci-Fi",
    rating: 9.2,
    year: 2025,
  };

  return (
    <div class="row-item">
      <img src="https://picsum.photos/seed/movie1/400/600" />
    </div>
  )
}

function Row() {
  return (
    <div class="row">
      <h3>Trending</h3>
      <div class="row-item-list">
        <RowItem />
        <RowItem />
        <RowItem />
      </div>
    </div>
  )
}


function Hero() {
  const hero = featuredShows[0];

  return (
    <div class="previewer">
      <div class="previewer-bg">
        <img class="previewer-bg-img" src={hero.backdrop} alt={hero.title} />
        <div class="previewer-bg-overlay" />
      </div>
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
      <div class="row-container">
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div class="previewer-legacy-v-spacer"></div>
    </div>
  )
}

export default Hero
