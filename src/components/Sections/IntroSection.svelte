<script lang="ts">
  import { onMount } from "svelte"
  import TuiContainer from "@/components/ui/TuiContainer.svelte"
  import Separator from "@/components/ui/Separator.svelte"
  import { theme, setTheme } from "@/components/theme-provider"
  import FlickerSpinner from "@/components/ui/FlickerSpinner.svelte"

  const isLighthouse = typeof navigator !== "undefined" && /Lighthouse/i.test(navigator.userAgent);
  let time = $state("")
  let animationStage = $state<"initial" | "expanding" | "expanded">(isLighthouse ? "expanded" : "initial")

  // Typed text animation states
  const fullText = "Portfolio"
  let typedLength = $state(isLighthouse ? fullText.length : 0)
  let showWordmark = $state(isLighthouse)

  onMount(() => {
    const updateTime = () => {
      const now = new Date()
      time = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    if (isLighthouse) {
      return () => {
        clearInterval(interval);
      };
    }

    // 1. Show the small box with loader for 1000ms, then expand
    const timer1 = setTimeout(() => {
      animationStage = "expanding"
    }, 1085)

    // 2. Stagger content reveal to after the 800ms expansion completes (total 1885ms)
    let typingInterval: any
    const timer2 = setTimeout(() => {
      animationStage = "expanded"

      // Start typing animation once container is expanded
      let currentLength = 0
      typingInterval = setInterval(() => {
        if (currentLength < fullText.length) {
          currentLength++
          typedLength = currentLength
        } else {
          clearInterval(typingInterval)
          showWordmark = true
        }
      }, 100) // 100ms per letter
    }, 1885)

    return () => {
      clearInterval(interval)
      if (typingInterval) clearInterval(typingInterval)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  })

  let containerClasses = $derived(
    animationStage === "initial"
      ? "w-32 h-32 md:w-40 md:h-40 flex items-center justify-center transition-[width,height] duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] opacity-0 animate-fade-in [animation-delay:800ms]"
      : animationStage === "expanding"
        ? "w-full shrink-0 flex flex-col transition-[width,height] duration-800 ease-[cubic-bezier(0.85,0,0.15,1)]"
        : "w-full shrink-0 flex flex-col"
  )
</script>

<section
  id="intro"
  aria-label="Introduction"
  class="w-full flex items-center justify-center p-6 relative"
  style="min-height: calc(var(--vh, 1vh) * 100);"
>
  {#if animationStage === "initial"}
    <div
      class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      <div class="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
        <FlickerSpinner />
      </div>
    </div>
  {/if}

  <TuiContainer
    label="INTRO"
    borderColor="border-border/80 hover:border-foreground/40"
    textColor="text-foreground/80 font-bold"
    class="{containerClasses} p-0!"
    style={animationStage !== "initial"
      ? "height: calc(var(--vh, 1vh) * 100 - 3rem);"
      : ""}
  >
    {#if animationStage === "expanded"}
      <div class="flex flex-col justify-between h-full flex-1 p-6 md:p-12 lg:p-16">
        <!-- Top Metadata Bar -->
        <div class="pb-8 relative">
          <div
            class="absolute bottom-0 left-0 right-0 h-px bg-border/40 origin-center animate-border-expand"
            style="animation-delay: 0.5s"
          ></div>
          <div class="overflow-hidden">
            <!-- Desktop Header Layout -->
            <nav
              data-nosnippet
              aria-label="Desktop Social links and settings"
              class="hidden lg:flex items-center justify-between text-[clamp(11px,1vw,14px)] text-muted-foreground animate-slide-down-reveal w-full"
              style="animation-delay: 1.0s"
            >
              <div class="flex items-center gap-x-6">
                <a
                  href="https://github.com/BootlegYouki"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 250"
                    class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                  >
                    <path
                      d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"
                    />
                  </svg>
                  <span>bootlegyouki</span>
                </a>
                <Separator orientation="vertical" class="h-4 bg-border/40" />
                <a
                  href="https://www.instagram.com/bootlegyouki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                  >
                    <path
                      d="M128 23.064c34.177 0 38.225.13 51.722.745c12.48.57 19.258 2.655 23.769 4.408c5.974 2.322 10.238 5.096 14.717 9.575s7.253 8.743 9.575 14.717c1.753 4.511 3.838 11.289 4.408 23.768c.615 13.498.745 17.546.745 51.723s-.13 38.226-.745 51.723c-.57 12.48-2.655 19.257-4.408 23.768c-2.322 5.974-5.096 10.239-9.575 14.718s-8.743 7.253-14.717 9.574c-4.511 1.753-11.289 3.839-23.769 4.408c-13.495.616-17.543.746-51.722.746s-38.228-.13-51.723-.746c-12.48-.57-19.257-2.655-23.768-4.408c-5.974-2.321-10.239-5.095-14.718-9.574c-4.479-4.48-7.253-8.744-9.574-14.718c-1.753-4.51-3.839-11.288-4.408-23.768c-.616-13.497-.746-17.545-.746-51.723s.13-38.225.746-51.722c.57-12.48 2.655-19.258 4.408-23.769c2.321-5.974 5.095-10.238 9.574-14.717c4.48-4.48 8.744-7.253 14.718-9.575c4.51-1.753 11.288-3.838 23.768-4.408c13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95c-8.418 3.271-15.556 7.648-22.672 14.764S9.991 35.738 6.72 44.155C3.555 52.297 1.392 61.602.77 75.226C.147 88.878 0 93.237 0 128s.147 39.122.77 52.774c.622 13.625 2.785 22.93 5.95 31.071c3.27 8.417 7.647 15.556 14.763 22.672s14.254 11.492 22.672 14.763c8.142 3.165 17.446 5.328 31.07 5.95c13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95c8.418-3.27 15.556-7.647 22.672-14.763s11.493-14.254 14.764-22.672c3.164-8.142 5.328-17.446 5.95-31.07c.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07c-3.271-8.418-7.648-15.556-14.764-22.672S220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0m0 62.27c-36.302 0-65.73 29.43-65.73 65.73s29.428 65.73 65.73 65.73c36.301 0 65.73-29.428 65.73-65.73c0-36.301-29.429-65.73-65.73-65.73m0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667m83.686-110.994c0 8.484-6.876 15.36-15.36 15.36s-15.36-6.876-15.36-15.36s6.877-15.36 15.36-15.36s15.36 6.877 15.36 15.36"
                    />
                  </svg>
                  <span>@bootlegyouki</span>
                </a>
                <Separator orientation="vertical" class="h-4 bg-border/40" />
                <a
                  href="https://www.linkedin.com/in/oandasan-mark-darren-o-893938417/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                  >
                    <path
                      d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95c-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019c5.875 0 6.955 3.869 6.955 8.894V28z"
                    />
                  </svg>
                  <span>in/mark-darren</span>
                </a>
                <Separator orientation="vertical" class="h-4 bg-border/40" />
                <span>LOCATION: Quezon City, Philippines</span>
              </div>
              <div class="flex items-center gap-6">
                <span>TIME: {time || "00:00:00"}</span>
                <Separator orientation="vertical" class="h-4 bg-border/40" />
                <button
                  onclick={() => setTheme($theme === "dark" ? "light" : "dark")}
                  class="text-[clamp(10px,0.9vw,13px)] text-muted-foreground hover:text-foreground font-mono transition-colors border border-border/40 hover:border-foreground/30 px-2 py-0.5 bg-card/30 hover:bg-card select-none cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {$theme.toUpperCase()}
                </button>
              </div>
            </nav>

            <!-- Mobile Header Layout -->
            <nav
              data-nosnippet
              aria-label="Mobile Social links and settings"
              class="grid grid-cols-2 gap-y-3.5 gap-x-4 text-[11px] lg:hidden text-muted-foreground animate-slide-down-reveal w-full"
              style="animation-delay: 1.0s"
            >
              <!-- Row 1 Left: GitHub -->
              <a
                href="https://github.com/BootlegYouki"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 250"
                  class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                >
                  <path
                    d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"
                  />
                </svg>
                <span>bootlegyouki</span>
              </a>
              <!-- Row 1 Right: Instagram -->
              <a
                href="https://www.instagram.com/bootlegyouki/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer justify-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                >
                  <path
                    d="M128 23.064c34.177 0 38.225.13 51.722.745c12.48.57 19.258 2.655 23.769 4.408c5.974 2.322 10.238 5.096 14.717 9.575s7.253 8.743 9.575 14.717c1.753 4.511 3.838 11.289 4.408 23.768c.615 13.498.745 17.546.745 51.723s-.13 38.226-.745 51.723c-.57 12.48-2.655 19.257-4.408 23.768c-2.322 5.974-5.096 10.239-9.575 14.718s-8.743 7.253-14.717 9.574c-4.511 1.753-11.289 3.839-23.769 4.408c-13.495.616-17.543.746-51.722.746s-38.228-.13-51.723-.746c-12.48-.57-19.257-2.655-23.768-4.408c-5.974-2.321-10.239-5.095-14.718-9.574c-4.479-4.48-7.253-8.744-9.574-14.718c-1.753-4.51-3.839-11.288-4.408-23.768c-.616-13.497-.746-17.545-.746-51.723s.13-38.225.746-51.722c.57-12.48 2.655-19.258 4.408-23.769c2.321-5.974 5.095-10.238 9.574-14.717c4.48-4.48 8.744-7.253 14.718-9.575c4.51-1.753 11.288-3.838 23.768-4.408c13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95c-8.418 3.271-15.556 7.648-22.672 14.764S9.991 35.738 6.72 44.155C3.555 52.297 1.392 61.602.77 75.226C.147 88.878 0 93.237 0 128s.147 39.122.77 52.774c.622 13.625 2.785 22.93 5.95 31.071c3.27 8.417 7.647 15.556 14.763 22.672s14.254 11.492 22.672 14.763c8.142 3.165 17.446 5.328 31.07 5.95c13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95c8.418-3.27 15.556-7.647 22.672-14.763s11.493-14.254 14.764-22.672c3.164-8.142 5.328-17.446 5.95-31.07c.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07c-3.271-8.418-7.648-15.556-14.764-22.672S220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0m0 62.27c-36.302 0-65.73 29.43-65.73 65.73s29.428 65.73 65.73 65.73c36.301 0 65.73-29.428 65.73-65.73c0-36.301-29.429-65.73-65.73-65.73m0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667m83.686-110.994c0 8.484-6.876 15.36-15.36 15.36s-15.36-6.876-15.36-15.36s6.877-15.36 15.36-15.36s15.36 6.877 15.36 15.36"
                  />
                </svg>
                <span>@bootlegyouki</span>
              </a>

              <!-- Row 2 Left: LinkedIn -->
              <a
                href="https://www.linkedin.com/in/oandasan-mark-darren-o-893938417/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-foreground transition-colors group select-none cursor-pointer justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  class="w-3.5 h-3.5 fill-muted-foreground group-hover:fill-foreground transition-colors"
                >
                  <path
                    d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95c-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019c5.875 0 6.955 3.869 6.955 8.894V28z"
                  />
                </svg>
                <span>in/mark-darren</span>
              </a>
              <!-- Row 2 Right: Location -->
              <span class="text-right justify-self-end">QC, Philippines</span>

              <!-- Row 3 Left: Time -->
              <span class="text-left justify-self-start">TIME: {time || "00:00:00"}</span>
              <!-- Row 3 Right: Toggle -->
              <div class="flex items-center justify-end">
                <button
                  onclick={() => setTheme($theme === "dark" ? "light" : "dark")}
                  class="text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors border border-border/40 hover:border-foreground/30 px-2 py-0.5 bg-card/30 hover:bg-card select-none cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {$theme.toUpperCase()}
                </button>
              </div>
            </nav>
          </div>
        </div>

        <!-- Spacer to push everything else to the bottom -->
        <div class="flex-1"></div>

        <!-- Bottom Area: Huge Title & Metadata aligned closely below it -->
        <div class="w-full pt-12">
          <div>
            <!-- Wordmark: MARK DARREN -->
            <div class="mb-0.5 md:-mb-2.5 overflow-hidden">
              <span
                class="text-base sm:text-xl font-bold tracking-[0.25em] text-primary uppercase block ml-[1.6vw] pb-1 font-mono"
                class:translate-y-full={!showWordmark}
                class:animate-slide-up-reveal={showWordmark}
                style={!showWordmark ? "transform: translateY(101%);" : ""}
              >
                MARK DARREN
              </span>
            </div>
            <!-- Huge Title: Portfolio. -->
            <div>
              <h1
                class="portfolio-title font-black tracking-tighter leading-[0.8] select-none text-foreground font-nippo w-full"
              >
                {#if typedLength <= 3}{fullText.slice(
                    0,
                    typedLength
                  )}{:else}Por<span class="pl-[0.045em]"
                    >{fullText.slice(3, typedLength)}</span
                  >{/if}<span
                  class="text-red-500 animate-custom-blink"
                  style="color: #ef4444;">.</span
                >
              </h1>
            </div>
            <div class="h-4"></div>
          </div>

          <div class="pt-4 relative">
            <div
              class="absolute top-0 left-0 right-0 h-px bg-border/40 origin-center animate-border-expand"
              style="animation-delay: 0.5s"
            ></div>
            <div class="overflow-hidden">
              <div
                class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[clamp(12px,1.1vw,15px)] animate-slide-up-reveal w-full"
                style="animation-delay: 1.0s"
              >
                <div
                  class="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground font-semibold text-[clamp(13px,1.2vw,16px)]"
                >
                  <span>App Developer</span>
                  <span class="text-foreground/30">/</span>
                  <span>Web Developer</span>
                  <span class="text-foreground/30">/</span>
                  <span>Designer</span>
                </div>

                <address
                  data-nosnippet
                  class="not-italic flex flex-col md:flex-row gap-6 md:gap-12 text-[clamp(12px,1.2vw,16px)] font-semibold tracking-wider overflow-hidden"
                >
                  <span class="text-muted-foreground break-all"
                    >EMAIL: <a
                      href="mailto:bootlegyouki@gmail.com"
                      class="text-foreground hover:underline transition-all break-all"
                      >bootlegyouki@gmail.com</a
                    ></span
                  >
                  <span class="text-muted-foreground whitespace-nowrap"
                    >PHONE: <span class="text-foreground">+63 968 235 1236</span
                    ></span
                  >
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </TuiContainer>
</section>

<style>
  @keyframes custom-blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
  .animate-custom-blink {
    animation: custom-blink 1s infinite;
    animation-delay: 1.2s;
  }
  .portfolio-title {
    font-size: clamp(2.5rem, calc((100vw - 96px) / 4.46), 32rem);
  }
  @media (min-width: 768px) {
    .portfolio-title {
      font-size: clamp(4rem, calc((100vw - 144px) / 4.46), 32rem);
    }
  }
  @media (min-width: 1024px) {
    .portfolio-title {
      font-size: clamp(5rem, calc((100vw - 176px) / 4.46), 32rem);
    }
  }
</style>
