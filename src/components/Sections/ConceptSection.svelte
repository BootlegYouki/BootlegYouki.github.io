<script lang="ts">
  import { onMount } from "svelte"
  import TuiContainer from "@/components/ui/TuiContainer.svelte"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"

  gsap.registerPlugin(ScrollTrigger)

  let containerRef = $state<HTMLElement>()
  let rowRef = $state<HTMLDivElement>()
  let arrow1Width = $state(0)
  let arrow2Width = $state(0)

  onMount(() => {
    if (!containerRef) return

    const ctx = gsap.context(() => {


      // Create a single timeline for the arrows so GSAP perfectly manages the playhead
      // This prevents animations from fighting if you scroll rapidly back and forth
      const arrowTl = gsap.timeline({ paused: true });
      
      arrowTl.fromTo(
        ".concept-arrow",
        { opacity: 1, "--dash-offset": 1 },
        {
          "--dash-offset": 0,
          duration: 0.8,
          stagger: 0.7,
          ease: "power2.inOut",
        }
      );

      // Single coordinated entrance and exit for the arrows
      ScrollTrigger.create({
        trigger: rowRef,
        start: "top 50%",
        end: "bottom 40%",
        animation: arrowTl,
        toggleActions: "play reverse play reverse",
      });

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
  <header
    class="flex flex-col items-center justify-center py-8 md:py-12 mb-8 select-none"
  >
    <h2
      class="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground"
    >
      WORKFLOW
    </h2>
  </header>

  <div
    role="list"
    bind:this={rowRef}
    class="w-full flex flex-col lg:flex-row gap-6 relative z-10 lg:my-12 list-none p-0"
  >
    <!-- Arrow 1: Bottom Connector (Box 1 to Box 2) -->
    <div
      class="hidden lg:block absolute -bottom-12 left-[calc(16.666%-8px)] right-[50%] h-12 pointer-events-none opacity-0 concept-arrow"
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
      class="hidden lg:block absolute -top-12 left-[50%] right-[calc(16.666%-8px)] h-14 pointer-events-none opacity-0 concept-arrow"
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
    <div role="listitem" class="flex-1 flex flex-col">
      <TuiContainer
        label="01"
        borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
        textColor="text-primary font-bold"
        class="concept-box opacity-0 flex-1 min-h-112.5 lg:min-h-125 p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
      >
        <article class="relative z-10 flex flex-col h-full justify-between gap-4 flex-1">
          <h3
            class="font-black font-nippo text-foreground uppercase tracking-tight step-prefix"
          >
            Tell Me The<br />
            <span
              class="text-primary font-black font-nippo step-subject"
            >
              Problem.
            </span>
          </h3>
          <p
            class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
          >
            Everything starts with a <span class="text-primary font-bold"
              >bottleneck</span
            >. Just shoot me a message and tell me what's
            <span class="text-primary font-bold">slowing you down</span> or costing you money. You don't need
            the technical details yet. Just explain the
            <span class="text-primary font-bold">core issue</span> you want fixed.
          </p>
        </article>
      </TuiContainer>
    </div>

    <!-- Step 2 -->
    <div role="listitem" class="flex-1 flex flex-col">
      <TuiContainer
        label="02"
        borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
        textColor="text-primary font-bold"
        class="concept-box opacity-0 flex-1 min-h-112.5 lg:min-h-125 p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
      >
        <article class="relative z-10 flex flex-col h-full justify-between gap-4 flex-1">
          <h3
            class="font-black font-nippo text-foreground uppercase tracking-tight step-prefix"
          >
            Designing A<br />
            <span
              class="text-primary font-black font-nippo step-subject"
            >
              Solution.
            </span>
          </h3>
          <p
            class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
          >
            Before writing any code, I <span class="text-primary font-bold"
              >work out the best approach</span
            > for your situation. We'll pick the
            <span class="text-primary font-bold">right tools for the job</span>
            and map out a
            <span class="text-primary font-bold"
              >cost-effective plan</span
            > that fits your budget.
          </p>
        </article>
      </TuiContainer>
    </div>

    <!-- Step 3 -->
    <div role="listitem" class="flex-1 flex flex-col">
      <TuiContainer
        label="03"
        borderColor="border-border/80 hover:border-primary/50 transition-colors duration-500"
        textColor="text-primary font-bold"
        class="concept-box opacity-0 flex-1 min-h-112.5 lg:min-h-125 p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col gap-6 relative overflow-hidden group bg-card/5 hover:bg-card/10"
      >
        <article class="relative z-10 flex flex-col h-full justify-between gap-4 flex-1">
          <h3
            class="font-black font-nippo text-foreground uppercase tracking-tight step-prefix"
          >
            Building The<br />
            <span
              class="text-primary font-black font-nippo step-subject"
            >
              Product.
            </span>
          </h3>
          <p
            class="text-muted-foreground text-base lg:text-lg leading-relaxed font-mono"
          >
            From the first prototype all the way to <span class="text-primary font-bold"
              >launch day</span
            >, I'll handle the heavy lifting. You'll get a
            <span class="text-primary font-bold"
              >functional app</span
            >
            that actually solves the problem we talked about in step one,
            complete with a
            <span class="text-primary font-bold"
              >clean user experience</span
            >.
          </p>
        </article>
      </TuiContainer>
    </div>
  </div>
</section>

<style>
  .step-prefix {
    font-size: clamp(2.25rem, 5vw, 3rem);
    line-height: 1.05;
  }
  .step-subject {
    font-size: clamp(3rem, 8vw, 4.5rem);
    line-height: 0.95;
  }

  @media (min-width: 1024px) {
    .step-prefix {
      font-size: clamp(2rem, 2.5vw, 4rem);
    }
    .step-subject {
      font-size: clamp(3rem, 4.5vw, 7rem);
    }
  }
</style>
