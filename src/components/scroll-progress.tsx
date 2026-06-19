import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = window.scrollY

      const totalScrollable = scrollHeight - clientHeight
      if (totalScrollable <= 10) {
        setProgress(0)
        setIsVisible(false)
        ticking = false
        return
      }

      const currentProgress = (scrollTop / totalScrollable) * 100
      setProgress(currentProgress)
      setIsVisible(true)
      ticking = false
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    };

    // Initial check
    updateProgress()

    // Add listeners
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", updateProgress)

    // Observe body height changes in case content loads dynamically
    const resizeObserver = new ResizeObserver(() => {
      updateProgress()
    })
    if (document.body) {
      resizeObserver.observe(document.body)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", updateProgress)
      resizeObserver.disconnect()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-foreground/10 dark:bg-foreground/5 overflow-hidden">
      <div
        className="h-full bg-foreground relative transition-transform duration-75 ease-out origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          width: "100%",
        }}
      >
        {/* Glow / leading particle effect */}
        <div 
          className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-foreground/30 dark:to-foreground/50 blur-[2px]"
          style={{ opacity: progress > 0 ? 1 : 0 }}
        />
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
          style={{ opacity: progress > 0 ? 1 : 0 }}
        />
      </div>
    </div>
  )
}
