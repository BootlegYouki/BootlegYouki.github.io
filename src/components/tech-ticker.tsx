import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import * as Icons from "@/components/icons.tsx"

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  react: Icons.ReactIcon,
  vite: Icons.ViteIcon,
  tauri: Icons.TauriIcon,
  nodejs: Icons.NodejsIcon,
  typescript: Icons.TypescriptIcon,
  electron: Icons.ElectronIcon,
  tailwindcss: Icons.TailwindcssIcon,
  css: Icons.CssIcon,
  svelte: Icons.SvelteIcon,
  expo: Icons.ExpoIcon,
  github: Icons.GithubIcon,
  html: Icons.HtmlIcon,
  postgresql: Icons.PostgresqlIcon,
  sqlite: Icons.SqliteIcon,
  supabase: Icons.SupabaseIcon,
  rust: Icons.RustIcon,
}

const tools = [
  { name: "React", icon: "react", color: "#61dafb", description: "Component-based UI library for building dynamic, responsive web interfaces.", hoverStyle: "hover:bg-[#61dafb]/15 hover:border-[#61dafb]/80 hover:text-[#61dafb] hover:shadow-[0_0_20px_rgba(97,218,251,0.2)]" },
  { name: "Vite", icon: "vite", color: "#ffc517", description: "Next-generation, ultra-fast frontend build tool and dev server.", hoverStyle: "hover:bg-[#ffc517]/15 hover:border-[#ffc517]/80 hover:text-[#ffc517] hover:shadow-[0_0_20px_rgba(255,197,23,0.2)]" },
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
  { name: "SQLite", icon: "sqlite", color: "#003b57", description: "Lightweight, serverless, self-contained SQL database engine.", hoverStyle: "hover:bg-[#003b57]/15 hover:border-[#003b57]/80 hover:text-[#003b57] hover:shadow-[0_0_20px_rgba(0,59,87,0.2)]", iconClass: "dark:invert" },
  { name: "Supabase", icon: "supabase", color: "#3ecf8e", description: "Open-source Firebase alternative providing database, auth, and real-time APIs.", hoverStyle: "hover:bg-[#3ecf8e]/15 hover:border-[#3ecf8e]/80 hover:text-[#3ecf8e] hover:shadow-[0_0_20px_rgba(62,207,142,0.2)]" },
  { name: "Rust", icon: "rust", color: "#ce412b", description: "Systems programming language focused on safety, speed, and concurrency.", hoverStyle: "hover:bg-[#ce412b]/15 hover:border-[#ce412b]/80 hover:text-[#ce412b] hover:shadow-[0_0_20px_rgba(206,65,43,0.2)]", iconClass: "dark:invert" }
]

export function TechTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const [openToolId, setOpenToolId] = useState<string | null>(null)
  const hoveredToolIdRef = useRef<string | null>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pauseScrollingImmediately = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
    setIsPaused(true)
  }

  const resumeScrollingWithDelay = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
      pauseTimeoutRef.current = null
    }, 800) // 800ms delay before continuing the marquee movement
  }

  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        // When scroll stops, if the mouse is no longer hovering the open tool, close it
        setOpenToolId(hoveredToolIdRef.current)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [])

  return (
    <TooltipProvider delayDuration={0}>
      <div 
        className="w-full py-6 select-none bg-card/10 overflow-hidden relative"
      >
        {/* Overlay Gradients for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        <div 
          className={cn(
            "flex gap-8 w-max animate-marquee",
            isPaused && "[animation-play-state:paused]"
          )}
          onMouseEnter={pauseScrollingImmediately}
          onMouseLeave={resumeScrollingWithDelay}
        >
          {/* Loop multiple times for seamless scrolling */}
          {[...tools, ...tools, ...tools, ...tools].map((tool, idx) => {
            const IconComponent = iconMap[tool.icon]
            const uniqueId = `${tool.name}-${idx}`
            const isOpen = openToolId === uniqueId

            return (
              <Tooltip 
                key={uniqueId}
                open={isOpen}
                onOpenChange={(open) => {
                  if (!open && isScrollingRef.current) {
                    return // Ignore Radix auto-close requests while scrolling
                  }
                  setOpenToolId(open ? uniqueId : null)
                }}
              >
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      "group border border-border/60 px-8 py-4 text-lg font-extrabold text-muted-foreground cursor-pointer transition-all duration-200 bg-card/20 rounded-none font-mono whitespace-nowrap inline-flex items-center gap-3",
                      tool.hoverStyle
                    )}
                    onMouseEnter={() => {
                      pauseScrollingImmediately()
                      hoveredToolIdRef.current = uniqueId
                      setOpenToolId(uniqueId)
                    }}
                    onMouseLeave={() => {
                      hoveredToolIdRef.current = null
                      if (!isScrollingRef.current) {
                        setOpenToolId(null)
                      }
                      resumeScrollingWithDelay()
                    }}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={cn(
                          "h-7 w-auto opacity-60 dark:opacity-85 group-hover:opacity-100 transition-all duration-200 select-none pointer-events-none",
                          tool.iconClass
                        )}
                      />
                    )}
                    {tool.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent 
                  className="w-64 p-0 bg-popover border-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden rounded-none select-none cursor-default data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-85 data-[state=delayed-open]:duration-300 data-[state=delayed-open]:ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200"
                  style={{ 
                    borderColor: tool.color, 
                    boxShadow: `0 20px 40px -10px ${tool.color}25, 0 25px 50px -12px rgba(0,0,0,0.8)` 
                  }}
                  sideOffset={-90}
                  side="top"
                  onMouseEnter={() => {
                    pauseScrollingImmediately()
                    hoveredToolIdRef.current = uniqueId
                    setOpenToolId(uniqueId)
                  }}
                  onMouseLeave={() => {
                    hoveredToolIdRef.current = null
                    if (!isScrollingRef.current) {
                      setOpenToolId(null)
                    }
                    resumeScrollingWithDelay()
                  }}
                >
                  <div 
                    className="p-4 flex items-center gap-3 border-b border-border/40"
                    style={{ backgroundColor: `${tool.color}12` }}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={cn("h-6 w-auto", tool.iconClass)}
                        style={{ color: tool.color }}
                      />
                    )}
                    <span className="font-extrabold font-mono text-sm tracking-wider" style={{ color: tool.color }}>
                      {tool.name}
                    </span>
                  </div>
                  <div className="p-4 text-xs font-mono leading-relaxed text-popover-foreground">
                    {tool.description}
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
