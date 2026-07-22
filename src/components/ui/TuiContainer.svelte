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

  const classesList = $derived(className.split(" ").filter(Boolean));

  // Helper to identify padding classes
  const isPaddingClass = (c: string) => {
    const clean = c.replace(/!/g, '');
    const parts = clean.split(':');
    const mainClass = parts[parts.length - 1];
    return /^(p|px|py|pt|pb|pl|pr)-/.test(mainClass);
  };

  // Helper to identify layout classes
  const isLayoutClass = (c: string) => {
    const clean = c.replace(/!/g, '');
    const parts = clean.split(':');
    const mainClass = parts[parts.length - 1];
    return (
      mainClass === "flex" ||
      mainClass === "inline-flex" ||
      mainClass === "grid" ||
      mainClass === "inline-grid" ||
      mainClass.startsWith("flex-") ||
      mainClass.startsWith("grid-cols-") ||
      mainClass.startsWith("grid-rows-") ||
      mainClass.startsWith("gap-") ||
      mainClass.startsWith("items-") ||
      mainClass.startsWith("justify-") ||
      mainClass.startsWith("align-") ||
      mainClass.startsWith("place-")
    );
  };

  // Classes for the fieldset (no padding, no layout)
  const fieldsetClasses = $derived(classesList.filter((c: string) => 
    !isPaddingClass(c) && !isLayoutClass(c)
  ).join(" "));

  // Classes for the inner div (has layout and padding)
  const innerDivClasses = $derived(classesList.filter((c: string) => 
    isPaddingClass(c) || isLayoutClass(c)
  ).join(" "));

  // Check if any custom padding class is provided in className
  const hasCustomPadding = $derived(classesList.some(isPaddingClass));
</script>

<fieldset
  class={cn(
    "group border bg-card p-0 font-mono relative transition-colors duration-300 rounded-none w-full flex flex-col min-w-0 min-h-0",
    borderColor,
    fieldsetClasses
  )}
  {...props}
>
  {#if label}
    <legend class={cn("ml-4 px-2 text-xs font-bold uppercase tracking-widest select-none transition-colors duration-300 bg-transparent max-w-[calc(100%-2rem)]", textColor)}>
      <span class="flex items-center gap-2 max-w-full">
        <span class="flex items-center overflow-hidden">
          <span class="shrink-0">[</span>
          <span class="truncate min-w-0">{label}</span>
          <span class="shrink-0">]</span>
        </span>
        {#if badge}
          <span class="normal-case font-normal shrink-0">
            {@render badge()}
          </span>
        {/if}
      </span>
    </legend>
  {/if}
  <div class={cn("w-full h-full text-sm flex flex-col flex-1 min-h-0", !hasCustomPadding && "p-4", innerDivClasses)}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</fieldset>
