<script lang="ts">
  import { onMount } from "svelte";

  let {
    color = "var(--color-primary)",
    opacity = 0.2,
    scale = 8,
    speed = 0.8,
    interactive = true,
    glowSize = 0.25,
  } = $props<{
    color?: string;
    opacity?: number;
    scale?: number;
    speed?: number;
    interactive?: boolean;
    glowSize?: number;
  }>();

  let canvasElement = $state<HTMLCanvasElement>();
  let width = $state(0);
  let height = $state(0);
  let resolvedRGB = $state<[number, number, number]>([128, 128, 128]);

  // Mouse tracking state (logical coordinates)
  let mouseX = $state<number | null>(null);
  let mouseY = $state<number | null>(null);

  // Resolve CSS color variables (like var(--color-primary)) to computed hex/rgb values
  function resolveCssColor(colorStr: string): string {
    let resolved = colorStr.trim();
    if (typeof window !== "undefined") {
      const el = canvasElement || document.documentElement;
      try {
        for (let i = 0; i < 5; i++) {
          if (resolved.startsWith("var(")) {
            const match = resolved.match(/var\(([^)]+)\)/);
            if (match) {
              const varName = match[1].trim();
              const val = getComputedStyle(el).getPropertyValue(varName).trim();
              if (val) {
                resolved = val;
              } else {
                break;
              }
            } else {
              break;
            }
          } else {
            break;
          }
        }
      } catch (e) {
        console.warn("Failed to resolve CSS variables:", e);
      }
    }
    return resolved;
  }

  // Helper to extract raw RGB channels from resolved CSS color using a 1x1 canvas
  function updateResolvedRGB(colorStr: string) {
    if (typeof window === "undefined") return;
    const resolved = resolveCssColor(colorStr);
    try {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 1;
      tempCanvas.height = 1;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.fillStyle = resolved;
        tempCtx.fillRect(0, 0, 1, 1);
        const imgData = tempCtx.getImageData(0, 0, 1, 1);
        resolvedRGB = [imgData.data[0], imgData.data[1], imgData.data[2]];
      }
    } catch (e) {
      console.warn("Failed to resolve RGB values:", e);
    }
  }

  // Update resolved RGB color whenever the color changes
  $effect(() => {
    updateResolvedRGB(color);
  });

  // Generate random phase offsets, frequencies, and amplitudes on load
  // to ensure each page session has a completely unique and organic wave shape.
  const waveParams = {
    freq1: 0.0035 + Math.random() * 0.0015,
    freq2: 0.007 + Math.random() * 0.003,
    freq3: 0.015 + Math.random() * 0.005,
    
    speed1: 0.4 + Math.random() * 0.2,
    speed2: 0.8 + Math.random() * 0.4,
    speed3: 1.6 + Math.random() * 0.8,
    
    phase1: Math.random() * Math.PI * 2,
    phase2: Math.random() * Math.PI * 2,
    phase3: Math.random() * Math.PI * 2,
    
    amp1: 0.06 + Math.random() * 0.02, // main slow wave amplitude
    amp2: 0.025 + Math.random() * 0.01,
    amp3: 0.008 + Math.random() * 0.004,
  };

  // Track parent element dimensions for low-resolution canvas sizing
  $effect(() => {
    if (!canvasElement) return;
    const parent = canvasElement.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: rw, height: rh } = entry.contentRect;
        width = Math.max(1, Math.ceil(rw));
        height = Math.max(1, Math.ceil(rh));
      }
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  });

  // Track mouse coordinates relative to the canvas (in logical coordinates)
  $effect(() => {
    if (!canvasElement) return;
    const parent = canvasElement.parentElement;
    if (!parent) return;

    function handleMouseMove(e: MouseEvent) {
      if (!canvasElement) return;
      const rect = canvasElement.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = null;
      mouseY = null;
    }

    if (interactive) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });

      return () => {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  });

  onMount(() => {
    let animationFrameId: number;
    let lastTime = 0;
    let time = 0;

    // 8x8 Bayer ordered dithering matrix
    const bayer8 = [
      [0, 48, 12, 60, 3, 51, 15, 63],
      [32, 16, 44, 28, 35, 19, 47, 31],
      [8, 56, 4, 52, 11, 59, 7, 55],
      [40, 24, 36, 20, 43, 27, 39, 23],
      [2, 50, 14, 62, 1, 49, 13, 61],
      [34, 18, 46, 30, 33, 17, 45, 29],
      [10, 58, 6, 54, 9, 57, 5, 53],
      [42, 26, 38, 22, 41, 25, 37, 21],
    ];

    function loop(now: number) {
      animationFrameId = requestAnimationFrame(loop);

      if (!canvasElement) return;
      const ctx = canvasElement.getContext("2d");
      if (!ctx) return;

      const dt = now - lastTime;
      lastTime = now;
      time += (dt * 0.001) * speed;

      const logicalW = Math.floor(width);
      const logicalH = Math.floor(height);
      if (logicalW <= 0 || logicalH <= 0) return;

      // Low-resolution canvas physical dimensions
      const step = Math.max(2, scale);
      const w = Math.ceil(logicalW / step);
      const h = Math.ceil(logicalH / step);

      if (canvasElement.width !== w || canvasElement.height !== h) {
        canvasElement.width = w;
        canvasElement.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      // Create raw ImageData buffer for razor-sharp pixel manipulation
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const [r, g, b] = resolvedRGB;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // Map low-res loop coordinates back to logical pixels for wave & mouse logic
          const px = x * step;
          const py = y * step;

          // Normalized horizontal sine wave rolling across screen (multi-octave noise)
          const waveCenter = logicalH * 0.82; // Shift wave center closer to bottom
          const waveOffset = Math.sin(px * waveParams.freq1 + time * waveParams.speed1 + waveParams.phase1) * (logicalH * waveParams.amp1) +
                             Math.cos(px * waveParams.freq2 - time * waveParams.speed2 + waveParams.phase2) * (logicalH * waveParams.amp2) +
                             Math.sin(px * waveParams.freq3 + time * waveParams.speed3 + waveParams.phase3) * (logicalH * waveParams.amp3);
          const waveY = waveCenter + waveOffset;

          let wave = 0;
          if (py > waveY) {
            // Below the wave: solid dense dithered area (cap at 0.82 for halftone grid texture)
            wave = 0.82;
          } else {
            // Above the wave: fade out within a transition band
            const fadeBand = logicalH * 0.12; // Narrower fade transition band
            const distAbove = waveY - py;
            wave = Math.max(0, 1 - distAbove / fadeBand) * 0.82;
            wave = Math.pow(wave, 1.8); // Curve top boundary gradient
          }

          // Interactive mouse glow (tracks mouse position in logical pixels)
          let glow = 0;
          if (mouseX !== null && mouseY !== null) {
            const dist = Math.hypot(px - mouseX, py - mouseY);
            const maxRadius = Math.max(logicalW, logicalH) * glowSize;
            if (dist < maxRadius) {
              const normalDist = dist / maxRadius;
              glow = Math.pow(Math.cos(normalDist * Math.PI * 0.5), 1.5) * 0.75;
            }
          }

          const brightness = Math.min(1.0, wave + glow);

          // Retrieve threshold from Bayer 8x8 matrix
          const threshold = (bayer8[y % 8][x % 8] + 0.5) / 64;

          if (brightness > threshold) {
            const idx = (y * w + x) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255; // Set pixel opaque in the low-res canvas
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<canvas
  bind:this={canvasElement}
  class="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
  style="opacity: {opacity}; image-rendering: pixelated; image-rendering: crisp-edges;"
></canvas>
