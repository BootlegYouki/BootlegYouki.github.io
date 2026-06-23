<script lang="ts">
  import { cn } from "@/lib/utils";

  let {
    class: className = "",
    orientation = "horizontal",
    decorative = true,
    ...props
  } = $props<{
    class?: string;
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    [key: string]: any;
  }>();
</script>

<div
  role={decorative ? "none" : "separator"}
  aria-orientation={decorative ? undefined : orientation}
  data-slot="separator"
  class={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
    className
  )}
  {...props}
></div>
