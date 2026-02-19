import { type JSX, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "new"

interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function getBadgeClasses(variant?: BadgeVariant): string {
  const base = "badge"
  
  const variants: Record<BadgeVariant, string> = {
    default: "badge-default",
    secondary: "badge-secondary",
    destructive: "badge-destructive",
    outline: "badge-outline",
    new: "badge-new",
  }
  
  return cn(base, variants[variant || "default"])
}

function Badge(props: BadgeProps) {
  const [local, others] = splitProps(props, ["variant", "class", "children"])
  
  return (
    <div class={getBadgeClasses(local.variant)} {...others}>
      {local.children}
    </div>
  )
}

export { Badge }
