/**
 * HorizontalScrollPin
 *
 * Pins a block (position: sticky) and converts the vertical page scroll into a
 * horizontal translation of the inner strip. When the strip reaches its last
 * item the block is released and the page scrolls on.
 *
 * No wheel/touch hijacking: the browser keeps scrolling natively, we only map
 * scroll progress -> translateX. Works with wheel, touch, keyboard, scrollbar.
 *
 *   new HorizontalScrollPin(document.querySelector('.design'), {
 *     strip: '.design__banners', // element that is moved horizontally
 *     top: 'center',             // 'center' | number (px from viewport top, e.g. fixed header height)
 *     ratio: 2,                  // px of page scroll spent per 1px of horizontal movement (bigger = slower)
 *     smooth: 0.12               // inertia, 0..1 (smaller = smoother/laggier, 1 = no smoothing)
 *   });
 */
(function () {
  'use strict';

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const FRAME = 1000 / 60;

  class HorizontalScrollPin {
    #root;
    #strip;
    #pin;
    #top;
    #ratio;
    #smooth;
    #saved;

    #stickyTop = 0;
    #distance = 0; // horizontal path of the strip, px
    #scrollLength = 0; // vertical scroll spent on that path, px
    #targetX = 0; // where the strip should be (from scroll position)
    #currentX = 0; // where the strip is now (smoothed)
    #frame = 0;
    #lastTs = 0;
    #listening = false;
    #resizeObserver;
    #intersectionObserver;

    constructor(root, { strip, top = 'center', ratio = 2, smooth = 0.12 } = {}) {
      const stripEl = typeof strip === 'string' ? root?.querySelector(strip) : strip;
      if (!(root instanceof Element) || !(stripEl instanceof Element)) {
        throw new TypeError('HorizontalScrollPin: root and strip elements are required');
      }

      this.#root = root;
      this.#strip = stripEl;
      this.#top = top;
      this.#ratio = Math.max(0.1, Number(ratio) || 1);
      this.#smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 1
        : clamp(Number(smooth) || 1, 0.01, 1);

      // Wrapper: its height = block height + scroll length. Sticky lives inside it.
      this.#pin = document.createElement('div');
      root.before(this.#pin);
      this.#pin.append(root);

      this.#saved = {
        position: root.style.position,
        top: root.style.top,
        overflowX: root.style.overflowX,
      };
      root.style.position = 'sticky';
      root.style.overflowX = CSS.supports('overflow-x', 'clip') ? 'clip' : 'hidden';

      this.#warnIfStickyIsBroken();
      this.#measure();

      // Re-measure when layout changes (lazy images, fonts, viewport width/height).
      this.#resizeObserver = new ResizeObserver(this.#measure);
      this.#resizeObserver.observe(root);
      this.#resizeObserver.observe(stripEl);
      window.addEventListener('resize', this.#measure);

      // Listen to scroll only while the block is near the viewport.
      this.#intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          this.#toggleScrollListener(entry.isIntersecting);
          this.#updateTarget();
          if (entry.isIntersecting) {
            this.#startLoop();
          } else {
            this.#currentX = this.#targetX; // off-screen: snap, nobody sees it
            this.#apply();
          }
        },
        { rootMargin: '100% 0px' }
      );
      this.#intersectionObserver.observe(this.#pin);
    }

    /** Force re-measurement (e.g. after content was changed programmatically). */
    refresh() {
      this.#measure();
    }

    destroy() {
      this.#resizeObserver.disconnect();
      this.#intersectionObserver.disconnect();
      window.removeEventListener('resize', this.#measure);
      this.#toggleScrollListener(false);
      cancelAnimationFrame(this.#frame);
      this.#frame = 0;

      this.#strip.style.transform = '';
      Object.assign(this.#root.style, this.#saved);
      this.#pin.replaceWith(this.#root);
    }

    // ---------------------------------------------------------------------

    #measure = () => {
      const root = this.#root;
      const rootHeight = root.offsetHeight;

      // Natural (untranslated) geometry.
      this.#strip.style.transform = 'none';
      const rootRect = root.getBoundingClientRect();
      const stripRect = this.#strip.getBoundingClientRect();

      // The strip stops when its right edge (incl. last item's margin) meets the block's right edge.
      this.#distance = Math.max(0, Math.ceil(stripRect.right - rootRect.right));
      this.#scrollLength = this.#distance * this.#ratio;

      this.#stickyTop =
        this.#top === 'center'
          ? Math.max(0, (window.innerHeight - rootHeight) / 2)
          : Number(this.#top) || 0;

      this.#pin.style.height = this.#scrollLength ? `${rootHeight + this.#scrollLength}px` : '';
      root.style.top = `${this.#stickyTop}px`;

      this.#updateTarget();
      this.#currentX = this.#targetX; // no easing on layout changes
      this.#apply();
    };

    /** Scroll position -> target translateX. */
    #updateTarget() {
      if (!this.#scrollLength) {
        this.#targetX = 0;
        return;
      }
      // How far the pin wrapper has travelled past the moment the block became stuck.
      const travelled = this.#stickyTop - this.#pin.getBoundingClientRect().top;
      this.#targetX = -clamp(travelled / this.#scrollLength, 0, 1) * this.#distance;
    }

    #apply() {
      this.#strip.style.transform = this.#currentX
        ? `translate3d(${Math.round(this.#currentX)}px, 0, 0)`
        : '';
    }

    #onScroll = () => {
      this.#updateTarget();
      this.#startLoop();
    };

    #startLoop() {
      if (!this.#frame) this.#frame = requestAnimationFrame(this.#step);
    }

    /** Frame-rate independent exponential smoothing towards the target. */
    #step = (now) => {
      this.#frame = 0;
      const delta = this.#targetX - this.#currentX;

      if (this.#smooth >= 1 || Math.abs(delta) < 0.25) {
        this.#currentX = this.#targetX;
        this.#lastTs = 0;
      } else {
        const dt = this.#lastTs ? Math.min(now - this.#lastTs, 64) : FRAME;
        this.#currentX += delta * (1 - Math.pow(1 - this.#smooth, dt / FRAME));
        this.#lastTs = now;
        this.#startLoop();
      }
      this.#apply();
    };

    #toggleScrollListener(on) {
      if (on === this.#listening) return;
      this.#listening = on;
      if (on) window.addEventListener('scroll', this.#onScroll, { passive: true });
      else window.removeEventListener('scroll', this.#onScroll);
    }

    /** position: sticky silently stops working if an ancestor clips overflow. */
    #warnIfStickyIsBroken() {
      for (let el = this.#pin.parentElement; el && el !== document.body; el = el.parentElement) {
        const { overflowX, overflowY } = getComputedStyle(el);
        if (/hidden|auto|scroll/.test(overflowX + overflowY)) {
          console.warn(
            '[HorizontalScrollPin] An ancestor has overflow hidden/auto/scroll, sticky will not pin. Use "overflow: clip" instead.',
            el
          );
          return;
        }
      }
    }
  }

  window.HorizontalScrollPin = HorizontalScrollPin;
})();