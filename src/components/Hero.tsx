import { type Accessor } from 'solid-js'
import { For, onMount, onCleanup } from 'solid-js'
import { A } from '@solidjs/router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { featuredShows, Show } from "../tmp_data.ts"

interface HeroProps {
  currentShow: Accessor<Show>
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  activeIndex: Accessor<number>
}

function Hero(props: HeroProps) {
  onMount(() => {
    const interval = setInterval(() => {
      props.onNext()
    }, 6000)
    onCleanup(() => clearInterval(interval))
  })

  return (
    <div class="hero">
      <For each={featuredShows}>
        {(show, index) => (
          <div
            class={`absolute inset-0 transition-opacity duration-1000 ${index() === props.activeIndex() ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={show.backdrop}
              alt={show.title}
              class={`hero-image ${index() === props.activeIndex() ? 'scale-100' : 'scale-110'}`}
            />
          </div>
        )}
      </For>

      <div class="hero-gradient-overlay" />
      <div class="hero-gradient-overlay-top" />
      <div class="absolute inset-0 bg-background/30" />

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button onClick={props.onPrev} class="hero-nav-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div class="hero-dots">
          <For each={featuredShows}>
            {(_, index) => (
              <button
                onClick={() => props.onSelect(index())}
                class={`hero-dot ${index() === props.activeIndex() ? 'active' : ''}`}
              />
            )}
          </For>
        </div>
        <button onClick={props.onNext} class="hero-nav-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div class="absolute inset-0 flex items-center px-6" style={{ padding: "1.5rem" }}>
        <div class="max-w-xl">
          <div class="flex items-center gap-3 mb-3">
            <Badge variant="new">NEW</Badge>
            <span class="text-sm text-muted-foreground">{props.currentShow().year}</span>
            <Badge variant="outline">4K</Badge>
            <span class="text-sm text-muted-foreground">{props.currentShow().genre}</span>
          </div>

          <h1 class="text-5xl font-bold text-foreground mb-4 tracking-tight">
            {props.currentShow().title}
          </h1>

          <p class="text-lg text-muted-foreground mb-6 line-clamp-2">
            {props.currentShow().description}
          </p>

          <div class="flex items-center gap-3 mb-6">
            <Button size="lg" class="gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Play
            </Button>
            <A href={`/detail/${props.currentShow().id}`}>
              <Button variant="secondary" size="lg" class="gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                More Info
              </Button>
            </A>
          </div>

          <div class="flex items-center gap-3 text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span class="text-foreground font-medium">{props.currentShow().rating}</span>
            </div>
            <span>•</span>
            <span>{props.currentShow().episodes} episodes</span>
            <span>•</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
