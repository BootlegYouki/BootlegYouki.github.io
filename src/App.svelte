<script lang="ts">
  import { onMount } from "svelte";
  import ScrollProgress from "@/components/ui/ScrollProgress.svelte";
  import ScrollToTop from "@/components/ui/ScrollToTop.svelte";
  import MouseTrail from "@/components/ui/MouseTrail.svelte";
  import IntroSection from "@/components/Sections/IntroSection.svelte";
  import TechTicker from "@/components/ui/TechTicker.svelte";
  import AboutSection from "@/components/Sections/AboutSection.svelte";
  import ProjectsSection from "@/components/Sections/ProjectsSection.svelte";
  import ConceptSection from "@/components/Sections/ConceptSection.svelte";
  import ContactSection from "@/components/Sections/ContactSection.svelte";

  import Lenis from "lenis";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let introExpanded = $state(false);

  onMount(() => {
    // Set dynamic viewport height variable for mobile devices
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateVh();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateVh();
      }
    };
    window.addEventListener("resize", handleResize);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08, // Controls the deceleration speed
    });
    (window as any).lenis = lenis;

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
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<div 
  class="bg-background text-foreground font-mono transition-colors duration-300 relative"
  style="min-height: calc(var(--vh, 1vh) * 100);"
>
  <ScrollProgress />
  <ScrollToTop />
  <MouseTrail />
  <!-- Main container holding the sections -->
  <main class="w-full p-0 flex flex-col">
    <IntroSection />
    {#if introExpanded}
      <div class="animate-fade-in duration-500">
        <TechTicker />
        <ProjectsSection />
        <AboutSection />
        <ConceptSection />
        <ContactSection />

      </div>
    {/if}
  </main>
</div>
