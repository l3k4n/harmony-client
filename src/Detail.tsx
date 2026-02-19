import { onMount, onCleanup, For, type Component } from 'solid-js'
import { useParams, useNavigate, A } from '@solidjs/router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Show } from './tmp_data.ts'

const shows: Show[] = [
  { id: 1, title: "Echoes of Tomorrow", genre: "Sci-Fi", rating: 9.2, year: 2025, image: "https://picsum.photos/seed/movie1/400/600", featured: true, backdrop: "https://picsum.photos/seed/movie1bg/1920/1080", description: "In a world where technology has evolved beyond imagination, one person must uncover the truth before it's too late. An epic journey through love, betrayal, and redemption.", duration: "2h 15m", episodes: 12, cast: ["Sarah Chen", "Marcus Webb", "Elena Rodriguez", "James Park"], director: "Christopher Nolan" },
  { id: 2, title: "The Last Kingdom", genre: "Drama", rating: 8.8, year: 2024, image: "https://picsum.photos/seed/movie2/400/600", backdrop: "https://picsum.photos/seed/movie2bg/1920/1080", description: "A gripping tale of power, intrigue, and survival in medieval times.", duration: "1h 58m", episodes: 10, cast: ["Alexander Skarsgård", "Clive Standen", "Katheryn Winnick"], director: "Peter Webber" },
  { id: 3, title: "Midnight Runner", genre: "Action", rating: 8.5, year: 2024, image: "https://picsum.photos/seed/movie3/400/600", backdrop: "https://picsum.photos/seed/movie3bg/1920/1080", description: "A detective races against time to catch a serial killer who leaves no traces.", duration: "2h 05m", episodes: 8, cast: ["Denzel Washington", "Ryan Reynolds", "Eva Green"], director: "David Fincher" },
  { id: 4, title: "Neon Dreams", genre: "Thriller", rating: 8.9, year: 2025, image: "https://picsum.photos/seed/movie4/400/600", backdrop: "https://picsum.photos/seed/movie4bg/1920/1080", description: "In a cyberpunk future, a hacker uncovers a conspiracy that could change humanity forever.", duration: "2h 22m", episodes: 10, cast: ["Keanu Reeves", "Ana de Armas", "Oscar Isaac"], director: "Denis Villeneuve" },
  { id: 5, title: "Forgotten Realms", genre: "Fantasy", rating: 7.9, year: 2024, image: "https://picsum.photos/seed/movie5/400/600", backdrop: "https://picsum.photos/seed/movie5bg/1920/1080", description: "A young wizard must save her kingdom from an ancient evil.", duration: "2h 30m", episodes: 6, cast: ["Millie Bobby Brown", "Idris Elba", "Helen Mirren"], director: "Guillermo del Toro" },
  { id: 6, title: "The Deep End", genre: "Crime", rating: 8.7, year: 2025, image: "https://picsum.photos/seed/movie6/400/600", backdrop: "https://picsum.photos/seed/movie6bg/1920/1080", description: "A noir crime drama set in the dark underbelly of Los Angeles.", duration: "1h 52m", episodes: 8, cast: ["Matthew McConaughey", "Charlize Theron", "Gary Oldman"], director: "Martin Scorsese" },
  { id: 7, title: "Starfall", genre: "Adventure", rating: 8.3, year: 2024, image: "https://picsum.photos/seed/movie7/400/600", backdrop: "https://picsum.photos/seed/movie7bg/1920/1080", description: "An interstellar journey to save humanity from extinction.", duration: "2h 45m", episodes: 12, cast: ["Chris Pratt", "Zendaya", "Rebecca Ferguson"], director: "James Gunn" },
  { id: 8, title: "Silent Voices", genre: "Mystery", rating: 8.6, year: 2025, image: "https://picsum.photos/seed/movie8/400/600", backdrop: "https://picsum.photos/seed/movie8bg/1920/1080", description: "A deaf woman witnesses a murder and must find a way to prove it.", duration: "1h 48m", episodes: 6, cast: ["Florence Pugh", "Jake Gyllenhaal", "Maggie Smith"], director: "Sharon Stone" },
  { id: 9, title: "Pulse", genre: "Horror", rating: 7.8, year: 2024, image: "https://picsum.photos/seed/movie9/400/600", backdrop: "https://picsum.photos/seed/movie9bg/1920/1080", description: "A supernatural horror that will keep you awake for nights.", duration: "1h 55m", episodes: 4, cast: ["Sydney Sweeney", "Ethan Hawke", "Toni Collette"], director: "Mike Flanagan" },
  { id: 10, title: "Golden Hour", genre: "Romance", rating: 8.1, year: 2025, image: "https://picsum.photos/seed/movie10/400/600", backdrop: "https://picsum.photos/seed/movie10bg/1920/1080", description: "Two strangers fall in love during the most beautiful sunset of their lives.", duration: "1h 42m", episodes: 8, cast: ["Timothée Chalamet", "Florence Pugh", "Dev Patel"], director: "Greta Gerwig" },
  { id: 11, title: "Binary Stars", genre: "Sci-Fi", rating: 8.4, year: 2024, image: "https://picsum.photos/seed/movie11/400/600", backdrop: "https://picsum.photos/seed/movie11bg/1920/1080", description: "Two planets on a collision course with destiny.", duration: "2h 10m", episodes: 10, cast: ["John Boyega", "Gemma Chan", "Micheal B. Jordan"], director: "Ridley Scott" },
  { id: 12, title: "The Covenant", genre: "Drama", rating: 9.0, year: 2025, image: "https://picsum.photos/seed/movie12/400/600", backdrop: "https://picsum.photos/seed/movie12bg/1920/1080", description: "A powerful story of faith, sacrifice, and redemption.", duration: "2h 05m", episodes: 8, cast: ["Cillian Murphy", "Emily Blunt", "Mark Ruffalo"], director: "Denis Villeneuve" },
]

const similarShows = shows.slice(0, 6)

const Detail: Component = () => {
  const params = useParams()
  const navigate = useNavigate()
  const show = () => shows.find(s => s.id === parseInt(params.id || "1")) || shows[0]
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Escape') {
      navigate('/')
      e.preventDefault()
    }
  }

  onMount(() => {
    window.scrollTo(0, 0)
    document.addEventListener('keydown', handleKeyDown)
    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })
  })

  return (
    <div class="min-h-screen bg-background animate-fade-up">
      <nav class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4">
        <div class="flex items-center justify-between max-w-7xl mx-auto">
          <div class="flex items-center gap-4">
            <Button variant="secondary" size="sm" class="gap-2" onClick={() => navigate('/')}>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <A href="/" class="text-2xl font-bold tracking-tight text-foreground hover:scale-105 transition-transform">
              <span class="text-primary">Harmony</span>
            </A>
          </div>
          <div class="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Button>
            <div class="user-avatar">
              U
            </div>
          </div>
        </div>
      </nav>

      <div class="detail-backdrop">
        <img src={show().backdrop} alt={show().title} />
        <div class="hero-gradient-overlay" />
        <div class="hero-gradient-overlay-top" />
        
        <div class="absolute bottom-0 left-0 right-0 p-6" style={{ padding: "1.5rem" }}>
          <div class="max-w-3xl animate-fade-up" style={{ "animation-delay": "0.1s" }}>
            <div class="flex items-center gap-3 mb-4">
              <Badge variant="new">NEW</Badge>
              <span class="text-sm text-muted-foreground">{show().year}</span>
              <Badge variant="outline">4K</Badge>
              <Badge variant="outline">HDR</Badge>
              <span class="text-sm text-muted-foreground">{show().genre}</span>
            </div>
            
            <h1 class="text-4xl font-bold text-foreground mb-4">{show().title}</h1>
            
            <p class="text-lg text-muted-foreground mb-6">{show().description}</p>
            
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" class="gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Play
              </Button>
              <Button variant="secondary" size="lg" class="gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                Add to List
              </Button>
            </div>
            
            <div class="flex flex-wrap items-center gap-4 text-sm">
              <div class="flex items-center gap-1">
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span class="text-foreground font-semibold ml-1">{show().rating}/10</span>
              </div>
              <span class="text-border">|</span>
              <span class="text-muted-foreground">{show().duration}</span>
              <span class="text-border">|</span>
              <span class="text-muted-foreground">{show().episodes} Episodes</span>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-12" style={{ padding: "1.5rem", "padding-top": "3rem", "padding-bottom": "3rem" }}>
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="md:col-span-2">
              <h2 class="text-2xl font-bold text-foreground mb-6">Cast</h2>
              <div class="flex flex-wrap gap-3 mb-12">
                <For each={show().cast}>
                  {(actor) => (
                    <Badge variant="secondary">{actor}</Badge>
                  )}
                </For>
              </div>

              <h2 class="text-2xl font-bold text-foreground mb-6">Director</h2>
              <p class="text-lg text-muted-foreground mb-12">{show().director}</p>

              <h2 class="text-2xl font-bold text-foreground mb-6">Similar Titles</h2>
              <div class="similar-grid">
                <For each={similarShows}>
                  {(similar) => (
                    <A href={`/detail/${similar.id}`} class="group no-underline">
                      <div class="aspect-2-3 mb-2">
                        <img src={similar.image} alt={similar.title} />
                      </div>
                      <h3 class="text-sm font-medium text-foreground group-hover:text-destructive transition-colors">{similar.title}</h3>
                      <p class="text-xs text-muted-foreground">{similar.year} • {similar.genre}</p>
                    </A>
                  )}
                </For>
              </div>
            </div>
            
            <div>
              <Card class="detail-card">
                <CardContent class="pt-6">
                  <h2 class="text-xl font-bold text-foreground mb-4">Details</h2>
                  <div class="space-y-4 text-sm">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Genre</span>
                      <span class="text-foreground">{show().genre}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Year</span>
                      <span class="text-foreground">{show().year}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Duration</span>
                      <span class="text-foreground">{show().duration}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Episodes</span>
                      <span class="text-foreground">{show().episodes}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Rating</span>
                      <span class="text-foreground">{show().rating}/10</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Age Rating</span>
                      <span class="text-foreground">TV-MA</span>
                    </div>
                  </div>
                  
                  <div class="mt-8 pt-6 border-t border-border space-y-3">
                    <Button variant="secondary" class="w-full gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
