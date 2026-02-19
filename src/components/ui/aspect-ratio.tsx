import { type JSX } from "solid-js"

interface AspectRatioProps {
  ratio?: number
  class?: string
}

function AspectRatio(props: AspectRatioProps & { children?: JSX.Element }) {
  return (
    <div
      class={`relative w-full overflow-hidden ${props.class || ""}`}
      style={{ "aspect-ratio": props.ratio || 16 / 9 }}
    >
      {props.children}
    </div>
  )
}

export { AspectRatio }
