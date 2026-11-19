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

    document.title = `${PROFILE.name} · 设计作品集 2026`;
  }

  /* ---------- selected works ---------- */

  function cardImage(work) {
    if (!work || !work.images || !work.images.length) return null;
    const pick = Array.isArray(work.preview) && work.preview.length ? imageFor(work, work.preview[0]) : null;
    return pick || work.images[0];
  }

  function renderSelected() {
    const host = $("#selected-grid");
    if (!host) return;

    const flagship = bySlug.get("healing-park");
    const picks = WORKS.filter((work) => work.featured && work !== flagship).slice(0, 5);

    host.innerHTML = picks
      .map((work) => {
        const image = cardImage(work);
        if (!image) return "";
        return `
          <a class="work-card" href="#/work/${esc(work.slug)}">
            <div class="card-media"><img src="${esc(image.thumb)}" alt="${esc(work.title)}" loading="lazy" decoding="async"></div>
            <h3 class="card-title">${esc(work.title)}</h3>
            <p class="card-meta">${esc(work.category)} · ${esc(work.year)}</p>
          </a>`;
      })
      .join("");
  }

  /* ---------- featured project ---------- */

  function renderFlagship() {
    const host = $("#feature-layout");
    if (!host) return;

    const work = bySlug.get("healing-park") || WORKS.find((item) => item.featured) || WORKS[0];
    if (!work || !work.images.length) return;

    const big = cardImage(work) || work.images[0];
    const thumbs = work.images.filter((image) => image !== big).slice(0, 4);

    host.innerHTML = `
      <div class="feature-media-col">
        <figure class="feature-media">
          <img src="${esc(big.src)}" alt="${esc(work.title)}：${esc(big.caption)}" loading="lazy" decoding="async">
        </figure>
        <div class="feature-thumbs">
          ${thumbs
            .map(
              (image) => `
            <a class="feature-thumb" href="#/work/${esc(work.slug)}" aria-label="${esc(
                work.title
              )}：${esc(image.caption)}">
              <img src="${esc(image.thumb)}" alt="" loading="lazy" decoding="async">
            </a>`
            )
            .join("")}
        </div>
      </div>
      <div class="feature-body">
        <h3 class="feature-title">${esc(work.title)}</h3>
        <p class="feature-desc">${esc(work.summary)}</p>
        <p class="feature-note">${esc(work.description)}</p>
        <dl class="feature-facts">
          <div><dt>年份</dt><dd>${esc(work.year)}</dd></div>
          <div><dt>角色</dt><dd>${esc(work.role)}</dd></div>
          <div><dt>工具</dt><dd>${esc(work.tools)}</dd></div>
        </dl>
        <a class="feature-link" href="#/work/${esc(work.slug)}">查看完整项目 <span aria-hidden="true">→</span></a>
      </div>`;
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
        return `<button class="filter" type="button" data-cat="${esc(category)}" aria-pressed="${pressed}">${esc(
          category
        )}<span class="count">${count}</span></button>`;
      })
      .join("");

    host.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");
      if (!button) return;
      setFilter(button.dataset.cat || "全部", { animate: true });
    });
  }

  function renderWorks() {
    const host = $("#works-grid");
    if (!host) return;

    host.innerHTML = WORKS.map((work) => {
      const image = cardImage(work);
      if (!image) return "";
      return `
        <a class="work-tile" href="#/work/${esc(work.slug)}" data-category="${esc(work.category)}">
          <div class="tile-media"><img src="${esc(image.thumb)}" alt="${esc(
        work.title
      )}" loading="lazy" decoding="async"></div>
          <div class="tile-cap">
            <h3 class="tile-title">${esc(work.title)}</h3>
            <span class="tile-meta">${esc(work.category)}</span>
          </div>
        </a>`;
    }).join("");

    const count = $("#index-count");
    if (count) count.textContent = `${WORKS.length} 个项目`;
  }

  function initFields() {
    const host = $("#fields-grid");
    if (!host) return;

    host.addEventListener("click", (event) => {
      const field = event.target.closest(".field");
      if (!field) return;
      const category = field.dataset.cat || "全部";
      setFilter(activeCategory === category ? "全部" : category, { scroll: true, animate: true });
    });
  }

  function setFilter(category, { scroll = false, animate = false } = {}) {
    activeCategory = category;

    $$(".filter").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.cat === category));
    });

    $$(".field").forEach((field) => {
      field.setAttribute("aria-pressed", String(field.dataset.cat === category));
    });

    const tiles = $$(".work-tile");
    const firstRects = new Map();
    const canFlip = animate && window.gsap && !reduceMotion;

    if (canFlip) {
      tiles.forEach((tile) => {
        if (tile.hidden) return;
        firstRects.set(tile, tile.getBoundingClientRect());
        window.gsap.killTweensOf(tile);
      });
    }

    let matchCount = 0;
    tiles.forEach((tile) => {
      const match = category === "全部" || tile.dataset.category === category;
      tile.hidden = !match;
      if (match) matchCount += 1;
    });

    const count = $("#index-count");
    if (count) {
      count.textContent =
        category === "全部" ? `${WORKS.length} 个项目` : `${category} · ${matchCount} 个项目`;
    }

    const status = $("#filter-status");
    if (status) {
      status.textContent =
        category === "全部"
          ? `显示全部 ${WORKS.length} 个项目。`
          : `已筛选${category}，共 ${matchCount} 个项目。`;
    }

    if (animate) animateWorksFilter(firstRects);

    if (scroll) {
      const target = $("#index");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function animateWorksFilter(firstRects = new Map()) {
    if (!window.gsap || reduceMotion) return;

    const entering = [];

    $$(".work-tile").forEach((tile) => {
      if (tile.hidden) return;

      const first = firstRects.get(tile);
      if (!first) {
        entering.push(tile);
        return;
      }

      const last = tile.getBoundingClientRect();
      const x = first.left - last.left;
      const y = first.top - last.top;
      if (Math.abs(x) < 1 && Math.abs(y) < 1) {
        window.gsap.set(tile, { clearProps: "transform" });
        return;
      }

      window.gsap.fromTo(
        tile,
        { x, y },
        {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
          clearProps: "transform"
        }
      );
    });

    if (entering.length) {
      window.gsap.fromTo(
        entering,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "power3.out",
          overwrite: true,
          clearProps: "transform,opacity,visibility"
        }
      );
    }
  }

  /* ---------- project view ---------- */

  const view = $("#project-view");
  const article = $("#pv-article");
  const closeButton = $("#pv-close");
  const prevButton = $("#pv-prev");
  const nextButton = $("#pv-next");
  const pvBar = $(".pv-bar");
  const pvLabel = $(".pv-label");
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lb-img");
  const lightboxCaption = $("#lb-caption");
  const lightboxCount = $("#lb-count");
  const lightboxClose = $("#lb-close");
  const lightboxPrev = $("#lb-prev");
  const lightboxNext = $("#lb-next");
  const main = $("#main");
  const topbar = $("#topbar");
  const footer = $(".site-footer");
  const skip = $(".skip");

  let isOpen = false;
  let currentWork = null;
  let lastTrigger = null;
  let lastTitle = document.title;
  let closeTween = null;
  let pvObserver = null;
  let lightboxIndex = 0;
  let lightboxTrigger = null;

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
    const prev = WORKS[(index - 1 + WORKS.length) % WORKS.length];
    const next = WORKS[(index + 1) % WORKS.length];

    const videoCount = work.images.filter((item) => item.video).length;
    const photoCount = work.images.length - videoCount;
    const mediaText = [photoCount ? `${photoCount} 张` : "", videoCount ? `${videoCount} 段影像` : ""]
      .filter(Boolean)
      .join(" · ");
    if (pvLabel) pvLabel.textContent = `${work.category} · ${work.year} · ${mediaText}`;

    if (prevButton) {
      prevButton.disabled = WORKS.length < 2;
      prevButton.setAttribute("aria-label", `上一个项目：${prev.title}`);
    }

    if (nextButton) {
      nextButton.disabled = WORKS.length < 2;
      nextButton.setAttribute("aria-label", `下一个项目：${next.title}`);
    }

    const gallery = work.images
      .map((image, imageIndex) => {
        if (image.video) {
          return `
          <figure class="pv-figure pv-video" data-kind="render">
            <video controls playsinline preload="metadata" poster="${esc(image.src)}" width="1920" height="1080" aria-label="${esc(
            image.alt
          )}">
              <source src="${esc(image.video)}" type="video/mp4">
              你的浏览器不支持视频播放，请下载后观看。
            </video>
            <figcaption>${esc(image.caption)}${image.duration ? ` · ${esc(image.duration)}` : ""}</figcaption>
          </figure>`;
        }
        return `
          <figure class="pv-figure" data-kind="${esc(image.kind)}">
            <button class="pv-zoom" type="button" data-index="${imageIndex}" aria-label="查看大图：${esc(
          image.caption
        )}">
              <img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="${
          imageIndex === 0 ? "eager" : "lazy"
        }" decoding="async">
            </button>
            <figcaption>${esc(image.caption)}</figcaption>
          </figure>`;
      })
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

    const wasOpen = isOpen;
    if (lightbox && !lightbox.hidden) closeLightbox({ restoreFocus: false });
    currentWork = work;

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
    if (wasOpen) {
      const active = document.activeElement;
      const focusWasContent = !active || active === document.body || (article && article.contains(active));
      if (focusWasContent && closeButton) closeButton.focus({ preventScroll: true });
    }
    if (closeButton && !wasOpen) {
      closeButton.focus({ preventScroll: true });
      // 背景设为 inert 后浏览器会把焦点收回 body，等这一帧结束再落一次焦点
      requestAnimationFrame(() => {
        if (isOpen && !view.hidden) closeButton.focus({ preventScroll: true });
      });
    }

    if (window.gsap && !reduceMotion) {
      if (wasOpen) {
        window.gsap.fromTo(
          article,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", overwrite: true }
        );
        window.gsap.fromTo(
          $$(".pv-head > *", article),
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.035, ease: "power3.out", overwrite: true }
        );
      } else {
        window.gsap.set(view, { opacity: 1 });
        const timeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .fromTo(view, { opacity: 0 }, { opacity: 1, duration: 0.26 }, 0)
          .from(".pv-bar", { yPercent: -100, duration: 0.5 }, 0)
          .from(article, { y: 22, autoAlpha: 0, duration: 0.6 }, 0.05)
          .from($$(".pv-head > *", article), { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.055 }, 0.14);
      }
    }

    revealProjectGallery();
  }

  function closeProject({ updateHash = true } = {}) {
    if (!isOpen || !view) return;

    if (lightbox && !lightbox.hidden) closeLightbox({ restoreFocus: false });

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
      const fallback = $(".opening-link");
      if (fallback) fallback.focus({ preventScroll: true });
    }
    lastTrigger = null;
    currentWork = null;

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

  function stepProject(direction) {
    if (!isOpen || !currentWork || WORKS.length < 2) return;

    const index = WORKS.indexOf(currentWork);
    if (index < 0) return;

    const target = WORKS[(index + direction + WORKS.length) % WORKS.length];
    if (!target || target === currentWork) return;

    window.location.hash = `#/work/${target.slug}`;
  }

  function paintLightbox(direction = 0) {
    if (!currentWork || !lightboxImage) return;

    const total = currentWork.images.length;
    const image = currentWork.images[lightboxIndex];
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    if (lightboxCaption) lightboxCaption.textContent = image.caption;
    if (lightboxCount) {
      const pad = (value) => String(value).padStart(2, "0");
      lightboxCount.textContent = `${pad(lightboxIndex + 1)} / ${pad(total)}`;
    }

    if (lightboxPrev) lightboxPrev.disabled = total < 2;
    if (lightboxNext) lightboxNext.disabled = total < 2;

    if (window.gsap && !reduceMotion) {
      window.gsap.fromTo(
        lightboxImage,
        { x: direction * 18, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: true }
      );
      window.gsap.fromTo(
        [lightboxCaption, lightboxCount].filter(Boolean),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, overwrite: true }
      );
    }

    [lightboxIndex + 1, lightboxIndex - 1].forEach((index) => {
      const neighbor = currentWork.images[(index + total) % total];
      if (!neighbor || neighbor === image) return;
      const preload = new Image();
      preload.src = neighbor.src;
    });
  }

  function openLightbox(index, trigger) {
    if (!lightbox || !currentWork || !lightboxImage) return;

    const image = currentWork.images[index];
    if (!image) return;

    lightboxIndex = index;
    lightboxTrigger = trigger || null;
    lightbox.hidden = false;
    view.classList.add("lb-open");
    if (article) article.inert = true;
    if (pvBar) pvBar.inert = true;
    paintLightbox();

    if (window.gsap && !reduceMotion) {
      window.gsap.fromTo(
        lightbox,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: "power2.out", overwrite: true }
      );
      const stage = $(".lb-stage", lightbox);
      if (stage) {
        window.gsap.fromTo(
          stage,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out", overwrite: true }
        );
      }
    }

    if (lightboxClose) lightboxClose.focus({ preventScroll: true });
  }

  function stepLightbox(direction) {
    if (!lightbox || lightbox.hidden || !currentWork) return;

    const total = currentWork.images.length;
    if (total < 2) return;

    lightboxIndex = (lightboxIndex + direction + total) % total;
    paintLightbox(direction);
  }

  function closeLightbox({ restoreFocus = true } = {}) {
    if (!lightbox || lightbox.hidden) return;

    lightbox.hidden = true;
    view.classList.remove("lb-open");
    if (article) article.inert = false;
    if (pvBar) pvBar.inert = false;

    if (window.gsap) {
      const targets = [lightbox, lightboxImage, lightboxCaption, lightboxCount].filter(Boolean);
      window.gsap.killTweensOf(targets);
      window.gsap.set(targets, { clearProps: "transform,opacity,visibility" });
      const stage = $(".lb-stage", lightbox);
      if (stage) window.gsap.set(stage, { clearProps: "transform,opacity,visibility" });
    }

    if (restoreFocus && lightboxTrigger && document.contains(lightboxTrigger)) {
      lightboxTrigger.focus({ preventScroll: true });
    }
    lightboxTrigger = null;
  }

  function trapLightboxFocus(event) {
    if (!lightbox) return;

    const focusables = $$(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      lightbox
    ).filter((element) => element.offsetParent !== null);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!lightbox.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
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

    if (prevButton) {
      prevButton.addEventListener("click", () => stepProject(-1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => stepProject(1));
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", () => closeLightbox());
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", () => stepLightbox(-1));
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", () => stepLightbox(1));
    }

    if (lightboxImage) {
      lightboxImage.addEventListener("click", () => closeLightbox());
    }

    if (lightbox) {
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });
    }

    if (article) {
      article.addEventListener("click", (event) => {
        const trigger = event.target.closest(".pv-zoom");
        if (!trigger || !currentWork) return;

        const index = Number(trigger.dataset.index);
        if (!Number.isInteger(index) || !currentWork.images[index]) return;
        openLightbox(index, trigger);
      });
    }

    view.addEventListener("keydown", (event) => {
      if (lightbox && !lightbox.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeProject();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepProject(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepProject(-1);
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

    document.addEventListener("keydown", (event) => {
      if (!lightbox || lightbox.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === "Tab") {
        trapLightboxFocus(event);
      }
    });

    window.addEventListener("hashchange", route);
  }

  /* ---------- navigation chrome ---------- */

  function initChrome() {
    const bar = $("#scroll-progress");
    const header = $("#topbar");
    const links = new Map(
      $$(".topbar-nav a")
        .filter((link) => link.hash)
        .map((link) => [link.hash.slice(1), link])
    );
    const sections = ["works", "fields", "feature", "index", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const activeFor = {
      works: "works",
      fields: "fields",
      feature: "works",
      index: "works",
      about: "about",
      contact: "contact"
    };
    let active = "";
    let queued = false;

    const update = () => {
      queued = false;
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const line = scrollY + Math.min(window.innerHeight * 0.32, 300);
      let current = "";

      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id;
      });
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
        current = "contact";
      }

      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (header) header.classList.toggle("is-scrolled", scrollY > 8);

      const next = activeFor[current] || "";
      if (next === active) return;
      active = next;
      links.forEach((link, id) => {
        if (id === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const request = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  function initHeroMotion() {
    if (
      !window.gsap ||
      reduceMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const opening = $(".opening");
    if (!opening) return;

    const art = $(".opening-art", opening);
    const orbit = $(".opening-orbit", opening);
    const stars = $$(".opening-star", opening);
    if (!art) return;

    const artX = window.gsap.quickTo(art, "x", { duration: 0.9, ease: "power3" });
    const artY = window.gsap.quickTo(art, "y", { duration: 0.9, ease: "power3" });
    const orbitX = orbit ? window.gsap.quickTo(orbit, "x", { duration: 1.1, ease: "power3" }) : null;
    const orbitY = orbit ? window.gsap.quickTo(orbit, "y", { duration: 1.1, ease: "power3" }) : null;
    const starTos = stars.map((star) => ({
      x: window.gsap.quickTo(star, "x", { duration: 1.2, ease: "power3" }),
      y: window.gsap.quickTo(star, "y", { duration: 1.2, ease: "power3" })
    }));

    const reset = () => {
      artX(0);
      artY(0);
      if (orbitX) orbitX(0);
      if (orbitY) orbitY(0);
      starTos.forEach((star) => {
        star.x(0);
        star.y(0);
      });
    };

    opening.addEventListener(
      "pointermove",
      (event) => {
        const rect = opening.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        artX(x * 18);
        artY(y * 14);
        if (orbitX) orbitX(x * -10);
        if (orbitY) orbitY(y * -8);
        starTos.forEach((star, index) => {
          const factor = 8 + index * 3;
          star.x(x * factor);
          star.y(y * factor);
        });
      },
      { passive: true }
    );
    opening.addEventListener("pointerleave", reset, { passive: true });
  }

  /* ---------- motion ---------- */

  function initMotion() {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    const timeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .from(".opening-art img", { scale: 1.07, duration: 1.8, ease: "power2.out" }, 0)
      .from(".opening-orbit", { autoAlpha: 0, scale: 0.94, duration: 1.1 }, 0.18)
      .from(".opening-display", { yPercent: 18, autoAlpha: 0, duration: 1.05 }, 0.08)
      .from(".opening-sub, .opening-rule, .opening-statement", { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.36)
      .from(".opening-name, .opening-intro, .opening-facts, .opening-scope, .opening-actions", { y: 12, autoAlpha: 0, duration: 0.7, stagger: 0.04 }, 0.58)
      .from(".opening-star", { autoAlpha: 0, scale: 0.4, duration: 0.6, stagger: 0.1, transformOrigin: "50% 50%" }, 0.7)
      .from(".opening-scroll, .opening-meta", { autoAlpha: 0, duration: 0.6 }, 1.02);

    window.gsap.to(".opening-art img", {
      yPercent: -3,
      ease: "none",
      scrollTrigger: {
        trigger: ".opening",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    $$(".section, .fields").forEach((section) => {
      const head = $(".section-head", section) || $(".fields-intro", section);
      if (!head) return;
      const targets = $$(".display, .fields-title, .head-en, .head-note, .head-link, .section-note", head);
      if (!targets.length) return;

      window.gsap.from(targets, {
        y: 20,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true }
      });
    });

    ["#selected-grid .work-card", "#works-grid .work-tile", "#fields-grid .field"].forEach((selector) => {
      window.ScrollTrigger.batch(selector, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          window.gsap.fromTo(
            batch,
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.05,
              ease: "power3.out",
              overwrite: true,
              clearProps: "transform"
            }
          )
      });
    });

    window.gsap
      .timeline({
        scrollTrigger: { trigger: "#feature", start: "top 74%", once: true },
        defaults: { ease: "power3.out" }
      })
      .from(".feature-media", { y: 26, autoAlpha: 0, duration: 0.9 })
      .from(".feature-thumbs a", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.18)
      .from(".feature-body > *", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.22);

    window.gsap
      .timeline({
        scrollTrigger: { trigger: "#about", start: "top 74%", once: true },
        defaults: { ease: "power3.out" }
      })
      .from(".about-main > *", { y: 20, autoAlpha: 0, duration: 0.75, stagger: 0.06 })
      .from(".about-body > *", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.05 }, 0.16);

    window.gsap
      .timeline({
        scrollTrigger: { trigger: "#contact", start: "top 78%", once: true },
        defaults: { ease: "power3.out" }
      })
      .from(".contact-main > *", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.06 })
      .from(".contact-media", { y: 24, autoAlpha: 0, duration: 0.9 }, 0.16);

    [".feature-media img"].forEach((selector) => {
      const image = $(selector);
      if (!image) return;

      window.gsap.fromTo(
        image,
        { yPercent: -3, scale: 1.05 },
        {
          yPercent: 3,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    window.gsap.to(".opening-star", {
      autoAlpha: 0.35,
      scale: 0.82,
      duration: 1.7,
      delay: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.55, from: "random" },
      transformOrigin: "50% 50%"
    });

    window.gsap.to(".opening-orbit", {
      rotate: -10,
      duration: 16,
      delay: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    window.gsap.fromTo(
      ".opening-scroll-line",
      { scaleY: 0.35, transformOrigin: "50% 0%" },
      { scaleY: 1, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );
  }

  /* ---------- theme ---------- */

  const THEME_KEY = "lgp-theme";

  function paintTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = $("#theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.setAttribute("aria-label", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
      toggle.title = theme === "dark" ? "切换到浅色模式" : "切换深色模式";
    }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0d0b09" : "#f6f5f1";
  }

  function initTheme() {
    paintTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

    const toggle = $("#theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {}

      if (document.startViewTransition && !reduceMotion) {
        const rect = toggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = document.startViewTransition(() => paintTheme(next));

        transition.ready
          .then(() => {
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
              {
                duration: 640,
                easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                pseudoElement: "::view-transition-new(root)"
              }
            );
          })
          .catch(() => {});
      } else {
        document.documentElement.classList.add("theme-anim");
        paintTheme(next);
        window.setTimeout(() => document.documentElement.classList.remove("theme-anim"), 700);
      }
    });
  }

  /* ---------- boot ---------- */

  function boot() {
    applyProfile();
    const scope = $("#intro-scope");
    if (scope && WORKS.length) {
      const images = WORKS.reduce((sum, work) => sum + (work.images ? work.images.length : 0), 0);
      const videos = WORKS.reduce(
        (sum, work) => sum + (work.images ? work.images.filter((item) => item.video).length : 0),
        0
      );
      scope.textContent = `${WORKS.length} 个项目 · ${images - videos} 张作品图${
        videos ? ` · ${videos} 段影像` : ""
      } · ${CATEGORIES.length} 个类别`;
    }
    renderSelected();
    renderFlagship();
    renderFilters();
    renderWorks();
    initFields();
    initChrome();
    initHeroMotion();
    initTheme();
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
