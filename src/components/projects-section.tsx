import * as React from "react"
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
}



function ProjectCarousel({ images, name }: { images: string[]; name: string }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col select-none relative overflow-hidden mx-auto">
        {/* Image Display Area */}
        <div className="w-full flex items-center justify-center relative group mx-auto">
          <img
            src={images[currentIndex]}
            alt={`${name} Screenshot`}
            className="max-h-[180px] sm:max-h-[350px] md:max-h-[550px] w-auto h-auto object-contain block cursor-zoom-in select-none"
            onClick={() => setIsPreviewOpen(true)}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          
          {/* Left Navigation Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="flex absolute left-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Navigation Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="flex absolute right-3 h-10 w-10 items-center justify-center rounded-none bg-background/90 border border-border text-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 z-10 cursor-pointer select-none opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Carousel Indicator below the box: long thin bars */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 pt-5 select-none">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 w-12 cursor-pointer transition-all duration-300 border-0",
                idx === currentIndex ? "bg-primary" : "bg-border/30 hover:bg-foreground/45"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox / Image Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out p-6"
          onClick={() => setIsPreviewOpen(false)}
        >
          <img
            src={images[currentIndex]}
            alt={`${name} Preview`}
            className="max-h-[75vh] max-w-[75vw] object-contain select-none cursor-default"
            onClick={(e) => e.stopPropagation()}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </div>
  )
}

const projects: Project[] = [
  {
    id: "01",
    name: "Kwiz",
    tags: ["MOBILE", "DESKTOP", "AI"],
    description: "An AI-powered educational quiz ecosystem comprising a Tauri v2 desktop application and an Expo React Native mobile client. Features automated quiz generation from text prompts or PDF attachments (using local text extraction) powered by the Mistral AI API. Formats quiz configurations using TOON (Token-Oriented Object Notation) and supports offline playback, scoring, and sharing/importing of custom .kwiz files. Available in IPA format.",
    status: "ONLINE",
    stack: ["Tauri v2", "React Native", "Expo", "React 19", "TypeScript", "Mistral AI", "TOON Format", "TailwindCSS"],
    sourceUrl: "https://github.com/BootlegYouki/Kwiz"
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
    ]
  },
  {
    id: "03",
    name: "BootSked",
    tags: ["MOBILE", "SCHEDULER", "RETRO"],
    description: "An offline-first mobile scheduler and activity reminder application. Allows users to schedule daily events, study sessions, workouts, and game times with customized parameters (intensity, focus topic). Integrated with the Expo Notifications service to trigger local push notifications, reminder alerts, and conflict warnings. Available in IPA format.",
    status: "ONLINE",
    stack: ["React Native", "Expo", "TypeScript", "Expo Notifications", "AsyncStorage"],
    sourceUrl: "https://github.com/BootlegYouki/BootSked"
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
    sourceUrl: "https://github.com/BootlegYouki/VaultlegV2"
  },
  {
    id: "05",
    name: "At iba pa POS and IMS",
    tags: ["DESKTOP", "IMS", "TAURI"],
    description: "A dual-app desktop application built with Tauri v2 (Rust backend) and React. Incorporates Cashier POS (offline-first checkout, PIN auth, customer display) and Admin IMS (inventory CRUD, reports, activity logs, and local Ollama AI assistant). Uses SQLite with Supabase cloud mirroring and an embedded local LAN server for multi-device sync.",
    status: "ONLINE",
    stack: ["Tauri v2", "React", "TypeScript", "Rust", "SQLite", "Supabase", "Ollama LLM", "pnpm"],
    images: [
      "/projects/01/admin/admin dashboard.png",
      "/projects/01/admin/inventory page.png",
      "/projects/01/cashier/cashier pos.png",
      "/projects/01/cashier/customer screen cart.png"
    ],
    sourceUrl: "https://github.com/BootlegYouki/at-iba-pa"
  },
  {
    id: "06",
    name: "Student Management System",
    tags: ["WEB", "DESKTOP", "EDUCATION"],
    description: "A full-stack High School Student Information System (SET-2) aligned with the Philippine DepEd curriculum. Features comprehensive portals for students (grades, rankings, todo), teachers (grading spreadsheets, advisory rosters), and admins (CRUD masterlists, archives, room/time slot scheduling). Integrates dual AI engines (OpenRouter & Google AI) for automated grade analytics, administrative insights, and a document assistant chatbot, plus server-side PDF generation. Available as a PWA and an offline-capable Electron desktop client.",
    status: "ONLINE",
    stack: ["SvelteKit", "Svelte 5", "Electron", "MongoDB", "OpenRouter API", "Google AI", "PDFKit", "Render"],
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
      "/projects/07/image copy 5.png"
    ],
    demoUrl: "https://byd-clothing-5fdd99342e17.herokuapp.com/shop/index",
    sourceUrl: "https://github.com/BootlegYouki/BYD-Clothing-E-Commerce"
  }
]

export function ProjectsSection() {
  const [openProjectId, setOpenProjectId] = React.useState<string | null>("01")
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
            const headerButton = prevElement.querySelector("button")
            const headerHeight = headerButton ? headerButton.offsetHeight : 90
            // Add the 16px gap (gap-4) plus 2px for borders (1px top + 1px bottom border of the card)
            stableOffsetTop += headerHeight + 18
          }
        }
        setTranslateY(-stableOffsetTop)
      }
    } else {
      setTranslateY(0)
    }
  }, [openProjectId])

  const toggleProject = (id: string) => {
    // Keep manual toggling working if they click
    setOpenProjectId(openProjectId === id ? null : id)
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
                
                <div className="flex items-center text-sm shrink-0">
                  {/* Chevron Toggle */}
                  <span className="text-muted-foreground transition-transform duration-300">
                    {isOpen ? (
                      <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
              </button>
 
              <div
                className={cn(
                  "grid bg-card/10",
                  isOpen 
                    ? "grid-rows-[1fr] opacity-100 border-t border-border/40" 
                    : "grid-rows-[0fr] opacity-0 border-t-0"
                )}
                style={{
                  transition: isOpen
                    ? "grid-template-rows 500ms cubic-bezier(0.85, 0, 0.15, 1), opacity 200ms cubic-bezier(0.85, 0, 0.15, 1), border-color 200ms"
                    : "grid-template-rows 500ms cubic-bezier(0.85, 0, 0.15, 1), opacity 200ms ease-out, border-color 200ms"
                }}
              >
                <div className="overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Left Column: Content + Stack */}
                    <div className="md:col-span-2 flex flex-col justify-between py-2">
                      <div className="space-y-6">
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
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Stack and Meta */}
                      <div className="pt-6 space-y-3 mt-8">
                        {(project.sourceUrl || project.sourceUrls || project.demoUrl) && (
                          <div className="flex flex-wrap gap-3 pb-3">
                            {project.sourceUrls ? (
                              project.sourceUrls.map((repo) => (
                                <a
                                  key={repo.url}
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-4 py-2.5 transition-all font-mono"
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
                                  className="inline-flex items-center gap-2 text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-4 py-2.5 transition-all font-mono"
                                >
                                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                                  </svg>
                                  REPOSITORY
                                </a>
                              )
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold border border-border/60 hover:border-primary hover:text-primary px-4 py-2.5 transition-all font-mono"
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
                              className="text-sm font-bold px-3.5 py-1.5 bg-card border border-border/60 text-foreground font-mono select-none"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex md:col-span-3 flex-col justify-start">
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
