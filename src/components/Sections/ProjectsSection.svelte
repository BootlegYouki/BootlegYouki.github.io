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
        "I built <strong>Beyond Doubt Clothing (BYD)</strong> back in my <strong>second year of college</strong> as our core <strong>software engineering project</strong>. It's a full-fledged <strong>premium streetwear e-commerce</strong> platform designed with a casual but highly functional vibe. The site features an interactive <strong>shopping catalog</strong>, a dynamic <strong>shopping cart</strong>, and a secure <strong>checkout pipeline</strong>, all backed by a dedicated <strong>admin panel</strong> to manage inventory and keep track of orders. To push the boundaries of what we could do, we also integrated a custom <strong>AI Chatbot assistant</strong> to handle customer support, along with <strong>Leaflet Maps</strong> for precise <strong>delivery address selection</strong> during the signup process.",
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
        "/projects/01/image copy 3.webp",
        "/projects/01/image copy 4.webp",
        "/projects/01/image copy 5.webp",
        "/projects/01/Screenshot 2026-06-19 200839.webp",
        "/projects/01/Screenshot 2026-06-19 200843.webp",
        "/projects/01/Screenshot 2026-06-19 200848.webp",
        "/projects/01/Screenshot 2026-06-19 200851.webp",
        "/projects/01/Screenshot 2026-06-19 200855.webp",
        "/projects/01/Screenshot 2026-06-19 200858.webp",
        "/projects/01/Screenshot 2026-06-19 200902.webp",
      ],
      demoUrl: "https://byd-clothing-5fdd99342e17.herokuapp.com/shop/index",
      sourceUrl: "https://github.com/BootlegYouki/BYD-Clothing-E-Commerce",
    },
    {
      id: "02",
      name: "Student Management System",
      tags: ["WEB", "DESKTOP", "EDUCATION"],
      description:
        "I developed this <strong>High School Student Information System (SET-2)</strong> during the <strong>first semester of my third year</strong> for an <strong>SIA 1 project</strong>. Since I was working completely solo, it was an incredibly time-consuming journey where I had to build literally every subsystem from scratch. The platform is fully aligned with the <strong>Philippine DepEd curriculum</strong> and features comprehensive portals for <strong>students</strong>, <strong>teachers</strong>, and <strong>admins</strong>. By far, the hardest feature to code was the built-in <strong>grading spreadsheet</strong> for teachers. Despite the workload, I also managed to integrate <strong>dual AI engines (OpenRouter & Google AI)</strong> for automated <strong>grade analytics</strong> and a <strong>document assistant chatbot</strong>, along with server-side <strong>PDF generation</strong>. It's fully available as both a <strong>PWA</strong> and an <strong>Electron-based desktop app</strong>.",
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
        "/projects/02/Screenshot 2026-06-19 200459.webp",
        "/projects/02/Screenshot 2026-06-19 200506.webp",
        "/projects/02/Screenshot 2026-06-19 200509.webp",
        "/projects/02/Screenshot 2026-06-19 200512.webp",
        "/projects/02/Screenshot 2026-06-19 200515.webp",
        "/projects/02/Screenshot 2026-06-19 200518.webp",
        "/projects/02/Screenshot 2026-06-19 200521.webp",
        "/projects/02/Screenshot 2026-06-19 200525.webp",
        "/projects/02/Screenshot 2026-06-19 200528.webp",
        "/projects/02/Screenshot 2026-06-19 200531.webp",
        "/projects/02/Screenshot 2026-06-19 200534.webp",
        "/projects/02/Screenshot 2026-06-19 200549.webp",
        "/projects/02/Screenshot 2026-06-19 200554.webp",
        "/projects/02/Screenshot 2026-06-19 200558.webp",
        "/projects/02/Screenshot 2026-06-19 200601.webp",
        "/projects/02/Screenshot 2026-06-19 200604.webp",
        "/projects/02/Screenshot 2026-06-19 200610.webp",
        "/projects/02/Screenshot 2026-06-19 200615.webp",
        "/projects/02/Screenshot 2026-06-19 200619.webp",
        "/projects/02/Screenshot 2026-06-19 200638.webp",
        "/projects/02/Screenshot 2026-06-19 200641.webp",
      ],
      demoUrl: "https://set-2-system.onrender.com",
      sourceUrl: "https://github.com/BootlegYouki/set-2-system",
    },
    {
      id: "03",
      name: "At iba pa POS and IMS",
      tags: ["DESKTOP", "IMS", "TAURI"],
      description:
        "I built this for my <strong>SIA 2 project</strong>, which required us to work with an actual real-world client. I partnered with a local minimart and developed this dual-app <strong>desktop application</strong> using <strong>Tauri v2</strong> (Rust) and React to serve as their complete <strong>Cashier POS</strong> and <strong>Admin IMS</strong>. One of the toughest challenges was ensuring the two systems stayed synced in real-time. I ended up using an embedded <strong>local LAN server</strong> and <strong>Supabase cloud mirroring</strong>, all while keeping the checkout <strong>offline-first</strong>. I also integrated an <strong>Ollama-orchestrated AI assistant</strong> with <strong>agentic workflows</strong> for task automation. Getting the AI's <strong>tool calling</strong> to be consistent and dialing in the <strong>Retrieval-Augmented Generation (RAG)</strong> to accurately query their sales data was a massive headache, but it turned out to be an incredibly powerful feature.",
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
        "/projects/03/admin/admin dashboard.webp",
        "/projects/03/admin/inventory page.webp",
        "/projects/03/cashier/cashier pos.webp",
        "/projects/03/cashier/customer screen cart.webp",
      ],
      sourceUrl: "https://github.com/BootlegYouki/at-iba-pa",
      releasesUrl: "https://github.com/BootlegYouki/at-iba-pa/releases",
    },
    {
      id: "04",
      name: "Vaultleg",
      tags: ["MOBILE", "FINANCE", "RETRO"],
      description:
        "I built this during the <strong>summer break before my fourth year</strong> as a personal utility app to securely manage my <strong>expenses, incomes, debts, and budgets</strong>. It actually started as a PWA, but once I discovered iOS sideloading, I realized I could use <strong>GitHub Actions</strong> to compile <strong>IPA files</strong> without needing a paid developer certificate. Figuring out GitHub Actions from scratch was definitely the hardest part, but this was the project that completely hooked me on <strong>native mobile development</strong>. I even built my own custom <strong>TUI (Terminal User Interface)</strong> inspired design system for it. It runs entirely <strong>offline-first</strong> using <strong>local storage</strong>, but features an automatic <strong>GitHub Gist synchronization</strong> to keep my data backed up. It's fully packaged in both <strong>IPA (iOS)</strong> and <strong>APK (Android)</strong> formats.",
      status: "ONLINE",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "AsyncStorage",
        "GitHub Gist Sync",
      ],
      images: [
        "/projects/04/photo_1781848129322_0-portrait.webp",
        "/projects/04/photo_1781848129322_1-portrait.webp",
        "/projects/04/photo_1781848129322_2-portrait.webp",
        "/projects/04/photo_1781848129322_3-portrait.webp",
      ],
      sourceUrl: "https://github.com/BootlegYouki/VaultlegV2",
      releasesUrl: "https://github.com/BootlegYouki/VaultlegV2/releases",
    },
    {
      id: "05",
      name: "BootSked",
      tags: ["MOBILE", "SCHEDULER", "RETRO"],
      description:
        "I built this <strong>offline-first mobile scheduler</strong> right after Vaultleg. Initially, I designed it to manage my school subjects, but since my fourth-year schedule didn't really need tracking, my girlfriend suggested turning it into a daily routine app instead—so I dedicated this project entirely to her! It allows users to schedule <strong>daily events, study sessions, workouts, and game times</strong> with custom parameters. Since I already had my custom TUI design system laid out from my previous project, the toughest part was figuring out how to get the <strong>Expo Notifications service</strong> to reliably trigger <strong>local push notifications, reminder alerts, and conflict warnings</strong> while completely offline. It's packaged and available in both <strong>IPA (iOS)</strong> and <strong>APK (Android)</strong> formats.",
      status: "ONLINE",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Expo Notifications",
        "AsyncStorage",
      ],
      images: [
        "/projects/05/photo_1781869938792_0-portrait.webp",
        "/projects/05/photo_1781869938792_1-portrait.webp",
        "/projects/05/photo_1781869938792_2-portrait.webp",
        "/projects/05/photo_1781869938792_3-portrait.webp",
      ],
      sourceUrl: "https://github.com/BootlegYouki/BootSked",
      releasesUrl: "https://github.com/BootlegYouki/BootSked/releases",
    },
    {
      id: "06",
      name: "BootHub",
      tags: ["MOBILE", "DESKTOP", "UTILITY"],
      description:
        "I built this during the same <strong>summer break</strong> right after finishing BootSked. I wanted my own personalized clipboard ecosystem where I could instantly dump files, links, images, and text without relying on third-party apps. To make it truly seamless, I built a companion <strong>desktop client</strong> using <strong>Tauri v2</strong> so everything syncs directly to my PC. It's powered by a custom <strong>bidirectional synchronization engine</strong> running over the <strong>Google Drive API (OAuth2)</strong> to replicate <strong>folder structures, clipboard histories, and binary assets</strong> across devices. Getting the <strong>native iOS share extension</strong> to work required some extensive research, and nailing down a consistent zoom animation for the photo viewer was surprisingly tough, but the end result is incredibly smooth.",
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
        "/projects/06/desktop/image.webp",
        "/projects/06/desktop/image copy.webp",
        "/projects/06/desktop/image copy 2.webp",
        "/projects/06/mobile/photo_1781849550632_0-portrait.webp",
        "/projects/06/mobile/photo_1781849550632_1-portrait.webp",
        "/projects/06/mobile/photo_1781849550632_2-portrait.webp",
        "/projects/06/mobile/photo_1781849550632_3-portrait.webp",
        "/projects/06/mobile/photo_1781849585552_0-portrait.webp",
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
        "I also built this during my <strong>summer break</strong> because I really wanted to try making a mobile quiz app. It's an <strong>AI-powered educational ecosystem</strong> featuring both a <strong>Tauri v2 desktop client</strong> and an <strong>Expo React Native mobile app</strong>. It uses the <strong>Mistral AI API</strong> to automatically generate quizzes from <strong>text prompts or PDF attachments</strong> (using local text extraction). I even came up with a custom data format called <strong>TOON (Token-Oriented Object Notation)</strong> to minimize API token consumption, and added support for offline playback and sharing custom <strong>.kwiz files</strong>. Ironically, I realized halfway through that we wouldn't even have many quizzes in my fourth year, which was a bit of a bummer! Technically it was a pretty straightforward build, so my main challenge was just polishing the UX to make it feel as good as possible.",
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
        "/projects/07/photo_1781868166488_0-portrait.webp",
        "/projects/07/photo_1781868166488_1-portrait.webp",
        "/projects/07/photo_1781868166488_2-portrait.webp",
        "/projects/07/photo_1781868166488_3-portrait.webp",
      ],
      sourceUrl: "https://github.com/BootlegYouki/Kwiz",
      releasesUrl: "https://github.com/BootlegYouki/Kwiz/releases",
    },
    {
      id: "08",
      name: "Marigold Video Scanner",
      tags: ["MOBILE", "AUTOMATION", "CLIENT"],
      description:
        "I also built this during my <strong>summer break</strong>, but this time it was my first actual paid freelance gig! A friend referred me to a client, <strong>Marigold</strong>, who was struggling to organize the videos of their packing workflows. To solve this, I built them a bespoke <strong>offline-first mobile app</strong> using <strong>React Native and Expo</strong>. It leverages <strong>react-native-vision-camera</strong> to scan barcodes, automatically record the packing process, and then sync the dynamically renamed files to <strong>Google Drive</strong>. The hardest part was ditching FFmpeg post-processing in favor of engraving timestamps onto the video in real-time. I literally had to hack the core Kotlin files inside `node_modules` to get it working! It broke iOS compatibility, but since the client only uses Android phones, it was perfect. Overall, it was an amazing experience learning how to draft contracts and communicate with a client directly.",
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
        "/projects/08/1000038438-portrait.webp",
        "/projects/08/1000038439-portrait.webp",
      ],
    },
  ]

  let openProjectId = $state<string | null>(null)
  let originRect = $state<DOMRect | null>(null)
  let isExpanded = $state(false)
  let isContainerVisible = $state(false)
  let isContentVisible = $state(false)
  let isMobile = $state(false)
  let isBottomSheetOpen = $state(false)
  let isThumbnailVisible = $state(false)
  let showThumbnailPhoto = $state(false)
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
      isBottomSheetOpen = false
      isThumbnailVisible = false
      showThumbnailPhoto = false

      // 2. Wait 120ms, then start container zoom out (500ms CSS duration)
      setTimeout(() => {
        isExpanded = false
      }, 120)

      // 3. Fade in thumbnail layout (number + photo) when almost fully shrunken (at 430ms from start)
      setTimeout(() => {
        isThumbnailVisible = true
        showThumbnailPhoto = true
      }, 430)

      // 4. Trigger container fade-out when it is almost zoomed out (at 530ms from start)
      setTimeout(() => {
        isContainerVisible = false
      }, 530)

      // 5. Wait for container fade-out to finish (530ms + 300ms = 830ms)
      setTimeout(() => {
        openProjectId = null
        originRect = null
        isThumbnailVisible = false
        showThumbnailPhoto = false

        // Re-enable scroll only after animation is fully complete
        if ((window as any).lenis) {
          ;(window as any).lenis.start()
        }
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }, 830)
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
      isBottomSheetOpen = false
      isThumbnailVisible = true // Show thumbnail layout during zoom-in
      showThumbnailPhoto = false // Do not show photo during zoom-in

      // 1. Fade in the container and start widening concurrently (500ms CSS duration)
      setTimeout(() => {
        isContainerVisible = true
        isExpanded = true
      }, 50)

      // 2. Hide thumbnail layout after "a bit of zooming" (at 250ms from start)
      setTimeout(() => {
        isThumbnailVisible = false
      }, 250)

      // 3. Wait for container to finish widening (550ms total) before fading in content (200ms CSS duration)
      setTimeout(() => {
        isContentVisible = true
      }, 550)
    }
  }
</script>

<div
  bind:this={containerRef}
  id="projects-section"
  class="w-full px-6 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in flex flex-col justify-start relative z-50"
  style="min-height: calc(var(--vh, 1vh) * 100);"
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
            class="absolute inset-0 overflow-hidden"
            style="border-radius: {isExpanded ? 0 : 4}px;"
          >
            <!-- Thumbnail Card Layout (visible when main content is fading/faded out) -->
            {#if isThumbnailVisible}
              <div 
                class="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                transition:fade={{ duration: 150 }}
              >
                {#if showThumbnailPhoto && project.images && project.images.length > 0}
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    class="w-full h-full object-cover opacity-30"
                  />
                {:else}
                  <div class="w-full h-full bg-muted/10"></div>
                {/if}
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                
                <!-- Giant Number -->
                <div class="absolute inset-0 p-6 md:p-8 flex flex-col h-full w-full justify-end items-end">
                  <span class="text-7xl sm:text-8xl font-black font-nippo text-foreground select-none leading-none opacity-80">
                    {project.id}
                  </span>
                </div>
              </div>
            {/if}

            <!-- Project content container (fades content in/out controlled by JS lifecycle) -->
            <div
              class="absolute inset-0 flex flex-col transition-opacity duration-200 {isContentVisible
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'}"
            >
              <!-- Header (Click to close) -->
               <button
                onclick={() => toggleProject(null)}
                class="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-border/40 bg-card/25 hover:bg-card/40 transition-colors cursor-pointer text-left group/header shrink-0"
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
              <!-- Scrollable Content Area -->
              <div
                class="flex-1 overflow-y-auto overflow-x-hidden md:overflow-visible md:h-full md:flex md:flex-col"
                style="-webkit-overflow-scrolling: touch;"
                data-lenis-prevent
              >
<!-- Content Area -->
              <div
                class="grid bg-card/10 transition-all grid-rows-[1fr] flex-1 relative md:h-full"
              >
                <div
                  class="p-4 pb-20 sm:pb-6 sm:p-6 md:p-10 flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-10 flex-1"
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
                    {#if !isMobile}
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
                    {/if}
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
          </div>

            {#if isMobile && isContentVisible}
              <!-- Bottom Sheet Backdrop -->
              {#if isBottomSheetOpen}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div 
                  class="absolute inset-0 bg-black/60 z-30 transition-opacity duration-300"
                  onclick={() => isBottomSheetOpen = false}
                ></div>
              {/if}

              <!-- Bottom Sheet Body -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="absolute bottom-0 left-0 right-0 z-40 bg-background border-t-2 border-border/60 transition-transform duration-300 ease-out-back flex flex-col max-h-[70vh]"
                style="transform: translateY({isBottomSheetOpen ? '0' : 'calc(100% - 3.5rem)'});"
                onclick={(e) => e.stopPropagation()}
              >
                <!-- Sheet Header / Toggle Handle -->
                <div 
                  class="flex items-center justify-between px-4 py-4 bg-card/45 hover:bg-card/60 cursor-pointer border-b border-border/40 select-none h-14 shrink-0"
                  onclick={() => isBottomSheetOpen = !isBottomSheetOpen}
                >
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold font-mono tracking-wider text-foreground">
                      TECH STACK & LINKS
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <svg 
                      class="w-4 h-4 text-muted-foreground transition-transform duration-300 {isBottomSheetOpen ? 'rotate-180' : ''}" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      stroke-width="2.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>

                <!-- Sheet Content (scrollable) -->
                <div 
                  class="overflow-y-auto p-4 space-y-6 flex-1 bg-background/95"
                  style="-webkit-overflow-scrolling: touch;"
                  data-lenis-prevent
                >
                  <!-- Links Section -->
                  {#if project.sourceUrl || project.sourceUrls || project.demoUrl || project.releasesUrl || project.releasesUrls}
                    <div class="space-y-2">
                      <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono block">
                        ATTACHMENTS
                      </span>
                      <div class="flex flex-row gap-2 w-full">
                        {#if project.sourceUrls}
                          {#each project.sourceUrls as repo}
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-2.5 py-2 transition-all font-mono bg-card/20 flex-1 min-w-0"
                            >
                              <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                              </svg>
                              <span class="truncate">{repo.label}</span>
                            </a>
                          {/each}
                        {:else if project.sourceUrl}
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-2.5 py-2 transition-all font-mono bg-card/20 flex-1 min-w-0"
                          >
                            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span class="truncate">REPOSITORY</span>
                          </a>
                        {/if}

                        {#if project.releasesUrls}
                          {#each project.releasesUrls as rel}
                            <a
                              href={rel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-2.5 py-2 transition-all font-mono bg-card/20 flex-1 min-w-0"
                            >
                              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              <span class="truncate">{rel.label}</span>
                            </a>
                          {/each}
                        {:else if project.releasesUrl}
                          <a
                            href={project.releasesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-2.5 py-2 transition-all font-mono bg-card/20 flex-1 min-w-0"
                          >
                            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span class="truncate">RELEASES</span>
                          </a>
                        {/if}

                        {#if project.demoUrl}
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-2.5 py-2 transition-all font-mono bg-card/20 flex-1 min-w-0"
                          >
                            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span class="truncate">LIVE_DEMO</span>
                          </a>
                        {/if}
                      </div>
                    </div>
                  {/if}

                  <!-- Tech Stack Section -->
                  <div class="space-y-2">
                    <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono block">
                      TECH STACK
                    </span>
                    <div class="flex flex-wrap gap-2">
                      {#each project.stack as tech}
                        <span class="text-sm font-bold px-3 py-1.5 bg-card border border-border/60 text-foreground font-mono select-none">
                          {tech}
                        </span>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            {/if}
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
