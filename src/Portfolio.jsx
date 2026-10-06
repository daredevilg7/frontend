import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  Sparkles,
  Play,
  Pause,
  ExternalLink,
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  Circle,
  Layers,
  Cpu,
  Globe,
  ArrowUpRight,
  Terminal,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Workflow,
  ChevronRight,
  Award,
  Film
} from 'lucide-react';

const asset = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

function ProjectVideoPreview({ videoRef: externalRef, src, type, bgColor = 'bg-[#FAF6F0]' }) {
  const internalRef = useRef(null);
  const videoRef = externalRef || internalRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hasTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
    setIsTouchDevice(hasTouch);

    // Direct DOM configuration required by iOS WebKit for soundless inline playback
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    // Mobile / Touch devices: auto-play when entering viewport, pause when offscreen
    let observer = null;
    if (hasTouch) {
      const tryPlay = () => {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        }
      };

      tryPlay();

      const onLoaded = () => tryPlay();
      video.addEventListener('loadeddata', onLoaded);
      video.addEventListener('canplay', tryPlay);

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);

      return () => {
        video.removeEventListener('play', onPlay);
        video.removeEventListener('pause', onPause);
        video.removeEventListener('loadeddata', onLoaded);
        video.removeEventListener('canplay', tryPlay);
        if (observer) observer.disconnect();
      };
    }

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      if (observer) observer.disconnect();
    };
  }, [src]);

  // Mobile-only: tap to toggle play/pause
  const handleMobileClick = (e) => {
    if (isTouchDevice && videoRef.current) {
      e.stopPropagation();
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      onClick={handleMobileClick}
      className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden ${bgColor} border border-black/10 group-hover:border-neutral-700/60 shadow-md group-hover:shadow-2xl transition-all duration-500 mb-6 flex items-center justify-center select-none`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
      >
        <source src={src} type={type} />
      </video>

      {/* Mobile-only pause indicator (shown ONLY on touch devices when paused) */}
      <div
        className={`md:hidden absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none ${
          !isPlaying && isTouchDevice ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-900 shadow-xl flex items-center justify-center backdrop-blur-md">
          <Play className="w-5 h-5 fill-neutral-900 text-neutral-900 ml-0.5" />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Project Video Refs for desktop hover playback
  const poglazhuVideoRef = useRef(null);
  const bisVideoRef = useRef(null);

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Чистая, поддерживаемая и семантическая вёрстка (HTML5 / SCSS / Tailwind)', done: true },
    { id: 2, text: 'Сокращение пути пользователя до заявки / конверсии до 2–3 кликов', done: true },
    { id: 3, text: 'Оптимизация скорости загрузки ключевых блоков на +25%', done: true },
    { id: 4, text: 'Продуманные состояния форм: валидация, маски, обработка сетевых ошибок', done: true },
    { id: 5, text: 'Полная адаптивность (Mobile / Tablet / Desktop) и кросс-браузерность', done: true },
    { id: 6, text: 'Запустить новый сильный продукт в вашей команде', done: false }
  ]);

  // Refs for donor flight engine
  const heroContentRef = useRef(null);
  const curtainRef = useRef(null);
  const skyBandRef = useRef(null);
  const flyRef = useRef(null);
  const svgRef = useRef(null);
  const spriteRef = useRef(null);

  // 3 distinct segment refs & masks
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const mask1Ref = useRef(null);
  const mask2Ref = useRef(null);
  const mask3Ref = useRef(null);

  // ════ ZERO-OVERLAP GUTTER-ONLY FLIGHT ENGINE ════
  useEffect(() => {
    const PLANE_OFFSET = -31;

    let len1 = 600, len2 = 550, len3 = 1200;

    const setupGeometry = () => {
      const curtain = curtainRef.current;
      const sky = skyBandRef.current;
      const fly = flyRef.current;

      if (!curtain || !sky || !fly) return;

      const fRect = curtain.getBoundingClientRect();
      const skRect = sky.getBoundingClientRect();

      const topOffset = skRect.top - fRect.top;
      const fullHeight = fRect.bottom - skRect.top;

      fly.style.top = `${topOffset}px`;
      fly.style.height = `${fullHeight}px`;

      const curW = fly.clientWidth || 1440;
      const curH = fullHeight || 3400;

      svgRef.current?.setAttribute('viewBox', `0 0 ${curW} ${curH}`);

      if (path1Ref.current && mask1Ref.current) {
        len1 = path1Ref.current.getTotalLength() || 600;
        mask1Ref.current.style.strokeDasharray = `${len1}`;
        mask1Ref.current.style.strokeDashoffset = `${len1}`;
      }
      if (path2Ref.current && mask2Ref.current) {
        len2 = path2Ref.current.getTotalLength() || 550;
        mask2Ref.current.style.strokeDasharray = `${len2}`;
        mask2Ref.current.style.strokeDashoffset = `${len2}`;
      }
      if (path3Ref.current && mask3Ref.current) {
        len3 = path3Ref.current.getTotalLength() || 1200;
        mask3Ref.current.style.strokeDasharray = `${len3}`;
        mask3Ref.current.style.strokeDashoffset = `${len3}`;
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      // 1. Subtle Hero Scale (1.0 -> 0.88)
      if (heroContentRef.current) {
        const heroProgress = Math.min(Math.max(scrollY / (vh * 0.85), 0), 1);
        const heroScale = 1 - heroProgress * 0.12;
        heroContentRef.current.style.transform = `scale(${heroScale.toFixed(4)})`;
      }

      // 2. Precise Gutter Pacing
      const sprite = spriteRef.current;
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;
      const p3 = path3Ref.current;
      const m1 = mask1Ref.current;
      const m2 = mask2Ref.current;
      const m3 = mask3Ref.current;

      if (!sprite || !p1 || !p2 || !p3 || !m1 || !m2 || !m3) return;

      const s1End = vh * 0.85;
      const s2Start = vh * 1.05;
      const s2End = vh * 1.85;
      const s3Start = vh * 2.05;
      const s3End = vh * 4.2;

      let pt = { x: 210, y: 110 };
      let nextPt = { x: 215, y: 115 };
      let opacity = 0;

      if (scrollY <= s1End) {
        // ── STAGE 1: Hero Sky Arc down the Left Margin ──
        const progress1 = Math.max(0, Math.min(1, scrollY / s1End));
        const dist = progress1 * len1;
        pt = p1.getPointAtLength(dist);
        nextPt = p1.getPointAtLength(Math.min(len1, dist + 6));

        m1.style.strokeDashoffset = `${len1 - dist}`;
        m2.style.strokeDashoffset = `${len2}`;
        m3.style.strokeDashoffset = `${len3}`;

        const fadeIn = Math.min(1, scrollY / (vh * 0.22));
        const fadeOut = progress1 > 0.85 ? (1 - (progress1 - 0.85) / 0.15) : 1;
        opacity = fadeIn * fadeOut;
      } else if (scrollY < s2Start) {
        // ── GAP 1: Invisible over Manifesto Text & Metrics ──
        opacity = 0;
        m1.style.strokeDashoffset = '0';
        m2.style.strokeDashoffset = `${len2}`;
        m3.style.strokeDashoffset = `${len3}`;
      } else if (scrollY <= s2End) {
        // ── STAGE 2: Far Right Margin down to Tech Stack ──
        const progress2 = (scrollY - s2Start) / (s2End - s2Start);
        const dist = progress2 * len2;
        pt = p2.getPointAtLength(dist);
        nextPt = p2.getPointAtLength(Math.min(len2, dist + 6));

        m1.style.strokeDashoffset = '0';
        m2.style.strokeDashoffset = `${len2 - dist}`;
        m3.style.strokeDashoffset = `${len3}`;

        const fadeIn = progress2 < 0.2 ? (progress2 / 0.2) : 1;
        const fadeOut = progress2 > 0.85 ? (1 - (progress2 - 0.85) / 0.15) : 1;
        opacity = fadeIn * fadeOut;
      } else if (scrollY < s3Start) {
        // ── GAP 2: Invisible over Marquee & Section Title ──
        opacity = 0;
        m1.style.strokeDashoffset = '0';
        m2.style.strokeDashoffset = '0';
        m3.style.strokeDashoffset = `${len3}`;
      } else if (scrollY <= s3End) {
        // ── STAGE 3: Projects Left Gutter Glide (Strictly in Left Margin outside all cards) ──
        const progress3 = (scrollY - s3Start) / (s3End - s3Start);
        const dist = progress3 * len3;
        pt = p3.getPointAtLength(dist);
        nextPt = p3.getPointAtLength(Math.min(len3, dist + 6));

        m1.style.strokeDashoffset = '0';
        m2.style.strokeDashoffset = '0';
        m3.style.strokeDashoffset = `${len3 - dist}`;

        const fadeIn = progress3 < 0.15 ? (progress3 / 0.15) : 1;
        const fadeOut = progress3 > 0.85 ? (1 - (progress3 - 0.85) / 0.15) : 1;
        opacity = fadeIn * fadeOut;
      } else {
        // ── AFTER PROJECTS: Fully Parked & Invisible (Experience, Education, About, Skills stay 100% clean) ──
        opacity = 0;
        m1.style.strokeDashoffset = '0';
        m2.style.strokeDashoffset = '0';
        m3.style.strokeDashoffset = '0';
      }

      const ang = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

      sprite.style.opacity = `${opacity}`;
      sprite.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${ang + PLANE_OFFSET}deg)`;
    };

    setupGeometry();
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      setupGeometry();
      onScroll();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);



  // Copy helper
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const renderSpringWord = (word, isAccent = false) => {
    return (
      <span className="inline-block whitespace-nowrap mr-2 sm:mr-3">
        {word.split('').map((char, i) => (
          <span
            key={i}
            className={`h-letter ${isAccent ? 'text-[#F4D24A]' : ''}`}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F1] text-[#141416] selection:bg-[#3456C8] selection:text-white relative">
      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR (Responsive Pill Nav)             */}
      {/* ============================================================ */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-2 sm:px-4 pointer-events-none flex justify-center">
        {/* Floating Pill Nav */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/10 shadow-lg shadow-black/5 pointer-events-auto max-w-[96vw] overflow-x-auto">
          <a
            href="#hero"
            className="flex items-center gap-1.5 pl-1 pr-1.5 sm:pr-2.5 py-0.5 sm:py-1 rounded-full bg-neutral-100/80 hover:bg-neutral-200/80 transition-colors shrink-0"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#3456C8] to-[#60A5FA] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-inner">
              АГ
            </div>
            <span className="text-xs font-bold text-neutral-800 hidden md:inline-block font-sans whitespace-nowrap">
              Артём Гаврилов
            </span>
          </a>

          <div className="flex items-center gap-0.5 text-[11px] sm:text-xs font-medium text-neutral-600 shrink-0">
            <a
              href="#projects"
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-all font-sans whitespace-nowrap"
            >
              Проекты
            </a>
            <a
              href="#experience"
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-all font-sans whitespace-nowrap"
            >
              Опыт
            </a>
            <a
              href="#about"
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-all font-sans whitespace-nowrap"
            >
              Обо мне
            </a>
            <a
              href="#skills"
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-all hidden sm:inline-block font-sans whitespace-nowrap"
            >
              Стек
            </a>
          </div>

          <a
            href="mailto:artem.523artem@yandex.ru"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#141416] text-white hover:bg-[#3456C8] transition-all text-[11px] sm:text-xs font-semibold shadow-sm ml-0.5 sm:ml-1 shrink-0 whitespace-nowrap"
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Написать</span>
          </a>
        </nav>
      </header>

      {/* ============================================================ */}
      {/* 2. PINNED HERO SECTION (Stationary Blue Sky + Solid Contrast) */}
      {/* ============================================================ */}
      <section id="hero" className="hero-pinned">
        <img
          src={asset('/assets/hero-shader.webp')}
          alt=""
          className="hero-shader opacity-90"
        />
        <div
          className="hero-sky"
          style={{ backgroundImage: `url(${asset('/assets/hero-sky-day.webp')})` }}
          aria-hidden="true"
        ></div>
        <div
          className="hero-noise"
          style={{ backgroundImage: `url(${asset('/assets/imgNoiseTexture.png')})` }}
          aria-hidden="true"
        ></div>

        <div ref={heroContentRef} className="hero-content" id="hero-content">
          {/* Hatched Sun & Soft Clouds */}
          <img src={asset('/assets/sun.svg')} alt="" className="sun-group" />
          <img src={asset('/assets/cloud.svg')} alt="" className="hero-cloud cloud-a" />
          {/* Centered Hero Container */}
          <div className="relative max-w-4xl w-full px-4 sm:px-6 z-20 flex flex-col items-center text-center -translate-y-4 sm:-translate-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24] inline-block shadow-sm animate-pulse"></span>
              <span className="hero-eyebrow text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white/90 font-mono">
                ПРИВЕТ, Я АРТЁМ ГАВРИЛОВ · FRONTEND-РАЗРАБОТЧИК
              </span>
            </div>

            {/* Headline with Vertical Side Label anchored directly to the title */}
            <div className="relative inline-block">
              {/* Vertical Side Label directly next to title letters */}
              <div className="absolute -left-6 sm:-left-8 lg:-left-10 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none">
                <span className="hero-vertical text-[10px] tracking-[0.2em] text-white/75">
                  РАЗРАБОТКА / ИНТЕРФЕЙСЫ / КОНВЕРСИЯ
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-serif font-normal tracking-tight leading-[1.12] text-[#FFF9F1] max-w-3xl">
                <div className="mb-1">
                  {renderSpringWord("Разработчик,")} {renderSpringWord("который")}
                </div>
                <div>
                  {renderSpringWord("доводит")} {renderSpringWord("интерфейс")} <span className="italic text-[#FFF9F1]">{renderSpringWord("до")} {renderSpringWord("конверсии.")}</span>
                </div>
              </h1>
            </div>

            {/* Subtext description */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 font-sans max-w-xl leading-relaxed">
              Создаю быстрые веб-приложения и сервисы на React и TypeScript. Фокусируюсь на бизнес-задачах, конверсии и чистом коде.
            </p>

            {/* Action buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full bg-white text-[#141416] hover:bg-[#FFF9F1] text-xs sm:text-sm font-bold font-mono transition-all shadow-md hover:scale-105"
              >
                Смотреть проекты ↓
              </a>
              <a
                href="#about"
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-bold font-mono transition-all backdrop-blur-sm"
              >
                Подход к работе
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SOLID CREAM CURTAIN WRAPPER (Scrolls UP over the Hero)    */}
      {/* ============================================================ */}
      <div ref={curtainRef} className="cream-curtain-wrapper">
        {/* Organic Cream Cloud Seam */}
        <div
          ref={skyBandRef}
          className="sky-band"
          style={{ backgroundImage: `url(${asset('/assets/sky-band.svg')})` }}
          aria-hidden="true"
        ></div>

        {/* ── Scroll-Driven Paper Plane with Gutter-Only Geometry ── */}
        <div ref={flyRef} className="plane-fly hidden md:block" aria-hidden="true">
          <svg ref={svgRef} className="plane-trail" viewBox="0 0 1440 3400" fill="none" preserveAspectRatio="none">
            <defs>
              <mask id="maskSeg1">
                <path
                  ref={mask1Ref}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="56"
                  d="M 210 110 C 110 200 70 325 88 410 C 103 488 150 520 210 535"
                />
              </mask>
              <mask id="maskSeg2">
                <path
                  ref={mask2Ref}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="56"
                  d="M 1320 500 C 1400 580 1420 780 1240 910"
                />
              </mask>
              <mask id="maskSeg3">
                <path
                  ref={mask3Ref}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="56"
                  d="M 120 1460 C 60 1680 50 1960 90 2240 C 110 2500 120 2800 130 3060"
                />
              </mask>
            </defs>

            {/* Paths stay strictly inside the outer screen margins (X <= 130 or X >= 1240) */}
            <path
              ref={path1Ref}
              fill="none"
              stroke="#141416"
              strokeWidth="1.6"
              strokeLinecap="butt"
              strokeDasharray="10 6"
              mask="url(#maskSeg1)"
              opacity="0.32"
              d="M 210 110 C 110 200 70 325 88 410 C 103 488 150 520 210 535"
            />
            <path
              ref={path2Ref}
              fill="none"
              stroke="#141416"
              strokeWidth="1.6"
              strokeLinecap="butt"
              strokeDasharray="10 6"
              mask="url(#maskSeg2)"
              opacity="0.32"
              d="M 1320 500 C 1400 580 1420 780 1240 910"
            />
            <path
              ref={path3Ref}
              fill="none"
              stroke="#141416"
              strokeWidth="1.6"
              strokeLinecap="butt"
              strokeDasharray="10 6"
              mask="url(#maskSeg3)"
              opacity="0.32"
              d="M 120 1460 C 60 1680 50 1960 90 2240 C 110 2500 120 2800 130 3060"
            />
          </svg>

          {/* Origami Plane Sprite */}
          <img
            ref={spriteRef}
            src={asset('/assets/plane.svg')}
            alt=""
            className="plane-sprite"
          />
        </div>

        {/* Section A: Manifesto (Intro Copy) */}
        <section id="story" className="pt-24 sm:pt-36 pb-16 max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF6EC] border border-[#EADFCF] text-xs font-bold uppercase tracking-widest text-[#3456C8] mb-6 shadow-sm font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>Философия и продуктовый подход</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-[#141416] tracking-tight leading-tight">
            «Сайт должен не просто открываться быстро — он должен превращать каждого посетителя в заявку и клиента.»
          </h2>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Более 2 лет коммерческого опыта фронтенд-разработки: создаю интерфейсы, формы и личные кабинеты для бизнеса — от быстрых лендингов до многостраничных сервисов. Совмещаю вёрстку с продуктовым мышлением: убираю точки потери лидов.
          </p>

          {/* CTAs on Cream Background */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-sans">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-[#141416] text-white font-bold text-sm hover:bg-[#3456C8] transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Смотреть проекты</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="mailto:artem.523artem@yandex.ru"
              className="px-6 py-3 rounded-full bg-white text-[#141416] border border-[#E2D5C2] font-bold text-sm hover:bg-[#3456C8] hover:text-white transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#3456C8]" />
              <span>Написать на email</span>
            </a>

            <button
              onClick={() => handleCopy('artem.523artem@yandex.ru', 'email')}
              className="px-4 py-2.5 rounded-full bg-[#FDF6EC] border border-[#EADFCF] text-xs font-mono text-neutral-700 hover:bg-white transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email скопирован!' : 'artem.523artem@yandex.ru'}</span>
            </button>
          </div>

          {/* Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-sans text-left">
            <div className="p-5 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] hover:shadow-md transition-all">
              <div className="text-3xl sm:text-4xl font-bold text-[#3456C8] font-mono">2+</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">года коммерческого опыта</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] hover:shadow-md transition-all">
              <div className="text-3xl sm:text-4xl font-bold text-[#F59E0B] font-mono">10+</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">проектов с нуля под ключ</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] hover:shadow-md transition-all">
              <div className="text-3xl sm:text-4xl font-bold text-[#141416] font-mono">20+</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">переиспользуемых UI-модулей</div>
            </div>
            <div className="p-5 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] hover:shadow-md transition-all">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-600 font-mono">+25%</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">ускорение отрисовки страниц</div>
            </div>
          </div>
        </section>

        {/* Section B: Tech Stack Marquee */}
        <section id="stack" className="py-12 bg-[#FDF6EC] border-y border-[#EADFCF] relative overflow-hidden z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-light text-neutral-800 tracking-tight">
              Стек и инструменты
            </h2>
          </div>

          <div className="relative w-full overflow-hidden flex whitespace-nowrap group">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FDF6EC] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FDF6EC] to-transparent z-10 pointer-events-none" />

            {/* Row 1 */}
            <div className="flex gap-8 sm:gap-12 animate-marquee-left group-hover:[animation-play-state:paused] py-2">
              {[
                'JavaScript (ES6+)',
                'TypeScript',
                'React',
                'Next.js',
                'TailwindCSS',
                'HTML5',
                'CSS3 / SCSS',
                'VueJS',
                'JavaScript (ES6+)',
                'TypeScript',
                'React',
                'Next.js',
                'TailwindCSS',
                'HTML5',
                'CSS3 / SCSS',
                'VueJS',
              ].map((tech, i) => (
                <div
                  key={i}
                  className="text-lg sm:text-2xl font-display font-medium text-neutral-700 hover:text-[#3456C8] transition-colors flex items-center gap-4 cursor-default select-none"
                >
                  <span>{tech}</span>
                  <span className="text-neutral-300 font-light">·</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap mt-3 group">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FDF6EC] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FDF6EC] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 sm:gap-12 animate-marquee-right group-hover:[animation-play-state:paused] py-2">
              {[
                'Node.js',
                'REST API',
                'Git',
                'Webpack',
                'Vite',
                'Sass',
                'Gulp',
                'SPA',
                'BEM',
                'GSAP ScrollTrigger',
                'Node.js',
                'REST API',
                'Git',
                'Webpack',
                'Vite',
                'Sass',
                'Gulp',
                'SPA',
                'BEM',
                'GSAP ScrollTrigger',
              ].map((tech, i) => (
                <div
                  key={i}
                  className="text-lg sm:text-2xl font-display font-medium text-neutral-600 hover:text-[#F59E0B] transition-colors flex items-center gap-4 cursor-default select-none"
                >
                  <span>{tech}</span>
                  <span className="text-neutral-300 font-light">·</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section C: Projects Showcase (Interactive Video & Technical Highlights) */}
        <section id="projects" className="py-20 sm:py-32 max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF6EC] border border-[#EADFCF] text-xs font-bold uppercase tracking-wider text-[#3456C8] mb-3 font-mono">
                <span>01 / Избранные кейсы</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#141416] tracking-tight">
                Кейсы и проекты
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 max-w-md font-sans">
              Технические решения, архитектура интерфейсов и оптимизация скорости работы клиентских сервисов.
            </p>
          </div>

          <div className="space-y-8">
            {/* ROW 1: Symmetrical 2-Column Grid (Poglazhu & BIS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Card 01: Поглажу РФ */}
              <div
                onMouseEnter={() => {
                  if (poglazhuVideoRef.current) {
                    poglazhuVideoRef.current.play().catch(() => {});
                  }
                }}
                onMouseLeave={() => {
                  if (poglazhuVideoRef.current) {
                    poglazhuVideoRef.current.pause();
                  }
                }}
                className="project-tile-card bg-[#F4EDE2] hover:bg-[#141416] text-[#141416] hover:text-white border border-[#E5D8C5] hover:border-neutral-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[32px] flex flex-col justify-between p-6 sm:p-8 group cursor-pointer"
              >
                {/* 100% Clear, Perfectly-Fitted Video Container */}
                <ProjectVideoPreview
                  videoRef={poglazhuVideoRef}
                  src={asset('/assets/poglazhu.webm')}
                  type="video/webm"
                  bgColor="bg-[#FAF6F0]"
                />

                {/* Technical Details & Titles in Card Body */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#3456C8] group-hover:text-[#60A5FA] uppercase tracking-wider transition-colors duration-300">
                        01. Frontend / React & TypeScript
                      </span>
                      <a
                        href="https://poglazhu.ru"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-mono font-bold text-neutral-800 group-hover:text-white border border-neutral-300 group-hover:border-white/20 transition-all hover:scale-105"
                      >
                        <span>poglazhu.ru</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141416] group-hover:text-white transition-colors duration-300">
                      Поглажу РФ — сервис заказа и доставки
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-300 font-sans transition-colors duration-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3456C8] group-hover:text-[#60A5FA] shrink-0 mt-0.5 transition-colors" />
                        <span>Разработал SPA-интерфейс оформления заказа с компонентной архитектурой и сквозной валидацией полей.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3456C8] group-hover:text-[#60A5FA] shrink-0 mt-0.5 transition-colors" />
                        <span>Реализовал реактивный калькулятор стоимости и личный кабинет с сохранением сессии.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3456C8] group-hover:text-[#60A5FA] shrink-0 mt-0.5 transition-colors" />
                        <span>Интегрировал REST API для отслеживания 5+ статусов заказа и сценариев обработки сетевых ошибок.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3456C8] group-hover:text-[#60A5FA] shrink-0 mt-0.5 transition-colors" />
                        <span>Оптимизация бандла и ассетов: Code Splitting, ленивая загрузка и Lighthouse 95+.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 group-hover:border-white/10 flex flex-wrap gap-1.5 font-mono transition-colors duration-300">
                    {['React 18', 'TypeScript', 'SCSS Modules', 'Vite', 'REST API', 'SPA'].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-black/5 group-hover:bg-white/10 text-xs text-neutral-700 group-hover:text-neutral-200 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 02: БИС Инжиниринг */}
              <div
                onMouseEnter={() => {
                  if (bisVideoRef.current) {
                    bisVideoRef.current.play().catch(() => {});
                  }
                }}
                onMouseLeave={() => {
                  if (bisVideoRef.current) {
                    bisVideoRef.current.pause();
                  }
                }}
                className="project-tile-card bg-[#F4EDE2] hover:bg-[#141416] text-[#141416] hover:text-white border border-[#E5D8C5] hover:border-neutral-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[32px] flex flex-col justify-between p-6 sm:p-8 group cursor-pointer"
              >
                {/* 100% Clear, Perfectly-Fitted Video Container */}
                <ProjectVideoPreview
                  videoRef={bisVideoRef}
                  src={asset('/assets/bis.mp4')}
                  type="video/mp4"
                  bgColor="bg-[#E2F3FD]"
                />

                {/* Technical Details & Titles in Card Body */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider transition-colors duration-300">
                        02. Frontend / Modular JS
                      </span>
                      <a
                        href="https://bis-rf.ru"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-mono font-bold text-neutral-800 group-hover:text-white border border-neutral-300 group-hover:border-white/20 transition-all hover:scale-105"
                      >
                        <span>bis-rf.ru</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141416] group-hover:text-white transition-colors duration-300">
                      БИС — Баланс Инженерных Систем
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-300 font-sans transition-colors duration-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 transition-colors" />
                        <span>Модульная BEM-структура стилей и переиспользуемые UI-виджеты.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 transition-colors" />
                        <span>Экспресс-калькулятор сметы в 2–3 клика с защитой от повторных отправок (debounce).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 transition-colors" />
                        <span>Асинхронная отправка форм через Fetch API и обработка сетевых ошибок в реальном времени.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 transition-colors" />
                        <span>Оптимизация Core Web Vitals (LCP &lt; 1.1s, нулевой сдвиг макета CLS).</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 group-hover:border-white/10 flex flex-wrap gap-1.5 font-mono transition-colors duration-300">
                    {['JS ES6+', 'SCSS', 'BEM', 'Vite', 'Fetch API', 'LCP < 1.1s'].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-black/5 group-hover:bg-white/10 text-xs text-neutral-700 group-hover:text-neutral-200 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: Symmetrical 2-Column Grid (Autocheck & Zimov) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Card 03: Авточек */}
              <div
                className="project-tile-card bg-[#F4EDE2] hover:bg-[#141416] text-[#141416] hover:text-white border border-[#E5D8C5] hover:border-neutral-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[32px] flex flex-col justify-between p-6 sm:p-8 group cursor-pointer"
              >
                {/* 100% Clear, Perfectly-Fitted Mockup Container */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0F172A] border border-black/10 group-hover:border-neutral-700/60 shadow-md group-hover:shadow-2xl transition-all duration-500 mb-6 flex items-center justify-center">
                  <img
                    src={asset('/assets/autocheck-mockup.png')}
                    alt="Авточек — сервис проверки истории автомобилей"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Technical Details & Titles in Card Body */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#EA580C] group-hover:text-[#FB923C] uppercase tracking-wider transition-colors duration-300">
                        03. Frontend / React & REST API
                      </span>
                      <a
                        href="https://autocheck24.ru"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-mono font-bold text-neutral-800 group-hover:text-white border border-neutral-300 group-hover:border-white/20 transition-all hover:scale-105"
                      >
                        <span>autocheck24.ru</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141416] group-hover:text-white transition-colors duration-300">
                      Авточек — проверка истории автомобилей
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-300 font-sans transition-colors duration-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] group-hover:text-[#FB923C] shrink-0 mt-0.5 transition-colors" />
                        <span>Разработал SPA-интерфейс сервиса проверки авто по VIN, госномеру и номеру кузова.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] group-hover:text-[#FB923C] shrink-0 mt-0.5 transition-colors" />
                        <span>Реализовал валидацию и маскирование полей ввода для безошибочного оформления запроса.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] group-hover:text-[#FB923C] shrink-0 mt-0.5 transition-colors" />
                        <span>Спроектировал динамическую ленту последних проверок и интерактивный просмотр примера отчёта.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] group-hover:text-[#FB923C] shrink-0 mt-0.5 transition-colors" />
                        <span>Интегрировал REST API для асинхронного поиска по базам данных с индикацией этапов загрузки.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 group-hover:border-white/10 flex flex-wrap gap-1.5 font-mono transition-colors duration-300">
                    {['React', 'TypeScript', 'TailwindCSS', 'REST API', 'Vite', 'UI/UX'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-black/5 group-hover:bg-white/10 text-xs text-neutral-700 group-hover:text-neutral-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 04: Зимов и Партнёры */}
              <div
                className="project-tile-card bg-[#F4EDE2] hover:bg-[#141416] text-[#141416] hover:text-white border border-[#E5D8C5] hover:border-neutral-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[32px] flex flex-col justify-between p-6 sm:p-8 group cursor-pointer"
              >
                {/* 100% Clear, Perfectly-Fitted Mockup Container */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#BEF264] border border-black/10 group-hover:border-neutral-700/60 shadow-md group-hover:shadow-2xl transition-all duration-500 mb-6 flex items-center justify-center">
                  <img
                    src={asset('/assets/zimov-mockup.png')}
                    alt="Зимов и Партнёры"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Technical Details & Titles in Card Body */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#4361EE] group-hover:text-[#818CF8] uppercase tracking-wider transition-colors duration-300">
                        04. Frontend / React & UX
                      </span>
                      <a
                        href="https://zimovlaw.ru"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-mono font-bold text-neutral-800 group-hover:text-white border border-neutral-300 group-hover:border-white/20 transition-all hover:scale-105"
                      >
                        <span>zimovlaw.ru</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141416] group-hover:text-white transition-colors duration-300">
                      Зимов и Партнёры — юридическая практика
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-300 font-sans transition-colors duration-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4361EE] group-hover:text-[#818CF8] shrink-0 mt-0.5 transition-colors" />
                        <span>Разработка адаптивного SPA-интерфейса под Retina-дисплеи (Pixel Perfect по Figma).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4361EE] group-hover:text-[#818CF8] shrink-0 mt-0.5 transition-colors" />
                        <span>Архитектура навигации по 5 ключевым практикам с мгновенным переключением разделов.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4361EE] group-hover:text-[#818CF8] shrink-0 mt-0.5 transition-colors" />
                        <span>Формы быстрой записи на консультацию с валидацией и серверной обработкой.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4361EE] group-hover:text-[#818CF8] shrink-0 mt-0.5 transition-colors" />
                        <span>Интеграция CRM-вебхуков для мгновенной передачи лидов с формы.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 group-hover:border-white/10 flex flex-wrap gap-1.5 font-mono transition-colors duration-300">
                    {['React', 'TailwindCSS', 'SCSS', 'Vite', 'CRM Webhooks', 'Speed'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-black/5 group-hover:bg-white/10 text-xs text-neutral-700 group-hover:text-neutral-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: Featured Open Source Project (FreeNet) */}
            <div
              className="project-tile-card bg-[#F4EDE2] hover:bg-[#141416] text-[#141416] hover:text-white border border-[#E5D8C5] hover:border-neutral-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[32px] p-6 sm:p-8 group cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* 100% Clear, Perfectly-Fitted Mockup Container */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#94EED6] border border-black/10 group-hover:border-neutral-700/60 shadow-md group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center">
                  <img
                    src={asset('/assets/freenet-mockup.png')}
                    alt="FreeNet Open Source PWA"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Technical Details & Titles in Card Body */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-600 group-hover:text-emerald-400 uppercase tracking-wider transition-colors duration-300">
                        05. Open Source / PWA & Geo
                      </span>
                      <a
                        href="https://github.com/daredevil666l/FreeNet"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-xs font-mono font-bold text-neutral-800 group-hover:text-white border border-neutral-300 group-hover:border-white/20 transition-all hover:scale-105"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141416] group-hover:text-white transition-colors duration-300">
                      FreeNet — поиск бесплатного Wi-Fi
                    </h3>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 group-hover:text-neutral-300 font-sans transition-colors duration-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                        <span>PWA веб-приложение с использованием LocalStorage для поиска ближайших точек бесплатного Wi-Fi.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                        <span>Работает стабильно и автономно даже при включенных белых списках и отсутствии стабильной сети.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                        <span>Интерактивная карта геопозиционирования с базой точек Wi-Fi Уфанет, собранных из открытого доступа.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                        <span>Построение маршрутов, копирование координат и офлайн-кэширование интерфейса (Offline First).</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 group-hover:border-white/10 flex flex-wrap gap-1.5 font-mono transition-colors duration-300">
                    {['Open Source', 'PWA', 'LocalStorage', 'Leaflet / Maps', 'Offline First', 'GitHub'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-black/5 group-hover:bg-white/10 text-xs text-neutral-700 group-hover:text-neutral-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Notice under Grid */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm font-sans">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3456C8] text-white flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#141416]">
                  10+ проектов с нуля и 20+ переиспользуемых UI-компонентов
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                  Также с нуля сверстал 10+ проектов (лендинги, многостраничные сайты, интерактивные страницы) и разработал 20+ переиспользуемых UI-компонентов (формы с валидацией, модальные окна, слайдеры, квизы, личные кабинеты) на стажировке в <strong>Р.О.С.КОМТЕХ</strong>.
                </p>
              </div>
            </div>

            <a
              href="mailto:artem.523artem@yandex.ru"
              className="px-6 py-3 rounded-full bg-[#141416] text-white text-xs font-bold font-mono hover:bg-[#3456C8] transition-all shrink-0 whitespace-nowrap"
            >
              Обсудить задачу
            </a>
          </div>
        </section>

        {/* Section D: Experience Timeline & Education */}
        <section id="experience" className="py-20 bg-[#FDF6EC] border-y border-[#EADFCF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2D5C2] text-xs font-bold uppercase tracking-wider text-[#3456C8] mb-3 font-mono">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>02 / Опыт работы</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#141416] tracking-tight">
                  Практический коммерческий опыт
                </h2>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-sans">
                  От разработки интерфейсов в научном предприятии до создания digital-решений под ключ и преподавания фронтенда.
                </p>

                <div className="mt-8 hidden lg:block">
                  <div className="p-3.5 bg-white rounded-2xl shadow-polaroid border border-neutral-200/80 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-[#3456C8]/10 via-[#F59E0B]/10 to-[#3456C8]/20 flex flex-col items-center justify-center p-4 text-center">
                      <Terminal className="w-8 h-8 text-[#3456C8] mb-2" />
                      <span className="text-xs font-mono font-bold text-neutral-800">2+ года коммерческой разработки</span>
                    </div>
                    <div className="pt-2 text-center text-[11px] font-mono text-neutral-500">
                      Уфа · Решение бизнес-задач
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                {/* Job 1 */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D5C2] shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#3456C8] uppercase tracking-wider font-mono">
                        Май 2024 — настоящее время
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#141416] mt-0.5">
                        Frontend-разработчик стажёр
                      </h3>
                      <p className="text-sm font-semibold text-neutral-600 font-sans">
                        НПП «Р.О.С.КОМТЕХ» · Уфа
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold font-mono">
                      Текущее место
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Адаптивная вёрстка 10+ проектов (desktop / tablet / mobile).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Разработал с нуля 20+ переиспользуемых UI-компонентов.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Ускорил отображение ключевых блоков сайтов на 25% за счёт оптимизации CSS/JS.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Подключал пользовательские сценарии, обработку ошибок, отправку заявок.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Участвовал в code review, исправлял баги, поддерживал единый стиль компонентов.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3456C8] shrink-0 mt-2"></span>
                      <span>Настраивал сборку на Webpack/Vite, стек: HTML5, SCSS, JS ES6+, TypeScript, Git.</span>
                    </li>
                  </ul>

                  <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5 font-mono">
                    {['HTML5', 'SCSS', 'JS ES6+', 'TypeScript', 'Webpack', 'Vite', 'Git'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-neutral-100 text-[11px] text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job 2 */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D5C2] shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider font-mono">
                        Январь 2024 — настоящее время
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#141416] mt-0.5">
                        Frontend-разработчик
                      </h3>
                      <p className="text-sm font-semibold text-neutral-600 font-sans">
                        Digital-агентство «Квадратная линия» · Уфа
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-2"></span>
                      <span>Разрабатывал сайты, сервисы и digital-инструменты для малого и среднего бизнеса под ключ: от структуры страниц до форм заявок и логики обработки лидов.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-2"></span>
                      <span>Проекты: Авточек (autocheck24.ru), Поглажу РФ, БИС, Зимов и Партнёры (см. секцию «Проекты»).</span>
                    </li>
                  </ul>

                  <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5 font-mono">
                    {['React', 'Next.js', 'TailwindCSS', 'REST API', 'Figma to Code'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-neutral-100 text-[11px] text-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job 3 */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D5C2] shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-mono">
                        Август 2025 — Июнь 2026
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#141416] mt-0.5">
                        Преподаватель программирования
                      </h3>
                      <p className="text-sm font-semibold text-neutral-600 font-sans">
                        EasyPro Academy
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-2"></span>
                      <span>Провёл <strong>1000+ онлайн-занятий</strong> и лекций по программированию и веб-разработке.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-2"></span>
                      <span>Разработал 10+ индивидуальных учебных планов под уровень ученика.</span>
                    </li>
                  </ul>
                </div>

                {/* Education */}
                <div className="pt-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2D5C2] text-xs font-bold uppercase tracking-wider text-[#3456C8] mb-4 font-mono">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>05 / Образование</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-[#E2D5C2] shadow-sm">
                      <span className="text-xs font-mono font-bold text-[#3456C8]">2026</span>
                      <h4 className="text-base font-bold text-neutral-900 mt-1">
                        Уфимский университет науки и технологий
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1">
                        Факультет математики и информационных технологий, «Информатика и вычислительная техника»
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#E2D5C2] shadow-sm">
                      <span className="text-xs font-mono font-bold text-[#F59E0B]">2025</span>
                      <h4 className="text-base font-bold text-neutral-900 mt-1">
                        ООО «Нетология»
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1">
                        Курс повышения квалификации «Frontend-разработчик»
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section E: About Me Scrapbook */}
        <section id="about" className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 relative lg:sticky lg:top-28 self-start">
              {/* Name Sticker placed above the polaroids with generous clearance */}
              <div className="flex justify-center mb-8">
                <div className="px-5 py-1.5 rounded-full bg-[#141416] text-white text-xs font-bold tracking-wider uppercase shadow-xl border border-white/15 -rotate-2 hover:rotate-0 transition-transform font-mono inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse"></span>
                  <span>Артём Гаврилов ✨</span>
                </div>
              </div>

              <div className="relative w-full max-w-md mx-auto min-h-[350px] sm:min-h-[390px] flex items-center justify-center p-1">
                {/* Top Polaroid: Calm Editorial Pastel Blue (React & TypeScript) */}
                <div className="absolute top-4 left-4 w-56 sm:w-64 p-4 bg-white rounded-3xl shadow-polaroid border border-[#E2D5C2] transform -rotate-6 hover:-rotate-2 hover:-translate-y-3 hover:scale-[1.04] transition-all duration-300 z-10 hover:z-20 cursor-pointer group">
                  <div className="tape-strip absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 -rotate-2 rounded"></div>
                  <div className="aspect-[4/3] rounded-2xl bg-[#EEF4FF] border border-[#D9E6FF] flex flex-col items-center justify-center p-4 text-center">
                    <Code className="w-9 h-9 mb-2 text-[#3456C8] transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-extrabold text-sm tracking-wide font-mono text-[#1E3A8A]">React & TypeScript</span>
                    <span className="text-[11px] text-[#475569] mt-0.5 font-sans font-medium">Чистый код и структура</span>
                  </div>
                  <div className="pt-3 text-center">
                    <span className="font-serif italic text-sm text-neutral-700">«Интерфейс для людей»</span>
                  </div>
                </div>

                {/* Bottom Polaroid: Calm Warm Pastel Amber (Product Approach) */}
                <div className="absolute bottom-2 right-4 w-56 sm:w-64 p-4 bg-white rounded-3xl shadow-polaroid border border-[#E2D5C2] transform rotate-6 hover:rotate-2 hover:translate-y-3 hover:scale-[1.04] transition-all duration-300 z-10 hover:z-20 cursor-pointer group">
                  <div className="tape-strip absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-3 rounded"></div>
                  <div className="aspect-[4/3] rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex flex-col items-center justify-center p-4 text-center">
                    <Sparkles className="w-9 h-9 mb-2 text-[#D97706] transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-extrabold text-sm tracking-wide font-mono text-[#9A3412]">Продуктовый подход</span>
                    <span className="text-[11px] text-[#7C2D12]/80 mt-0.5 font-sans font-medium">Конверсия & UX</span>
                  </div>
                  <div className="pt-3 text-center">
                    <span className="font-serif italic text-sm text-neutral-700">Уфа · 2+ года коммерции</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF6EC] border border-[#EADFCF] text-xs font-bold uppercase tracking-wider text-[#3456C8] font-mono">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>06 / Обо мне / подход к работе</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#141416] tracking-tight">
                Фронтенд-разработчик, нацеленный на измеримую пользу бизнесу
              </h2>

              <div className="text-base text-neutral-700 leading-relaxed space-y-4 font-sans">
                <p>
                  Frontend-разработчик с коммерческим опытом создания веб-интерфейсов, сервисов и digital-инструментов для бизнеса — более 2 лет. Умею не просто вёрстать по макетам, а погружаться в бизнес-задачи: анализировать пользовательский путь, устранять точки потери лидов и улучшать конверсию сайтов.
                </p>
                <p>
                  Есть опыт работы с сервисными, юридическими и инжиниринговыми компаниями, а также опыт преподавания — сильные soft skills и умение объяснять сложные решения простым языком.
                </p>
                <p className="font-semibold text-neutral-900">
                  Ищу позицию Frontend-разработчика (JavaScript / TypeScript / React), где смогу развивать продуктовые решения, писать чистый поддерживаемый код и приносить измеримую пользу компании.
                </p>
              </div>

              {/* Checklist */}
              <div className="pt-4">
                <div className="p-6 rounded-3xl bg-[#FDF6EC] border border-[#EADFCF] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase font-mono tracking-wider text-neutral-700">
                      Чек-лист стандартов разработки:
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/80 transition-colors cursor-pointer select-none group"
                      >
                        <button className="mt-0.5 text-[#3456C8] group-hover:scale-110 transition-transform">
                          {item.done ? (
                            <CheckCircle2 className="w-4 h-4 fill-[#3456C8] text-white" />
                          ) : (
                            <Circle className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>
                        <span
                          className={`text-xs sm:text-sm font-medium transition-all ${
                            item.done ? 'line-through text-neutral-400' : 'text-neutral-800'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section F: Clean Editorial Tech Stack */}
        <section id="skills" className="py-20 bg-[#FDF6EC] border-y border-[#EADFCF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-16">
              {/* Left Column: Heading */}
              <div className="md:w-5/12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2D5C2] text-xs font-bold uppercase tracking-wider text-[#3456C8] mb-4 font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>07 / Технологии</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#141416] tracking-tight">
                  Стек и навыки
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans max-w-sm">
                  Технологии и инженерные практики, применяемые в коммерческой разработке.
                </p>
              </div>

              {/* Right Column: Clean Editorial List */}
              <div className="md:w-7/12 divide-y divide-[#E2D5C2] border-y border-[#E2D5C2]">
                {/* Row 1 */}
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider w-36 shrink-0">
                    Frontend
                  </span>
                  <span className="text-sm sm:text-base text-neutral-900 font-medium font-sans">
                    React, TypeScript, JavaScript (ES6+), Next.js, Vue.js, SCSS, TailwindCSS, HTML5, BEM
                  </span>
                </div>

                {/* Row 2 */}
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider w-36 shrink-0">
                    Сборка & Dev
                  </span>
                  <span className="text-sm sm:text-base text-neutral-900 font-medium font-sans">
                    Vite, Webpack, Git, Gulp, TeamCity, Nginx, Figma to Code
                  </span>
                </div>

                {/* Row 3 */}
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider w-36 shrink-0">
                    Интеграции
                  </span>
                  <span className="text-sm sm:text-base text-neutral-900 font-medium font-sans">
                    REST API, Fetch API, WebSockets, LocalStorage, PWA, CRM Webhooks
                  </span>
                </div>

                {/* Row 4 */}
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider w-36 shrink-0">
                    Стандарты
                  </span>
                  <span className="text-sm sm:text-base text-neutral-900 font-medium font-sans">
                    Core Web Vitals (LCP &lt; 1.1s), кросс-браузерность, адаптивность, Pixel Perfect, a11y
                  </span>
                </div>

                {/* Row 5 */}
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider w-36 shrink-0">
                    Языки
                  </span>
                  <span className="text-sm sm:text-base text-neutral-900 font-medium font-sans">
                    Русский (родной), Английский (технический / чтение документации)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section G: Clean Handcrafted Contact Footer */}
        <footer id="contacts" className="py-20 sm:py-28 bg-[#141416] text-white border-t border-neutral-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-16 border-b border-neutral-800">
              <div className="max-w-md">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                  08 / Контакты
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
                  Связаться со мной
                </h2>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-sans">
                  Уфа · Удалённый формат, гибрид или офис.<br />
                  Открыт к предложениям о работе на позицию Frontend-разработчика.
                </p>
              </div>

              <div className="w-full lg:w-auto lg:min-w-[440px] space-y-4">
                {/* Email Row */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-neutral-400 block mb-0.5 uppercase tracking-wider">Email</span>
                    <a
                      href="mailto:artem.523artem@yandex.ru"
                      className="text-sm sm:text-base font-mono text-white hover:text-[#38BDF8] transition-colors block truncate"
                    >
                      artem.523artem@yandex.ru
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy('artem.523artem@yandex.ru', 'email')}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-200 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Скопировано' : 'Копировать'}</span>
                  </button>
                </div>

                {/* Phone Row */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-neutral-400 block mb-0.5 uppercase tracking-wider">Телефон</span>
                    <a
                      href="tel:+79378410656"
                      className="text-sm sm:text-base font-mono text-white hover:text-[#FDE047] transition-colors block whitespace-nowrap"
                    >
                      +7 (937) 841-06-56
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy('+79378410656', 'phone')}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-200 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Скопировано' : 'Копировать'}</span>
                  </button>
                </div>

                {/* GitHub Row */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-neutral-400 block mb-0.5 uppercase tracking-wider">GitHub</span>
                    <a
                      href="https://github.com/daredevil666l"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-mono text-white hover:text-neutral-300 transition-colors block"
                    >
                      github.com/daredevil666l
                    </a>
                  </div>
                  <a
                    href="https://github.com/daredevil666l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4 font-mono">
              <div>
                © 2026 Артём Гаврилов · Frontend-разработчик
              </div>
              <div className="flex items-center gap-4">
                <span>Уфа · Frontend Engineer</span>
                <a href="#hero" className="hover:text-white transition-colors underline underline-offset-4">
                  Наверх ↑
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
