import { A } from '@solidjs/router'
import Previewer from '@/components/previewer'
import "./App.css"

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
      <h6>Trending</h6>
      <div class="row-item-list">
        <RowItem />
        <RowItem />
        <RowItem />
      </div>
    </div>
  )
}

function App() {
  return (
    <div class="app">
      <nav>
        <A href="/home">1</A>
        <A href="/search">2</A>
        <A href="/other">3</A>
      </nav>
      <main>
        {/* <Previewer /> */}
        <Row />
      </main>
    </div>
  )
}

export default App
