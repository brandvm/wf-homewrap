// Entry point. Keep this file a manifest: one run() call per module.
// Feature code lives in src/modules/<name>.ts and exports an init
// function that no-ops when its selector is absent from the page.
//
// HW-01 parity release: only the code the live site already ran (Lenis
// from the footer code, homewrap-main.js from CodeSandbox), in the same
// order. The template's starter modules (aria-roles, placeholders,
// unique-form-ids) change published markup, so they stay off until a
// later batch turns them on and measures them.
import { initLenis } from './modules/lenis';
import { initHomewrapLegacy } from './modules/homewrap-legacy';

// Each module runs in isolation: one that throws is logged and skipped,
// and every module after it still initializes.
function run(name: string, init: () => void) {
  try {
    init();
  } catch (error) {
    console.error(`[wfc] ${name} failed to initialize`, error);
  }
}

// Release the loader's .is-loading class at once. src/styles.css has no
// scroll-lock rule for it in this release, so it never locked anything.
document.documentElement.classList.remove('is-loading');

// Lenis ran synchronously in the footer code, before DOMContentLoaded:
// start it as soon as the bundle runs. homewrap-legacy waits for the DOM
// itself (its own onReady), as the deferred sandbox script did.
run('lenis', initLenis);
run('homewrap-legacy', initHomewrapLegacy);
