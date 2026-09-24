class Typed {
  static defaults = {
    strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    backDelay: 500,
    loop: false,
    loopCount: false,
    showCursor: true,
    cursorChar: "|",
    attr: null,
    callback: () => {},
    preStringTyped: () => {},
    onStringTyped: () => {},
    resetCallback: () => {}
  };

  constructor(element, options = {}) {
    this.el = typeof element === "string" ? document.querySelector(element) : element;
    if (!this.el) throw new Error("Typed.js: Target element not found");

    this.options = { ...Typed.defaults, ...options };
    
    this.isInput = this.el.tagName === "INPUT" || this.el.tagName === "TEXTAREA";
    this.baseText = this.el.value || this.el.textContent || this.el.getAttribute("placeholder") || "";
    this.attr = this.options.attr || (this.isInput ? "placeholder" : null);

    this.strings = this.options.strings;
    this.typeSpeed = this.options.typeSpeed;
    this.startDelay = this.options.startDelay;
    this.backSpeed = this.options.backSpeed;
    this.backDelay = this.options.backDelay;
    this.loop = this.options.loop;
    this.loopCount = this.options.loopCount;

    this.strPos = 0;
    this.arrayPos = 0;
    this.stopNum = 0;
    this.curLoop = 0;
    
    this.isStopped = false;
    this.cursor = null;
    this.timeoutId = null;

    this.build();
  }

  build() {
    if (this.options.showCursor && !this.isInput) {
      this.cursor = document.createElement("span");
      this.cursor.className = "typed-cursor";
      this.cursor.textContent = this.options.cursorChar;
      this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
    }
    this.init();
  }

  init() {
    this.setSmartTimeout(() => {
      this.typewrite(this.strings[this.arrayPos], this.strPos);
    }, this.startDelay);
  }

  typewrite(curString, curStrPos) {
    if (this.isStopped) return;

    // Расчет человекоподобной задержки (Human-like typing)
    const humanSpeed = Math.round(Math.random() * 70) + this.typeSpeed;

    this.setSmartTimeout(() => {
      let pauseTime = 0;
      let substr = curString.slice(curStrPos);

      // Обработка синтаксиса паузы внутри строки, например: "^1000"
      if (substr.startsWith("^")) {
        let skipChars = 1;
        if (/^\^\d+/.test(substr)) {
          const match = /^\^(\d+)/.exec(substr);
          const digits = match[1];
          skipChars += digits.length;
          pauseTime = parseInt(digits, 10);
        }
        curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skipChars);
      }

      this.setSmartTimeout(() => {
        if (curStrPos === curString.length) {
          this.options.onStringTyped(this.arrayPos);

          // Проверка на завершение всех строк и циклов
          if (this.arrayPos === this.strings.length - 1) {
            this.options.callback();
            this.curLoop++;
            if (!this.loop || (this.loopCount !== false && this.curLoop === this.loopCount)) {
              return;
            }
          }

          this.setSmartTimeout(() => {
            this.backspace(curString, curStrPos);
          }, this.backDelay);

        } else {
          if (curStrPos === 0) {
            this.options.preStringTyped(this.arrayPos);
          }

          const nextText = this.baseText + curString.slice(0, curStrPos + 1);
          this.write(nextText);

          curStrPos++;
          this.typewrite(curString, curStrPos);
        }
      }, pauseTime);

    }, humanSpeed);
  }

  backspace(curString, curStrPos) {
    if (this.isStopped) return;

    const humanSpeed = Math.round(Math.random() * 70) + this.backSpeed;

    this.setSmartTimeout(() => {
      const nextText = this.baseText + curString.slice(0, curStrPos);
      this.write(nextText);

      if (curStrPos > this.stopNum) {
        curStrPos--;
        this.backspace(curString, curStrPos);
      } else if (curStrPos <= this.stopNum) {
        this.arrayPos++;

        if (this.arrayPos === this.strings.length) {
          this.arrayPos = 0;
          this.init();
        } else {
          this.typewrite(this.strings[this.arrayPos], curStrPos);
        }
      }
    }, humanSpeed);
  }

  write(text) {
    if (this.attr) {
      this.el.setAttribute(this.attr, text);
    } else if (this.isInput) {
      this.el.value = text;
    } else {
      this.el.textContent = text;
    }
  }

  // Кастомный высокоточный таймер на базе requestAnimationFrame
  setSmartTimeout(callback, delay) {
    if (this.isStopped) return;
    this.clearSmartTimeout();

    if (delay <= 0) {
      callback();
      return;
    }

    const start = performance.now();
    const loop = (now) => {
      if (now - start >= delay) {
        callback();
      } else {
        this.timeoutId = requestAnimationFrame(loop);
      }
    };
    this.timeoutId = requestAnimationFrame(loop);
  }

  clearSmartTimeout() {
    if (this.timeoutId) {
      cancelAnimationFrame(this.timeoutId);
      this.timeoutId = null;
    }
  }

  stop() {
    this.isStopped = true;
    this.clearSmartTimeout();
  }

  start() {
    if (!this.isStopped) return;
    this.isStopped = false;
    this.typewrite(this.strings[this.arrayPos], this.strPos);
  }

  reset() {
    this.stop();
    this.clearSmartTimeout();
    
    this.write(this.baseText);
    if (this.cursor) {
      this.cursor.remove();
      this.cursor = null;
    }
    
    this.strPos = 0;
    this.arrayPos = 0;
    this.curLoop = 0;
    
    this.options.resetCallback();
  }
}
