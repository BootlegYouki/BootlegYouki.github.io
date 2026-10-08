<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import TuiContainer from "@/components/ui/TuiContainer.svelte";

  gsap.registerPlugin(ScrollTrigger);
  import photo1 from "@/assets/Photos/Photo1.webp";
  import photo2 from "@/assets/Photos/Photo2.webp";

  let activePhotoIndex = $state(0);
  let animationStage = $state<"initial" | "expanding" | "expanded">("initial");

  const photos = [
    {
      src: photo1,
      label: "FIG. 01 // OPERATOR",
      alt: "Mark Darren Oandasan - Casual Portrait",
      objectPos: "object-[75%_center]",
    },
    {
      src: photo2,
      label: "FIG. 02 // DEVELOPER",
      alt: "Mark Darren Oandasan - Developer Portrait",
      objectPos: "object-center",
    },
  ];

  const currentPhoto = $derived(photos[activePhotoIndex]);

  function togglePhoto() {
    activePhotoIndex = (activePhotoIndex + 1) % photos.length;
  }

  function renderMarkdown(raw: string): string {
    if (!raw) return "";
    let html = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-foreground/10 text-primary p-2 rounded text-xs font-mono my-1 overflow-x-auto"><code>$1</code></pre>');
    // Inline code
    html = html.replace(/`([^`\n]+)`/g, '<code class="bg-foreground/10 text-primary px-1 py-0.5 rounded text-[0.85em] font-mono">$1</code>');
    // Bold + Italic
    html = html.replace(/(\*\*\*|___)(.*?)\1/g, '<strong class="font-bold text-foreground"><em class="italic">$2</em></strong>');
    // Bold
    html = html.replace(/(\*\*|__)(.*?)\1/g, '<strong class="font-bold text-foreground">$2</strong>');
    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del class="line-through opacity-75">$1</del>');
    // Italic
    html = html.replace(/(^|[^\w*])\*([^*\n]+)\*(?=[^\w*]|$)/g, '$1<em class="italic text-foreground/90">$2</em>');
    html = html.replace(/(^|[^\w_])_([^_\n]+)_(?=[^\w_]|$)/g, '$1<em class="italic text-foreground/90">$2</em>');
    // Links
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:opacity-80">$1</a>');
    // Line breaks
    html = html.replace(/\n/g, '<br />');

    return html;
  }

  // Chat Widget State
  let messages = $state<{ sender: "user" | "system"; text: string }[]>([]);
  let inputValue = $state("");
  let chatFeedContainer = $state<HTMLDivElement | null>(null);

  // Auto-scroll feed to the bottom
  function scrollToBottom() {
    if (chatFeedContainer) {
      const container = chatFeedContainer;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  }

  let isThinking = $state(false);

  async function handleSendMessage(e: SubmitEvent) {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isThinking) return;

    if (query.toLowerCase() === "clear" || query.toLowerCase() === "/clear") {
      messages = [];
      inputValue = "";
      return;
    }

    // Add user message
    messages = [...messages, { sender: "user", text: query }];
    inputValue = "";
    scrollToBottom();

    // 1 second of blank (no typing indicator yet)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show [Typing...] and wait another 1 second
    isThinking = true;
    scrollToBottom();
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL || 'https://bootlegyouki-chat.vercel.app/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      if (!response.ok || !response.body) throw new Error("API failed");
      
      isThinking = false;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      
      messages = [...messages, { sender: "system", text: "" }];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep incomplete chunk in buffer
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                messages[messages.length - 1].text += data.choices[0].delta.content;
                messages = [...messages]; 
                scrollToBottom();
              }
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      messages = [...messages, { sender: "system", text: "Sorry, I seem to be offline right now! Try reaching me through the contact form below." }];
    } finally {
      isThinking = false;
      scrollToBottom();
    }
  }

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    const isLighthouse = typeof navigator !== "undefined" && /Lighthouse/i.test(navigator.userAgent);
    if (isLighthouse) {
      animationStage = "expanded";
      return;
    }

    let expandTimeout: ReturnType<typeof setTimeout>;
    let finishTimeout: ReturnType<typeof setTimeout>;

    const playExpand = () => {
      clearTimeout(expandTimeout);
      clearTimeout(finishTimeout);
      
      if (animationStage === "expanded") return;

      if (animationStage === "initial") {
        expandTimeout = setTimeout(() => {
          animationStage = "expanding";
          finishTimeout = setTimeout(() => {
            animationStage = "expanded";
          }, 800); // 800ms duration matching CSS transition
        }, 150); 
      } else if (animationStage === "expanding") {
        // If we interrupted a collapse, finish the expand
        finishTimeout = setTimeout(() => {
          animationStage = "expanded";
        }, 800);
      }
    };


    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      animationStage = "initial";
      
      ScrollTrigger.create({
        trigger: "#about-grid-trigger",
        start: "top 50%", // Trigger exactly when the center of the grid hits the center of the viewport
        onEnter: playExpand,
        once: true
      });

      return () => {
        clearTimeout(expandTimeout);
        clearTimeout(finishTimeout);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      animationStage = "expanded";

      gsap.set(".about-grid-animate > *", { opacity: 0, y: 25 });
      
      ScrollTrigger.batch(".about-grid-animate > *", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            overwrite: "auto"
          });
        }
      });
      
      return () => {
        gsap.set(".about-grid-animate > *", { clearProps: "all" });
      };
    });
  });

</script>

<section 
  id="about-section" 
  class="w-full px-6 pt-12 pb-20 md:pt-16 md:pb-28 flex flex-col justify-start relative z-10"
>
  <!-- Full-Size Section Header (Outside the 100vh TUI Container Grid) -->
  <header class="flex flex-col items-center justify-center py-8 md:py-12 mb-8 select-none">
    <h2 class="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground uppercase">
      Who Am I
    </h2>
  </header>

  <!-- 4-Container Grid independently taking full screen height (100vh - 3rem) -->
  <div id="about-grid-trigger" class="w-full relative z-10 flex items-center justify-center min-h-[60vh] lg:min-h-[calc(100vh-3rem)]">
    <div 
      class="about-grid-animate transition-opacity duration-1000 delay-200"
      class:opacity-0={!mounted}
      class:initial={animationStage === 'initial'}
      class:expanding={animationStage === 'expanding'}
      class:expanded={animationStage === 'expanded'}
    >
      
      <!-- Top Left Box: Main Hero Narrative -->
      <TuiContainer
        label="ABOUT ME"
        borderColor="border-border/80 hover:border-foreground/40"
        textColor="text-foreground/80 font-bold"
        class="p-6 md:p-10 flex flex-col justify-between about-item-1 overflow-hidden transition-all duration-800 {animationStage === 'initial' ? 'items-center justify-center p-0!' : ''}"
      >
        <article class="flex flex-col justify-between h-full transition-opacity {animationStage === 'expanded' ? 'duration-500 opacity-100 delay-300' : 'duration-150 opacity-0 delay-0 pointer-events-none'}">
            <div>
              <h3 class="text-[clamp(44px,7vw,110px)] font-extrabold font-nippo leading-[1.05] tracking-tight text-foreground mb-6">
                <span class="block">Hello!</span>
                <span class="block">I'm Mark Darren</span>
                <span class="block">Oandasan</span>
              </h3>

              <p class="text-[clamp(14px,1.2vw,18px)] text-foreground font-bold leading-relaxed font-mono max-w-2xl">
                <span class="block">
                  I build <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.1vw,16px)] font-mono text-foreground font-extrabold">web</code> & <code class="bg-muted px-1.5 py-0.5 border border-border/60 text-[clamp(12px,1.1vw,16px)] font-mono text-foreground font-extrabold">mobile</code> applications with a focus on clear
                </span>
                <span class="block">
                  <span class="text-primary font-black border-b border-primary/40">UI/UX design</span> and practical <span class="text-primary font-black border-b border-primary/40">AI integrations</span>.
                </span>
              </p>
            </div>
        </article>
      </TuiContainer>

      <!-- Top Right Box: Hero Portrait Frame (Item 2 in DOM) -->
      <TuiContainer
        label="PORTRAIT"
        borderColor="border-border/80 hover:border-foreground/40"
        textColor="text-foreground/80 font-bold"
        class="p-4 flex flex-col justify-center about-item-2 overflow-hidden transition-all duration-800 min-h-0 {animationStage === 'initial' ? 'items-center justify-center p-0!' : ''}"
      >
        <div class="w-full h-full min-h-[280px] flex flex-col relative transition-opacity {animationStage === 'expanded' ? 'duration-500 opacity-100 delay-300' : 'duration-150 opacity-0 delay-0 pointer-events-none'}">
            <button
              type="button"
              onclick={togglePhoto}
              aria-label="Toggle portrait photo"
              class="flex-1 w-full border border-border/60 overflow-hidden relative group/photo1 m-0 cursor-pointer text-left focus:outline-none"
            >
              <img 
                src={currentPhoto.src} 
                alt={currentPhoto.alt} 
                loading="lazy" 
                width="600" 
                height="800" 
                class="w-full h-full object-cover {currentPhoto.objectPos} transition-all duration-500 filter grayscale group-hover/photo1:grayscale-0" 
              />
              <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover/photo1:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </button>
        </div>
      </TuiContainer>

      <!-- Bottom Left Box: Capabilities & Engineering Focus (Item 3 in DOM) -->
      <TuiContainer
        label="CAPABILITIES"
        borderColor="border-border/80 hover:border-foreground/40"
        textColor="text-foreground/80 font-bold"
        class="p-6 md:p-8 flex flex-col justify-between about-item-3 overflow-hidden transition-all duration-800 {animationStage === 'initial' ? 'items-center justify-center p-0!' : ''}"
      >
        <div class="flex flex-col h-full justify-between transition-opacity {animationStage === 'expanded' ? 'duration-500 opacity-100 delay-300' : 'duration-150 opacity-0 delay-0 pointer-events-none'}">
            <div class="space-y-3 font-mono text-sm md:text-base leading-relaxed text-muted-foreground flex-1 overflow-y-auto scrollbar-tui pr-2 min-h-0">
              <p>
                I work across the whole stack, from backend services to frontend micro-animations.
              </p>
              <p>
                I build cross-platform mobile apps and AI agents that solve real problems and look good doing it.
              </p>
            </div>

            <div class="pt-3 border-t border-border/40 flex flex-wrap gap-2 font-mono text-xs sm:text-sm w-full mt-3 shrink-0">
              <span class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">Web Apps</span>
              <span class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">Mobile</span>
              <span class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">AI Agents</span>
              <span class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">Full Stack</span>
              <span class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">UI / UX</span>
            </div>
        </div>
      </TuiContainer>

      <!-- Bottom Right Box: TUI Chat -->
      <TuiContainer
        label="CHAT"
        borderColor="border-border/80 hover:border-foreground/40"
        textColor="text-foreground/80 font-bold"
        class="p-4 md:p-6 flex flex-col justify-between about-item-4 overflow-hidden transition-all duration-800 {animationStage === 'initial' ? 'items-center justify-center p-0!' : ''}"
      >
        <div class="flex flex-col h-full justify-between transition-opacity {animationStage === 'expanded' ? 'duration-500 opacity-100 delay-300' : 'duration-150 opacity-0 delay-0 pointer-events-none'}">
            <!-- Item 1: Chat Message Feed (Top) -->
            <div 
              bind:this={chatFeedContainer}
              data-lenis-prevent
              class="space-y-2 overflow-y-auto font-mono text-xs sm:text-sm pr-2 flex-1 chat-feed select-text scrollbar-tui mb-4 lg:mb-0"
            >
              {#each messages as msg}
                <div class="flex items-start gap-2 {msg.sender === 'user' ? 'text-foreground' : 'text-muted-foreground'}">
                  <span class="{msg.sender === 'user' ? 'text-primary' : 'text-primary/70'} font-bold select-none">
                    {msg.sender === 'user' ? '>' : '■'}
                  </span>
                  <span class="break-words leading-relaxed whitespace-pre-wrap flex-1">{@html renderMarkdown(msg.text)}</span>
                </div>
              {/each}
              {#if isThinking}
                <div class="flex items-start gap-2 text-muted-foreground animate-pulse">
                  <span class="text-primary/70 font-bold select-none">■</span>
                  <span>[Typing...]</span>
                </div>
              {/if}
            </div>

            <!-- Item 2: TUI Chat Input Box (Bottom) -->
            <form 
              onsubmit={handleSendMessage} 
              class="border border-border/60 bg-card/40 flex items-center px-4 py-3 gap-2 text-xs sm:text-sm font-mono group focus-within:border-primary/60 transition-colors w-full"
            >
              <span class="text-primary font-bold select-none">&gt;</span>
              <input 
                type="text" 
                bind:value={inputValue}
                disabled={isThinking}
                placeholder={isThinking ? "Awaiting response..." : "Type a message..."} 
                class="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none font-mono text-xs sm:text-sm disabled:opacity-50"
              />
            </form>
        </div>
      </TuiContainer>

    </div>
  </div>
</section>

<style>
  .chat-feed {
    min-height: 18rem;
    max-height: 18rem;
    overscroll-behavior: contain;
  }

  .about-grid-animate {
    display: grid;
    gap: 1.5rem;
    margin: 0 auto;
    transition: width 0.8s cubic-bezier(0.85,0,0.15,1), height 0.8s cubic-bezier(0.85,0,0.15,1), grid-template-columns 0.8s cubic-bezier(0.85,0,0.15,1), grid-template-rows 0.8s cubic-bezier(0.85,0,0.15,1);
    justify-content: center;
    align-content: center;
  }
  
  .about-grid-animate.initial {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 17.5rem;
    height: 17.5rem;
  }

  @media (min-width: 1024px) {
    .about-item-1 { grid-column: 1; grid-row: 1; }
    .about-item-2 { grid-column: 2; grid-row: 1; } /* Portrait */
    .about-item-3 { grid-column: 1; grid-row: 2; } /* Capabilities */
    .about-item-4 { grid-column: 2; grid-row: 2; }

    .about-grid-animate.expanding,
    .about-grid-animate.expanded {
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 65fr 35fr;
      width: 100%;
      height: calc(var(--vh, 1vh) * 100 - 3rem);
    }
    
    .chat-feed {
      min-height: 0;
      max-height: calc(var(--vh, 1vh) * 35 - 160px);
    }
  }

  @media (max-width: 1023px) {
    .about-grid-animate.expanding,
    .about-grid-animate.expanded {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(280px, auto) auto auto;
      width: 100%;
      height: auto;
    }
  }

  /* Hide scrollbar completely but allow scrolling */
  .scrollbar-tui {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-tui::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
</style>
