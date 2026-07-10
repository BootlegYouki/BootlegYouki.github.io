<script lang="ts">
  import { onMount } from "svelte"
  import TuiContainer from "@/components/ui/TuiContainer.svelte"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import {
    MapPin,
    Envelope,
    ShareNetwork,
    GithubLogo,
    InstagramLogo,
  } from "phosphor-svelte"

  gsap.registerPlugin(ScrollTrigger)

  let containerRef = $state<HTMLDivElement>()

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
    if (!containerRef) return
    const ctx = gsap.context(() => {
      // Box animation
      ScrollTrigger.batch(".contact-box", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 25, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              overwrite: "auto",
            }
          )
        },
        onLeave: (batch) => {
          gsap.fromTo(
            batch,
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
        onEnterBack: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: -25, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              overwrite: "auto",
            }
          )
        },
        onLeaveBack: (batch) => {
          gsap.fromTo(
            batch,
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
    }, containerRef)

    startCooldownTimer()

    return () => {
      ctx.revert()
      if (timerInterval) clearInterval(timerInterval)
    }
  })
</script>

<section
  id="contact-section"
  bind:this={containerRef}
  class="w-full px-6 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in min-h-screen flex flex-col justify-start relative z-10 max-w-[90rem] mx-auto"
>
  <div
    class="w-full flex flex-col lg:flex-row gap-16 lg:gap-36 xl:gap-48 relative z-10 mt-8 md:mt-16"
  >
    <!-- Left Column: Heading -->
    <div
      class="w-full lg:w-[45%] flex flex-col justify-between contact-box opacity-0"
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
          Have an idea, project, or bottleneck you want to solve? Drop a line
          and let's build something together.
        </p>
      </div>
    </div>

    <!-- Right Column: Info + Form -->
    <div class="w-full lg:w-[50%] flex flex-col gap-16 contact-box opacity-0">
      <!-- Contact Info Box -->
      <TuiContainer
        label="CONTACT INFO"
        borderColor="border-border/80 hover:border-primary/40"
        textColor="text-foreground/80 font-bold"
        class="p-6 md:p-8 flex flex-col gap-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <GithubLogo size={16} class="w-4 h-4" />
                github.com/BootlegYouki
              </a>
              <a
                href="https://www.instagram.com/bootlegyouki/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2"
              >
                <InstagramLogo size={16} class="w-4 h-4" />
                instagram.com/bootlegyouki
              </a>
            </div>
          </div>
        </div>
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
</section>
