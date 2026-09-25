/**
 * Marquee — dependency-free port of jQuery.marquee (Aamir Afridi).
 * Same options, same phase logic (duplicated / startVisible / pauseOnCycle),
 * same public commands (pause, resume, toggle, destroy) and same events
 * (beforeStarting, finished, paused, resumed) — dispatched as CustomEvents.
 *
 * Usage (classic <script>, exposes window.Marquee):
 *   Marquee.init('.marquee', { duplicated: true, duration: 20000 });
 *   Marquee.init('.marquee', 'pause');            // command by string, like $(el).marquee('pause')
 *   const m = Marquee.get(el); m.toggle();          // or via instance
 *   el.addEventListener('finished', () => {});      // like $(el).on('finished')
 */
(function () {
'use strict';


const ITEM_CLASS = 'js-marquee';
const WRAPPER_CLASS = 'js-marquee-wrapper';
const COMMANDS = new Set(['pause', 'resume', 'toggle', 'destroy']);
const instances = new WeakMap();

/** jQuery built-in easings, used only by the non-CSS fallback. */
const EASINGS = {
  linear: (p) => p,
  swing: (p) => 0.5 - Math.cos(p * Math.PI) / 2,
};

const px = (value) => parseFloat(value) || 0;

const parseAttr = (raw) => {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return /^-?\d+(\.\d+)?$/.test(raw) ? Number(raw) : raw;
};

/** Padding + border of an element along one axis. */
function boxExtra(cs, dimension) {
  const sides = dimension === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  return sides.reduce((sum, s) => sum + px(cs[`padding${s}`]) + px(cs[`border${s}Width`]), 0);
}

/** Content-box size (fractional), equivalent to jQuery's .width() / .height(). */
function contentSize(el, dimension) {
  const cs = getComputedStyle(el);
  const extra = boxExtra(cs, dimension);
  const size = parseFloat(cs[dimension]);
  if (Number.isNaN(size)) return Math.max(0, el.getBoundingClientRect()[dimension] - extra);
  return cs.boxSizing === 'border-box' ? Math.max(0, size - extra) : size;
}

/** Equivalent to jQuery's .height(value) / .width(value) (respects box-sizing). */
function setContentSize(el, dimension, value) {
  const cs = getComputedStyle(el);
  const extra = cs.boxSizing === 'border-box' ? boxExtra(cs, dimension) : 0;
  el.style[dimension] = `${value + extra}px`;
}

/** Equivalent to jQuery's .wrapInner(). */
function wrapInner(el, className) {
  const wrap = document.createElement('div');
  wrap.className = className;
  wrap.append(...el.childNodes);
  el.append(wrap);
  return wrap;
}

const supportsCssAnimations = () => 'animationName' in document.documentElement.style;

class Marquee {
  /** Global defaults, can be overridden like $.fn.marquee.defaults. */
  static defaults = {
    allowCss3Support: true,
    css3easing: 'linear',
    easing: 'linear',
    delayBeforeStart: 1000,
    direction: 'left', // left | right | up | down
    duplicated: false,
    duration: 5000,
    gap: 20,
    pauseOnCycle: false,
    pauseOnHover: false,
    startVisible: false,
  };

  /**
   * Plugin-style entry point.
   * @param {string|Element|Iterable<Element>} target
   * @param {object|'pause'|'resume'|'toggle'|'destroy'} [options]
   * @returns {Marquee[]}
   */
  static init(target, options) {
    const elements =
      typeof target === 'string'
        ? document.querySelectorAll(target)
        : target instanceof Element
          ? [target]
          : (target ?? []);
    const result = [];

    for (const el of elements) {
      if (typeof options === 'string') {
        if (COMMANDS.has(options)) instances.get(el)?.[options]();
      } else {
        result.push(instances.get(el) ?? new Marquee(el, options));
      }
    }
    return result;
  }

  static get(element) {
    return instances.get(element) ?? null;
  }

  // --- state -------------------------------------------------------------
  #wrapper;
  #vertical;
  #forward; // true for "left" / "up": margin moves towards negative values
  #loop; // k (horizontal) / q (vertical): size of one item + gap
  #view; // h (horizontal) / m (vertical): size of the viewport
  #phase = 3; // "e" in the original
  #css3 = false;
  #animName = '';
  #timing = '';
  #target = 0;
  #keyframes = null;
  #timer = 0;
  #anim = null; // fallback (non-CSS) animation controller
  #status = 'resumed';
  #initialHeight = '';

  #onPause = () => this.pause();
  #onResume = () => this.resume();
  #onHover = () => this.toggle();
  #onIteration = (e) => {
    if (e.target === this.#wrapper) this.#emit('finished');
  };
  #onEnd = (e) => {
    if (e.target !== this.#wrapper) return;
    this.#cycle();
    this.#emit('finished');
  };

  constructor(element, options = {}) {
    if (!(element instanceof Element)) throw new TypeError('Marquee: DOM element expected');
    if (instances.has(element)) return instances.get(element);

    this.element = element;
    const o = (this.options = { ...Marquee.defaults, ...options });

    // data-* attributes override options
    for (const key of Object.keys(o)) {
      const raw = element.getAttribute(`data-${key}`);
      if (raw !== null) o[key] = parseAttr(raw);
    }

    if (o.speed) o.duration = o.speed * parseInt(contentSize(element, 'width'), 10);

    this.#vertical = o.direction === 'up' || o.direction === 'down';
    this.#forward = this.#vertical ? o.direction === 'up' : o.direction === 'left';
    o.gap = o.duplicated ? parseInt(o.gap, 10) : 0;

    // --- DOM ---------------------------------------------------------------
    const first = wrapInner(element, ITEM_CLASS);
    first.style.marginRight = `${o.gap}px`;
    first.style.cssFloat = 'left';
    if (o.duplicated) element.append(first.cloneNode(true));

    const wrapper = (this.#wrapper = wrapInner(element, WRAPPER_CLASS));
    wrapper.style.width = '100000px';

    if (this.#vertical) {
      this.#view = contentSize(element, 'height');
      wrapper.removeAttribute('style');
      this.#initialHeight = element.style.height;
      setContentSize(element, 'height', this.#view);
      for (const item of wrapper.children) {
        item.style.cssFloat = 'none';
        item.style.marginBottom = `${o.gap}px`;
        item.style.marginRight = '0px';
      }
      if (o.duplicated) wrapper.lastElementChild.style.marginBottom = '0px';
      this.#loop = contentSize(first, 'height') + o.gap;
    } else {
      this.#loop = contentSize(first, 'width') + o.gap;
      this.#view = contentSize(element, 'width');
    }

    // --- duration normalisation (px/ms speed is kept constant) -----------------
    const l = parseInt(this.#loop, 10);
    const v = parseInt(this.#view, 10);
    if (o.startVisible && !o.duplicated) {
      o._completeDuration = ((l + v) / v) * o.duration;
      o.duration *= l / v;
    } else {
      o.duration *= (l + v) / v;
    }
    if (o.duplicated) o.duration /= 2;

    // --- CSS animation support ---------------------------------------------
    if (o.allowCss3Support && supportsCssAnimations()) {
      this.#css3 = true;
      this.#animName = `marqueeAnimation-${Math.floor(1e7 * Math.random())}`;
      this.#timing = this.#buildTiming(o.delayBeforeStart, true);
      this.#keyframes = document.createElement('style');
      wrapper.append(this.#keyframes);
    }

    // --- initial position / phase --------------------------------------------
    const styleProp = this.#vertical ? 'marginTop' : 'marginLeft';
    if (o.duplicated) {
      wrapper.style[styleProp] = `${
        o.startVisible ? 0 : this.#forward ? this.#view : -(2 * this.#loop - o.gap)
      }px`;
      if (!o.startVisible) this.#phase = 1;
    } else if (o.startVisible) {
      this.#phase = 2;
    } else {
      this.#placeAtStart();
    }

    // --- events ---------------------------------------------------------------
    element.addEventListener('pause', this.#onPause);
    element.addEventListener('resume', this.#onResume);
    if (o.pauseOnHover) {
      element.addEventListener('mouseenter', this.#onHover);
      element.addEventListener('mouseleave', this.#onHover);
    }
    if (this.#css3) {
      wrapper.addEventListener('animationiteration', this.#onIteration);
      wrapper.addEventListener('animationend', this.#onEnd);
    }

    instances.set(element, this);

    if (this.#css3) this.#cycle();
    else this.#timer = setTimeout(() => this.#cycle(), o.delayBeforeStart);
  }

  // --- public API --------------------------------------------------------------

  pause() {
    if (this.#css3) this.#wrapper.style.animationPlayState = 'paused';
    else this.#anim?.pause();
    this.#status = 'paused';
    this.#emit('paused');
  }

  resume() {
    if (this.#css3) this.#wrapper.style.animationPlayState = 'running';
    else this.#anim?.resume();
    this.#status = 'resumed';
    this.#emit('resumed');
  }

  toggle() {
    if (this.#status === 'resumed') this.pause();
    else this.resume();
  }

  destroy() {
    clearTimeout(this.#timer);
    this.#anim?.stop();
    this.#anim = null;

    const el = this.element;
    el.removeEventListener('pause', this.#onPause);
    el.removeEventListener('resume', this.#onResume);
    el.removeEventListener('mouseenter', this.#onHover);
    el.removeEventListener('mouseleave', this.#onHover);
    this.#wrapper.removeEventListener('animationiteration', this.#onIteration);
    this.#wrapper.removeEventListener('animationend', this.#onEnd);

    // restore the original content (nodes are moved back, not re-parsed)
    el.replaceChildren(...this.#wrapper.firstElementChild.childNodes);
    if (this.#vertical) el.style.height = this.#initialHeight;
    instances.delete(el);
  }

  // --- internals -----------------------------------------------------------------

  #emit(name) {
    this.element.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  /** "animation" shorthand value for the current phase. */
  #buildTiming(delay, infinite) {
    const { duration, css3easing } = this.options;
    return `${this.#animName} ${duration / 1000}s ${delay / 1000}s${infinite ? ' infinite' : ''} ${css3easing}`;
  }

  /** Put the strip at its start position (C() / D() in the original). */
  #placeAtStart() {
    const prop = this.#vertical ? 'marginTop' : 'marginLeft';
    this.#wrapper.style[prop] = `${this.#forward ? this.#view : -this.#loop}px`;
  }

  /** Renames keyframes so the browser restarts the animation ("g += '0'"). */
  #renameAnimation() {
    this.#animName += '0';
  }

  /** One animation "leg": the original `w` function. */
  #cycle() {
    const o = this.options;
    const wrapper = this.#wrapper;
    const vertical = this.#vertical;
    const forward = this.#forward;
    const loop = this.#loop;
    const view = this.#view;
    const styleProp = vertical ? 'marginTop' : 'marginLeft';

    if (o.duplicated) {
      if (this.#phase === 1) {
        // first pass: from the initial off-screen position to the seamless loop point
        o._originalDuration = o.duration;
        o.duration = forward ? o.duration + view / (loop / o.duration) : 2 * o.duration;
        if (this.#css3) this.#timing = this.#buildTiming(o.delayBeforeStart, false);
        this.#phase++;
      } else if (this.#phase === 2) {
        // from now on loop infinitely at the original speed
        o.duration = o._originalDuration;
        if (this.#css3) {
          this.#renameAnimation();
          this.#timing = this.#buildTiming(0, true);
        }
        this.#phase++;
      }
      if (this.#phase > 2) wrapper.style[styleProp] = `${forward ? 0 : -loop}px`;
      this.#target = forward ? -loop : 0;
    } else if (o.startVisible) {
      if (this.#phase === 2) {
        // first pass: from the visible start position out of the viewport
        if (this.#css3) this.#timing = this.#buildTiming(o.delayBeforeStart, false);
        this.#target = forward ? -loop : view;
        this.#phase++;
      } else if (this.#phase === 3) {
        // then loop from the far edge across the whole viewport
        o.duration = o._completeDuration;
        if (this.#css3) {
          this.#renameAnimation();
          this.#timing = this.#buildTiming(0, true);
        }
        this.#placeAtStart();
      }
    } else {
      this.#placeAtStart();
      this.#target = forward ? -(vertical ? contentSize(wrapper, 'height') : loop) : view;
    }

    this.#emit('beforeStarting');

    if (this.#css3) {
      const cssProp = vertical ? 'margin-top' : 'margin-left';
      this.#keyframes.textContent = `@keyframes ${this.#animName} { 100% { ${cssProp}: ${this.#target}px; } }`;
      wrapper.style.animation = this.#timing;
    } else {
      this.#animate(styleProp, this.#target, o.duration, o.easing, () => {
        this.#emit('finished');
        if (o.pauseOnCycle) this.#timer = setTimeout(() => this.#cycle(), o.delayBeforeStart);
        else this.#cycle();
      });
    }

    if (this.#status !== 'paused') this.#status = 'resumed';
  }

  /** Fallback for $.fn.animate (+ jquery.pause): requestAnimationFrame tween of a margin. */
  #animate(prop, to, duration, easing, done) {
    const wrapper = this.#wrapper;
    const from = px(getComputedStyle(wrapper)[prop]);
    const ease = typeof easing === 'function' ? easing : (EASINGS[easing] ?? EASINGS.linear);
    let elapsed = 0;
    let last = 0;
    let raf = 0;
    let playing = false;

    const frame = (now) => {
      elapsed += Math.max(0, now - last);
      last = now;
      const p = duration > 0 ? Math.min(elapsed / duration, 1) : 1;
      wrapper.style[prop] = `${from + (to - from) * ease(p)}px`;
      if (p < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        playing = false;
        this.#anim = null;
        done();
      }
    };
    const resume = () => {
      if (playing) return;
      playing = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      playing = false;
      cancelAnimationFrame(raf);
    };

    this.#anim = { pause, resume, stop: pause };
    if (this.#status !== 'paused') resume();
  }
}

window.Marquee = Marquee;
})();