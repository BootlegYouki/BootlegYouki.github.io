<script lang="ts">
  import { onMount } from "svelte";
  import ScrollProgress from "@/components/ScrollProgress.svelte";
  import IntroSection from "@/components/IntroSection.svelte";
  import TechTicker from "@/components/TechTicker.svelte";
  import AboutSection from "@/components/AboutSection.svelte";
  import ProjectsSection from "@/components/ProjectsSection.svelte";
  import Lenis from "lenis";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let introExpanded = $state(false);

  onMount(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08, // Controls the deceleration speed
    });

    // Connect Lenis scroll events to ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis rendering loops into the GSAP ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Stagger rendering of below sections until Intro is fully expanded (1885ms)
    const timer = setTimeout(() => {
      introExpanded = true;
      // Recalculate ScrollTrigger positions once sections render in
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 1885);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  });
</script>

<div class="min-h-screen bg-background text-foreground font-mono transition-colors duration-300 relative">
  <ScrollProgress />
  <!-- Main container holding the sections -->
  <main class="w-full p-0 flex flex-col">
    <IntroSection />
    {#if introExpanded}
      <div class="animate-fade-in duration-500">
        <TechTicker />
        <AboutSection />
        <ProjectsSection />
      </div>
    {/if}
  </main>
</div>
