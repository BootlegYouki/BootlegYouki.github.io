import * as React from "react"
import { TuiContainer } from "@/components/ui/tui-container"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import FlickerSpinner from "@/components/flicker-spinner"

export function IntroSection() {
  const [time, setTime] = React.useState("")
  const { theme, setTheme } = useTheme()
  const [animationStage, setAnimationStage] = React.useState<"initial" | "expanding" | "expanded">("initial")

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    // 1. Show the small box with loader for 1000ms, then expand
    const timer1 = setTimeout(() => {
      setAnimationStage("expanding")
    }, 1085)

    // 2. Stagger content reveal to after the 800ms expansion completes (total 1885ms)
    const timer2 = setTimeout(() => {
      setAnimationStage("expanded")
    }, 1885)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const containerClasses =
    animationStage === "initial"
      ? "w-28 h-28 md:w-36 md:h-36 flex items-center justify-center transition-[width,height] duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] opacity-0 animate-fade-in [animation-delay:800ms]"
      : "w-full h-[calc(100dvh-3rem)] flex flex-col transition-[width,height] duration-800 ease-[cubic-bezier(0.85,0,0.15,1)]"

  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center p-6 relative">
      {animationStage === "initial" && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <FlickerSpinner size={60} />
        </div>
      )}

      <TuiContainer
        label="INTRO"
        borderColor="border-border/80 hover:border-foreground/40"
        textColor="text-foreground/80 font-bold"
        className={containerClasses}
      >
        {animationStage === "expanded" && (
          <div className="flex flex-col justify-between h-full flex-1 p-6 md:p-16 animate-fade-in duration-300">
            {/* Top Metadata Bar */}
            <div className="pb-8 relative">
              <div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/40 origin-center animate-border-expand"
                style={{ animationDelay: "0.8s" }}
              />
              <div className="overflow-hidden">
                <div 
                  className="flex flex-wrap items-center justify-between gap-6 text-[clamp(11px,1vw,14px)] text-muted-foreground animate-slide-down-reveal w-full"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="flex items-center gap-6">
                    <span>STATUS: AVAILABLE FOR PROJECTS</span>
                    <Separator orientation="vertical" className="h-4 hidden sm:block bg-border/40" />
                    <span>LOCATION: Quezon City, Philippines</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span>TIME: {time || "00:00:00"}</span>
                    <Separator orientation="vertical" className="h-4 bg-border/40" />
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="text-[clamp(10px,0.9vw,13px)] text-muted-foreground hover:text-foreground font-mono transition-colors border border-border/40 hover:border-foreground/30 px-2 py-0.5 bg-card/30 hover:bg-card select-none cursor-pointer"
                      aria-label="Toggle theme"
                    >
                      {theme.toUpperCase()}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer to push everything else to the bottom */}
            <div className="flex-1"></div>

            {/* Bottom Area: Huge Title & Metadata aligned closely below it */}
            <div className="w-full pt-12">
              <div className="overflow-hidden">
                <div className="animate-slide-up-reveal" style={{ animationDelay: "0.05s" }}>
                  <div className="mb-0.5 md:-mb-2.5">
                    <span 
                      className="text-base sm:text-xl font-bold tracking-[0.25em] text-primary uppercase block ml-[1.6vw] pb-1 font-mono"
                    >
                      BOOTLEGYOUKI
                    </span>
                  </div>
                  <div>
                    <h1 
                      className="text-[13vw] sm:text-[17vw] md:text-[21vw] font-black tracking-tighter leading-[0.8] select-none text-foreground font-nippo w-full"
                    >
                      Por<span className="pl-[0.045em]">tfolio</span>
                    </h1>
                  </div>
                  <div className="h-4"></div>
                </div>
              </div>

              <div className="pt-4 relative">
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] bg-border/40 origin-center animate-border-expand"
                  style={{ animationDelay: "0.8s" }}
                />
                <div className="overflow-hidden">
                  <div 
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[clamp(12px,1.1vw,15px)] animate-slide-up-reveal w-full"
                    style={{ animationDelay: "0.8s" }}
                  >
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground font-semibold text-[clamp(13px,1.2vw,16px)]">
                    <span>App Developer</span>
                    <span className="text-foreground/30">/</span>
                    <span>Web Developer</span>
                    <span className="text-foreground/30">/</span>
                    <span>Designer</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-[clamp(12px,1.2vw,16px)] font-semibold tracking-wider overflow-hidden">
                    <span className="text-muted-foreground break-all">EMAIL: <a href="mailto:oandasan.markdarren.ocaya@gmail.com" className="text-foreground hover:underline transition-all break-all">oandasan.markdarren.ocaya@gmail.com</a></span>
                    <span className="text-muted-foreground whitespace-nowrap">PHONE: <span className="text-foreground">+63 968 235 1236</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </TuiContainer>
    </div>
  )
}
