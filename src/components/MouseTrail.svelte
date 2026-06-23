<script lang="ts">
  import { onMount } from "svelte";

  interface TrailBox {
    id: number;
    x: number;
    y: number;
    type: "trail" | "draw";
  }

  interface ExplosionParticle {
    id: number;
    x: number;
    y: number;
    tx: string;
    ty: string;
  }

  let trailBoxes = $state<TrailBox[]>([]);
  let particles = $state<ExplosionParticle[]>([]);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let isVisible = $state(false);
  let isDrawing = $state(false);

  let lastX = 0;
  let lastY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isVisible = true;

    // Use denser spawning (4px) when drawing for smooth lines, regular (8px) for normal trail
    const minDistance = isDrawing ? 4 : 8;
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    
    if (dist > minDistance) {
      trailBoxes.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        type: isDrawing ? "draw" : "trail"
      });
      lastX = e.clientX;
      lastY = e.clientY;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDrawing = true;
    lastX = e.clientX;
    lastY = e.clientY;

    // Trigger click explosion effect
    const particleCount = 8;
    const newParticles: ExplosionParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 70;
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;

      newParticles.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        tx,
        ty
      });
    }
    particles.push(...newParticles);
  };

  const handleMouseUp = () => {
    isDrawing = false;
  };

  const handleMouseLeave = () => {
    isVisible = false;
    isDrawing = false;
  };

  const removeBox = (id: number) => {
    trailBoxes = trailBoxes.filter((b) => b.id !== id);
  };

  const removeParticle = (id: number) => {
    particles = particles.filter((p) => p.id !== id);
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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

<!-- Stays on top (z-50) for both custom cursor, explosions, and trails -->
<div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
  <!-- Active Custom Cursor -->
  {#if isVisible}
    <div
      class="custom-cursor bg-foreground"
      style="left: {mouseX}px; top: {mouseY}px;"
    ></div>
  {/if}

  <!-- Click Explosion Particles -->
  {#each particles as p (p.id)}
    <div
      class="explosion-particle bg-foreground"
      style="left: {p.x}px; top: {p.y}px; --tx: {p.tx}; --ty: {p.ty};"
      onanimationend={() => removeParticle(p.id)}
    ></div>
  {/each}

  <!-- Drawing and Trail Boxes -->
  {#each trailBoxes as box (box.id)}
    <div
      class="trail-box bg-foreground"
      class:trail={box.type === "trail"}
      class:draw={box.type === "draw"}
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

  /* Explosion Particle Styling */
  .explosion-particle {
    pointer-events: none;
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;
    border: 1px solid var(--color-background);
    animation: box-explode 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  }

  /* Shared Trail Box base styling */
  .trail-box {
    pointer-events: none;
    position: absolute;
    width: 12px;
    height: 12px;
  }

  /* Normal cursor trail: fast decay */
  .trail-box.trail {
    animation: shrink-and-fade-fast 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Drag-drawing line: slow decay */
  .trail-box.draw {
    animation: shrink-and-fade-slow 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  @keyframes box-explode {
    0% {
      transform: translate(-50%, -50%) translate(0, 0) scale(1.0);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0.1);
      opacity: 0;
    }
  }

  /* Moderate opacity (0.4) for a visible but non-intrusive trail */
  @keyframes shrink-and-fade-fast {
    0% {
      transform: translate(-50%, -50%) scale(1.0);
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.1);
      opacity: 0;
    }
  }

  /* Moderate opacity (0.5) for clear drawing trail */
  @keyframes shrink-and-fade-slow {
    0% {
      transform: translate(-50%, -50%) scale(1.0);
      opacity: 0.5;
    }
    80% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.1);
      opacity: 0;
    }
  }
</style>
