<script lang="ts">
  import { onMount } from "svelte";

  let showButton = $state(false);
  let isModalOpen = $state(false);

  const checkScroll = () => {
    showButton = window.scrollY > 300;
  };

  onMount(() => {
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    const handleToggle = (e: any) => {
      isModalOpen = e.detail.open;
    };
    window.addEventListener("projectModalToggle", handleToggle);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("projectModalToggle", handleToggle);
    };
  });

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
</script>

{#if showButton && !isModalOpen}
  <button
    onclick={scrollToTop}
    class="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center border border-foreground/10 bg-foreground text-background hover:bg-background hover:text-foreground hover:border-border transition-all duration-200 select-none cursor-pointer active:scale-95 animate-fade-in shadow-lg"
    aria-label="Scroll to top"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="2.5" 
      stroke="currentColor" 
      class="w-5 h-5"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M4.5 15.75l7.5-7.5 7.5 7.5" 
      />
    </svg>
  </button>
{/if}
