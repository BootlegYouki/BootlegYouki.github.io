import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { IntroSection } from "@/components/intro-section"
import { TechTicker } from "@/components/tech-ticker"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ScrollProgress } from "@/components/scroll-progress"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const { theme, setTheme } = useTheme()
  const [introExpanded, setIntroExpanded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08, // Controls the deceleration speed (0.05 to 0.12 is typical)
    })

    // Connect Lenis scroll events to ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update)

    // Sync Lenis rendering loops into the GSAP ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    // Stagger rendering of below sections until Intro is fully expanded (1885ms)
    const timer = setTimeout(() => {
      setIntroExpanded(true)
      // Recalculate ScrollTrigger positions once sections render in
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }, 1885)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
      gsap.ticker.remove(tickerUpdate)
    }
  }, [])

  // Toggle theme listener for "D" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }
      if (e.key.toLowerCase() === "d") {
        setTheme(theme === "dark" ? "light" : "dark")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [theme, setTheme])

  return (
    <div className="min-h-screen bg-background text-foreground font-mono transition-colors duration-300 relative">
      <ScrollProgress />
      {/* Main container holding the sections */}
      <main className="w-full p-0 flex flex-col">
        <IntroSection />
        {introExpanded && (
          <div className="animate-fade-in duration-500">
            <TechTicker />
            <AboutSection />
            <ProjectsSection />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

