<script lang="ts">
  import { cn } from "@/lib/utils";
  import Icons from "@/components/ui/Icons.svelte";

  const tools = [
    { name: "React", icon: "react", color: "#61dafb", description: "Component-based UI library for building dynamic, responsive web interfaces.", hoverStyle: "hover:bg-[#61dafb]/15 hover:border-[#61dafb]/80 hover:text-[#61dafb] hover:shadow-[0_0_20px_rgba(97,218,251,0.2)]" },
    { name: "Vite", icon: "vite", color: "#bd34fe", description: "Next-generation, ultra-fast frontend build tool and dev server.", hoverStyle: "hover:bg-[#bd34fe]/15 hover:border-[#bd34fe]/80 hover:text-[#bd34fe] hover:shadow-[0_0_20px_rgba(189,52,254,0.2)]" },
    { name: "Tauri", icon: "tauri", color: "#24c8db", description: "Secure, lightweight framework for building tiny desktop apps with web frontends.", hoverStyle: "hover:bg-[#24c8db]/15 hover:border-[#24c8db]/80 hover:text-[#24c8db] hover:shadow-[0_0_20px_rgba(36,200,219,0.2)]" },
    { name: "Node.js", icon: "nodejs", color: "#339933", description: "JavaScript runtime environment designed for building scalable server-side applications.", hoverStyle: "hover:bg-[#339933]/15 hover:border-[#339933]/80 hover:text-[#339933] hover:shadow-[0_0_20px_rgba(51,153,51,0.2)]" },
    { name: "TypeScript", icon: "typescript", color: "#3178c6", description: "Strongly typed superset of JavaScript that compiles to plain JavaScript.", hoverStyle: "hover:bg-[#3178c6]/15 hover:border-[#3178c6]/80 hover:text-[#3178c6] hover:shadow-[0_0_20px_rgba(49,120,198,0.2)]" },
    { name: "Electron", icon: "electron", color: "#47848f", description: "Framework for building cross-platform desktop apps using web technologies.", hoverStyle: "hover:bg-[#47848f]/15 hover:border-[#47848f]/80 hover:text-[#47848f] hover:shadow-[0_0_20px_rgba(71,132,143,0.2)]" },
    { name: "TailwindCSS", icon: "tailwindcss", color: "#38bdf8", description: "Utility-first CSS framework for rapid and responsive UI development.", hoverStyle: "hover:bg-[#38bdf8]/15 hover:border-[#38bdf8]/80 hover:text-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]" },
    { name: "CSS3", icon: "css", color: "#1572b6", description: "Cascading Style Sheets for describing the presentation of web pages.", hoverStyle: "hover:bg-[#1572b6]/15 hover:border-[#1572b6]/80 hover:text-[#1572b6] hover:shadow-[0_0_20px_rgba(21,114,182,0.2)]" },
    { name: "Svelte", icon: "svelte", color: "#ff3e00", description: "Compiler-based framework that compiles components to tiny, vanilla JavaScript.", hoverStyle: "hover:bg-[#ff3e00]/15 hover:border-[#ff3e00]/80 hover:text-[#ff3e00] hover:shadow-[0_0_20px_rgba(255,62,0,0.2)]" },
    { name: "React Native", icon: "react", color: "#61dafb", description: "Framework for building native mobile applications using React.", hoverStyle: "hover:bg-[#61dafb]/15 hover:border-[#61dafb]/80 hover:text-[#61dafb] hover:shadow-[0_0_20px_rgba(97,218,251,0.2)]" },
    { name: "Expo", icon: "expo", color: "#e2e8f0", description: "Platform and ecosystem for universal React applications running on Android, iOS, and web.", hoverStyle: "hover:bg-foreground/10 hover:border-foreground/80 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", iconClass: "dark:invert" },
    { name: "GitHub", icon: "github", color: "#e2e8f0", description: "World's leading AI-powered developer platform to build, scale, and deliver secure software.", hoverStyle: "hover:bg-foreground/10 hover:border-foreground/80 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", iconClass: "dark:invert" },
    { name: "HTML5", icon: "html", color: "#e34f26", description: "Standard markup language for structure and content presentation on the World Wide Web.", hoverStyle: "hover:bg-[#e34f26]/15 hover:border-[#e34f26]/80 hover:text-[#e34f26] hover:shadow-[0_0_20px_rgba(227,79,38,0.2)]" },
    { name: "PostgreSQL", icon: "postgresql", color: "#4169e1", description: "Powerful, open-source object-relational database system.", hoverStyle: "hover:bg-[#4169e1]/15 hover:border-[#4169e1]/80 hover:text-[#4169e1] hover:shadow-[0_0_20px_rgba(65,105,225,0.2)]" },
    { name: "SQLite", icon: "sqlite", color: "#003b57", description: "Lightweight, serverless, self-contained SQL database engine.", hoverStyle: "hover:bg-[#003b57]/15 hover:border-[#003b57]/80 hover:text-[#003b57] hover:shadow-[0_0_20px_rgba(0,59,87,0.2)]" },
    { name: "Supabase", icon: "supabase", color: "#3ecf8e", description: "Open-source Firebase alternative providing database, auth, and real-time APIs.", hoverStyle: "hover:bg-[#3ecf8e]/15 hover:border-[#3ecf8e]/80 hover:text-[#3ecf8e] hover:shadow-[0_0_20px_rgba(62,207,142,0.2)]" },
    { name: "Rust", icon: "rust", color: "#ce412b", description: "Systems programming language focused on safety, speed, and concurrency.", hoverStyle: "hover:bg-[#ce412b]/15 hover:border-[#ce412b]/80 hover:text-[#ce412b] hover:shadow-[0_0_20px_rgba(206,65,43,0.2)]", iconClass: "dark:invert" }
  ];

  // Repeat the tools array to build a seamless marquee
  const repeatedTools = [...tools, ...tools, ...tools, ...tools];

  let isPaused = $state(false);
  let position = $state(0);
  let isDragging = $state(false);
  let containerWidth = 0;
  let singleWidth = 0;
  let container: HTMLDivElement;

  let startX = 0;
  let startPosition = 0;
  let dragDistance = 0;
  let wasDragging = false;

  function pauseScrolling() {
    isPaused = true;
  }

  function resumeScrolling() {
    isPaused = false;
  }

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDragging = true;
    startX = e.clientX;
    startPosition = position;
    dragDistance = 0;
    if (container) {
      container.setPointerCapture(e.pointerId);
    }
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    dragDistance = Math.abs(deltaX);
    
    let newPos = startPosition + deltaX;
    
    if (singleWidth > 0) {
      // Keeps the position within [-singleWidth, 0] seamlessly
      newPos = ((newPos % singleWidth) - singleWidth) % singleWidth;
    }
    position = newPos;
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
    if (container) {
      container.releasePointerCapture(e.pointerId);
    }
    
    if (dragDistance > 5) {
      wasDragging = true;
      setTimeout(() => {
        wasDragging = false;
      }, 50);
    }
  }

  function onClick(e: MouseEvent) {
    if (wasDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  $effect(() => {
    if (!container) return;
    
    const updateWidths = () => {
      containerWidth = container.scrollWidth;
      singleWidth = containerWidth / 4;
    };
    
    updateWidths();
    window.addEventListener("resize", updateWidths);
    
    let lastTime = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && !isDragging && singleWidth > 0) {
        // Match the original 80s linear marquee speed: (2 * singleWidth) / 80000 ms
        const speed = (2 * singleWidth) / 80000;
        position -= speed * delta;
        
        // Wrap position
        if (position <= -singleWidth) {
          position += singleWidth;
        }
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateWidths);
      cancelAnimationFrame(frameId);
    };
  });
</script>

<div 
  class="w-full py-4 md:py-6 select-none bg-card/10 overflow-hidden relative touch-none"
>
  <!-- Overlay Gradients for smooth fade out at edges -->
  <div class="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
  <div class="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    bind:this={container}
    class={cn(
      "flex gap-4 md:gap-8 w-max cursor-grab active:cursor-grabbing will-change-transform"
    )}
    style="transform: translate3d({position}px, 0, 0);"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    onclick={onClick}
    onmouseenter={pauseScrolling}
    onmouseleave={resumeScrolling}
  >
    {#each repeatedTools as tool, idx}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span
        class={cn(
          "group border border-border/60 px-6 py-3 md:px-10 md:py-5 text-sm md:text-xl font-extrabold text-muted-foreground cursor-pointer transition-all duration-200 bg-card/20 rounded-none font-mono whitespace-nowrap inline-flex items-center gap-3 md:gap-4",
          tool.hoverStyle
        )}
        onmouseenter={pauseScrolling}
        onmouseleave={resumeScrolling}
      >
        <Icons
          name={tool.icon as any}
          class={cn(
            "h-6 md:h-8 w-auto opacity-60 dark:opacity-85 group-hover:opacity-100 transition-all duration-200 select-none pointer-events-none",
            tool.iconClass
          )}
        />
        {tool.name}
      </span>
    {/each}
  </div>
</div>
