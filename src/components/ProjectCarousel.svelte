<script lang="ts">
  import { cn } from "@/lib/utils";

  let {
    images,
    name,
    onPreview,
  } = $props<{
    images: string[];
    name: string;
    onPreview?: (src: string) => void;
  }>();

  let currentIndex = $state(0);

  let slides = $derived.by(() => {
    const result: { type: "single" | "paired"; images: string[] }[] = [];
    let i = 0;
    while (i < images.length) {
      const current = images[i];
      const isMobileCurrent = current.includes("portrait") || current.includes("/mobile/");
      
      if (isMobileCurrent && i + 1 < images.length) {
        const next = images[i + 1];
        const isMobileNext = next.includes("portrait") || next.includes("/mobile/");
        if (isMobileNext) {
          result.push({ type: "paired", images: [current, next] });
          i += 2;
          continue;
        }
      }
      result.push({ type: "single", images: [current] });
      i++;
    }
    return result;
  });

  let currentSlide = $derived(slides[currentIndex]);
</script>

{#if currentSlide}
  <div class="w-full h-full flex flex-col items-center justify-center min-h-0">
    <div class="w-full h-full flex flex-col select-none relative overflow-hidden mx-auto min-h-0">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="w-full flex-1 flex items-center justify-center relative group mx-auto min-h-[180px] sm:min-h-[350px] md:min-h-0 md:h-full">
        {#if currentSlide.type === "paired"}
          <div class="flex gap-4 items-center justify-center w-full h-full">
            {#each currentSlide.images as imgSrc, idx}
              <img
                src={imgSrc}
                alt={`${name} Screenshot`}
                class="max-h-[180px] sm:max-h-[350px] md:max-h-[calc(100dvh-27rem)] w-auto h-auto object-contain block cursor-zoom-in select-none"
                onclick={() => onPreview?.(imgSrc)}
                draggable="false"
                oncontextmenu={(e) => e.preventDefault()}
              />
            {/each}
          </div>
        {:else}
          <img
            src={currentSlide.images[0]}
            alt={`${name} Screenshot`}
            class="max-h-[180px] sm:max-h-[350px] md:max-h-[calc(100dvh-27rem)] w-auto h-auto object-contain block cursor-zoom-in select-none"
            onclick={() => onPreview?.(currentSlide.images[0])}
            draggable="false"
            oncontextmenu={(e) => e.preventDefault()}
          />
        {/if}
        
        <!-- Left Navigation Arrow -->
        {#if slides.length > 1}
          <button
            type="button"
            onclick={(e) => {
              e.stopPropagation();
              currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            }}
            class="flex absolute left-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        {/if}

        <!-- Right Navigation Arrow -->
        {#if slides.length > 1}
          <button
            type="button"
            onclick={(e) => {
              e.stopPropagation();
              currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            }}
            class="flex absolute right-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}
      </div>
    </div>

    <!-- Carousel Indicator below the box: long thin bars -->
    {#if slides.length > 1}
      <div class="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 pt-5 select-none w-full max-w-full px-4">
        {#each slides as _, idx}
          <button
            type="button"
            onclick={(e) => {
              e.stopPropagation();
              currentIndex = idx;
            }}
            class={cn(
              "h-1.5 cursor-pointer transition-all duration-300 border-0",
              slides.length > 15 ? "w-3 sm:w-4" : slides.length > 8 ? "w-6 sm:w-8" : "w-12",
              idx === currentIndex ? "bg-primary" : "bg-border/30 hover:bg-foreground/45"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}
