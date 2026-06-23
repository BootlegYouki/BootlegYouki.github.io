<script lang="ts">
  import { onMount } from "svelte";

  interface TrailBox {
    id: number;
    x: number;
    y: number;
  }

  let trailBoxes = $state<TrailBox[]>([]);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let isVisible = $state(false);

  let lastX = 0;
  let lastY = 0;
  const minDistance = 8; // Reverted back to 8px spawning distance

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isVisible = true;

    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist > minDistance) {
      trailBoxes.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY
      });
      lastX = e.clientX;
      lastY = e.clientY;
    }
  };

  const handleMouseLeave = () => {
    isVisible = false;
  };

  const removeBox = (id: number) => {
    trailBoxes = trailBoxes.filter((b) => b.id !== id);
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
</script>

<!-- Global CSS to hide the native cursor -->
<svelte:head>
  <style>
    /* Only hide cursor on desktop/fine pointer devices to preserve mobile UX */
    @media (pointer: fine) {
      body, a, button, input, select, textarea, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
    }
  </style>
</svelte:head>

<div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
  <!-- Active Custom Cursor -->
  {#if isVisible}
    <div
      class="custom-cursor bg-foreground"
      style="left: {mouseX}px; top: {mouseY}px;"
    ></div>
  {/if}

  <!-- Trail Boxes -->
  {#each trailBoxes as box (box.id)}
    <div
      class="trail-box bg-foreground"
      style="left: {box.x}px; top: {box.y}px;"
      onanimationend={() => removeBox(box.id)}
    ></div>
  {/each}
</div>

<style>
  /* Custom Cursor Styling */
  .custom-cursor {
    pointer-events: none;
    position: absolute;
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border: 1px solid var(--color-background);
  }

  /* Trail Box Styling */
  .trail-box {
    pointer-events: none;
    position: absolute;
    width: 14px;
    height: 14px;
    animation: shrink-and-fade 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; /* Decay duration kept at 2.2s */
  }

  @keyframes shrink-and-fade {
    0% {
      transform: translate(-50%, -50%) scale(1.0);
      opacity: 0.6;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.1);
      opacity: 0;
    }
  }
</style>
