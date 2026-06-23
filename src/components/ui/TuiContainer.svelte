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
</script>

<fieldset
  class={cn(
    "group border bg-card/90 p-4 font-mono relative transition-colors duration-300 rounded-none w-full",
    borderColor,
    className
  )}
  {...props}
>
  {#if label}
    <legend class={cn("px-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 select-none transition-colors duration-300", textColor)}>
      <span>[{label}]</span>
      {#if badge}
        <span class="normal-case font-normal">
          {@render badge()}
        </span>
      {/if}
    </legend>
  {/if}
  <div class="w-full h-full text-sm flex flex-col flex-1">
    {#if children}
      {@render children()}
    {/if}
  </div>
</fieldset>
