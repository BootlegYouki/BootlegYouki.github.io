<script lang="ts">
  import TuiContainer from "@/components/ui/TuiContainer.svelte";
</script>

<div class="w-full min-h-[95vh] flex flex-col lg:flex-row gap-6 p-6">
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
            <span class="block">Hello!</span>
            <span class="block">I'm Mark Darren</span>
            <span class="block">Oandasan</span>
          </h2>

          <p class="text-[clamp(14px,1.3vw,18px)] text-foreground font-bold leading-relaxed font-mono max-w-2xl">
            <span class="block">
              I build responsive <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">web</code> & <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.2vw,16px)] font-mono text-foreground font-extrabold">mobile</code> apps, with a focus on
            </span>
            <span class="block">
              crafting intuitive <span class="text-primary font-black border-b border-primary/40">UI/UX designs</span> and integrating intelligent
            </span>
            <span class="block">
              <span class="text-primary font-black border-b border-primary/40">AI capabilities</span> into software.
            </span>
          </p>
        </div>

        <div class="flex-1"></div>

        <div class="w-full">
          <hr class="border-t border-border/40 w-full" />
          <div class="pt-6 font-mono max-w-2xl">
            <p class="text-[clamp(12px,1.1vw,15px)] text-muted-foreground leading-relaxed">
              <span class="block">
                I specialize in building responsive, modern web interfaces and cross-
              </span>
              <span class="block">
                platform mobile apps. Blending clean engineering with intuitive design, I
              </span>
              <span class="block">
                focus on crafting premium user interfaces (UI/UX) and integrating advanced
              </span>
              <span class="block">
                AI capabilities directly into software systems to create intelligent,
              </span>
              <span class="block">
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
        <div class="flex-1 w-full bg-card/20 border border-dashed border-border/60 flex items-center justify-center text-muted-foreground font-mono select-none">
          [ PHOTO PLACEHOLDER 1 ]
        </div>
        <div class="flex-1 w-full bg-card/20 border border-dashed border-border/60 flex items-center justify-center text-muted-foreground font-mono select-none">
          [ PHOTO PLACEHOLDER 2 ]
        </div>
      </div>
    </TuiContainer>
  </div>
</div>
