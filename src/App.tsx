import { createSignal, For, onMount, onCleanup, type Component } from 'solid-js'
import { A } from '@solidjs/router'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { categories, featuredShows, Show } from "./tmp_data.ts"
import Hero from './components/Hero'

interface ShowCardProps {
  show: Show
  rowIndex: number
  cardIndex: number
}

const ShowCard: Component<ShowCardProps> = (props) => {
  return (
    <A
      href={`/detail/${props.show.id}`}
      data-row={props.rowIndex}
      data-col={props.cardIndex}
      class="show-card"
    >
      <div class="aspect-2-3">
        <img src={props.show.image} alt={props.show.title} loading="lazy" />
      </div>
      <div class="border-overlay" />
    </A>
  )
}

interface ShowRowProps {
  category: { name: string; shows: Show[] }
  rowIndex: number
}

const ShowRow: Component<ShowRowProps> = (props) => {
  return (
    <section class="show-row">
      <h2 class="text-lg font-bold text-foreground mb-4">{props.category.name}</h2>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent class="gap-3">
          <For each={props.category.shows}>
            {(show, i) => (
              <CarouselItem>
                <ShowCard show={show} rowIndex={props.rowIndex} cardIndex={i()} />
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
      </Carousel>
    </section>
  )
}

interface FocusPos {
  row: number
  col: number
}

const App: Component = () => {
  const [activeHero, setActiveHero] = createSignal(0)
  const [focusPos, setFocusPos] = createSignal<FocusPos>({ row: -1, col: -1 })

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown)

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })
  })

  const currentShow = () => featuredShows[activeHero()]

  const getAllCards = () => {
    return Array.from(document.querySelectorAll('.show-card')) as HTMLElement[]
  }

  const getCardAt = (row: number, col: number) => {
    return getAllCards().find(el =>
      String(el.dataset.row) == String(row) && String(el.dataset.col) == String(col)
    )
  }

  const updateFocus = (row: number, col: number) => {
    setFocusPos({ row, col })
    getAllCards().forEach(el => el.classList.remove('focused'))
    const el = getCardAt(row, col)
    if (el) {
      el.classList.add('focused')
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }, 10)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        setFocusPos({ row: -1, col: -1 })
        getAllCards().forEach(el => el.classList.remove('focused'))
      }
      return
    }
    if (e.target instanceof HTMLInputElement) return

    const { row, col } = focusPos()
    const rowCount = categories.length

    if (row === -1) {
      if (e.key === 'ArrowDown') {
        updateFocus(0, 0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) {
          updateFocus(row - 1, Math.min(col, categories[row - 1].shows.length - 1))
        }
        break
      case 'ArrowDown':
        if (row < rowCount - 1) {
          updateFocus(row + 1, Math.min(col, categories[row + 1].shows.length - 1))
        }
        break
      case 'ArrowLeft':
        if (col > 0) {
          updateFocus(row, col - 1)
        }
        break
      case 'ArrowRight':
        if (col < categories[row].shows.length - 1) {
          updateFocus(row, col + 1)
        }
        break
      case 'Enter':
      case ' ':
        const el = getCardAt(row, col)
        if (el) el.click()
        break
    }
    e.preventDefault()
  }

  return (
    <div class="min-h-screen bg-background">
      <Hero
        currentShow={currentShow}
        activeIndex={activeHero}
        onNext={() => setActiveHero(prev => (prev + 1) % featuredShows.length)}
        onPrev={() => setActiveHero(prev => (prev - 1 + featuredShows.length) % featuredShows.length)}
        onSelect={setActiveHero}
      />
      <main class="pb-8">
        <For each={categories}>
          {(category, i) => <ShowRow category={category} rowIndex={i()} />}
        </For>
      </main>
    </div>
  )
}

export default App
