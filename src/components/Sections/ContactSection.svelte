<script lang="ts">
  import { onMount } from "svelte"
  import TuiContainer from "@/components/ui/TuiContainer.svelte"
  import DitherBackground from "@/components/ui/DitherBackground.svelte"
  import Footer from "@/components/ui/Footer.svelte"
  import {
    GithubLogo,
    InstagramLogo,
    LinkedinLogo,
  } from "phosphor-svelte"

  // Track dark mode via .dark class on <html>
  let isDark = $state(document.documentElement.classList.contains('dark'))
  $effect(() => {
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  })

  // Form State
  let name = $state("")
  let email = $state("")
  let message = $state("")
  let isSubmitting = $state(false)
  let submitSuccess = $state(false)
  let submitError = $state("")
  let cooldownRemaining = $state(0)
  let timerInterval: number | undefined

  // validation errors
  let errors = $state({ name: "", email: "", message: "" })

  function startCooldownTimer() {
    if (timerInterval) clearInterval(timerInterval)

    const checkCooldown = () => {
      const lastSubmit = localStorage.getItem("contact_form_last_submit")
      if (lastSubmit) {
        const timePassed = Date.now() - parseInt(lastSubmit, 10)
        const COOLDOWN_MS = 60000 // 60 seconds
        if (timePassed < COOLDOWN_MS) {
          cooldownRemaining = Math.ceil((COOLDOWN_MS - timePassed) / 1000)
          return
        }
      }
      cooldownRemaining = 0
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = undefined
      }
    }

    checkCooldown()
    if (cooldownRemaining > 0) {
      timerInterval = window.setInterval(checkCooldown, 1000)
    }
  }

  function validate() {
    let isValid = true
    errors = { name: "", email: "", message: "" }

    if (!name.trim()) {
      errors.name = "Name is required"
      isValid = false
    }
    if (!email.trim()) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format"
      isValid = false
    }
    if (!message.trim()) {
      errors.message = "Message cannot be empty"
      isValid = false
    }

    return isValid
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    if (cooldownRemaining > 0) {
      submitError = `Please wait ${cooldownRemaining} second(s) before sending another message.`
      return
    }
    if (!validate()) return

    isSubmitting = true
    submitSuccess = false
    submitError = ""

    // Rate limiting: 60-second cooldown check
    const lastSubmit = localStorage.getItem("contact_form_last_submit")
    const now = Date.now()
    const COOLDOWN_MS = 60000 // 60 seconds
    if (lastSubmit) {
      const timePassed = now - parseInt(lastSubmit, 10)
      if (timePassed < COOLDOWN_MS) {
        const secondsLeft = Math.ceil((COOLDOWN_MS - timePassed) / 1000)
        submitError = `Please wait ${secondsLeft} second(s) before sending another message.`
        isSubmitting = false
        startCooldownTimer()
        return
      }
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE"

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      submitError = "Contact form access key is not configured."
      isSubmitting = false
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `New Message from ${name} - Portfolio`,
          from_name: "Portfolio Contact Form",
          replyto: email,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        submitSuccess = true
        localStorage.setItem("contact_form_last_submit", Date.now().toString())
        startCooldownTimer()
        // Clear form after success
        name = ""
        email = ""
        message = ""
      } else {
        submitError = result.message || "Failed to send message. Please try again."
      }
    } catch (err) {
      submitError = "Failed to send message. Please check your connection."
    } finally {
      isSubmitting = false
    }
  }

  onMount(() => {
    startCooldownTimer()

    return () => {
      if (timerInterval) clearInterval(timerInterval)
    }
  })
</script>

<section
  id="contact-section"
  class="w-full pt-16 pb-0 md:pt-24 md:pb-0 animate-fade-in flex flex-col justify-start relative z-10 overflow-hidden"
  style="min-height: calc(var(--vh, 1vh) * 100);"
>
  <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <!-- Back layer: darker in dark mode, lighter in light mode -->
    <DitherBackground
      color={isDark ? 'oklch(0.35 0 0)' : 'oklch(0.72 0 0)'}
      opacity={1}
      scale={4}
      speed={0.3}
      yOffset={0.65}
      interactive={false}
    />
    <!-- Front layer: brighter in dark mode, darker in light mode -->
    <DitherBackground
      color={isDark ? 'oklch(0.92 0 0)' : 'oklch(0.15 0 0)'}
      opacity={1}
      scale={4}
      speed={0.8}
      yOffset={0.79}
    />
  </div>
  <div
    class="w-full max-w-360 mx-auto px-6 pb-20 md:pb-28 flex flex-col lg:flex-row gap-16 lg:gap-36 xl:gap-48 relative z-10 mt-8 md:mt-16"
  >
    <!-- Left Column: Heading -->
    <div
      class="w-full lg:w-[45%] flex flex-col justify-between"
    >
      <div class="space-y-12">
        <h2
          class="text-8xl sm:text-9xl md:text-[6.5rem] lg:text-[8.5rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-black font-nippo tracking-tight text-foreground uppercase leading-[0.9]"
        >
          Get In<br />Touch
        </h2>
        <p
          class="text-base md:text-lg text-muted-foreground leading-relaxed font-mono max-w-lg"
        >
          Got a cool idea, a fun project, or some annoying bottleneck you need fixed? Hit me up and let's build something awesome together.
        </p>
      </div>
    </div>

    <!-- Right Column: Info + Form -->
    <div class="w-full lg:w-[50%] flex flex-col gap-16">
      <!-- Contact Info Box -->
      <TuiContainer
        label="CONTACT INFO"
        borderColor="border-border/80 hover:border-primary/40"
        textColor="text-foreground/80 font-bold"
        class="p-6 md:p-8 flex flex-col gap-6"
      >
        <address class="grid grid-cols-1 md:grid-cols-2 gap-6 not-italic font-mono">
          <div class="group/item flex flex-col justify-start">
            <span
              class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5"
              >Location</span
            >
            <span class="text-base font-bold text-foreground"
              >Quezon City, Philippines</span
            >
          </div>

          <div class="group/item flex flex-col justify-start">
            <span
              class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5"
              >Email</span
            >
            <a
              href="mailto:bootlegyouki@gmail.com"
              class="text-base font-bold text-primary hover:underline break-all"
            >
              bootlegyouki@gmail.com
            </a>
          </div>

          <div class="group/item flex flex-col justify-start">
            <span
              class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5"
              >Phone</span
            >
            <a
              href="tel:+639682351236"
              class="text-base font-bold text-primary hover:underline"
            >
              +63 968 235 1236
            </a>
          </div>

          <div class="group/item flex flex-col justify-start md:col-span-2">
            <span
              class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5"
              >Socials</span
            >
            <div class="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              <a
                href="https://github.com/BootlegYouki"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
              >
                <GithubLogo size={16} class="w-4 h-4" aria-label="GitHub Logo" />
                github.com/BootlegYouki
              </a>
              <a
                href="https://www.linkedin.com/in/oandasan-mark-darren-o-893938417/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
              >
                <LinkedinLogo size={16} class="w-4 h-4" aria-label="LinkedIn Logo" />
                linkedin.com/in/mark-darren
              </a>
              <a
                href="https://www.instagram.com/bootlegyouki/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
              >
                <InstagramLogo size={16} class="w-4 h-4" aria-label="Instagram Logo" />
                instagram.com/bootlegyouki
              </a>
            </div>
          </div>
        </address>
      </TuiContainer>

      <!-- Send Message Box -->
      <TuiContainer
        label="SEND A MESSAGE"
        borderColor="border-border/80 hover:border-primary/40"
        textColor="text-foreground/80 font-bold"
        class="p-6 md:p-8"
      >
        <form onsubmit={handleSubmit} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Input -->
            <div class="space-y-2">
              <label
                for="form-name"
                class="block text-xs font-bold text-muted-foreground uppercase tracking-wider select-none"
              >
                Name
              </label>
              <input
                id="form-name"
                type="text"
                bind:value={name}
                placeholder="Enter your name"
                disabled={isSubmitting || submitSuccess}
                class="w-full px-4 py-3 bg-card/20 border {errors.name
                  ? 'border-destructive/80 focus:border-destructive'
                  : 'border-border/60 focus:border-primary/80'} text-foreground font-mono text-sm transition-all duration-300 outline-none rounded-none placeholder:text-muted-foreground/35 focus:bg-card/45"
              />
              {#if errors.name}
                <span class="block text-xs font-semibold text-destructive"
                  >{errors.name}</span
                >
              {/if}
            </div>

            <!-- Email Input -->
            <div class="space-y-2">
              <label
                for="form-email"
                class="block text-xs font-bold text-muted-foreground uppercase tracking-wider select-none"
              >
                Email Address
              </label>
              <input
                id="form-email"
                type="email"
                bind:value={email}
                placeholder="you@example.com"
                disabled={isSubmitting || submitSuccess}
                class="w-full px-4 py-3 bg-card/20 border {errors.email
                  ? 'border-destructive/80 focus:border-destructive'
                  : 'border-border/60 focus:border-primary/80'} text-foreground font-mono text-sm transition-all duration-300 outline-none rounded-none placeholder:text-muted-foreground/35 focus:bg-card/45"
              />
              {#if errors.email}
                <span class="block text-xs font-semibold text-destructive"
                  >{errors.email}</span
                >
              {/if}
            </div>
          </div>

          <!-- Message TextArea -->
          <div class="space-y-2">
            <label
              for="form-message"
              class="block text-xs font-bold text-muted-foreground uppercase tracking-wider select-none"
            >
              Message
            </label>
            <textarea
              id="form-message"
              rows="6"
              bind:value={message}
              placeholder="How can I help you?"
              disabled={isSubmitting || submitSuccess}
              class="w-full px-4 py-3 bg-card/20 border {errors.message
                ? 'border-destructive/80 focus:border-destructive'
                : 'border-border/60 focus:border-primary/80'} text-foreground font-mono text-sm transition-all duration-300 outline-none rounded-none placeholder:text-muted-foreground/35 resize-none focus:bg-card/45"
            ></textarea>
            {#if errors.message}
              <span class="block text-xs font-semibold text-destructive"
                >{errors.message}</span
              >
            {/if}
          </div>

          <!-- Form Actions -->
          <div class="flex items-center gap-6">
            <button
              type="submit"
              disabled={isSubmitting || cooldownRemaining > 0}
              class="px-8 py-3 border border-border/60 bg-card/20 text-muted-foreground font-bold font-mono text-sm transition-all duration-300 cursor-pointer select-none hover:border-primary/80 hover:bg-card/40 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting
                ? "SENDING..."
                : cooldownRemaining > 0
                  ? `COOLDOWN (${cooldownRemaining}s)`
                  : "SEND MESSAGE"}
            </button>
            {#if submitSuccess}
              <span
                class="text-emerald-500 font-mono text-sm font-bold animate-fade-in"
              >
                Message sent successfully!
              </span>
            {/if}
            {#if submitError}
              <span
                class="text-destructive font-mono text-sm font-bold animate-fade-in"
              >
                {submitError}
              </span>
            {/if}
          </div>
        </form>
      </TuiContainer>
    </div>
  </div>
  <Footer />
</section>
