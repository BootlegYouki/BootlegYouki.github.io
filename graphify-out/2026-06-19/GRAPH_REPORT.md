# Graph Report - portfolio  (2026-06-19)

## Corpus Check
- 41 files · ~17,739 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 451 nodes · 591 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f8034896`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Tactical UI Components Forge|Tactical UI Components Forge]]
- [[_COMMUNITY_Vivid TUI Components Hub|Vivid TUI Components Hub]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Data Pulse Hub|Data Pulse Hub]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Terminal UI Collective|Terminal UI Collective]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Modern Package Masters|Modern Package Masters]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Nimble Pnpm Pioneers|Nimble Pnpm Pioneers]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 84 edges
2. `compilerOptions` - 19 edges
3. `compilerOptions` - 19 edges
4. `compilerOptions` - 16 edges
5. `compilerOptions` - 16 edges
6. `DropdownMenu()` - 15 edges
7. `scripts` - 12 edges
8. `scripts` - 10 edges
9. `Installing Webfonts` - 7 edges
10. `📟 template-tui — Retro-Brutalist TUI Design System` - 7 edges

## Surprising Connections (you probably didn't know these)
- `graphify pipeline` --conceptually_related_to--> `Graphify Memory & Ingestion Layer`  [INFERRED]
  .agents/workflows/graphify.md → CLAUDE.md
- `ChartContainer()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/chart.tsx → src/lib/utils.ts
- `DropdownMenuItem()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/lib/utils.ts
- `DropdownMenuLabel()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/lib/utils.ts
- `Graphify Memory & Ingestion Layer` --references--> `graphify-out/`  [EXTRACTED]
  CLAUDE.md → README.md

## Communities (23 total, 4 thin omitted)

### Community 0 - "Tactical UI Components Forge"
Cohesion: 0.09
Nodes (22): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+14 more)

### Community 1 - "Vivid TUI Components Hub"
Cohesion: 0.08
Nodes (25): AboutSection(), IntroSection(), Project, projects, ProjectsSection(), ScrollProgress(), ResolvedTheme, Theme (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, prettier, prettier-plugin-tailwindcss (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (42): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+34 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+12 more)

### Community 5 - "Data Pulse Hub"
Cohesion: 0.18
Nodes (10): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (21): APP_TSX_PATH, __dirname, __filename, ROOT_DIR, TEMPLATE_DIR_PATH, APP_TSX_PATH, __dirname, __filename (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (32): name, private, scripts, build, dev, format, init-template, int-template (+24 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (7): iconMap, TechTicker(), tools, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

### Community 9 - "Terminal UI Collective"
Cohesion: 0.06
Nodes (40): cn(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Button() (+32 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (20): 🧼 Clean the Template (Start Fresh), 🚀 Key Features, 🧠 maintaining the Graphify Knowledge Graph, 🛠️ Quick Start, 📟 Restore/Initialize the Template, 🧹 Template Management (Cleanup & Restore), 📟 template-tui — Retro-Brutalist TUI Design System, 📸 Visual Showcase (+12 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (18): Graphify Memory & Ingestion Layer, 1. Verification & Map First (Rule), 2. Maintenance Workflow (Workflow), CLAUDE.md — Workspace Rules & Workflows, Command Guidelines, Graphify Memory & Ingestion Layer, graphify-out/, template-tui (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (10): compilerOptions, paths, files, @/*, references, compilerOptions, paths, files (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.06
Nodes (34): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+26 more)

### Community 19 - "Community 19"
Cohesion: 0.23
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, prettier, prettier-plugin-tailwindcss (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (7): 1., 2., 3. (Optional), 4., 5., 6. (Optional), Installing Webfonts

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (16): dependencies, class-variance-authority, clsx, @fontsource-variable/jetbrains-mono, gsap, lenis, radix-ui, react (+8 more)

## Knowledge Gaps
- **255 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+250 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Terminal UI Collective` to `Vivid TUI Components Hub`, `Data Pulse Hub`, `Community 8`, `Community 11`, `Community 19`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `TuiContainer` connect `Community 11` to `Terminal UI Collective`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _258 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tactical UI Components Forge` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Vivid TUI Components Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.07862679955703211 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._