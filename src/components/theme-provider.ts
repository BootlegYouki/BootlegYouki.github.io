import { writable, type Writable } from "svelte/store"

export type Theme = "dark" | "light" | "system"
export type ResolvedTheme = "dark" | "light"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]
const storageKey = "theme"

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }
  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window !== "undefined" && window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }
  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

// Check initial stored value or system default
const initialTheme: Theme = (() => {
  if (typeof window === "undefined") return "system"
  const storedTheme = localStorage.getItem(storageKey)
  return isTheme(storedTheme) ? storedTheme : "system"
})()

export const theme: Writable<Theme> = writable(initialTheme)

let userInitiated = false
let isFirstMount = true

export function applyTheme(nextTheme: Theme, skipTransition = false) {
  if (typeof window === "undefined") return

  const root = document.documentElement
  const resolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme

  const updateTheme = () => {
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
  }

  const supportsViewTransition =
    !skipTransition &&
    userInitiated &&
    typeof document !== "undefined" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).startViewTransition !== undefined &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!supportsViewTransition) {
    const restoreTransitions = disableTransitionsTemporarily()
    updateTheme()
    restoreTransitions()
    return
  }

  const currentResolvedTheme = root.classList.contains("dark") ? "dark" : "light"
  if (currentResolvedTheme !== resolvedTheme) {
    root.setAttribute("data-theme-direction", currentResolvedTheme === "dark" ? "to-light" : "to-dark")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transition = (document as any).startViewTransition(() => {
    updateTheme()
  })

  transition.finished
    .then(() => {
      root.removeAttribute("data-theme-direction")
    })
    .catch(() => {
      root.removeAttribute("data-theme-direction")
    })
  userInitiated = false
}

export function setTheme(nextTheme: Theme) {
  userInitiated = true
  localStorage.setItem(storageKey, nextTheme)
  theme.set(nextTheme)
}

// Set up listeners (run in browser)
if (typeof window !== "undefined") {
  // Subscribe to theme store and update DOM
  theme.subscribe((value) => {
    applyTheme(value, isFirstMount)
    isFirstMount = false
  })

  // Listen to system preference changes if theme is "system"
  const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
  mediaQuery.addEventListener("change", () => {
    let currentTheme: Theme = "system"
    theme.subscribe((t) => {
      currentTheme = t
    })()
    if (currentTheme === "system") {
      applyTheme("system")
    }
  })

  // Keydown listener for toggle theme ('d')
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
      return
    }

    if (isEditableTarget(event.target)) {
      return
    }

    if (event.key.toLowerCase() !== "d") {
      return
    }

    userInitiated = true
    let currentTheme: Theme = "system"
    theme.subscribe((t) => {
      currentTheme = t
    })()

    const nextTheme =
      currentTheme === "dark"
        ? "light"
        : currentTheme === "light"
          ? "dark"
          : getSystemTheme() === "dark"
            ? "light"
            : "dark"

    setTheme(nextTheme)
  })

  // Storage listener for synchronization across tabs
  window.addEventListener("storage", (event: StorageEvent) => {
    if (event.storageArea !== localStorage || event.key !== storageKey) {
      return
    }
    if (isTheme(event.newValue)) {
      theme.set(event.newValue)
    } else {
      theme.set("system")
    }
  })
}
