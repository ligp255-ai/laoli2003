(() => {
  "use strict";

  const PROFILE = Object.assign(
    {
      name: "李贵平",
      intro: "环境设计专业，做空间、品牌与图像。2026 届，可随时到岗。",
      location: "甘肃 · 天水",
      email: "1945343340@qq.com",
      phone: "19393185828",
      availability: "可随时到岗",
      resume: "assets/li-guiping-resume.pdf",
      portrait: "assets/img/portrait.jpg",
      focus: "求职方向：室内 / 景观 / 展陈视觉",
      skills: [],
      timeline: []
    },
    window.PROFILE || {}
  );

  const WORKS = Array.isArray(window.WORKS) ? window.WORKS : [];
  const CATEGORIES = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
  const COLORS = window.CATEGORY_COLORS || {};
  const GALLERY_PICKS = Array.isArray(window.GALLERY_PICKS) ? window.GALLERY_PICKS : [];

  const bySlug = new Map(WORKS.map((work) => [work.slug, work]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });

  const imageFor = (work, n) => work && work.images ? work.images.find((image) => image.n === n) : null;

  /* ---------- profile ---------- */

  function applyProfile() {
    $$("[data-profile]").forEach((element) => {
      const key = element.dataset.profile;
      if (PROFILE[key]) element.textContent = PROFILE[key];
    });

    $$("[data-profile-href]").forEach((element) => {
      const key = element.dataset.profileHref;
      if (!PROFILE[key]) return;
      if (key === "email") element.href = `mailto:${PROFILE.email}`;
      else if (key === "phone") element.href = `tel:${String(PROFILE.phone).replace(/\s+/g, "")}`;
      else element.href = PROFILE[key];
    });

    $$("[data-profile-text]").forEach((element) => {
      const key = element.dataset.profileText;
      if (PROFILE[key]) element.textContent = PROFILE[key];
    });

    $$("[data-profile-src]").forEach((element) => {
      const key = element.dataset.profileSrc;
      if (PROFILE[key]) element.src = PROFILE[key];
    });

    const skills = $("#skills");
    if (skills && PROFILE.skills.length) {
      skills.innerHTML = PROFILE.skills
        .map(
          (item) =>
            `<div><dt>${esc(item.label)}</dt><dd>${esc(item.value)}</dd></div>`
        )
        .join("");
    }

    const meta = $("#about-meta");
    if (meta && PROFILE.timeline.length) {
      meta.innerHTML = PROFILE.timeline
        .map(
          (item) =>
            `<div><dt>${esc(item.label)}</dt><dd>${esc(item.value)}</dd></div>`
        )
        .join("");
    }

    const footer = $(".site-footer");
    if (footer && PROFILE.nameEn) footer.dataset.wordmark = PROFILE.nameEn;

    document.title = `${PROFILE.name} · 设计作品集 2026`;
  }

  /* ---------- featured works ---------- */

  function renderFeatured() {
    const host = $("#featured-runs");
    if (!host) return;

    const featured = WORKS.filter((work) => work.featured).slice(0, 6);

    host.innerHTML = featured
      .map((work) => {
        const picks = Array.isArray(work.preview) ? work.preview : [];
        const list = picks.length
          ? picks.map((n) => work.images.find((item) => item.n === n)).filter(Boolean)
          : work.images;
        const frames = list
          .slice(0, 4)
          .map(
            (image) =>
              `<div class="run-frame"><img src="${esc(image.thumb)}" alt="" loading="lazy" decoding="async"></div>`
          )
          .join("");

        return `
          <article class="run" data-reveal>
            <a class="run-link" href="#/work/${esc(work.slug)}">
              <div class="run-meta">
                <h3>${esc(work.title)}</h3>
                <p class="run-cat">${esc(work.category)} · ${esc(work.year)}</p>
                <p class="run-summary">${esc(work.summary)}</p>
              </div>
              <div class="run-frames">${frames}</div>
            </a>
          </article>`;
      })
      .join("");
  }

  /* ---------- index / filter ---------- */

  let activeCategory = "全部";

  function renderFilters() {
    const host = $("#filters");
    if (!host) return;

    const options = ["全部", ...CATEGORIES];
    host.innerHTML = options
      .map((category) => {
        const count =
          category === "全部"
            ? WORKS.length
            : WORKS.filter((work) => work.category === category).length;
        const pressed = category === activeCategory ? "true" : "false";
        const dot = category === "全部" ? "" : ` style="--cat:${esc(COLORS[category] || "")}"`;
        return `<button class="filter" type="button" data-cat="${esc(category)}" aria-pressed="${pressed}"${dot}>${esc(
          category
        )}<span class="count">${count}</span></button>`;
      })
      .join("");

    host.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");
      if (!button) return;
      setFilter(button.dataset.cat || "全部");
    });
  }

  function renderShelf() {
    const host = $("#shelf");
    if (!host) return;

    host.innerHTML = WORKS.map((work) => {
      const color = COLORS[work.category] || "var(--surface-2)";
      return `
        <a class="spine" href="#/work/${esc(work.slug)}" data-category="${esc(
        work.category
      )}" data-reveal style="--cat:${esc(color)}">
          <span class="spine-title">${esc(work.title)}</span><span class="spine-gap" aria-hidden="true">　</span><span class="spine-cat" style="--cat:${esc(
        color
      )}">${esc(work.category)}</span>
        </a>`;
    }).join("");

    const count = $("#index-count");
    if (count) count.textContent = `${WORKS.length} 个项目`;
  }

  function setFilter(category) {
    activeCategory = category;

    $$(".filter").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.cat === category));
    });

    let matchCount = 0;
    $$(".spine").forEach((spine) => {
      const match = category === "全部" || spine.dataset.category === category;
      if (match) matchCount += 1;
      spine.classList.toggle("is-match", category !== "全部" && match);
      spine.classList.toggle("is-dim", category !== "全部" && !match);
    });

    const status = $("#filter-status");
    if (status) {
      status.textContent =
        category === "全部"
          ? `显示全部 ${WORKS.length} 个项目。`
          : `已聚焦${category}，共 ${matchCount} 个项目。其他项目仍然可以点击。`;
    }

    animateShelfFilter(category);
  }

  function animateShelfFilter(category) {
    if (!window.gsap || reduceMotion) return;

    const spines = $$(".spine");
    if (!spines.length) return;

    window.gsap.to(spines, {
      opacity: (index, spine) =>
        category === "全部" || spine.classList.contains("is-match") ? 1 : 0.24,
      x: (index, spine) => (category !== "全部" && spine.classList.contains("is-match") ? 3 : 0),
      duration: 0.38,
      ease: "power3.out",
      stagger: { each: 0.006, from: "start" },
      overwrite: "auto"
    });
  }

  /* ---------- gallery ---------- */

  function renderGallery() {
    const host = $("#gallery-track");
    if (!host) return;

    const frames = GALLERY_PICKS.map((pick) => {
      const work = bySlug.get(pick.slug);
      const image = imageFor(work, pick.n);
      if (!work || !image) return "";
      return `
        <a class="gframe" href="#/work/${esc(work.slug)}" data-reveal aria-label="${esc(
        work.title
      )}：${esc(image.caption)}">
          <img src="${esc(image.thumb)}" alt="${esc(image.alt)}" loading="lazy" decoding="async">
        </a>`;
    }).join("");

    host.innerHTML = frames;
  }

  /* ---------- project view ---------- */

  const view = $("#project-view");
  const article = $("#pv-article");
  const closeButton = $("#pv-close");
  const pvLabel = $(".pv-label");
  const main = $("#main");
  const topbar = $("#topbar");
  const footer = $(".site-footer");
  const skip = $(".skip");

  let isOpen = false;
  let lastTrigger = null;
  let lastTitle = document.title;
  let closeTween = null;
  let pvObserver = null;

  function clearProjectMotion() {
    if (pvObserver) {
      pvObserver.disconnect();
      pvObserver = null;
    }
    if (window.gsap) window.gsap.killTweensOf($$(".pv-figure", article));
  }

  function revealProjectGallery() {
    clearProjectMotion();
    if (!window.gsap || reduceMotion || !("IntersectionObserver" in window)) return;

    const figures = $$(".pv-figure", article);
    if (!figures.length) return;

    pvObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          pvObserver.unobserve(entry.target);
          window.gsap.fromTo(
            entry.target,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
          );
        });
      },
      { root: view, rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );

    figures.forEach((figure) => pvObserver.observe(figure));
  }

  function renderProject(work) {
    if (!article) return;
    const index = WORKS.indexOf(work);
    const next = WORKS[(index + 1) % WORKS.length];

    if (pvLabel) pvLabel.textContent = `${work.category} · ${work.year} · ${work.images.length} 张`;

    const gallery = work.images
      .map(
        (image, imageIndex) => `
          <figure class="pv-figure" data-kind="${esc(image.kind)}">
            <img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="${
          imageIndex === 0 ? "eager" : "lazy"
        }" decoding="async">
            <figcaption>${esc(image.caption)}</figcaption>
          </figure>`
      )
      .join("");

    article.innerHTML = `
      <header class="pv-head">
        <h2 class="pv-title" id="pv-title">${esc(work.title)}</h2>
        <p class="pv-meta">${esc(work.category)} · ${esc(work.year)} · ${esc(work.en)}</p>
        <p class="pv-summary">${esc(work.summary)}</p>
        <p class="pv-desc">${esc(work.description)}</p>
        <dl class="pv-facts">
          <div><dt>角色</dt><dd>${esc(work.role)}</dd></div>
          <div><dt>工具</dt><dd>${esc(work.tools)}</dd></div>
          <div><dt>方向</dt><dd>${esc(work.category)}</dd></div>
        </dl>
      </header>
      <div class="pv-gallery">${gallery}</div>
      <a class="pv-next" href="#/work/${esc(next.slug)}">
        <small>下一个项目</small>
        <strong>${esc(next.title)}</strong>
      </a>`;
  }

  function setBackgroundInert(value) {
    [main, topbar, footer, skip].forEach((element) => {
      if (element) element.inert = value;
    });
  }

  function openProject(work) {
    if (!view || !work) return;

    if (!isOpen) {
      const current = document.activeElement;
      const isPageChrome = !current || current === document.body || current === document.documentElement;
      lastTrigger = !isPageChrome && !view.contains(current) ? current : null;
      lastTitle = document.title;
      isOpen = true;
    }

    if (closeTween) {
      closeTween.kill();
      closeTween = null;
    }

    view.hidden = false;
    document.body.classList.add("is-locked");
    setBackgroundInert(true);
    renderProject(work);
    view.scrollTop = 0;

    document.title = `${work.title} · ${PROFILE.name} 作品集`;
    if (closeButton) {
      closeButton.focus({ preventScroll: true });
      // 背景设为 inert 后浏览器会把焦点收回 body，等这一帧结束再落一次焦点
      requestAnimationFrame(() => {
        if (isOpen && !view.hidden) closeButton.focus({ preventScroll: true });
      });
    }

    if (window.gsap && !reduceMotion) {
      window.gsap.set(view, { opacity: 1 });
      const timeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(view, { opacity: 0 }, { opacity: 1, duration: 0.26 }, 0)
        .from(".pv-bar", { yPercent: -100, duration: 0.5 }, 0)
        .from(article, { y: 22, autoAlpha: 0, duration: 0.6 }, 0.05)
        .from($$(".pv-head > *", article), { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.055 }, 0.14);
    }

    revealProjectGallery();
  }

  function closeProject({ updateHash = true } = {}) {
    if (!isOpen || !view) return;

    isOpen = false;
    document.body.classList.remove("is-locked");
    setBackgroundInert(false);
    document.title = lastTitle || `${PROFILE.name} · 设计作品集 2026`;
    clearProjectMotion();

    if (updateHash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (lastTrigger && document.contains(lastTrigger) && !view.contains(lastTrigger)) {
      lastTrigger.focus({ preventScroll: true });
    } else {
      const fallback = $(".opening .btn");
      if (fallback) fallback.focus({ preventScroll: true });
    }
    lastTrigger = null;

    if (window.gsap && !reduceMotion) {
      closeTween = window.gsap.to(view, {
        opacity: 0,
        duration: 0.26,
        ease: "power2.in",
        onComplete: () => {
          view.hidden = true;
          window.gsap.set(view, { clearProps: "opacity" });
          closeTween = null;
        }
      });
    } else {
      view.hidden = true;
    }
  }

  function route() {
    const match = window.location.hash.match(/^#\/work\/([a-z0-9-]+)$/i);
    if (match) {
      const work = bySlug.get(match[1]);
      if (work) {
        openProject(work);
        return;
      }
    }
    if (isOpen) closeProject({ updateHash: false });
  }

  function initProjectView() {
    if (!view) return;

    if (closeButton) {
      closeButton.addEventListener("click", () => closeProject());
    }

    view.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProject();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        view
      ).filter((element) => element.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("hashchange", route);
  }

  /* ---------- motion ---------- */

  function initMotion() {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    const timeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .from(".opening-bg img", { scale: 1.09, duration: 1.9, ease: "power2.out" }, 0)
      .from(".opening-wordmark", { yPercent: 24, autoAlpha: 0, duration: 1.15 }, 0.12)
      .from(".device", { y: 46, autoAlpha: 0, duration: 1.05 }, 0.28)
      .from(
        ".intro-id > *, .intro-lead, .intro-bio, .intro-facts > div, .intro-focus, .intro-tools, .intro-scope, .intro-actions, .intro-contact",
        { y: 12, autoAlpha: 0, duration: 0.72, stagger: 0.035 },
        0.52
      )
      .from(".opening-pill", { y: 22, autoAlpha: 0, duration: 0.85 }, 0.94)
      .from(".opening-hint", { autoAlpha: 0, duration: 0.6 }, 1.16);

    window.gsap.to(".opening-bg img", {
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: ".opening",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    $$("[data-reveal]").forEach((element) => {
      window.gsap.from(element, {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          once: true
        }
      });
    });

    window.gsap.fromTo(
      ".about-portrait img",
      { scale: 1.08, yPercent: -2 },
      {
        scale: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
  }

  /* ---------- top bar ---------- */

  function initTopbar() {
    if (!topbar) return;
    let shown = false;

    const update = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.6;
      if (shouldShow === shown) return;
      shown = shouldShow;
      topbar.classList.toggle("is-visible", shouldShow);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- boot ---------- */

  function boot() {
    applyProfile();
    const scope = $("#intro-scope");
    if (scope && WORKS.length) {
      const images = WORKS.reduce((sum, work) => sum + (work.images ? work.images.length : 0), 0);
      scope.textContent = `${WORKS.length} 个项目 · ${images} 张作品图 · ${CATEGORIES.length} 个类别`;
    }
    renderFeatured();
    renderFilters();
    renderShelf();
    renderGallery();
    initTopbar();
    initProjectView();
    initMotion();
    route();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
