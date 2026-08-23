<script lang="ts">
  import { onMount } from "svelte";
  import Separator from "@/components/ui/Separator.svelte";

  let { isOpen = false, onClose }: { isOpen: boolean; onClose: () => void } = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }

  function handlePrint() {
    window.print();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- Modal Backdrop -->
  <div 
    class="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static"
    onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    role="presentation"
  >
    <!-- Modal Window -->
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae"
      tabindex="-1"
      class="border border-border/90 bg-card/95 w-full max-w-4xl shadow-2xl font-mono text-xs sm:text-sm my-auto overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:w-full print:bg-white print:text-black"
    >
      <!-- Header / Top Bar -->
      <div class="border-b border-border/80 bg-muted/40 px-4 py-2.5 flex items-center justify-between select-none print:hidden">
        <div class="flex items-center gap-2 font-bold text-foreground">
          <span class="text-primary">■</span>
          <span>CURRICULUM VITAE</span>
          <span class="text-muted-foreground hidden sm:inline">— Mark Darren Oandasan</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            onclick={handlePrint}
            class="px-2.5 py-1 text-xs border border-border/60 bg-card hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer text-muted-foreground"
            title="Print or Save as PDF"
          >
            <span>[PRINT / PDF]</span>
          </button>
          <button
            onclick={onClose}
            class="px-2 py-1 text-xs border border-border/60 bg-card hover:bg-destructive/20 hover:border-destructive hover:text-destructive transition-colors cursor-pointer text-muted-foreground font-bold"
            aria-label="Close modal"
          >
            [ESC ✕]
          </button>
        </div>
      </div>

      <!-- CV Document Body -->
      <div class="p-6 sm:p-8 overflow-y-auto space-y-6 select-text text-foreground/90 scrollbar-tui print:p-0 print:overflow-visible">
        
        <!-- Header Info -->
        <div class="border-b border-border/60 pb-5">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">MARK DARREN OANDASAN</h1>
              <p class="text-primary font-bold text-xs sm:text-sm mt-0.5">FULL-STACK & SYSTEMS DEVELOPER</p>
            </div>
            <div class="text-xs text-muted-foreground space-y-0.5 sm:text-right">
              <p>Quezon City, Philippines</p>
              <p>
                <a href="https://github.com/BootlegYouki" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors underline">github.com/BootlegYouki</a>
              </p>
              <p>
                <a href="https://www.linkedin.com/in/oandasan-mark-darren-o-893938417/" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors underline">linkedin.com/in/mark-darren</a>
              </p>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
            Developer with 3+ years of hands-on experience building web platforms, local-first desktop apps, offline-first mobile solutions, and practical AI integrations. Focused on high-performance architectures, intuitive UX, and fast delivery.
          </p>
        </div>

        <!-- Technical Skills -->
        <div>
          <h2 class="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>[01]</span> TECHNICAL SKILLS
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="border border-border/40 p-3 bg-muted/20">
              <span class="font-bold text-foreground block mb-1">Languages & Core:</span>
              <span class="text-muted-foreground">TypeScript, JavaScript, Rust, HTML5, CSS3, SQL, PHP</span>
            </div>
            <div class="border border-border/40 p-3 bg-muted/20">
              <span class="font-bold text-foreground block mb-1">Frontend & Mobile:</span>
              <span class="text-muted-foreground">React, Svelte / SvelteKit, React Native, Expo, Tailwind CSS, GSAP</span>
            </div>
            <div class="border border-border/40 p-3 bg-muted/20">
              <span class="font-bold text-foreground block mb-1">Desktop & Systems:</span>
              <span class="text-muted-foreground">Tauri v2 (Rust Backend), Electron, Linux/Arch, Git</span>
            </div>
            <div class="border border-border/40 p-3 bg-muted/20">
              <span class="font-bold text-foreground block mb-1">Backend, Cloud & AI:</span>
              <span class="text-muted-foreground">Express, Supabase, PostgreSQL, Edge Functions, Mistral AI, Ollama</span>
            </div>
          </div>
        </div>

        <!-- Featured Projects & Experience -->
        <div>
          <h2 class="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>[02]</span> KEY PROJECTS & EXPERIENCE
          </h2>
          <div class="space-y-4 text-xs">
            
            <!-- Project 1 -->
            <div class="border-l-2 border-primary/60 pl-3">
              <div class="flex flex-wrap items-baseline justify-between gap-1">
                <h3 class="font-bold text-foreground text-sm">Marigold: Workflow Video Scanner</h3>
                <span class="text-muted-foreground text-[11px]">React Native • Expo • VisionCamera</span>
              </div>
              <p class="text-muted-foreground mt-1 leading-relaxed">
                Paid freelance gig. Built an offline-first mobile application enabling client staff to organize and process high-volume packing workflow videos with Google Drive cloud backup.
              </p>
            </div>

            <!-- Project 2 -->
            <div class="border-l-2 border-primary/60 pl-3">
              <div class="flex flex-wrap items-baseline justify-between gap-1">
                <h3 class="font-bold text-foreground text-sm">At Iba Pa: Local-First POS & IMS</h3>
                <span class="text-muted-foreground text-[11px]">Tauri v2 • Rust • React • Supabase</span>
              </div>
              <p class="text-muted-foreground mt-1 leading-relaxed">
                Dual-app desktop Point of Sale and Inventory Management System with local LAN peer sync, Supabase cloud mirroring, and local AI automation powered by Ollama.
              </p>
            </div>

            <!-- Project 3 -->
            <div class="border-l-2 border-primary/60 pl-3">
              <div class="flex flex-wrap items-baseline justify-between gap-1">
                <h3 class="font-bold text-foreground text-sm">AutoPassport: DFA Application Automator</h3>
                <span class="text-muted-foreground text-[11px]">Chrome Extension • Mistral AI • Automation</span>
              </div>
              <p class="text-muted-foreground mt-1 leading-relaxed">
                Browser extension automating Philippine DFA passport applications. Leverages Mistral AI to parse template text into structured JSON with background appointment slot monitoring.
              </p>
            </div>

            <!-- Project 4 -->
            <div class="border-l-2 border-primary/60 pl-3">
              <div class="flex flex-wrap items-baseline justify-between gap-1">
                <h3 class="font-bold text-foreground text-sm">Student Management System</h3>
                <span class="text-muted-foreground text-[11px]">SvelteKit • Electron • Dual AI Engines</span>
              </div>
              <p class="text-muted-foreground mt-1 leading-relaxed">
                Comprehensive desktop school management system featuring automated grade analytics and reports via OpenRouter and Google AI engines.
              </p>
            </div>

            <!-- Project 5 -->
            <div class="border-l-2 border-primary/60 pl-3">
              <div class="flex flex-wrap items-baseline justify-between gap-1">
                <h3 class="font-bold text-foreground text-sm">Kwiz: AI-Powered Quiz Generator</h3>
                <span class="text-muted-foreground text-[11px]">AI Ecosystem • Mistral AI • Educational Tech</span>
              </div>
              <p class="text-muted-foreground mt-1 leading-relaxed">
                Automated quiz generation platform parsing PDFs, lecture notes, and document files into interactive quizzes with instant assessment.
              </p>
            </div>

          </div>
        </div>

        <!-- Education -->
        <div>
          <h2 class="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>[03]</span> EDUCATION
          </h2>
          <div class="border border-border/40 p-3 bg-muted/20 text-xs">
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-foreground">Bachelor of Science in Information Technology (BSIT)</span>
              <span class="text-muted-foreground text-[11px]">In Progress</span>
            </div>
            <span class="text-muted-foreground block mt-0.5">Quezon City University — Quezon City, Philippines</span>
          </div>
        </div>

      </div>

      <!-- Footer Action / Status Bar -->
      <div class="border-t border-border/80 bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground select-none print:hidden">
        <span>STATUS: READY_FOR_HIRE</span>
        <button
          onclick={onClose}
          class="hover:text-foreground transition-colors cursor-pointer"
        >
          [CLOSE]
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @media print {
    :global(body) {
      background: white !important;
      color: black !important;
    }
  }
</style>
