<script lang="ts">
  import { onMount } from "svelte";
  import TuiContainer from "@/components/ui/TuiContainer.svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let containerRef = $state<HTMLDivElement>();

  onMount(() => {
    if (!containerRef) return;
    const ctx = gsap.context(() => {
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
      createScrollDirectionReveal(".gsap-reveal-title-1", "96%");
      
      // Title line 2: I'm Mark Darren
      createScrollDirectionReveal(".gsap-reveal-title-2", "95%");
      
      // Title line 3: Oandasan
      createScrollDirectionReveal(".gsap-reveal-title-3", "94%");
      
      // Lead text: paragraph 1 (line-by-line reveals)
      createScrollDirectionReveal(".gsap-reveal-lead-1", "94%");
      createScrollDirectionReveal(".gsap-reveal-lead-2", "93%");
      createScrollDirectionReveal(".gsap-reveal-lead-3", "92%");
      
      // Divider line
      createScrollDirectionReveal(".gsap-reveal-line", "92%");
      
      // Bio paragraph: text at the bottom (line-by-line reveals)
      createScrollDirectionReveal(".gsap-reveal-bio-1", "95%");
      createScrollDirectionReveal(".gsap-reveal-bio-2", "95%");
      createScrollDirectionReveal(".gsap-reveal-bio-3", "95%");
      createScrollDirectionReveal(".gsap-reveal-bio-4", "95%");
      createScrollDirectionReveal(".gsap-reveal-bio-5", "95%");

      // Portrait Box 1
      createScrollDirectionReveal(".gsap-reveal-img-1", "94%", true);

      // Portrait Box 2
      createScrollDirectionReveal(".gsap-reveal-img-2", "90%", true);
    }, containerRef);

    return () => ctx.revert();
  });
</script>

<div 
  bind:this={containerRef}
  class="w-full min-h-[95vh] flex flex-col lg:flex-row gap-6 p-6 animate-fade-in"
>
  <!-- Left Container: Bio / Info -->
  <div class="w-full lg:w-2/3 flex flex-col">
    <TuiContainer
      label="ABOUT"
      borderColor="border-border/80 hover:border-foreground/40"
      textColor="text-foreground/80 font-bold"
      class="h-full flex flex-col justify-between p-6 md:p-12"
    >
      <div class="flex flex-col justify-between h-full flex-1 py-4">
        <div>
          <h2 class="text-[clamp(40px,8vw,100px)] font-extrabold font-nippo leading-[1.1] tracking-tight text-foreground mb-8">
            <span class="block gsap-reveal-title-1">Hello!</span>
            <span class="block gsap-reveal-title-2">I'm Mark Darren</span>
            <span class="block gsap-reveal-title-3">Oandasan</span>
          </h2>

          <p class="text-[clamp(14px,1.3vw,18px)] text-foreground font-bold leading-relaxed font-mono max-w-2xl">
            <span class="block gsap-reveal-lead-1">
              I build responsive <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">web</code> & <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">mobile</code> apps, with a focus on
            </span>
            <span class="block gsap-reveal-lead-2">
              crafting intuitive <span class="text-primary font-black border-b border-primary/40">UI/UX designs</span> and integrating intelligent
            </span>
            <span class="block gsap-reveal-lead-3">
              <span class="text-primary font-black border-b border-primary/40">AI capabilities</span> into software.
            </span>
          </p>
        </div>

        <div class="flex-1"></div>

        <div class="w-full">
          <hr class="border-t border-border/40 w-full gsap-reveal-line" />
          <div class="pt-6 font-mono max-w-2xl">
            <p class="text-[clamp(12px,1.1vw,15px)] text-muted-foreground leading-relaxed">
              <span class="block gsap-reveal-bio-1">
                I specialize in building responsive, modern web interfaces and cross-
              </span>
              <span class="block gsap-reveal-bio-2">
                platform mobile apps. Blending clean engineering with intuitive design, I
              </span>
              <span class="block gsap-reveal-bio-3">
                focus on crafting premium user interfaces (UI/UX) and integrating advanced
              </span>
              <span class="block gsap-reveal-bio-4">
                AI capabilities directly into software systems to create intelligent,
              </span>
              <span class="block gsap-reveal-bio-5">
                user-first solutions.
              </span>
            </p>
          </div>
        </div>
      </div>
    </TuiContainer>
  </div>

  <!-- Right Container: Photo -->
  <div class="w-full lg:w-1/3 flex flex-col">
    <TuiContainer
      label="PORTRAIT"
      borderColor="border-border/80 hover:border-foreground/40"
      textColor="text-foreground/80 font-bold"
      class="h-full flex flex-col justify-center p-6"
    >
      <div class="flex flex-col gap-4 h-full">
        <div class="flex-1 w-full bg-card/20 border border-dashed border-border/60 flex items-center justify-center text-muted-foreground font-mono select-none gsap-reveal-img-1">
          [ PHOTO PLACEHOLDER 1 ]
        </div>
        <div class="flex-1 w-full bg-card/20 border border-dashed border-border/60 flex items-center justify-center text-muted-foreground font-mono select-none gsap-reveal-img-2">
          [ PHOTO PLACEHOLDER 2 ]
        </div>
      </div>
    </TuiContainer>
  </div>
</div>
