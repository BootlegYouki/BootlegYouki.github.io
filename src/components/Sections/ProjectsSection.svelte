<script lang="ts">
  import { onMount } from "svelte"
  import { fade, scale } from "svelte/transition"
  import { cubicOut } from "svelte/easing"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"

  import ProjectCarouselWrapper from "../ui/ProjectCarousel.svelte"
  import TuiContainer from "../ui/TuiContainer.svelte"

  gsap.registerPlugin(ScrollTrigger)

  interface Project {
    id: string
    name: string
    tags: string[]
    description: string
    status: "ONLINE" | "STANDBY" | "ARCHIVED"
    stack: string[]
    images?: string[]
    demoUrl?: string
    sourceUrl?: string
    sourceUrls?: { label: string; url: string }[]
    releasesUrl?: string
    releasesUrls?: { label: string; url: string }[]
  }

  // Nested ProjectCarousel Component code translated to a reusable block or inline template
  // We declare state variables for lightbox here or within the carousel
  let previewImage = $state<string | null>(null)

  const projects: Project[] = [
    {
      id: "01",
      name: "BYD Clothing E-Commerce",
      tags: ["WEB", "E-COMMERCE", "AI INTEGRATION"],
      description:
        "<strong>Beyond Doubt Clothing (BYD)</strong> is a <strong>premium streetwear e-commerce</strong> platform. Features an interactive <strong>shopping catalog</strong>, dynamic <strong>shopping cart</strong>, a secure <strong>checkout pipeline</strong>, and a dedicated <strong>admin panel</strong> to manage inventory and orders. Integrated with a custom <strong>AI Chatbot assistant</strong> for customer support, and <strong>Leaflet Maps</strong> (geocoding API) for precise <strong>delivery address selection</strong> on signup.",
      status: "ONLINE",
      stack: [
        "PHP",
        "JavaScript",
        "Bootstrap",
        "Leaflet Maps",
        "AI Chatbot API",
        "PostgreSQL",
        "Heroku",
      ],
      images: [
        "/projects/01/image copy 3.png",
        "/projects/01/image copy 4.png",
        "/projects/01/image copy 5.png",
        "/projects/01/Screenshot 2026-06-19 200839.png",
        "/projects/01/Screenshot 2026-06-19 200843.png",
        "/projects/01/Screenshot 2026-06-19 200848.png",
        "/projects/01/Screenshot 2026-06-19 200851.png",
        "/projects/01/Screenshot 2026-06-19 200855.png",
        "/projects/01/Screenshot 2026-06-19 200858.png",
        "/projects/01/Screenshot 2026-06-19 200902.png",
      ],
      demoUrl: "https://byd-clothing-5fdd99342e17.herokuapp.com/shop/index",
      sourceUrl: "https://github.com/BootlegYouki/BYD-Clothing-E-Commerce",
    },
    {
      id: "02",
      name: "Student Management System",
      tags: ["WEB", "DESKTOP", "EDUCATION"],
      description:
        "A full-stack <strong>High School Student Information System (SET-2)</strong> aligned with the Philippine DepEd curriculum. Features comprehensive portals for <strong>students</strong> (grades, rankings, todo), <strong>teachers</strong> (grading spreadsheets, advisory rosters), and <strong>admins</strong> (CRUD masterlists, archives, room/time slot scheduling). Integrates <strong>dual AI engines (OpenRouter & Google AI)</strong> for automated <strong>grade analytics</strong>, <strong>administrative insights</strong>, and a <strong>document assistant chatbot</strong>, plus server-side <strong>PDF generation</strong>. Available as a <strong>PWA</strong> and an <strong>Electron-based desktop</strong> wrapper application.",
      status: "ONLINE",
      stack: [
        "SvelteKit",
        "Svelte 5",
        "Electron",
        "MongoDB",
        "OpenRouter API",
        "Google AI",
        "PDFKit",
        "Render",
      ],
      images: [
        "/projects/02/Screenshot 2026-06-19 200459.png",
        "/projects/02/Screenshot 2026-06-19 200506.png",
        "/projects/02/Screenshot 2026-06-19 200509.png",
        "/projects/02/Screenshot 2026-06-19 200512.png",
        "/projects/02/Screenshot 2026-06-19 200515.png",
        "/projects/02/Screenshot 2026-06-19 200518.png",
        "/projects/02/Screenshot 2026-06-19 200521.png",
        "/projects/02/Screenshot 2026-06-19 200525.png",
        "/projects/02/Screenshot 2026-06-19 200528.png",
        "/projects/02/Screenshot 2026-06-19 200531.png",
        "/projects/02/Screenshot 2026-06-19 200534.png",
        "/projects/02/Screenshot 2026-06-19 200549.png",
        "/projects/02/Screenshot 2026-06-19 200554.png",
        "/projects/02/Screenshot 2026-06-19 200558.png",
        "/projects/02/Screenshot 2026-06-19 200601.png",
        "/projects/02/Screenshot 2026-06-19 200604.png",
        "/projects/02/Screenshot 2026-06-19 200610.png",
        "/projects/02/Screenshot 2026-06-19 200615.png",
        "/projects/02/Screenshot 2026-06-19 200619.png",
        "/projects/02/Screenshot 2026-06-19 200638.png",
        "/projects/02/Screenshot 2026-06-19 200641.png",
      ],
      demoUrl: "https://set-2-system.onrender.com",
      sourceUrl: "https://github.com/BootlegYouki/set-2-system",
    },
    {
      id: "03",
      name: "At iba pa POS and IMS",
      tags: ["DESKTOP", "IMS", "TAURI"],
      description:
        "A dual-app <strong>desktop application</strong> built with <strong>Tauri v2</strong> (Rust backend) and React. Incorporates <strong>Cashier POS</strong> (offline-first checkout, PIN auth, customer display) and <strong>Admin IMS</strong> (inventory CRUD, reports, activity logs). Features an <strong>Ollama-orchestrated AI assistant</strong> leveraging cloud models for superior token limits and context capacity, integrated with <strong>agentic workflows</strong> for <strong>task automation</strong> and <strong>Retrieval-Augmented Generation (RAG)</strong> to query sales data and business documents. Uses <strong>SQLite</strong> with <strong>Supabase cloud mirroring</strong> and an embedded <strong>local LAN server</strong> for multi-device sync.",
      status: "ONLINE",
      stack: [
        "Tauri v2",
        "React",
        "TypeScript",
        "Rust",
        "SQLite",
        "Supabase",
        "Ollama (Cloud Models)",
        "pnpm",
      ],
      images: [
        "/projects/03/admin/admin dashboard.png",
        "/projects/03/admin/inventory page.png",
        "/projects/03/cashier/cashier pos.png",
        "/projects/03/cashier/customer screen cart.png",
      ],
      sourceUrl: "https://github.com/BootlegYouki/at-iba-pa",
      releasesUrl: "https://github.com/BootlegYouki/at-iba-pa/releases",
    },
    {
      id: "04",
      name: "Vaultleg",
      tags: ["MOBILE", "FINANCE", "RETRO"],
      description:
        "An <strong>offline-first personal finance tracker</strong> mobile application designed to securely manage <strong>expenses, incomes, debts, and budgets</strong>. Features <strong>local storage</strong> with automatic <strong>GitHub Gist synchronization</strong>. Available in <strong>IPA (iOS)</strong> and <strong>APK (Android)</strong> formats.",
      status: "ONLINE",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "AsyncStorage",
        "GitHub Gist Sync",
      ],
      images: [
        "/projects/04/photo_1781848129322_0-portrait.png",
        "/projects/04/photo_1781848129322_1-portrait.png",
        "/projects/04/photo_1781848129322_2-portrait.png",
        "/projects/04/photo_1781848129322_3-portrait.png",
      ],
      sourceUrl: "https://github.com/BootlegYouki/VaultlegV2",
      releasesUrl: "https://github.com/BootlegYouki/VaultlegV2/releases",
    },
    {
      id: "05",
      name: "BootSked",
      tags: ["MOBILE", "SCHEDULER", "RETRO"],
      description:
        "An <strong>offline-first mobile scheduler</strong> and <strong>activity reminder</strong> application. Allows users to schedule <strong>daily events, study sessions, workouts, and game times</strong> with customized parameters (intensity, focus topic). Integrated with the <strong>Expo Notifications service</strong> to trigger <strong>local push notifications, reminder alerts, and conflict warnings</strong>. Available in <strong>IPA (iOS)</strong> and <strong>APK (Android)</strong> formats.",
      status: "ONLINE",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Expo Notifications",
        "AsyncStorage",
      ],
      images: [
        "/projects/05/photo_1781869938792_0-portrait.png",
        "/projects/05/photo_1781869938792_1-portrait.png",
        "/projects/05/photo_1781869938792_2-portrait.png",
        "/projects/05/photo_1781869938792_3-portrait.png",
      ],
      sourceUrl: "https://github.com/BootlegYouki/BootSked",
      releasesUrl: "https://github.com/BootlegYouki/BootSked/releases",
    },
    {
      id: "06",
      name: "BootHub",
      tags: ["MOBILE", "DESKTOP", "UTILITY"],
      description:
        "A cross-platform <strong>clipboard, folder organizer, and media dump</strong> ecosystem. Consists of a companion <strong>desktop client</strong> built with <strong>Tauri v2</strong> and an <strong>iOS application</strong> (available in IPA format) featuring a <strong>native iOS share extension</strong> to quickly dump content, links, images, or files. Powered by a custom <strong>bidirectional synchronization engine</strong> running over <strong>Google Drive API (OAuth2)</strong> to seamlessly replicate <strong>folder structures, clipboard histories, and binary assets</strong> across devices.",
      status: "ONLINE",
      stack: [
        "Tauri v2",
        "React Native",
        "Expo",
        "React 19",
        "TypeScript",
        "Google Drive API",
        "OAuth2",
        "TailwindCSS",
      ],
      images: [
        "/projects/06/desktop/image.png",
        "/projects/06/desktop/image copy.png",
        "/projects/06/desktop/image copy 2.png",
        "/projects/06/mobile/photo_1781849550632_0-portrait.png",
        "/projects/06/mobile/photo_1781849550632_1-portrait.png",
        "/projects/06/mobile/photo_1781849550632_2-portrait.png",
        "/projects/06/mobile/photo_1781849550632_3-portrait.png",
        "/projects/06/mobile/photo_1781849585552_0-portrait.png",
      ],
      sourceUrls: [
        {
          label: "MOBILE REPO",
          url: "https://github.com/BootlegYouki/BootHub",
        },
        {
          label: "DESKTOP REPO",
          url: "https://github.com/BootlegYouki/BootHub-Desktop",
        },
      ],
      releasesUrls: [
        {
          label: "MOBILE RELEASES",
          url: "https://github.com/BootlegYouki/BootHub/releases",
        },
        {
          label: "DESKTOP RELEASES",
          url: "https://github.com/BootlegYouki/BootHub-Desktop/releases",
        },
      ],
    },
    {
      id: "07",
      name: "Kwiz",
      tags: ["MOBILE", "DESKTOP", "AI"],
      description:
        "An <strong>AI-powered educational quiz ecosystem</strong> comprising a <strong>Tauri v2 desktop application</strong> and an <strong>Expo React Native mobile client</strong>. Features <strong>automated quiz generation</strong> from <strong>text prompts or PDF attachments</strong> (using local text extraction) powered by the <strong>Mistral AI API</strong>. Formats quiz configurations using <strong>TOON (Token-Oriented Object Notation)</strong> to minimize token consumption as much as possible, and supports <strong>offline playback, scoring, and sharing/importing</strong> of custom <strong>.kwiz files</strong>. Available in <strong>IPA (iOS)</strong> and <strong>APK (Android)</strong> formats.",
      status: "ONLINE",
      stack: [
        "Tauri v2",
        "React Native",
        "Expo",
        "React 19",
        "TypeScript",
        "Mistral AI",
        "TOON Format",
        "TailwindCSS",
      ],
      images: [
        "/projects/07/photo_1781868166488_0-portrait.png",
        "/projects/07/photo_1781868166488_1-portrait.png",
        "/projects/07/photo_1781868166488_2-portrait.png",
        "/projects/07/photo_1781868166488_3-portrait.png",
      ],
      sourceUrl: "https://github.com/BootlegYouki/Kwiz",
      releasesUrl: "https://github.com/BootlegYouki/Kwiz/releases",
    },
    {
      id: "08",
      name: "Marigold Video Scanner",
      tags: ["MOBILE", "AUTOMATION", "CLIENT"],
      description:
        "A <strong>bespoke offline-first mobile application</strong> developed for my client, <strong>Marigold</strong>, to solve critical inefficiencies in their <strong>packing workflows</strong>. Built with <strong>React Native and Expo</strong>, the app leverages <strong>react-native-vision-camera</strong> for high-performance <strong>barcode and QR code scanning</strong>. It automatically <strong>records the packing process</strong>, dynamically <strong>renames the resulting video files</strong> based on decoded symbologies, and utilizes the <strong>Google Drive API (via OAuth2)</strong> to seamlessly <strong>upload and synchronize the artifacts</strong> for automated record-keeping. Storage and local state are managed using the ultra-fast <strong>MMKV key-value store</strong>.",
      status: "ONLINE",
      stack: [
        "React Native",
        "Expo",
        "Vision Camera",
        "Google Drive API",
        "MMKV",
        "TypeScript",
      ],
      images: [
        "/projects/08/1000038438-portrait.png",
        "/projects/08/1000038439-portrait.png",
      ],
    },
  ]

  let openProjectId = $state<string | null>(null)
  let originRect = $state<DOMRect | null>(null)
  let isExpanded = $state(false)
  let isContainerVisible = $state(false)
  let isContentVisible = $state(false)
  let isMobile = $state(false)
  let containerRef = $state<HTMLDivElement>()

  // Dynamic grid layouts based on project count
  let gridColsClass = $derived.by(() => {
    const total = projects.length
    if (total % 5 === 0) {
      return "grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
    }
    if (total % 4 === 0) {
      return "grid-cols-2 md:grid-cols-2 xl:grid-cols-4"
    }
    return "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
  })

  let containerWidthClass = $derived.by(() => {
    const total = projects.length
    if (total % 5 === 0) {
      return "max-w-[90rem]"
    }
    if (total % 4 === 0) {
      return "max-w-[90rem]"
    }
    return "max-w-6xl"
  })

  function getCardSpanClass(index: number, total: number) {
    let classes = []
    
    // On mobile (always 2 columns), if total is odd, make the last card span 2 columns
    if (total % 2 !== 0 && index === total - 1) {
      classes.push("col-span-2")
    }

    if (total % 5 === 0) {
      if (total % 2 !== 0 && index === total - 1) {
        classes.push("md:col-span-1")
      }
    } else if (total % 4 === 0) {
      // no changes needed
    } else {
      const remainder = total % 3
      if (remainder === 1 && index === total - 1) {
        classes.push("lg:col-span-3 md:col-span-2")
      }
    }
    return classes.join(" ")
  }

  onMount(() => {
    // Check mobile screen size
    const media = window.matchMedia("(max-width: 768px)")
    isMobile = media.matches
    const listener = (e: MediaQueryListEvent) => {
      isMobile = e.matches
    }
    media.addEventListener("change", listener)

    // Preload all project images
    projects.forEach((project) => {
      if (project.images) {
        project.images.forEach((src) => {
          const img = new Image()
          img.src = src
        })
      }
    })

    if (!containerRef) return
    const ctx = gsap.context(() => {
      // Helper function to create direction-sensitive scroll reveals
      const createScrollDirectionReveal = (
        target: string,
        viewportThreshold: string,
        scaleEffect = false
      ) => {
        gsap.set(target, { opacity: 0 })

        ScrollTrigger.create({
          trigger: target,
          start: `top ${viewportThreshold}`,
          onEnter: () => {
            gsap.fromTo(
              target,
              { opacity: 0, y: 25, scale: scaleEffect ? 0.96 : 1 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
              }
            )
          },
          onLeave: () => {
            gsap.fromTo(
              target,
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
          onEnterBack: () => {
            gsap.fromTo(
              target,
              { opacity: 0, y: -25, scale: scaleEffect ? 0.96 : 1 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
              }
            )
          },
          onLeaveBack: () => {
            gsap.fromTo(
              target,
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
      }
    }, containerRef)

    return () => {
      ctx.revert()
      media.removeEventListener("change", listener)
    }
  })

  // Re-create card ScrollTrigger batch whenever project list length changes
  let batchTriggers: ScrollTrigger[] = []

  $effect(() => {
    // Read projects.length to make this effect run reactively when the count changes
    const total = projects.length

    // First kill any existing card ScrollTriggers
    batchTriggers.forEach((t) => t.kill())
    batchTriggers = []

    // Make sure DOM has updated and elements exist
    const timer = setTimeout(() => {
      // Set initial opacity to 0
      gsap.set(".gsap-reveal-project-card", { opacity: 0 })

      // Create new batch and store references
      const batch = ScrollTrigger.batch(".gsap-reveal-project-card", {
        start: "top 92%",
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 25, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: { each: 0.08, from: "random" },
              overwrite: "auto",
            }
          )
        },
        onLeave: (elements) => {
          gsap.fromTo(
            elements,
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
        onEnterBack: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: -25, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: { each: 0.08, from: "random" },
              overwrite: "auto",
            }
          )
        },
        onLeaveBack: (elements) => {
          gsap.fromTo(
            elements,
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
      batchTriggers = batch
      ScrollTrigger.refresh()
    }, 50)

    return () => {
      clearTimeout(timer)
      batchTriggers.forEach((t) => t.kill())
    }
  })

  function toggleProject(id: string | null) {
    if (id === null) {
      // Dispatch event to hide other global UI elements (like ScrollToTop)
      window.dispatchEvent(
        new CustomEvent("projectModalToggle", { detail: { open: false } })
      )

      // 1. Fade out the content first (200ms CSS duration)
      isContentVisible = false

      // 2. Wait 120ms, then start container zoom out (500ms CSS duration)
      setTimeout(() => {
        isExpanded = false
      }, 120)

      // 3. Wait for container to finish zooming out (120ms + 500ms = 620ms), then fade out container (300ms CSS duration)
      setTimeout(() => {
        isContainerVisible = false
      }, 620)

      // 4. Wait for container fade-out to finish (620ms + 300ms = 920ms)
      setTimeout(() => {
        openProjectId = null
        originRect = null

        // Re-enable scroll only after animation is fully complete
        if ((window as any).lenis) {
          ;(window as any).lenis.start()
        }
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }, 920)
    } else {
      // Disable scroll
      if ((window as any).lenis) {
        ;(window as any).lenis.stop()
      }
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"

      // Dispatch event to hide other global UI elements (like ScrollToTop)
      window.dispatchEvent(
        new CustomEvent("projectModalToggle", { detail: { open: true } })
      )

      const el = document.getElementById(`project-card-${id}`)
      if (el) {
        originRect = el.getBoundingClientRect()
      }
      openProjectId = id
      isExpanded = false
      isContainerVisible = false
      isContentVisible = false

      // 1. Fade in the container and start widening concurrently (500ms CSS duration)
      setTimeout(() => {
        isContainerVisible = true
        isExpanded = true
      }, 50)

      // 2. Wait for container to finish widening (50ms + 500ms = 550ms) before fading in content (200ms CSS duration)
      setTimeout(() => {
        isContentVisible = true
      }, 550)
    }
  }
</script>

<div
  bind:this={containerRef}
  id="projects-section"
  class="w-full px-6 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in min-h-screen flex flex-col justify-start relative z-50"
>
  <!-- Centered Projects Header -->
  <div
    class="flex flex-col items-center justify-center pt-8 md:pt-12 pb-6 select-none"
  >
    <h2
      class="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground"
    >
      PROJECTS
    </h2>
  </div>

  <div
    id="projects-container"
    class="w-full {containerWidthClass} mx-auto flex-1 relative pt-4 pb-4"
  >
    <div
      class="grid {gridColsClass} gap-4 md:gap-6 {openProjectId !== null
        ? 'pointer-events-none'
        : ''}"
    >
      {#each projects as project, i}
        <button
          id="project-card-{project.id}"
          disabled={openProjectId !== null}
          onclick={() => toggleProject(project.id)}
          class="gsap-reveal-project-card group relative flex flex-col items-start text-left border border-border/60 bg-card/10 hover:bg-card/20 hover:border-primary/60 transition-colors duration-500 overflow-hidden aspect-square w-full rounded-sm {getCardSpanClass(
            i,
            projects.length
          )}"
        >
          <!-- Background Image -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            {#if project.images && project.images.length > 0}
              <img
                src={project.images[0]}
                alt={project.name}
                class="w-full h-full object-cover opacity-100 dark:opacity-30 dark:group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            {:else}
              <div
                class="w-full h-full bg-muted/10 group-hover:bg-muted/20 transition-colors duration-500"
              ></div>
            {/if}
            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-background/40 via-background/15 to-transparent dark:from-background/90 dark:via-background/50"
            ></div>
          </div>

          <!-- Content -->
          <div
            class="relative z-10 p-6 md:p-8 flex flex-col h-full w-full justify-end items-end"
          >
            <span
              class="text-7xl sm:text-8xl font-black font-nippo text-foreground select-none leading-none opacity-80 group-hover:opacity-100 transition-all duration-500"
            >
              {project.id}
            </span>
          </div>
        </button>
      {/each}
    </div>

    {#if openProjectId !== null}
      {@const project = projects.find((p) => p.id === openProjectId)}
      {#if project}
        <!-- Render as a full-screen fixed modal -->
        <TuiContainer
          label=""
          class="gsap-project-card !p-0 border-border/60 bg-background min-w-0 min-h-0 {isExpanded
            ? 'shadow-2xl'
            : ''} {isContainerVisible ? 'opacity-100' : 'opacity-0'}"
          style="
            position: fixed;
            z-index: 50;
            top: {isExpanded ? (isMobile ? '0.5rem' : '1.5rem') : `${originRect?.top || 0}px`};
            left: {isExpanded ? (isMobile ? '0.5rem' : '1.5rem') : `${originRect?.left || 0}px`};
            width: {isExpanded
            ? (isMobile ? 'calc(100vw - 1rem)' : 'calc(100vw - 3rem)')
            : `${originRect?.width || 350}px`};
            height: {isExpanded
            ? (isMobile ? 'calc(100dvh - 1rem)' : 'calc(100dvh - 3rem)')
            : `${originRect?.height || 350}px`};
            min-width: 0;
            min-height: 0;
            margin: 0;
            border-radius: {isExpanded ? 0 : 4}px;
            transition: top 500ms cubic-bezier(0.85,0,0.15,1), left 500ms cubic-bezier(0.85,0,0.15,1), width 500ms cubic-bezier(0.85,0,0.15,1), height 500ms cubic-bezier(0.85,0,0.15,1), border-radius 500ms cubic-bezier(0.85,0,0.15,1), box-shadow 500ms cubic-bezier(0.85,0,0.15,1), opacity 300ms ease;
          "
        >
          <!-- Wrap in overflow-hidden to prevent corner bleed without breaking fieldset legend -->
          <div
            class="w-full h-full overflow-hidden"
            style="border-radius: {isExpanded ? 0 : 4}px;"
          >
            <!-- Project content container (fades content in/out controlled by JS lifecycle) -->
            <div
              class="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-200 {isContentVisible
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'}"
            >
              <!-- Header (Click to close) -->
               <button
                onclick={() => toggleProject(null)}
                class="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-border/40 bg-card/25 hover:bg-card/40 transition-colors cursor-pointer text-left group/header"
              >
                <div class="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <span
                    class="text-sm sm:text-base md:text-xl text-muted-foreground font-bold"
                    >{project.id}</span
                  >
                  <span
                    class="text-base sm:text-xl md:text-4xl font-extrabold text-foreground"
                    >{project.name}</span
                  >
                </div>
                <span
                  class="text-muted-foreground group-hover/header:text-foreground transition-colors select-none flex items-center justify-center shrink-0 ml-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    class="w-6 h-6 md:w-8 md:h-8"
                    fill="currentColor"
                  >
                    <path
                      d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                    />
                  </svg>
                </span>
              </button>
<!-- Content Area -->
              <div
                class="grid bg-card/10 transition-all grid-rows-[1fr] flex-1 relative"
              >
                <div
                  class="p-4 sm:p-6 md:p-10 flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-10 flex-1"
                >
                  <!-- Left Column: Content + Stack -->
                  <div
                    class="md:col-span-2 flex flex-col justify-between md:h-full space-y-8 md:space-y-0"
                  >
                    <div class="space-y-4 md:space-y-6">
                      <!-- Tags -->
                      <div class="flex flex-wrap gap-2.5">
                        {#each project.tags as tag}
                          <span
                            class="text-xs font-bold px-3 py-1 bg-muted/80 border border-border/40 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        {/each}
                      </div>

                      <!-- Description -->
                      <p
                        class="text-sm md:text-base text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>strong]:font-bold [&>strong]:tracking-tight"
                      >
                        {@html project.description}
                      </p>
                    </div>

                    <!-- Stack and Meta -->
                    <div class="pt-6 space-y-4">
                      {#if project.sourceUrl || project.sourceUrls || project.demoUrl || project.releasesUrl || project.releasesUrls}
                        <div class="flex flex-wrap gap-3 pb-3">
                          {#if project.sourceUrls}
                            {#each project.sourceUrls as repo}
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                              >
                                <svg
                                  class="w-4.5 h-4.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  ><path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                                  /></svg
                                >
                                {repo.label}
                              </a>
                            {/each}
                          {:else if project.sourceUrl}
                            <a
                              href={project.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                            >
                              <svg
                                class="w-4.5 h-4.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                                /></svg
                              >
                              REPOSITORY
                            </a>
                          {/if}
                          {#if project.releasesUrls}
                            {#each project.releasesUrls as rel}
                              <a
                                href={rel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                              >
                                <svg
                                  class="w-4.5 h-4.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2.5"
                                  ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  /></svg
                                >
                                {rel.label}
                              </a>
                            {/each}
                          {:else if project.releasesUrl}
                            <a
                              href={project.releasesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                            >
                              <svg
                                class="w-4.5 h-4.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2.5"
                                ><path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                /></svg
                              >
                              RELEASES
                            </a>
                          {/if}
                          {#if project.demoUrl}
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                            >
                              <svg
                                class="w-4.5 h-4.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2.5"
                                ><path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                /></svg
                              >
                              LIVE_DEMO
                            </a>
                          {/if}
                        </div>
                      {/if}

                      <span
                        class="text-sm font-bold text-muted-foreground uppercase tracking-wider block"
                        >TECH STACK:</span
                      >
                      <div class="flex flex-wrap gap-2">
                        {#each project.stack as tech}
                          <span
                            class="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none"
                          >
                            {tech}
                          </span>
                        {/each}
                      </div>
                    </div>
                  </div>

                  <!-- Right Column: Images Carousel -->
                  <div
                    class="flex md:col-span-3 flex-col justify-center flex-1 min-h-[250px] md:min-h-0 md:h-full overflow-hidden pb-8 md:pb-0 mt-4 md:mt-0"
                  >
                    {#if project.images && project.images.length > 0}
                      <ProjectCarouselWrapper
                        images={project.images}
                        name={project.name}
                        onPreview={(src) => (previewImage = src)}
                      />
                    {:else}
                      <div
                        class="flex-1 w-full flex flex-col border border-border/60 bg-card/5 select-none relative overflow-hidden p-6 justify-center items-center h-[150px] sm:h-[250px] md:h-[380px]"
                      >
                        <div
                          class="flex-1 w-full flex flex-col items-center justify-center border-dashed border-2 border-border/20 bg-background/40 p-6"
                        >
                          <span
                            class="text-xs text-muted-foreground font-mono text-center"
                            >[ PHOTO / VIDEO DEMO ]</span
                          >
                          <span
                            class="text-[10px] text-muted-foreground/60 font-mono mt-1"
                            >project_media_{project.id}.png</span
                          >
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </div></TuiContainer
        >
      {/if}
    {/if}
  </div>
</div>

{#if previewImage}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out p-6"
    onclick={() => (previewImage = null)}
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img
      src={previewImage}
      alt="Preview"
      class="max-h-[85vh] max-w-[85vw] object-contain select-none cursor-default"
      onclick={(e) => e.stopPropagation()}
      draggable="false"
      oncontextmenu={(e) => e.preventDefault()}
    />
  </div>
{/if}
