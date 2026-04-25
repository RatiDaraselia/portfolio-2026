// App entrypoint — wires Tweaks, scroll spy, spotlight, toast
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "editorial",
  "cardVariant": "stripes",
  "density": "regular",
  "projectCount": 4,
  "spotlight": true,
  "marqueeSep": "slash"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState('about');
  const [toast, setToast] = React.useState(null);

  // Smooth scroll on nav click
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: 'smooth' });
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

  // Custom blend-mode circle cursor
  React.useEffect(() => {
    const dot = document.getElementById('cursor');
    const html = document.documentElement;
    if (!dot) return;
    if (!t.spotlight) {
      dot.classList.remove('ready');
      html.classList.remove('has-custom-cursor');
      return;
    }
    html.classList.add('has-custom-cursor');

    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let rafId = null;
    let seenFirstMove = false;

    const tick = () => {
      curX += (targetX - curX) * 0.25;
      curY += (targetY - curY) * 0.25;
      dot.style.transform = `translate3d(${curX}px,${curY}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!seenFirstMove) {
        // Snap visual position to hardware position on first move so the
        // dot doesn't lerp in from the top-left corner of the viewport.
        curX = targetX;
        curY = targetY;
        seenFirstMove = true;
        rafId = requestAnimationFrame(tick);
      }
      dot.classList.add('ready');
    };

    const hoverSel = 'a, button, .nav-link, .btn, [role="button"]';
    const clickSel = 'a, button, .btn, [role="button"]';
    const tgSel = '.btn-tg';
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('.card')) return;
      const isClick = e.target.closest && e.target.closest(clickSel);
      if (e.target.closest && e.target.closest(hoverSel) && !isClick) dot.classList.add('hover');
      if (isClick) dot.classList.add('hide');
      if (e.target.closest && e.target.closest(tgSel)) dot.classList.add('on-tg');
    };
    const onOut  = (e) => {
      if (e.target.closest && e.target.closest('.card')) return;
      if (e.target.closest && e.target.closest(hoverSel)) dot.classList.remove('hover');
      if (e.target.closest && e.target.closest(clickSel)) dot.classList.remove('hide');
      if (e.target.closest && e.target.closest(tgSel)) dot.classList.remove('on-tg');
    };
    const onDown = () => dot.classList.add('press');
    const onUp   = () => dot.classList.remove('press');
    const onLeave = () => dot.classList.remove('ready');
    const onEnter = () => dot.classList.add('ready');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      html.classList.remove('has-custom-cursor');
      dot.classList.remove('ready', 'hover', 'press', 'on-tg', 'hide');
    };
  }, [t.spotlight]);

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
    }, { rootMargin: '-15% 0px', threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const copyEmail = async () => {
    const email = 'ratidaraselia.ui@gmail.com';
    try { await navigator.clipboard.writeText(email); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = email;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    setToast({ id: Date.now(), msg: 'Copied ' + email });
  };
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <>
      <Nav active={active} onNav={onNav} />
      <Hero layout={t.heroLayout} copyEmail={copyEmail} />
      <Marquee sep={t.marqueeSep} />
      <UtilityRow />
      <Projects variant={t.cardVariant} density={t.density} count={t.projectCount} />
      <div className="wrap"><div className="hr" /></div>
      <Career />
      <div className="wrap"><div className="hr" /></div>
      <Benefits copyEmail={copyEmail} />
      <Footer copyEmail={copyEmail} />

      <div className={`toast ${toast ? 'show' : ''}`}>
        <Icon.Check /> {toast?.msg || ''}
      </div>

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
          min={2} max={6} step={1}
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
