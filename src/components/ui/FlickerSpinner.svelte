<script lang="ts">
  let { size = 28 } = $props<{ size?: number }>();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 42 42"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  style="--dur: 1.100s"
>
  <title>Loading</title>
  <style>
    svg {
      --on: #242424;
      --off: transparent;
    }
    :root.dark svg, html.dark svg, .dark svg, [data-theme="dark"] svg {
      --on: #F5F5F5;
      --off: transparent;
    }
    rect { fill: var(--off); }
    rect.on { fill: var(--on); }
    @media (prefers-reduced-motion: reduce) { rect { animation: none !important; } }
    @keyframes f000001110 { 0% { opacity: 0; } 55.55% { opacity: 0; } 55.56% { opacity: 1; } 88.88% { opacity: 1; } 88.89% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f000011010 { 0% { opacity: 0; } 44.43% { opacity: 0; } 44.44% { opacity: 1; } 66.66% { opacity: 1; } 66.67% { opacity: 0; } 77.77% { opacity: 0; } 77.78% { opacity: 1; } 88.88% { opacity: 1; } 88.89% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f000110100 { 0% { opacity: 0; } 33.32% { opacity: 0; } 33.33% { opacity: 1; } 55.55% { opacity: 1; } 55.56% { opacity: 0; } 66.66% { opacity: 0; } 66.67% { opacity: 1; } 77.77% { opacity: 1; } 77.78% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f000101000 { 0% { opacity: 0; } 33.32% { opacity: 0; } 33.33% { opacity: 1; } 44.43% { opacity: 1; } 44.44% { opacity: 0; } 55.55% { opacity: 0; } 55.56% { opacity: 1; } 66.66% { opacity: 1; } 66.67% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f001010000 { 0% { opacity: 0; } 22.21% { opacity: 0; } 22.22% { opacity: 1; } 33.32% { opacity: 1; } 33.33% { opacity: 0; } 44.43% { opacity: 0; } 44.44% { opacity: 1; } 55.55% { opacity: 1; } 55.56% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f010100000 { 0% { opacity: 0; } 11.10% { opacity: 0; } 11.11% { opacity: 1; } 22.21% { opacity: 1; } 22.22% { opacity: 0; } 33.32% { opacity: 0; } 33.33% { opacity: 1; } 44.43% { opacity: 1; } 44.44% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes f111000000 { 0% { opacity: 1; } 33.32% { opacity: 1; } 33.33% { opacity: 0; } 100% { opacity: 0; } }
  </style>

  <!-- Row 1 -->
  <rect x="1" y="1" width="4" height="4" />
  <rect class="on" x="1" y="1" width="4" height="4" opacity="0" style="animation: f000001110 var(--dur) linear infinite" />
  <rect x="7" y="1" width="4" height="4" />
  <rect class="on" x="7" y="1" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="13" y="1" width="4" height="4" />
  <rect class="on" x="13" y="1" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="19" y="1" width="4" height="4" />
  <rect class="on" x="19" y="1" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="25" y="1" width="4" height="4" />
  <rect class="on" x="25" y="1" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="31" y="1" width="4" height="4" />
  <rect class="on" x="31" y="1" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="37" y="1" width="4" height="4" />
  <rect class="on" x="37" y="1" width="4" height="4" opacity="0" style="animation: f000001110 var(--dur) linear infinite" />

  <!-- Row 2 -->
  <rect x="1" y="7" width="4" height="4" />
  <rect class="on" x="1" y="7" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="7" y="7" width="4" height="4" />
  <rect class="on" x="7" y="7" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="13" y="7" width="4" height="4" />
  <rect class="on" x="13" y="7" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="19" y="7" width="4" height="4" />
  <rect class="on" x="19" y="7" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="25" y="7" width="4" height="4" />
  <rect class="on" x="25" y="7" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="31" y="7" width="4" height="4" />
  <rect class="on" x="31" y="7" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="37" y="7" width="4" height="4" />
  <rect class="on" x="37" y="7" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />

  <!-- Row 3 -->
  <rect x="1" y="13" width="4" height="4" />
  <rect class="on" x="1" y="13" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="7" y="13" width="4" height="4" />
  <rect class="on" x="7" y="13" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="13" y="13" width="4" height="4" />
  <rect class="on" x="13" y="13" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="19" y="13" width="4" height="4" />
  <rect class="on" x="19" y="13" width="4" height="4" opacity="0" style="animation: f010100000 var(--dur) linear infinite" />
  <rect x="25" y="13" width="4" height="4" />
  <rect class="on" x="25" y="13" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="31" y="13" width="4" height="4" />
  <rect class="on" x="31" y="13" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="37" y="13" width="4" height="4" />
  <rect class="on" x="37" y="13" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />

  <!-- Row 4 -->
  <rect x="1" y="19" width="4" height="4" />
  <rect class="on" x="1" y="19" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="7" y="19" width="4" height="4" />
  <rect class="on" x="7" y="19" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="13" y="19" width="4" height="4" />
  <rect class="on" x="13" y="19" width="4" height="4" opacity="0" style="animation: f010100000 var(--dur) linear infinite" />
  <rect x="19" y="19" width="4" height="4" />
  <rect class="on" x="19" y="19" width="4" height="4" opacity="1" style="animation: f111000000 var(--dur) linear infinite" />
  <rect x="25" y="19" width="4" height="4" />
  <rect class="on" x="25" y="19" width="4" height="4" opacity="0" style="animation: f010100000 var(--dur) linear infinite" />
  <rect x="31" y="19" width="4" height="4" />
  <rect class="on" x="31" y="19" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="37" y="19" width="4" height="4" />
  <rect class="on" x="37" y="19" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />

  <!-- Row 5 -->
  <rect x="1" y="25" width="4" height="4" />
  <rect class="on" x="1" y="25" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="7" y="25" width="4" height="4" />
  <rect class="on" x="7" y="25" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="13" y="25" width="4" height="4" />
  <rect class="on" x="13" y="25" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="19" y="25" width="4" height="4" />
  <rect class="on" x="19" y="25" width="4" height="4" opacity="0" style="animation: f010100000 var(--dur) linear infinite" />
  <rect x="25" y="25" width="4" height="4" />
  <rect class="on" x="25" y="25" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="31" y="25" width="4" height="4" />
  <rect class="on" x="31" y="25" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="37" y="25" width="4" height="4" />
  <rect class="on" x="37" y="25" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />

  <!-- Row 6 -->
  <rect x="1" y="31" width="4" height="4" />
  <rect class="on" x="1" y="31" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="7" y="31" width="4" height="4" />
  <rect class="on" x="7" y="31" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="13" y="31" width="4" height="4" />
  <rect class="on" x="13" y="31" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="19" y="31" width="4" height="4" />
  <rect class="on" x="19" y="31" width="4" height="4" opacity="0" style="animation: f001010000 var(--dur) linear infinite" />
  <rect x="25" y="31" width="4" height="4" />
  <rect class="on" x="25" y="31" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="31" y="31" width="4" height="4" />
  <rect class="on" x="31" y="31" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="37" y="31" width="4" height="4" />
  <rect class="on" x="37" y="31" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />

  <!-- Row 7 -->
  <rect x="1" y="37" width="4" height="4" />
  <rect class="on" x="1" y="37" width="4" height="4" opacity="0" style="animation: f000001110 var(--dur) linear infinite" />
  <rect x="7" y="37" width="4" height="4" />
  <rect class="on" x="7" y="37" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="13" y="37" width="4" height="4" />
  <rect class="on" x="13" y="37" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="19" y="37" width="4" height="4" />
  <rect class="on" x="19" y="37" width="4" height="4" opacity="0" style="animation: f000101000 var(--dur) linear infinite" />
  <rect x="25" y="37" width="4" height="4" />
  <rect class="on" x="25" y="37" width="4" height="4" opacity="0" style="animation: f000110100 var(--dur) linear infinite" />
  <rect x="31" y="37" width="4" height="4" />
  <rect class="on" x="31" y="37" width="4" height="4" opacity="0" style="animation: f000011010 var(--dur) linear infinite" />
  <rect x="37" y="37" width="4" height="4" />
  <rect class="on" x="37" y="37" width="4" height="4" opacity="0" style="animation: f000001110 var(--dur) linear infinite" />
</svg>
