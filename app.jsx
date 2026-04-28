// App entrypoint — wires Tweaks, scroll spy, spotlight, toast
const { motion, useMotionValue, useSpring } = window.Motion;

function CursorDot({ enabled }) {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springConfig = { damping: 33, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const dotRef   = React.useRef(null);
  const lensRef  = React.useRef(null);

  React.useEffect(() => {
    const html = document.documentElement;
    const dot  = dotRef.current;
    const lensImg = lensRef.current;
    if (!dot) return;

    if (!enabled) {
      dot.classList.remove('ready');
      html.classList.remove('has-custom-cursor');
      return;
    }
    html.classList.add('has-custom-cursor');

    let seenFirstMove = false;
    let currentThumb  = null;
    const MAG = 2, LW = 100, LH = 50;

    const updateLens = () => {
      if (!currentThumb || !lensImg) return;
      const x = smoothX.get(), y = smoothY.get();
      const r = currentThumb.getBoundingClientRect();
      lensImg.style.width  = (r.width  * MAG) + 'px';
      lensImg.style.height = (r.height * MAG) + 'px';
      lensImg.style.left   = (LW / 2 - (x - r.left) * MAG) + 'px';
      lensImg.style.top    = (LH / 2 - (y - r.top)  * MAG) + 'px';
    };
    const unsubX = smoothX.on('change', updateLens);
    const unsubY = smoothY.on('change', updateLens);

    const onMove = (e) => {
      if (!seenFirstMove) {
        seenFirstMove = true;
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dot.classList.add('ready');
    };

    const hoverSel = 'a, button, .nav-link, .btn, [role="button"]';
    const clickSel = 'a, button, .btn, [role="button"]';
    const tgSel    = '.btn-tg';
    const thumbSel = '.card .thumb';

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(thumbSel)) {
        const thumb = e.target.closest(thumbSel);
        const img   = thumb.querySelector('img');
        if (img && lensImg) lensImg.src = img.src;
        currentThumb = img ? thumb : null;
        if (currentThumb) { dot.classList.add('lens'); return; }
      }
      if (e.target.closest && e.target.closest('.card')) return;
      const isClick = e.target.closest && e.target.closest(clickSel);
      if (e.target.closest && e.target.closest(hoverSel) && !isClick) dot.classList.add('hover');
      if (isClick) dot.classList.add('hide');
      if (e.target.closest && e.target.closest(tgSel)) dot.classList.add('on-tg');
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(thumbSel)) {
        const stillIn = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(thumbSel);
        if (!stillIn) {
          dot.classList.remove('lens');
          currentThumb = null;
          if (lensImg) lensImg.src = '';
        }
        return;
      }
      if (e.target.closest && e.target.closest('.card')) return;
      if (e.target.closest && e.target.closest(hoverSel)) dot.classList.remove('hover');
      if (e.target.closest && e.target.closest(clickSel)) dot.classList.remove('hide');
      if (e.target.closest && e.target.closest(tgSel))    dot.classList.remove('on-tg');
    };
    const onDown  = () => dot.classList.add('press');
    const onUp    = () => dot.classList.remove('press');
    const onLeave = () => dot.classList.remove('ready');
    const onEnter = () => dot.classList.add('ready');

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseover',  onOver);
    window.addEventListener('mouseout',   onOut);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      unsubX(); unsubY();
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      html.classList.remove('has-custom-cursor');
      dot.classList.remove('ready', 'hover', 'press', 'on-tg', 'hide', 'lens');
      currentThumb = null;
      if (lensImg) lensImg.src = '';
    };
  }, [enabled, cursorX, cursorY, smoothX, smoothY]);

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 1500 }}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor" id="cursor">
        <img ref={lensRef} id="cursor-lens-img" alt="" />
      </div>
    </motion.div>
  );
}
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "editorial",
  "cardVariant": "stripes",
  "density": "regular",
  "projectCount": 5,
  "spotlight": true,
  "marqueeSep": "slash"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState('about');
  const lenisRef = React.useRef(null);

  // Global Lenis Smooth Scroll
  React.useEffect(() => {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll on nav click
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -20 });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Active section observer
  React.useEffect(() => {
    const ids = ['about', 'portfolio', 'career', 'path', 'why-me', 'contact'];
    const opts = { rootMargin: '-35% 0px -55% 0px', threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, opts);
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Scroll reveal
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px', threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav active={active} onNav={onNav} />
      <Hero layout={t.heroLayout} />
      <Marquee sep={t.marqueeSep} />
      <UtilityRow />
      <Projects variant={t.cardVariant} density={t.density} count={t.projectCount} />
      <Career />
      <Benefits />
      <Footer />

      <CursorDot enabled={t.spotlight} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroLayout}
          options={['editorial', 'centered', 'split']}
          onChange={(v) => setTweak('heroLayout', v)} />

        <TweakSection label="Projects" />
        <TweakRadio label="Thumbnails" value={t.cardVariant}
          options={['stripes', 'gradient', 'block']}
          onChange={(v) => setTweak('cardVariant', v)} />
        <TweakRadio label="Density" value={t.density}
          options={['tight', 'regular', 'loose']}
          onChange={(v) => setTweak('density', v)} />
        <TweakSlider label="Project count" value={t.projectCount}
          min={2} max={7} step={1}
          onChange={(v) => setTweak('projectCount', v)} />

        <TweakSection label="Marquee" />
        <TweakRadio label="Separator" value={t.marqueeSep}
          options={['slash', 'dash', 'plus', 'asterisk', 'dot']}
          onChange={(v) => setTweak('marqueeSep', v)} />

        <TweakSection label="Ambient" />
        <TweakToggle label="Custom cursor" value={t.spotlight}
          onChange={(v) => setTweak('spotlight', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
