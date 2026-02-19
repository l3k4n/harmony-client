import { type JSX, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

function getButtonClasses(variant?: ButtonVariant, size?: ButtonSize): string {
  const base = "btn"
  
  const variants: Record<ButtonVariant, string> = {
    default: "btn-default",
    destructive: "btn-destructive",
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link",
  }
  
  const sizes: Record<ButtonSize, string> = {
    default: "",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-icon",
  }
  
  return cn(base, variants[variant || "default"], sizes[size || "default"])
}

function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["variant", "size", "class", "children"])
  
  return (
    <button
      class={getButtonClasses(local.variant, local.size)}
      {...others}
    >
      {local.children}
    </button>
  )
}

export { Button }
