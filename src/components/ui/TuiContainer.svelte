<script lang="ts">
  import { cn } from "@/lib/utils";

  let {
    class: className = "",
    label = "",
    borderColor = "border-border/60 hover:border-primary/80",
    textColor = "text-muted-foreground group-hover:text-primary",
    badge = null,
    children,
    ...props
  } = $props<{
    class?: string;
    label?: string;
    borderColor?: string;
    textColor?: string;
    badge?: any;
    children?: any;
    [key: string]: any;
  }>();

  // Split classes: fieldsets cannot have display: flex/grid without breaking legend border rendering.
  // We extract display/layout properties to place them on the inner div.
  const classesList = $derived(className.split(" ").filter(Boolean));
  const flexClasses = $derived(classesList.filter(c => 
    c === "flex" || 
    c === "inline-flex" ||
    c === "grid" || 
    c.startsWith("flex-col") || 
    c.startsWith("flex-row") || 
    c.startsWith("grid-cols-") || 
    c.startsWith("gap-") || 
    c.startsWith("items-") || 
    c.startsWith("justify-")
  ).join(" "));

  const fieldsetClasses = $derived(classesList.filter(c => 
    c !== "flex" && 
    c !== "inline-flex" &&
    c !== "grid" && 
    !c.startsWith("flex-col") && 
    !c.startsWith("flex-row") && 
    !c.startsWith("grid-cols-") && 
    !c.startsWith("gap-") && 
    !c.startsWith("items-") && 
    !c.startsWith("justify-")
  ).join(" "));
</script>

<fieldset
  class={cn(
    "group border bg-card/90 p-4 font-mono relative transition-colors duration-300 rounded-none w-full",
    borderColor,
    fieldsetClasses
  )}
  {...props}
>
  {#if label}
    <legend class={cn("ml-4 px-2 text-xs font-bold uppercase tracking-widest select-none transition-colors duration-300", textColor)}>
      <span class="flex items-center gap-2">
        <span>[{label}]</span>
        {#if badge}
          <span class="normal-case font-normal">
            {@render badge()}
          </span>
        {/if}
      </span>
    </legend>
  {/if}
  <div class={cn("w-full h-full text-sm flex flex-col flex-1", flexClasses)}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</fieldset>
