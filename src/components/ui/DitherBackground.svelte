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

  function smoothstep(min: number, max: number, value: number): number {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
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

  // Track mouse coordinates relative to the canvas globally (solves pointer-events-none overlay issues)
  $effect(() => {
    if (!canvasElement) return;

    function handleMouseMove(e: MouseEvent) {
      if (!canvasElement) return;
      const rect = canvasElement.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave(e: MouseEvent) {
      // Only clear if the mouse actually left the browser window
      if (!e.relatedTarget && e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        mouseX = null;
        mouseY = null;
      }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseout", handleMouseLeave, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseout", handleMouseLeave);
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
    let data32: Uint32Array | null = null;
    let cachedW = 0;
    let cachedH = 0;

    // Pre-allocated arrays for column-based caching
    let waveYs = new Float32Array(0);
    let baseP = new Float32Array(0);
    let stepP = new Float32Array(0);

    // Precompute Glow LUT to avoid Math.pow/cos per pixel
    const GLOW_LUT_SIZE = 1024;
    const glowLUT = new Float32Array(GLOW_LUT_SIZE);
    for (let i = 0; i < GLOW_LUT_SIZE; i++) {
      const normalDist = Math.sqrt(i / (GLOW_LUT_SIZE - 1));
      glowLUT[i] = Math.pow(Math.cos(normalDist * Math.PI * 0.5), 1.5) * 0.75;
    }

    // Precompute Wave LUT to avoid branching/smoothstep per pixel
    const WAVE_LUT_SIZE = 1024;
    const waveLUT = new Float32Array(WAVE_LUT_SIZE);
    for (let i = 0; i < WAVE_LUT_SIZE; i++) {
      const p = (i / (WAVE_LUT_SIZE - 1)) * 100;
      let wave = 0;
      if (p <= 40) {
        wave = 1.0;
      } else if (p < 60) {
        const t = smoothstep(40, 60, p);
        wave = 1.0 - t * 0.5;
      } else if (p <= 70) {
        wave = 0.5;
      } else if (p < 90) {
        const t = smoothstep(70, 90, p);
        wave = 0.5 - t * 0.25;
      } else if (p <= 97) {
        const t = smoothstep(90, 97, p);
        wave = 0.25 - t * 0.125;
      } else {
        if (p > 99) {
          const t = smoothstep(100, 99, p);
          wave = t * 0.125;
        } else {
          wave = 0.125;
        }
      }
      waveLUT[i] = wave;
    }

    const colorBuf = new ArrayBuffer(4);
    const color8 = new Uint8Array(colorBuf);
    const color32 = new Uint32Array(colorBuf);

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
        try {
          data32 = new Uint32Array(imgData.data.buffer, imgData.data.byteOffset, w * h);
        } catch (e) {
          data32 = null;
        }
      }

      if (waveYs.length < w) {
        waveYs = new Float32Array(w);
        baseP = new Float32Array(w);
        stepP = new Float32Array(w);
      }

      const data = imgData.data;
      const [r, g, b] = resolvedRGB;
      
      color8[0] = r;
      color8[1] = g;
      color8[2] = b;
      color8[3] = 255;
      const pixelColor32 = color32[0];

      // Precompute waveY per column — smooth multi-octave sine, runs W times not W*H
      // Dynamically lower the wave position on smaller screens (lower width)
      // As the width decreases, we increase the vertical offset (Y goes down)
      let dynamicYOffset = yOffset;
      if (logicalW < 1200) {
        const t = Math.max(0, Math.min(1, (1200 - logicalW) / (1200 - 360)));
        dynamicYOffset = Math.min(0.96, yOffset + t * 0.12);
      }
      const waveCenter = logicalH * dynamicYOffset;
      // Base the amplitude scale on device width so it shrinks on narrower screens (like mobile)
      const ampRef = Math.min(logicalH, logicalW * 0.45);
      
      const hasMouse = mouseX !== null && mouseY !== null;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let maxRadiusSq = 0;
      let maxRadiusSqInv = 0;
      
      if (hasMouse) {
        currentMouseX = mouseX || 0;
        currentMouseY = mouseY || 0;
        const maxRadius = Math.max(logicalW, logicalH) * glowSize;
        maxRadiusSq = maxRadius * maxRadius;
        maxRadiusSqInv = 1.0 / maxRadiusSq;
      }

      // Pre-compute wave height and progress constants per column to save math in inner loop
      for (let x = 0; x < w; x++) {
        const px = x * step;
        let waveY = waveCenter
          + Math.sin(px * waveParams.freq1 + time * waveParams.speed1 + waveParams.phase1) * (ampRef * waveParams.amp1)
          + Math.cos(px * waveParams.freq2 - time * waveParams.speed2 + waveParams.phase2) * (ampRef * waveParams.amp2)
          + Math.sin(px * waveParams.freq3 + time * waveParams.speed3 + waveParams.phase3) * (ampRef * waveParams.amp3);
        
        waveYs[x] = waveY;

        const maxTransition = Math.max(80, ampRef * 0.35);
        const transitionHeight = Math.max(1, Math.min(maxTransition, logicalH - waveY));
        
        baseP[x] = 100 + (100 * waveY) / transitionHeight;
        stepP[x] = 100 / transitionHeight;
      }

      // Clear pixel buffer
      if (data32) {
        data32.fill(0);
      } else {
        data.fill(0);
      }

      let idx = 0;
      for (let y = 0; y < h; y++) {
        const py = y * step;
        const bayerRow = (y & 7) * 8;

        let dySq = 0;
        if (hasMouse) {
          const dy = py - currentMouseY;
          dySq = dy * dy;
        }

        for (let x = 0; x < w; x++) {
          const waveY = waveYs[x];

          let wave = 0;
          if (py > waveY) {
            const p = baseP[x] - stepP[x] * py;
            if (p <= 40) {
              wave = 1.0;
            } else if (p >= 100) {
              wave = 0.0;
            } else {
              const lutIndex = (p * 10.23) | 0;
              wave = waveLUT[lutIndex];
            }
          }

          let glow = 0;
          if (hasMouse) {
            const px = x * step;
            const dx = px - currentMouseX;
            const distSq = dx * dx + dySq;
            if (distSq < maxRadiusSq) {
              const lutIndex = (distSq * maxRadiusSqInv * 1023) | 0;
              glow = glowLUT[lutIndex];
            }
          }

          const brightness = wave + glow;
          const threshold = bayer8Flat[bayerRow + (x & 7)];

          if (brightness > threshold) {
            if (data32) {
              data32[idx] = pixelColor32;
            } else {
              const idx4 = idx * 4;
              data[idx4] = r;
              data[idx4 + 1] = g;
              data[idx4 + 2] = b;
              data[idx4 + 3] = 255;
            }
          }
          idx++;
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
