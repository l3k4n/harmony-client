import { type JSX } from "solid-js"
import { cn } from "@/lib/utils"

function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn("card", props.class)}>
      {props.children}
    </div>
  )
}

function CardHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn("card-header", props.class)}>
      {props.children}
    </div>
  )
}

function CardTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 class={cn("card-title", props.class)}>
      {props.children}
    </h3>
  )
}

function CardDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p class={cn("card-description", props.class)}>
      {props.children}
    </p>
  )
}

function CardContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn("card-content", props.class)}>
      {props.children}
    </div>
  )
}

function CardFooter(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn("card-footer", props.class)}>
      {props.children}
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
