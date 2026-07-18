<script lang="ts">
  import { onMount } from "svelte";

  let {
    color = "var(--color-primary)",
    opacity = 0.2,
    scale = 8,
    speed = 0.8,
    interactive = true,
    glowSize = 0.25,
    yOffset = 0.82,
  } = $props<{
    color?: string;
    opacity?: number;
    scale?: number;
    speed?: number;
    interactive?: boolean;
    glowSize?: number;
    yOffset?: number;
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

  // Multi-octave sine wave — smooth, organic, curvy
  const waveParams = {
    freq1: 0.0035 + Math.random() * 0.0015,
    freq2: 0.007  + Math.random() * 0.003,
    freq3: 0.015  + Math.random() * 0.005,
    speed1: 0.4 + Math.random() * 0.2,
    speed2: 0.8 + Math.random() * 0.4,
    speed3: 1.6 + Math.random() * 0.8,
    phase1: Math.random() * Math.PI * 2,
    phase2: Math.random() * Math.PI * 2,
    phase3: Math.random() * Math.PI * 2,
    amp1: 0.06 + Math.random() * 0.02,
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
    let isVisible = false; // pause when off-screen

    // Flat Float32Array Bayer 8x8 thresholds — faster than nested array lookups
    const bayer8Flat = new Float32Array([
       0, 48, 12, 60,  3, 51, 15, 63,
      32, 16, 44, 28, 35, 19, 47, 31,
       8, 56,  4, 52, 11, 59,  7, 55,
      40, 24, 36, 20, 43, 27, 39, 23,
       2, 50, 14, 62,  1, 49, 13, 61,
      34, 18, 46, 30, 33, 17, 45, 29,
      10, 58,  6, 54,  9, 57,  5, 53,
      42, 26, 38, 22, 41, 25, 37, 21,
    ].map(v => (v + 0.5) / 64)); // pre-divide once

    const TARGET_FPS = 16;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastRender = 0;

    // Cache context and ImageData — avoid reallocating every frame
    let ctx: CanvasRenderingContext2D | null = null;
    let imgData: ImageData | null = null;
    let cachedW = 0;
    let cachedH = 0;

    // Pause rendering when the canvas is not visible in the viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    if (canvasElement) intersectionObserver.observe(canvasElement);

    function loop(now: number) {
      animationFrameId = requestAnimationFrame(loop);

      // Skip entirely if not visible or throttled
      if (!isVisible || !canvasElement) return;
      if (now - lastRender < FRAME_INTERVAL) return;

      const dt = now - lastTime;
      lastTime = now;
      lastRender = now;
      time += (dt * 0.001) * speed;

      const logicalW = Math.floor(width);
      const logicalH = Math.floor(height);
      if (logicalW <= 0 || logicalH <= 0) return;

      const step = Math.max(2, scale);
      const w = Math.ceil(logicalW / step);
      const h = Math.ceil(logicalH / step);

      // Resize canvas only when dimensions change
      if (canvasElement.width !== w || canvasElement.height !== h) {
        canvasElement.width = w;
        canvasElement.height = h;
        ctx = null; // reset cached context after resize
        imgData = null;
      }

      // Cache 2d context — avoid getContext() every frame
      if (!ctx) ctx = canvasElement.getContext("2d");
      if (!ctx) return;

      // Reuse ImageData buffer — avoid GC allocation every frame
      if (!imgData || cachedW !== w || cachedH !== h) {
        imgData = ctx.createImageData(w, h);
        cachedW = w;
        cachedH = h;
      }

      const data = imgData.data;
      const [r, g, b] = resolvedRGB;

      // Precompute waveY per column — smooth multi-octave sine, runs W times not W*H
      const waveCenter = logicalH * yOffset;
      const waveYs = new Float32Array(w);
      for (let x = 0; x < w; x++) {
        const px = x * step;
        waveYs[x] = waveCenter
          + Math.sin(px * waveParams.freq1 + time * waveParams.speed1 + waveParams.phase1) * (logicalH * waveParams.amp1)
          + Math.cos(px * waveParams.freq2 - time * waveParams.speed2 + waveParams.phase2) * (logicalH * waveParams.amp2)
          + Math.sin(px * waveParams.freq3 + time * waveParams.speed3 + waveParams.phase3) * (logicalH * waveParams.amp3);
      }

      // Clear pixel buffer
      data.fill(0);

      for (let y = 0; y < h; y++) {
        const py = y * step;
        const bayerRow = (y & 7) * 8;

        for (let x = 0; x < w; x++) {
          const px = x * step;
          const waveY = waveYs[x];

          let wave = 0;
          if (py > waveY) {
            // 3 layers below wave based on 60 (solid) : 30 (dither) : 20 (more dither) ratio
            // Normalized: more dither = 20/110, dither = 30/110, solid = 60/110
            const progress = (py - waveY) / Math.max(1, logicalH - waveY);
            
            const b1 = 20 / 110;
            const b2 = 50 / 110;
            const tWidth = 0.04; // Narrow transition band (4% of height below wave)
            
            if (progress < tWidth) {
              // Transition from 0.0 to 0.25 at the top wave crest
              const t = progress / tWidth;
              wave = t * 0.25;
            } else if (progress < b1 - tWidth) {
              // "more dither" layer (25% density)
              wave = 0.25;
            } else if (progress < b1 + tWidth) {
              // Transition from 0.25 to 0.50
              const t = (progress - (b1 - tWidth)) / (2 * tWidth);
              wave = 0.25 + t * 0.25;
            } else if (progress < b2 - tWidth) {
              // "dither" layer (50% density)
              wave = 0.50;
            } else if (progress < b2 + tWidth) {
              // Transition from 0.50 to 1.00
              const t = (progress - (b2 - tWidth)) / (2 * tWidth);
              wave = 0.50 + t * 0.50;
            } else {
              // "solid" layer (100% density)
              wave = 1.0;
            }
          } else {
            // Above wave: transparent
            wave = 0;
          }

          // Interactive mouse glow
          let glow = 0;
          if (mouseX !== null && mouseY !== null) {
            const dx = px - mouseX;
            const dy = py - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxRadius = Math.max(logicalW, logicalH) * glowSize;
            if (dist < maxRadius) {
              const normalDist = dist / maxRadius;
              glow = Math.pow(Math.cos(normalDist * Math.PI * 0.5), 1.5) * 0.75;
            }
          }

          const brightness = wave + glow > 1.0 ? 1.0 : wave + glow;
          const threshold = bayer8Flat[bayerRow + (x & 7)]; // x % 8

          if (brightness > threshold) {
            const idx = (y * w + x) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
    };
  });
</script>

<canvas
  bind:this={canvasElement}
  class="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
  style="opacity: {opacity}; image-rendering: pixelated; image-rendering: crisp-edges;"
></canvas>
