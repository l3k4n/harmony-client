import { type JSX } from "solid-js"
import useEmblaCarousel from "embla-carousel-solid"
import { cn } from "@/lib/utils"

type CarouselProps = {
  opts?: {
    align?: "start" | "center" | "end"
    loop?: boolean
    skipSnaps?: boolean
    dragFree?: boolean
  }
  class?: string
}

function Carousel(props: CarouselProps & { children: JSX.Element }) {
  const [emblaRef] = useEmblaCarousel(() => ({
    loop: true,
    ...props.opts,
  }))

  return (
    <div class={cn("carousel", props.class)}>
      <div class="carousel-viewport" ref={emblaRef}>
        <div class="carousel-container">
          {props.children}
        </div>
      </div>
    </div>
  )
}

function CarouselContent(props: { class?: string; children: JSX.Element }) {
  return (
    <div class={cn("carousel-container", props.class)}>
      {props.children}
    </div>
  )
}

function CarouselItem(props: { class?: string; children: JSX.Element }) {
  return (
    <div class={cn("carousel-item", props.class)}>
      {props.children}
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem }
