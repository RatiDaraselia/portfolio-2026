// App entrypoint — wires Tweaks, scroll spy, spotlight, toast
const { motion, useMotionValue, useSpring } = window.Motion;

function CursorDot({ enabled }) {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  // Lag behind the pointer is damping / stiffness seconds, so the feel is set
  // by that ratio. Tuned between two tested extremes:
  //   k260 c29.5 m0.6  -> 113ms lag, ~470ms drift after stopping: too heavy
  //   k700 c30   m0.3  ->  43ms lag, ~110ms drift: too raw, no visible glide
  // This sits at 74ms lag, so the glide reads clearly while moving, but settles
  // ~215ms after the hand stops, nearer the light end, because the lingering
  // drift was most of what felt heavy. zeta ~0.98: no overshoot or wobble.
  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const dotRef   = React.useRef(null);
  const lensRef  = React.useRef(null);
  const wrapRef  = React.useRef(null);

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

    const clickSel = 'a, button, [role="button"]';
    const thumbSel = '.card .thumb';

    const wrap = wrapRef.current;
    const setBlend = (mode) => { if (wrap) wrap.style.mixBlendMode = mode; };

    const onOver = (e) => {
      if (!e.target.closest) return;
      const thumb = e.target.closest(thumbSel);
      if (thumb) {
        const img = thumb.querySelector('img');
        if (img && lensImg) lensImg.src = img.src;
        currentThumb = img ? thumb : null;
        if (currentThumb) { dot.classList.remove('point'); dot.classList.add('lens'); setBlend('normal'); return; }
      }
      // Over anything clickable, contract to a precise point instead of
      // vanishing. The system cursor is hidden site-wide, so a vanishing dot
      // left visitors with no pointer exactly where they were about to click.
      // Derived from the element entered, so it can never get stuck on.
      dot.classList.toggle('point', !!e.target.closest(clickSel));
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(thumbSel)) {
        const stillIn = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(thumbSel);
        if (!stillIn) {
          dot.classList.remove('lens');
          currentThumb = null;
          if (lensImg) lensImg.src = '';
          setBlend('difference');
        }
        return;
      }
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
    // Pressing on a link or image and moving slightly starts a native drag,
    // which swallows the mouseup and used to leave the dot stuck small.
    window.addEventListener('dragstart',  onUp);
    window.addEventListener('dragend',    onUp);
    window.addEventListener('blur',       onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      unsubX(); unsubY();
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('dragstart',  onUp);
      window.removeEventListener('dragend',    onUp);
      window.removeEventListener('blur',       onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      html.classList.remove('has-custom-cursor');
      dot.classList.remove('ready', 'point', 'press', 'lens');
      currentThumb = null;
      if (lensImg) lensImg.src = '';
    };
  }, [enabled, cursorX, cursorY, smoothX, smoothY]);

  return (
    <motion.div
      ref={wrapRef}
      style={{ x: smoothX, y: smoothY, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}
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

  // Scroll reveal — section-scoped sequential cascade
  // Instead of observing each .reveal individually (which lets bottom elements
  // fire before top ones on fast scroll), we observe each section/footer once.
  // When a section enters the viewport, its .reveal children animate in strict
  // DOM order with enforced stagger, guaranteeing a top-down cascade.
  React.useEffect(() => {
    const STAGGER = 120; // ms between each child reveal

    // Collect all section-level containers that hold .reveal elements
    const containers = document.querySelectorAll('section, footer');
    if (!containers.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Gather all un-revealed .reveal children in DOM order
        const reveals = Array.from(
          entry.target.querySelectorAll('.reveal:not(.visible)')
        );
        if (!reveals.length) return;

        // Enforce strict sequential stagger — override any inline animationDelay
        reveals.forEach((el, i) => {
          el.style.animationDelay = `${i * STAGGER}ms`;
          el.classList.add('visible');
        });

        // Section is done — stop watching it
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0 });

    containers.forEach(c => {
      // Only observe containers that actually have .reveal children
      if (c.querySelector('.reveal')) io.observe(c);
    });
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
