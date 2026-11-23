// HW-01 parity port of the Lenis block in the site footer code
// (docs/handoff/rollback/published-footer-code.html), which loaded
// lenis@1.1.5 from unpkg. Same version (bundled, pinned in package.json),
// same options, same GSAP hookup. As before, the instance is not put on
// window: GoToTop looks for window.lenis and falls back to native scroll.
import Lenis from 'lenis';

type Gsap = {
  ticker: { add: (fn: (time: number) => void) => void; lagSmoothing: (n: number) => void };
};

export function initLenis() {
  if (window.Webflow?.env?.('editor')) return;
  const w = window as unknown as { gsap?: Gsap; ScrollTrigger?: { update: () => void } };
  // Options copied as they were, including ones Lenis 1.1.5 no longer reads.
  const options = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };
  const lenis = new Lenis(options as ConstructorParameters<typeof Lenis>[0]);
  // The footer code threw here when GSAP was missing; keep that behaviour
  // visible (run() logs it) rather than silently skipping.
  lenis.on('scroll', w.ScrollTrigger!.update);
  w.gsap!.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  w.gsap!.ticker.lagSmoothing(0);
}
