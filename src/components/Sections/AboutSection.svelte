<script lang="ts">
  import { onMount } from "svelte";
  import TuiContainer from "@/components/ui/TuiContainer.svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import photo1 from "@/assets/Photos/Photo1.webp";
  import photo2 from "@/assets/Photos/Photo2.webp";

  gsap.registerPlugin(ScrollTrigger);

  let containerRef = $state<HTMLElement>();

  onMount(() => {
    if (!containerRef) return;
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".about-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef,
            start: "top 85%",
          }
        }
      );

      // Containers animation
      ScrollTrigger.create({
        trigger: ".about-container",
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            [".about-left-container", ".about-right-container"],
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {
          gsap.fromTo(
            [".about-left-container", ".about-right-container"],
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -30,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            [".about-left-container", ".about-right-container"],
            { opacity: 0, y: -30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            [".about-left-container", ".about-right-container"],
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: 30,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            }
          );
        }
      });

      // Helper function to create direction-sensitive scroll reveals
      const createScrollDirectionReveal = (target: string, viewportThreshold: string, scaleEffect = false) => {
        gsap.set(target, { opacity: 0 });

        ScrollTrigger.create({
          trigger: target,
          start: `top ${viewportThreshold}`,
          onEnter: () => {
            gsap.fromTo(
              target,
              { opacity: 0, y: 25, scale: scaleEffect ? 0.96 : 1 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
            );
          },
          onLeave: () => {
            gsap.fromTo(
              target,
              { opacity: 1, y: 0 },
              { opacity: 0, y: -25, duration: 0.25, ease: "power2.in", overwrite: "auto" }
            );
          },
          onEnterBack: () => {
            gsap.fromTo(
              target,
              { opacity: 0, y: -25, scale: scaleEffect ? 0.96 : 1 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
            );
          },
          onLeaveBack: () => {
            gsap.fromTo(
              target,
              { opacity: 1, y: 0 },
              { opacity: 0, y: 25, duration: 0.25, ease: "power2.in", overwrite: "auto" }
            );
          }
        });
      };

      // Title line 1: Hello!
      createScrollDirectionReveal(".gsap-reveal-title-1", "76%");
      
      // Title line 2: I'm Mark Darren
      createScrollDirectionReveal(".gsap-reveal-title-2", "74%");
      
      // Title line 3: Oandasan
      createScrollDirectionReveal(".gsap-reveal-title-3", "72%");
      
      // Lead text: paragraph 1 (line-by-line reveals)
      createScrollDirectionReveal(".gsap-reveal-lead-1", "72%");
      createScrollDirectionReveal(".gsap-reveal-lead-2", "70%");
      createScrollDirectionReveal(".gsap-reveal-lead-3", "68%");
      
      // Divider line
      createScrollDirectionReveal(".gsap-reveal-line", "96%");
      
      // Bio paragraph: text at the bottom (line-by-line reveals)
      createScrollDirectionReveal(".gsap-reveal-bio-1", "95%");
      createScrollDirectionReveal(".gsap-reveal-bio-2", "93%");
      createScrollDirectionReveal(".gsap-reveal-bio-3", "91%");
      createScrollDirectionReveal(".gsap-reveal-bio-4", "89%");
      createScrollDirectionReveal(".gsap-reveal-bio-5", "87%");

      // Portrait Box 1
      createScrollDirectionReveal(".gsap-reveal-img-1", "72%");

      // Portrait Box 2
      createScrollDirectionReveal(".gsap-reveal-img-2", "68%");
    }, containerRef);

    return () => ctx.revert();
  });
</script>

<section id="about-section" bind:this={containerRef} class="w-full px-6 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in flex flex-col justify-start relative z-10" style="min-height: calc(var(--vh, 1vh) * 100);">
  <!-- Centered About Header -->
  <header class="flex flex-col items-center justify-center py-8 md:py-12 mb-8 select-none">
    <h2 class="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground about-header opacity-0 uppercase">
      Who Am I
    </h2>
  </header>

  <div class="w-full flex flex-col lg:flex-row gap-6 relative z-10 about-container">
  <!-- Left Container: Bio / Info -->
  <div class="w-full lg:w-2/3 flex flex-col lg:min-h-0 about-left-container opacity-0">
    <TuiContainer
      label="ABOUT"
      borderColor="border-border/80 hover:border-foreground/40"
      textColor="text-foreground/80 font-bold"
      class="flex-1 h-full flex flex-col justify-between !p-0 [&>legend]:ml-4"
    >
      <article class="flex flex-col justify-between h-full flex-1 p-6 md:p-12">
        <div>
          <h2 class="text-[clamp(40px,8vw,100px)] font-extrabold font-nippo leading-[1.1] tracking-tight text-foreground mb-8">
            <span class="block gsap-reveal-title-1">Hello!</span>
            <span class="block gsap-reveal-title-2">I'm Mark Darren</span>
            <span class="block gsap-reveal-title-3">Oandasan</span>
          </h2>

          <p class="text-[clamp(14px,1.3vw,18px)] text-foreground font-bold leading-relaxed font-mono max-w-2xl">
            <span class="block gsap-reveal-lead-1">
              I love building <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">web</code> & <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">mobile</code> apps that don't just work,
            </span>
            <span class="block gsap-reveal-lead-2">
              but feel amazing to use. My sweet spot is mixing clean <span class="text-primary font-black border-b border-primary/40">UI/UX design</span>
            </span>
            <span class="block gsap-reveal-lead-3">
              with cool <span class="text-primary font-black border-b border-primary/40">AI features</span> to make things smarter.
            </span>
          </p>
        </div>

        <div class="flex-1"></div>

        <div class="w-full">
          <hr class="border-t border-border/40 w-full gsap-reveal-line" />
          <div class="pt-6 font-mono max-w-2xl">
            <p class="text-[clamp(12px,1.1vw,15px)] text-muted-foreground leading-relaxed">
              <span class="block gsap-reveal-bio-1">
                I'm a developer who genuinely enjoys the whole stack—from wiring up
              </span>
              <span class="block gsap-reveal-bio-2">
                the backend to obsessing over the tiniest animation details on the
              </span>
              <span class="block gsap-reveal-bio-3">
                frontend. Whether I'm crafting a sleek cross-platform mobile app
              </span>
              <span class="block gsap-reveal-bio-4">
                or hooking up a powerful AI agent, I just want to build cool stuff
              </span>
              <span class="block gsap-reveal-bio-5">
                that solves real problems and looks good doing it.
              </span>
            </p>
          </div>
        </div>
      </article>
    </TuiContainer>
  </div>

  <!-- Right Container: Photo -->
  <div class="w-full lg:w-1/3 flex flex-col about-right-container opacity-0">
    <TuiContainer
      label="PORTRAIT"
      borderColor="border-border/80 hover:border-foreground/40"
      textColor="text-foreground/80 font-bold"
      class="h-full flex flex-col justify-center p-6"
    >
      <div class="w-full h-full min-h-[500px] lg:min-h-0 relative">
        <div class="absolute inset-0 flex flex-col gap-4">
          <figure class="flex-1 min-h-0 w-full border border-border/60 overflow-hidden gsap-reveal-img-1 relative group/photo1 m-0">
            <img src={photo1} alt="Mark Darren Oandasan - Casual Portrait" class="w-full h-full object-cover object-[75%_center] scale-[1.3] transition-all duration-500 filter grayscale group-hover/photo1:grayscale-0" />
            <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover/photo1:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </figure>
          <figure class="flex-1 min-h-0 w-full border border-border/60 overflow-hidden gsap-reveal-img-2 relative group/photo2 m-0">
            <img src={photo2} alt="Mark Darren Oandasan - Developer Portrait" class="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover/photo2:grayscale-0" />
            <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover/photo2:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </figure>
        </div>
      </div>
    </TuiContainer>
  </div>
  </div>
</section>

<style>
  .about-container {
    min-height: calc(var(--vh, 1vh) * 85);
  }
  .about-left-container {
    min-height: calc(var(--vh, 1vh) * 80);
  }
  @media (min-width: 1024px) {
    .about-left-container {
      min-height: 0;
    }
  }
</style>
