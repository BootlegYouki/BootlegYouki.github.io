import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
  sourceUrlsData?: { label: string; url: string }[] // keep types solid
  releasesUrl?: string
  releasesUrls?: { label: string; url: string }[]
}



function ProjectCarousel({ images, name }: { images: string[]; name: string }) {
  const slides = React.useMemo(() => {
    const result: { type: "single" | "paired"; images: string[] }[] = []
    let i = 0
    while (i < images.length) {
      const current = images[i]
      const isMobileCurrent = current.includes("portrait") || current.includes("/mobile/")
      
      if (isMobileCurrent && i + 1 < images.length) {
        const next = images[i + 1]
        const isMobileNext = next.includes("portrait") || next.includes("/mobile/")
        if (isMobileNext) {
          result.push({ type: "paired", images: [current, next] })
          i += 2
          continue
        }
      }
      result.push({ type: "single", images: [current] })
      i++
    }
    return result
  }, [images])

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)

  const currentSlide = slides[currentIndex]
  if (!currentSlide) return null

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-0">
      <div className="w-full h-full flex flex-col select-none relative overflow-hidden mx-auto min-h-0">
        <div className="w-full flex-1 flex items-center justify-center relative group mx-auto min-h-[180px] sm:min-h-[350px] md:min-h-0 md:h-full">
          {currentSlide.type === "paired" ? (
            <div className="flex gap-4 items-center justify-center w-full h-full">
              {currentSlide.images.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`${name} Screenshot`}
                  className="max-h-[180px] sm:max-h-[350px] md:max-h-[calc(100dvh-27rem)] w-auto h-auto object-contain block cursor-zoom-in select-none"
                  onClick={() => setPreviewImage(imgSrc)}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ))}
            </div>
          ) : (
            <img
              src={currentSlide.images[0]}
              alt={`${name} Screenshot`}
              className="max-h-[180px] sm:max-h-[350px] md:max-h-[calc(100dvh-27rem)] w-auto h-auto object-contain block cursor-zoom-in select-none"
              onClick={() => setPreviewImage(currentSlide.images[0])}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          )}
          
          {/* Left Navigation Arrow */}
          {slides.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
              }}
              className="flex absolute left-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Navigation Arrow */}
          {slides.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
              }}
              className="flex absolute right-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Carousel Indicator below the box: long thin bars */}
      {slides.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 pt-5 select-none w-full max-w-full px-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 cursor-pointer transition-all duration-300 border-0",
                slides.length > 15 ? "w-3 sm:w-4" : slides.length > 8 ? "w-6 sm:w-8" : "w-12",
                idx === currentIndex ? "bg-primary" : "bg-border/30 hover:bg-foreground/45"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox / Image Preview Modal */}
      {previewImage && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out p-6"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt={`${name} Preview`}
            className="max-h-[85vh] max-w-[85vw] object-contain select-none cursor-default"
            onClick={(e) => e.stopPropagation()}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>,
        document.body
      )}
    </div>
  )
}

const projects: Project[] = [
  {
    id: "01",
    name: "Kwiz",
    tags: ["MOBILE", "DESKTOP", "AI"],
    description: "An AI-powered educational quiz ecosystem comprising a Tauri v2 desktop application and an Expo React Native mobile client. Features automated quiz generation from text prompts or PDF attachments (using local text extraction) powered by the Mistral AI API. Formats quiz configurations using TOON (Token-Oriented Object Notation) to minimize token consumption as much as possible, and supports offline playback, scoring, and sharing/importing of custom .kwiz files. Available in IPA (iOS) and APK (Android) formats.",
    status: "ONLINE",
    stack: ["Tauri v2", "React Native", "Expo", "React 19", "TypeScript", "Mistral AI", "TOON Format", "TailwindCSS"],
    images: [
      "/projects/04/photo_1781868166488_0-portrait.png",
      "/projects/04/photo_1781868166488_1-portrait.png",
      "/projects/04/photo_1781868166488_2-portrait.png",
      "/projects/04/photo_1781868166488_3-portrait.png"
    ],
    sourceUrl: "https://github.com/BootlegYouki/Kwiz",
    releasesUrl: "https://github.com/BootlegYouki/Kwiz/releases"
  },
  {
    id: "02",
    name: "BootHub",
    tags: ["MOBILE", "DESKTOP", "UTILITY"],
    description: "A cross-platform clipboard, folder organizer, and media dump ecosystem. Consists of a companion desktop client built with Tauri v2 and an iOS application (available in IPA format) featuring a native iOS share extension to quickly dump content, links, images, or files. Powered by a custom bidirectional synchronization engine running over Google Drive API (OAuth2) to seamlessly replicate folder structures, clipboard histories, and binary assets across devices.",
    status: "ONLINE",
    stack: ["Tauri v2", "React Native", "Expo", "React 19", "TypeScript", "Google Drive API", "OAuth2", "TailwindCSS"],
    images: [
      "/projects/03/desktop/image.png",
      "/projects/03/desktop/image copy.png",
      "/projects/03/desktop/image copy 2.png",
      "/projects/03/mobile/photo_1781849550632_0-portrait.png",
      "/projects/03/mobile/photo_1781849550632_1-portrait.png",
      "/projects/03/mobile/photo_1781849550632_2-portrait.png",
      "/projects/03/mobile/photo_1781849550632_3-portrait.png",
      "/projects/03/mobile/photo_1781849585552_0-portrait.png"
    ],
    sourceUrls: [
      { label: "MOBILE REPO", url: "https://github.com/BootlegYouki/BootHub" },
      { label: "DESKTOP REPO", url: "https://github.com/BootlegYouki/BootHub-Desktop" }
    ],
    releasesUrls: [
      { label: "MOBILE RELEASES", url: "https://github.com/BootlegYouki/BootHub/releases" },
      { label: "DESKTOP RELEASES", url: "https://github.com/BootlegYouki/BootHub-Desktop/releases" }
    ]
  },
  {
    id: "03",
    name: "BootSked",
    tags: ["MOBILE", "SCHEDULER", "RETRO"],
    description: "An offline-first mobile scheduler and activity reminder application. Allows users to schedule daily events, study sessions, workouts, and game times with customized parameters (intensity, focus topic). Integrated with the Expo Notifications service to trigger local push notifications, reminder alerts, and conflict warnings. Available in IPA (iOS) and APK (Android) formats.",
    status: "ONLINE",
    stack: ["React Native", "Expo", "TypeScript", "Expo Notifications", "AsyncStorage"],
    images: [
      "/projects/05/photo_1781869938792_0-portrait.png",
      "/projects/05/photo_1781869938792_1-portrait.png",
      "/projects/05/photo_1781869938792_2-portrait.png",
      "/projects/05/photo_1781869938792_3-portrait.png"
    ],
    sourceUrl: "https://github.com/BootlegYouki/BootSked",
    releasesUrl: "https://github.com/BootlegYouki/BootSked/releases"
  },
  {
    id: "04",
    name: "Vaultleg",
    tags: ["MOBILE", "FINANCE", "RETRO"],
    description: "An offline-first personal finance tracker mobile application designed to securely manage expenses, incomes, debts, and budgets. Features local storage with automatic GitHub Gist synchronization. Available in IPA (iOS) and APK (Android) formats.",
    status: "ONLINE",
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage", "GitHub Gist Sync"],
    images: [
      "/projects/02/photo_1781848129322_0-portrait.png",
      "/projects/02/photo_1781848129322_1-portrait.png",
      "/projects/02/photo_1781848129322_2-portrait.png",
      "/projects/02/photo_1781848129322_3-portrait.png"
    ],
    sourceUrl: "https://github.com/BootlegYouki/VaultlegV2",
    releasesUrl: "https://github.com/BootlegYouki/VaultlegV2/releases"
  },
  {
    id: "05",
    name: "At iba pa POS and IMS",
    tags: ["DESKTOP", "IMS", "TAURI"],
    description: "A dual-app desktop application built with Tauri v2 (Rust backend) and React. Incorporates Cashier POS (offline-first checkout, PIN auth, customer display) and Admin IMS (inventory CRUD, reports, activity logs). Features an Ollama-orchestrated AI assistant leveraging cloud models for superior token limits and context capacity, integrated with agentic workflows for task automation and Retrieval-Augmented Generation (RAG) to query sales data and business documents. Uses SQLite with Supabase cloud mirroring and an embedded local LAN server for multi-device sync.",
    status: "ONLINE",
    stack: ["Tauri v2", "React", "TypeScript", "Rust", "SQLite", "Supabase", "Ollama (Cloud Models)", "pnpm"],
    images: [
      "/projects/01/admin/admin dashboard.png",
      "/projects/01/admin/inventory page.png",
      "/projects/01/cashier/cashier pos.png",
      "/projects/01/cashier/customer screen cart.png"
    ],
    sourceUrl: "https://github.com/BootlegYouki/at-iba-pa",
    releasesUrl: "https://github.com/BootlegYouki/at-iba-pa/releases"
  },
  {
    id: "06",
    name: "Student Management System",
    tags: ["WEB", "DESKTOP", "EDUCATION"],
    description: "A full-stack High School Student Information System (SET-2) aligned with the Philippine DepEd curriculum. Features comprehensive portals for students (grades, rankings, todo), teachers (grading spreadsheets, advisory rosters), and admins (CRUD masterlists, archives, room/time slot scheduling). Integrates dual AI engines (OpenRouter & Google AI) for automated grade analytics, administrative insights, and a document assistant chatbot, plus server-side PDF generation. Available as a PWA and an Electron-based desktop wrapper application.",
    status: "ONLINE",
    stack: ["SvelteKit", "Svelte 5", "Electron", "MongoDB", "OpenRouter API", "Google AI", "PDFKit", "Render"],
    images: [
      "/projects/08/Screenshot 2026-06-19 200459.png",
      "/projects/08/Screenshot 2026-06-19 200506.png",
      "/projects/08/Screenshot 2026-06-19 200509.png",
      "/projects/08/Screenshot 2026-06-19 200512.png",
      "/projects/08/Screenshot 2026-06-19 200515.png",
      "/projects/08/Screenshot 2026-06-19 200518.png",
      "/projects/08/Screenshot 2026-06-19 200521.png",
      "/projects/08/Screenshot 2026-06-19 200525.png",
      "/projects/08/Screenshot 2026-06-19 200528.png",
      "/projects/08/Screenshot 2026-06-19 200531.png",
      "/projects/08/Screenshot 2026-06-19 200534.png",
      "/projects/08/Screenshot 2026-06-19 200549.png",
      "/projects/08/Screenshot 2026-06-19 200554.png",
      "/projects/08/Screenshot 2026-06-19 200558.png",
      "/projects/08/Screenshot 2026-06-19 200601.png",
      "/projects/08/Screenshot 2026-06-19 200604.png",
      "/projects/08/Screenshot 2026-06-19 200610.png",
      "/projects/08/Screenshot 2026-06-19 200615.png",
      "/projects/08/Screenshot 2026-06-19 200619.png",
      "/projects/08/Screenshot 2026-06-19 200638.png",
      "/projects/08/Screenshot 2026-06-19 200641.png"
    ],
    demoUrl: "https://set-2-system.onrender.com",
    sourceUrl: "https://github.com/BootlegYouki/set-2-system"
  },
  {
    id: "07",
    name: "BYD Clothing E-Commerce",
    tags: ["WEB", "E-COMMERCE", "AI INTEGRATION"],
    description: "Beyond Doubt Clothing (BYD) is a premium streetwear e-commerce platform. Features an interactive shopping catalog, dynamic shopping cart, a secure checkout pipeline, and a dedicated admin panel to manage inventory and orders. Integrated with a custom AI Chatbot assistant for customer support, and Leaflet Maps (geocoding API) for precise delivery address selection on signup.",
    status: "ONLINE",
    stack: ["PHP", "JavaScript", "Bootstrap", "Leaflet Maps", "AI Chatbot API", "PostgreSQL", "Heroku"],
    images: [
      "/projects/07/image copy 3.png",
      "/projects/07/image copy 4.png",
      "/projects/07/image copy 5.png",
      "/projects/07/Screenshot 2026-06-19 200839.png",
      "/projects/07/Screenshot 2026-06-19 200843.png",
      "/projects/07/Screenshot 2026-06-19 200848.png",
      "/projects/07/Screenshot 2026-06-19 200851.png",
      "/projects/07/Screenshot 2026-06-19 200855.png",
      "/projects/07/Screenshot 2026-06-19 200858.png",
      "/projects/07/Screenshot 2026-06-19 200902.png"
    ],
    demoUrl: "https://byd-clothing-5fdd99342e17.herokuapp.com/shop/index",
    sourceUrl: "https://github.com/BootlegYouki/BYD-Clothing-E-Commerce"
  }
]

export function ProjectsSection() {
  const [openProjectId, setOpenProjectId] = React.useState<string | null>("01")
  const [expandedMobileInfo, setExpandedMobileInfo] = React.useState<Record<string, boolean>>({})
  const itemRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})
  const headerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Preload all project images into browser cache on mount
    projects.forEach((project) => {
      if (project.images) {
        project.images.forEach((src) => {
          const img = new Image()
          img.src = src
        })
      }
    })
  }, [])

  const openProjectIdRef = React.useRef<string | null>(null)
  openProjectIdRef.current = openProjectId

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = React.useState(0)

  React.useEffect(() => {
    // Ensure container exists
    if (!containerRef.current) return

    // Create the pinning ScrollTrigger
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      // End distance is proportional to the number of projects
      end: `+=${projects.length * 500}px`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Calculate the project index based on scroll progress (0 to 1)
        const activeIndex = Math.min(
          Math.floor(self.progress * projects.length),
          projects.length - 1
        )
        const targetId = projects[activeIndex].id
        if (targetId !== openProjectIdRef.current) {
          setOpenProjectId(targetId)
        }
      },
    })

    return () => {
      pinTrigger.kill()
    }
  }, [])

  React.useEffect(() => {
    if (openProjectId) {
      const activeIndex = projects.findIndex((p) => p.id === openProjectId)
      if (activeIndex !== -1) {
        let stableOffsetTop = 0
        for (let j = 0; j < activeIndex; j++) {
          const prevElement = itemRefs.current[projects[j].id]
          if (prevElement) {
            // Since all cards are fully expanded, calculate stableOffsetTop using the full card offsetHeight
            stableOffsetTop += prevElement.offsetHeight + 16
          }
        }
        setTranslateY(-stableOffsetTop)
      }
    } else {
      setTranslateY(0)
    }
  }, [openProjectId])

  const toggleProject = (id: string) => {
    setOpenProjectId(id)
  }

  return (
    <div ref={containerRef} className="w-full p-6 animate-fade-in min-h-screen flex flex-col justify-start">
      {/* Centered Projects Header */}
      <div 
        ref={headerRef}
        className="flex flex-col items-center justify-center py-3 md:py-4 select-none"
      >
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black font-nippo tracking-tight text-foreground">
           PROJECTS 
        </h2>
      </div>

      <div className="w-full overflow-hidden flex-1 relative py-4">
        <div 
          className="flex flex-col gap-4 w-full font-mono transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"
          style={{ transform: `translateY(${translateY}px)` }}
        >
        {projects.map((project) => {
          const isOpen = openProjectId === project.id
          return (
            <div
              key={project.id}
              ref={(el) => { itemRefs.current[project.id] = el }}
              className="gsap-project-card border border-border/60 hover:border-primary/60 transition-all duration-300"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleProject(project.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 bg-card/25 hover:bg-card/40 text-left transition-all select-none cursor-pointer gap-4"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="text-base md:text-xl text-muted-foreground font-bold">{project.id}</span>
                  <span className="text-xl md:text-4xl font-extrabold text-foreground">{project.name}</span>
                </div>
              </button>
 
              <div
                className={cn(
                  "grid bg-card/10 transition-all grid-rows-[1fr] border-t border-border/40 md:h-[calc(100dvh-20rem)]",
                  isOpen ? "opacity-100" : "opacity-40 pointer-events-none"
                )}
                style={{
                  transition: "opacity 400ms cubic-bezier(0.85, 0, 0.15, 1)"
                }}
              >
                <div className="overflow-hidden md:max-h-full h-full">
                  <div className="p-8 md:p-10 relative overflow-hidden h-full flex flex-col justify-start">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 flex-1 min-h-0">
                    {/* Left Column: Content + Stack */}
                    <div className="md:col-span-2 flex flex-col justify-between py-2 pb-16 md:pb-2 md:max-h-full md:overflow-hidden min-h-0 h-full">
                      <div className="space-y-3.5 md:space-y-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-bold px-3 py-1 bg-muted/80 border border-border/40 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Dynamic Spacer (Desktop Only) */}
                      <div className="hidden md:block flex-1 min-h-0"></div>

                      {/* Stack and Meta (Desktop Only) */}
                      <div className="hidden md:block pt-6 space-y-3">
                        {(project.sourceUrl || project.sourceUrls || project.demoUrl || project.releasesUrl || project.releasesUrls) && (
                          <div className="flex flex-wrap gap-3 pb-3">
                            {project.sourceUrls ? (
                              project.sourceUrls.map((repo) => (
                                <a
                                  key={repo.url}
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                                >
                                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                  </svg>
                                  {repo.label}
                                </a>
                              ))
                            ) : (
                              project.sourceUrl && (
                                <a
                                  href={project.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                                >
                                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                  </svg>
                                  REPOSITORY
                                </a>
                              )
                            )}
                            {project.releasesUrls ? (
                              project.releasesUrls.map((rel) => (
                                <a
                                  key={rel.url}
                                  href={rel.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                                >
                                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  {rel.label}
                                </a>
                              ))
                            ) : (
                              project.releasesUrl && (
                                <a
                                  href={project.releasesUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                                >
                                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  RELEASES
                                </a>
                              )
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 md:px-4 md:py-2.5 transition-all font-mono"
                              >
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                LIVE_DEMO
                              </a>
                            )}
                          </div>
                        )}

                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block">TECH STACK:</span>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs md:text-sm font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 bg-card border border-border/60 text-foreground font-mono select-none"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex md:col-span-3 flex-col justify-center h-full overflow-hidden min-h-0">
                      {project.images && project.images.length > 0 ? (
                        <ProjectCarousel images={project.images} name={project.name} />
                      ) : (
                        <div className="flex-1 w-full flex flex-col border border-border/60 bg-card/5 select-none relative overflow-hidden p-6 justify-center items-center h-[150px] sm:h-[250px] md:h-[380px]">
                          <div className="flex-1 w-full flex flex-col items-center justify-center border-dashed border-2 border-border/20 bg-background/40 p-6">
                            <span className="text-xs text-muted-foreground font-mono text-center">[ PHOTO / VIDEO DEMO ]</span>
                            <span className="text-[10px] text-muted-foreground/60 font-mono mt-1">project_media_{project.id}.png</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile Drawer: Slides up from the absolute bottom of the container */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[280px] bg-background border-t border-border z-40 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden shadow-2xl flex flex-col"
                      style={{
                        transform: expandedMobileInfo[project.id]
                          ? "translateY(0)"
                          : "translateY(calc(100% - 54px))"
                      }}
                    >
                      {/* Header Button: visible at the bottom of the card when collapsed, slides up with container */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedMobileInfo(prev => ({
                            ...prev,
                            [project.id]: !prev[project.id]
                          }));
                        }}
                        className="w-full flex items-center justify-center px-8 h-[54px] border-b border-border/40 hover:text-primary text-xs font-mono font-bold select-none cursor-pointer bg-card/95 text-center"
                      >
                        <span>{expandedMobileInfo[project.id] ? "CLOSE" : "VIEW TECH & LINKS"}</span>
                      </button>

                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {(project.sourceUrl || project.sourceUrls || project.demoUrl || project.releasesUrl || project.releasesUrls) && (
                          <div className="flex flex-wrap gap-2.5">
                            {project.sourceUrls ? (
                              project.sourceUrls.map((repo) => (
                                <a
                                  key={repo.url}
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 transition-all font-mono"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                  </svg>
                                  {repo.label}
                                </a>
                              ))
                            ) : (
                              project.sourceUrl && (
                                <a
                                  href={project.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 transition-all font-mono"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                  </svg>
                                  REPOSITORY
                                </a>
                              )
                            )}
                            {project.releasesUrls ? (
                              project.releasesUrls.map((rel) => (
                                <a
                                  key={rel.url}
                                  href={rel.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 transition-all font-mono"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  {rel.label}
                                </a>
                              ))
                            ) : (
                              project.releasesUrl && (
                                <a
                                  href={project.releasesUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 transition-all font-mono"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  RELEASES
                                </a>
                              )
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold border border-border/60 hover:border-primary hover:text-primary px-3 py-2 transition-all font-mono"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                LIVE_DEMO
                              </a>
                            )}
                          </div>
                        )}
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">TECH STACK:</span>
                          <div className="flex flex-wrap gap-1.5 font-mono">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-bold px-2 py-1 bg-card border border-border/60 text-foreground font-mono select-none"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  </div>
  )
}
