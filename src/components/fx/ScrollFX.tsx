'use client';

import { useEffect } from 'react';

/**
 * Single rAF-driven scroll engine for the whole page:
 *
 * - `[data-parallax="speed"]` layers are translated on scroll. Negative speed
 *   lags behind the scroll (background feel), positive speed leads it.
 * - `[data-reveal]` elements fade/slide in once via IntersectionObserver
 *   (the initial hidden state lives in CSS behind `.fx-ready`, added by an
 *   inline script before first paint, so no-JS stays fully visible).
 * - A thin progress bar tracks scroll position.
 *
 * Transform writes go straight to the DOM — no React re-renders while scrolling.
 */
export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;

    if (root.classList.contains('fx-reduced')) {
      return;
    }

    const vh = window.innerHeight;
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );
    const progressBar = document.querySelector<HTMLElement>('[data-scroll-progress]');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));

    let ticking = false;

    const update = () => {
      ticking = false;

      if (progressBar) {
        const max = root.scrollHeight - vh;
        const ratio = max > 0 ? window.scrollY / max : 0;
        progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      for (const el of parallaxEls) {
        const speed = Number.parseFloat(el.dataset.parallax ?? '');
        if (!speed) continue;

        const rect = el.getBoundingClientRect();
        // 0 when centred in the viewport, -1 once a full screen above it.
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const shift = Math.max(-160, Math.min(160, progress * speed * 100));
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-scroll-progress
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-[#39d353]"
    />
  );
}
