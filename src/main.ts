import { hydrate, mount } from "svelte";
import "./index.css";
import App from "./App.svelte";

const root = document.getElementById("root")!;

// If the root already contains prerendered HTML (production build),
// hydrate it so Svelte reuses the DOM instead of mounting fresh on top.
// In dev there is no prerendered HTML, so we fall back to mount.
if (root.childElementCount > 0) {
  hydrate(App, { target: root });
} else {
  mount(App, { target: root });
}

