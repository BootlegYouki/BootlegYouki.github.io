<script lang="ts">
  import { onMount } from "svelte"
  import TuiContainer from "@/components/ui/TuiContainer.svelte"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"

  gsap.registerPlugin(ScrollTrigger)

  let containerRef = $state<HTMLDivElement>()
  let rowRef = $state<HTMLDivElement>()
  let arrow1Width = $state(0)
  let arrow2Width = $state(0)

  onMount(() => {
    if (!containerRef) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".concept-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef,
            start: "top 85%",
          },
        }
      )

      // Arrow animation
      ScrollTrigger.create({
        trigger: rowRef,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".concept-arrow",
            { opacity: 0, "--dash-offset": 1 },
            {
              opacity: 1,
              "--dash-offset": 0,
              duration: 0.8,
              stagger: 0.8,
              ease: "power2.inOut",
              overwrite: "auto",
            }
          )
        },
        onLeave: () => {
          gsap.to(".concept-arrow", { opacity: 0, duration: 0.2, overwrite: "auto" })
        },
        onEnterBack: () => {
          gsap.fromTo(
            ".concept-arrow",
            { opacity: 0, "--dash-offset": 1 },
            {
              opacity: 1,
              "--dash-offset": 0,
              duration: 0.8,
              stagger: 0.8,
              ease: "power2.inOut",
              overwrite: "auto",
            }
          )
        },
        onLeaveBack: () => {
          gsap.to(".concept-arrow", { opacity: 0, duration: 0.2, overwrite: "auto" })
        }
      })

      gsap.set(".concept-box", { opacity: 0 })
      ScrollTrigger.batch(".concept-box", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 25, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              overwrite: "auto",
            }
          )
        },
        onLeave: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -25,
              duration: 0.25,
              ease: "power2.in",
              overwrite: "auto",
            }
          )
        },
        onEnterBack: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: -25, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              overwrite: "auto",
            }
          )
        },
        onLeaveBack: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: 25,
              duration: 0.25,
              ease: "power2.in",
              overwrite: "auto",
            }
          )
        },
      })
    }, containerRef)

    return () => ctx.revert()
  })
</script>

<section
  id="workflow-section"
  bind:this={containerRef}
  class="w-full px-6 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in flex flex-col justify-start relative z-10"
  style="min-height: calc(var(--vh, 1vh) * 100);"
>
  <!-- Centered Workflow Header -->
  <div
    class="flex flex-col items-center justify-center py-8 md:py-12 mb-8 select-none"
  >
    <h2
      class="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground concept-header opacity-0"
    >
      WORKFLOW
    </h2>
  </div>

  <div
    bind:this={rowRef}
    class="w-full flex flex-col lg:flex-row gap-6 relative z-10 lg:my-12"
  >
    <!-- Arrow 1: Bottom Connector (Box 1 to Box 2) -->
    <div
      class="hidden lg:block absolute -bottom-[3rem] left-[calc(16.666%-8px)] right-[50%] h-[3rem] pointer-events-none opacity-0 concept-arrow"
      bind:clientWidth={arrow1Width}
    >
      <svg width="100%" height="100%" class="overflow-visible">
        <path 
          d={`M 1,1 L 1,47 L ${Math.max(1, arrow1Width - 1)},47 L ${Math.max(1, arrow1Width - 1)},1`}
          fill="none" 
          class="stroke-foreground/40" 
          stroke-width="2" 
          pathLength="1"
          style="stroke-dasharray: 1; stroke-dashoffset: var(--dash-offset, 1);"
        />
      </svg>
    </div>

    <!-- Arrow 2: Top Connector (Box 2 to Box 3) -->
    <div
      class="hidden lg:block absolute -top-[3rem] left-[50%] right-[calc(16.666%-8px)] h-[3.5rem] pointer-events-none opacity-0 concept-arrow"
      bind:clientWidth={arrow2Width}
    >
      <svg width="100%" height="100%" class="overflow-visible">
        <path 
          d={`M 1,55 L 1,1 L ${Math.max(1, arrow2Width - 1)},1 L ${Math.max(1, arrow2Width - 1)},55`}
          fill="none" 
          class="stroke-foreground/40" 
          stroke-width="2" 
          pathLength="1"
          style="stroke-dasharray: 1; stroke-dashoffset: var(--dash-offset, 1);"
        />
      </svg>
    </div>

    <!-- Step 1 -->
    <TuiContainer
      label="01"
      borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
      textColor="text-primary font-bold"
      class="concept-box opacity-0 flex-1 min-h-[450px] lg:min-h-[500px] p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
    >
      <div class="relative z-10 flex flex-col h-full justify-between gap-4">
        <h3
          class="text-4xl lg:text-5xl font-black font-nippo text-foreground uppercase tracking-tight"
        >
          Tell Me The<br /><span class="text-primary text-5xl sm:text-6xl lg:text-8xl"
            >Problem.</span
          >
        </h3>
        <p
          class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
        >
          Everything starts with a <span class="text-primary font-bold"
            >bottleneck</span
          >. Just shoot me a message and tell me what's
          <span class="text-primary font-bold">slowing you down</span>, costing you money, or driving you crazy. Don't worry about
          the technical details yet—just explain the
          <span class="text-primary font-bold">core issue</span> you want fixed.
        </p>
      </div>
    </TuiContainer>

    <!-- Step 2 -->
    <TuiContainer
      label="02"
      borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
      textColor="text-primary font-bold"
      class="concept-box opacity-0 flex-1 min-h-[450px] lg:min-h-[500px] p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
    >
      <div class="relative z-10 flex flex-col h-full justify-between gap-4">
        <h3
          class="text-4xl lg:text-5xl font-black font-nippo text-foreground uppercase tracking-tight"
        >
          Designing A<br /><span class="text-primary text-5xl sm:text-6xl lg:text-8xl"
            >Solution.</span
          >
        </h3>
        <p
          class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
        >
          I don't just start blindly typing code. I actually take the time to <span class="text-primary font-bold"
            >figure out the best approach</span
          > for your specific situation. We'll look at the
          <span class="text-primary font-bold">right tools for the job</span>
          and map out a
          <span class="text-primary font-bold"
            >solid, cost-effective game plan</span
          > that makes sense for you.
        </p>
      </div>
    </TuiContainer>

    <!-- Step 3 -->
    <TuiContainer
      label="03"
      borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
      textColor="text-primary font-bold"
      class="concept-box opacity-0 flex-1 min-h-[450px] lg:min-h-[500px] p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
    >
      <div class="relative z-10 flex flex-col h-full justify-between gap-4">
        <h3
          class="text-4xl lg:text-5xl font-black font-nippo text-foreground uppercase tracking-tight"
        >
          Building The<br /><span class="text-primary text-5xl sm:text-6xl lg:text-8xl"
            >Product.</span
          >
        </h3>
        <p
          class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
        >
          From the first prototype all the way to <span class="text-primary font-bold"
            >launch day</span
          >, I'll handle the heavy lifting. You'll get a
          <span class="text-primary font-bold"
            >fully polished app</span
          >
          that actually solves the problem we talked about in step one,
          complete with a
          <span class="text-primary font-bold"
            >super smooth user experience</span
          >.
        </p>
      </div>
    </TuiContainer>
  </div>
</section>
