function DiagArrow({ size = 11 }) {
  return (
    <span className="diag-arrow">
      <span className="da-out"><Icon.ArrowUpRight size={size} /></span>
      <span className="da-in"><Icon.ArrowUpRight size={size} /></span>
    </span>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────
function Nav({ active, onNav }) {
  const [cond, setCond] = React.useState(false);
  React.useEffect(() => {
    const on = () => setCond(window.scrollY > 60);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const items = [
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'career', label: 'Career' },
    { id: 'path', label: 'Path' },
    { id: 'why-me', label: 'Why me' },
    { id: 'contact', label: 'Contact' }];

  return (
    <div className="nav-wrap">
      <nav className={`nav ${cond ? 'condensed' : ''}`} aria-label="Primary">
        {items.map((it) =>
          <a key={it.id} href={`#${it.id}`}
            className={`nav-link ${active === it.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNav(it.id); }}>
            <span className="dot" aria-hidden />
            {it.label}
          </a>
        )}
      </nav>
    </div>);

}

// ─── Avatar (monogram placeholder) ─────────────────────────────────
function Avatar({ size = 40 }) {
  return (
    <div className="avatar" style={{ width: size, height: size, flex: `0 0 ${size}px` }} aria-hidden>
      <img src="assets/portrait.jpg" alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: '60% 28%'
        }} />
    </div>);

}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero({ layout = 'editorial' }) {
  const inner =
    <>
      <div className="hero-top">
        <Avatar size={88} />
        <div className="status">
          <span className="pulse" />
          <span>Available · Q3 '26</span>
        </div>
      </div>
      <h1 className="hero-title" style={{ color: "rgb(255, 255, 255)" }}>
        Bagrat <em style={{ color: "rgb(255, 255, 255)" }}>Daraselia.</em>
      </h1>
      <p className="thesis">Architecting high-fidelity interfaces at the intersection of spatial computing and SaaS complexity — transforming abstract product logic into surgical digital experiences for global startups and enterprises.



      </p>
      <div className="cta-row">
        <a className="btn btn-solid" href="mailto:ratidaraselia.ui@gmail.com">
          <Icon.Mail /> Get in touch <span className="arrow"><Icon.Arrow size={11}/></span>
        </a>
        <a className="btn btn-ghost btn-tg" href="https://t.me/Bagratdaraselia" target="_blank" rel="noopener noreferrer">
          <Icon.Telegram /> Telegram <DiagArrow size={11} />
        </a>
      </div>
    </>;

  return (
    <section className="hero" data-layout={layout} id="about">
      <div className="wrap">
        {layout === 'split' ?
          <div className="hero-grid">
            <Avatar size={92} />
            <div>
              <div className="status" style={{ marginBottom: 18 }}>
                <span className="pulse" /><span>Available · Q3 '26</span>
              </div>
              <h1 className="hero-title" style={{ marginTop: 0 }}>
                Bagrat <em>Daraselia.</em>
              </h1>
              <p className="thesis">
                Architecting high-fidelity interfaces at the intersection of spatial
                computing and SaaS complexity—transforming abstract product logic into
                surgical digital experiences for global startups and enterprises.
              </p>
              <div className="cta-row">
                <a className="btn btn-solid" href="mailto:ratidaraselia.ui@gmail.com">
                  <Icon.Mail /> Get in touch <span className="arrow"><Icon.Arrow size={11}/></span>
                </a>
                <a className="btn btn-ghost btn-tg" href="https://t.me/Bagratdaraselia" target="_blank" rel="noopener noreferrer">
                  <Icon.Telegram /> Telegram <DiagArrow size={11} />
                </a>
              </div>
            </div>
          </div> :
          inner}
      </div>
    </section>);

}

// ─── Marquee + utility row ─────────────────────────────────────────
function Marquee({ sep = 'slash' }) {
  const items = [
    'Product Design', 'Design Systems', 'Vision OS', 'SaaS Architecture',
    'Spatial UI', 'Interaction Design', 'Prototyping', 'Figma Variables',
    'Information Design', 'Motion', 'Dev Handoff'];

  const row =
    <div className="chip">
      {items.map((it, i) =>
        <React.Fragment key={i}>
          <span>{it}</span><span className="sep" />
        </React.Fragment>
      )}
    </div>;

  return (
    <div className="marquee-sec" aria-hidden>
      <div className="marquee-inner" data-sep={sep}>
        {row}{row}
      </div>
    </div>);

}

function UtilityRow() {
  const [t, setT] = React.useState(() => nowTbilisi());
  React.useEffect(() => {
    const id = setInterval(() => setT(nowTbilisi()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="wrap">
      <div className="utility-row">
        <span>Tbilisi, Georgia · GMT+4</span>
        <span className="dots">
          <span className="live-dot" aria-hidden />
          <span>{t} Local</span>
        </span>
      </div>
    </div>);

}
function nowTbilisi() {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tbilisi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  return fmt.format(d);
}

// ─── Projects ──────────────────────────────────────────────────────
const PROJECTS = [
  { id: 'axiom', name: 'Axiom', tag: 'SaaS · Analytics', date: 'Aug 2024', img: 'assets/axiom-thumbnail.jpg', link: '#' },
  { id: 'garder', name: 'Garderobe', tag: 'E-commerce · Fashion', date: 'Jan 2026', img: 'assets/garderobe-thumbnail.jpg', link: '#' },
  { id: 'visionos', name: 'Vision OS: Google Home UI Concept', tag: 'Spatial · visionOS', date: 'May 2025', img: 'assets/visionOS-thumbnail.jpg', link: '#', wide: true },
  { id: 'solvaer', name: 'Solvær', tag: 'Spatial · visionOS', date: 'Oct 2025', img: 'assets/solvaer-thumbnail.jpg', link: '#' },
  { id: 'nora', name: 'nora', tag: 'Agent · Productivity', date: 'Aug 2025', img: 'assets/nora-thumbnail.jpg', link: '#' },
  { id: 'aquageo', name: 'AquaGeo', tag: 'Enterprise · GIS', date: 'Apr 2025', glyph: 'AQ', link: '#' },
  { id: 'halcyon', name: 'Halcyon', tag: 'Fintech · Mobile', date: 'Feb 2025', glyph: 'HA', link: '#' }];


function ProjectThumb({ project, variant }) {
  if (project.img) {
    return (
      <div className="thumb-inner">
        <img src={project.img} alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>);
  }
  if (variant === 'gradient') {
    return (
      <div className="thumb-inner">
        <div className="thumb-grad"><div className="glyph">{project.glyph}</div></div>
      </div>);

  }
  if (variant === 'block') {
    return (
      <div className="thumb-inner">
        <div className="thumb-block"><div className="glyph">{project.glyph}</div></div>
      </div>);

  }
  return (
    <div className="thumb-inner">
      <div className="thumb-stripes"><div className="glyph">{project.glyph}</div></div>
    </div>);

}

function ProjectCard({ p, variant, revealDelay = 0 }) {
  return (
    <article className={`card reveal${p.wide ? ' card-wide' : ''}`}
      style={{ animationDelay: `${revealDelay}ms` }}>
      <a href={p.link} className="thumb" aria-label={`${p.name}, open external`}>
        <ProjectThumb project={p} variant={variant} />
        <span className="thumb-label">View case · {p.tag}</span>
        <span className="ext" aria-hidden><Icon.ArrowUpRight size={12} /></span>
      </a>
      <div>
        <div className="row">
          <div className="t" style={{ color: "rgb(255, 255, 255)" }}>{p.name}</div>
          <div className="d">{p.date}</div>
        </div>
        <p className="sub">{p.tag}</p>
      </div>
    </article>);

}

function Projects({ variant = 'stripes', density = 'regular', count = 4 }) {
  return (
    <section className="block" id="portfolio">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Latest product visions</h2>
          <div className="meta">[ 01 — Selected Works ]</div>
        </div>
        <div className="project-grid" data-density={density}>
          {PROJECTS.slice(0, count).map((p, i) =>
            <ProjectCard key={p.id} p={p} variant={variant} revealDelay={(i + 1) * 150} />
          )}
        </div>
      </div>
    </section>);

}

// ─── Career ────────────────────────────────────────────────────────
const CAREER = [
  { role: 'Lead Designer', co: 'AquaGeo — Enterprise GIS', when: '2024 — Present', type: 'Full-time' },
  { role: 'Senior Product Designer', co: 'Garderobe — Redesign', when: '2023 — 2024', type: 'Contract' },
  { role: 'Product Designer', co: 'Solvær — Spatial / visionOS', when: '2022 — 2023', type: 'Contract' },
  { role: 'UI/UX Designer', co: 'nora — Agent Productivity', when: '2021 — 2022', type: 'Freelance' }];

const EDU = [
  { role: 'Computer Science, B.Sc.', co: 'SANGU — St. Andrew\'s University', when: '2018 — 2022', type: 'Education' },
  { role: 'Google UX Design Professional', co: 'Coursera · Google', when: '2021', type: 'Certificate' },
  { role: <>Interaction Design<br/>Foundation</>, co: 'UX Research & Strategy', when: '2022', type: 'Certificate' }];


function CoCell({ value }) {
  const sep = ' — ';
  const idx = value.indexOf(sep);
  if (idx === -1) return <div className="co">{value}</div>;
  return (
    <div className="co">
      <div style={{ color:'var(--fg-1)', lineHeight:1.2 }}>{value.slice(0, idx)} —</div>
      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, lineHeight:1.2 }}>{value.slice(idx + sep.length)}</div>
    </div>
  );
}

function Career() {
  return (
    <section className="block" id="career">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Career</h2>
          <div className="meta">[ 02 — Professional Path ]</div>
        </div>
        <div className="list" role="list">
          {CAREER.map((r, i) =>
            <div className="item reveal" role="listitem" key={i} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
              <div className="role">{r.role}</div>
              <CoCell value={r.co} />
              <div className="when">{r.when}</div>
              <div className="type">{r.type}</div>
            </div>
          )}
        </div>

        <div style={{ height: 80 }} />

        <div id="path" className="section-head reveal">
          <h2>Path</h2>
          <div className="meta">[ 03 — Education & Certification ]</div>
        </div>
        <div className="list" role="list">
          {EDU.map((r, i) =>
            <div className="item reveal" role="listitem" key={i} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
              <div className="role">{r.role}</div>
              <CoCell value={r.co} />
              <div className="when">{r.when}</div>
              <div className="type">{r.type}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Benefits ──────────────────────────────────────────────────────
const BENEFITS = [
  { icon: <Icon.Scale />, n: '01', t: 'Scalability', d: 'Systems built to grow — token architectures and primitives that hold their shape from marketing page to admin console.' },
  { icon: <Icon.Crosshair />, n: '02', t: 'Precision', d: 'Pixel-accurate, spec-tight output. Every spacing value, every radius, every transition is deliberate and defensible.' },
  { icon: <Icon.Terminal />, n: '03', t: 'Developer-Ready', d: 'Figma files ship like code. Variables, variants, naming conventions and documentation your engineers will actually read.' },
  { icon: <Icon.Schema />, n: '04', t: 'Systemic Logic', d: 'Abstract product logic made legible. Flows, states, edge cases — surfaced before implementation costs multiply.' }];


function Benefits() {
  return (
    <section className="block" id="why-me">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Why me</h2>
          <div className="meta">[ 04 — Operating Principles ]</div>
        </div>
        <div className="benefits">
          {BENEFITS.map((b, i) =>
            <div className="benefit reveal" key={b.n} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
              <div className="num">{b.n}</div>
              <div className="icon">{b.icon}</div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}


function ResumeModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-inner" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-frame">
          <iframe src="assets/CV_EN.pdf" title="Resume Preview" />
        </div>
        <div className="resume-modal-hint">
          Collapse the Document — <kbd className="resume-kbd">ESC</kbd>
        </div>
      </div>
    </div>
  );
}

const VERT = `
  attribute vec3 aSeed;
  attribute vec4 aRand;
  uniform float uTime;
  varying float vAlpha;

  float hash(vec3 p) {
    p = fract(p * vec3(443.897,441.423,437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float vnoise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    vec3 u = f*f*f*(f*(f*6.0-15.0)+10.0);
    return mix(
      mix(mix(hash(i),            hash(i+vec3(1,0,0)),u.x),
          mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),u.x),u.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),u.x),
          mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),u.x),u.y),
      u.z) * 2.0 - 1.0;
  }

  vec3 curl(vec3 p) {
    const float e = 0.08;
    vec3 a = vec3(3.33,5.71,2.14), b = vec3(7.53,1.22,8.87);
    float cx = (vnoise(p+vec3(0,e,0)+b)-vnoise(p-vec3(0,e,0)+b))
              -(vnoise(p+vec3(0,0,e)+a)-vnoise(p-vec3(0,0,e)+a));
    float cy = (vnoise(p+vec3(0,0,e))  -vnoise(p-vec3(0,0,e)))
              -(vnoise(p+vec3(e,0,0)+b)-vnoise(p-vec3(e,0,0)+b));
    float cz = (vnoise(p+vec3(e,0,0)+a)-vnoise(p-vec3(e,0,0)+a))
              -(vnoise(p+vec3(0,e,0))  -vnoise(p-vec3(0,e,0)));
    return vec3(cx,cy,cz)/(2.0*e);
  }

  void main() {
    float speed = 0.46 + aRand.y * 0.32;
    float phase = fract(uTime * speed * 0.065 + aRand.x);
    float kt = uTime * 0.12 + aRand.x * 6.2832;

    vec3 inner = vec3(
      (fract(aSeed.x * 0.373 + aSeed.y * 0.619) - 0.5) * 1.5,
      (fract(aSeed.y * 0.413 + aSeed.z * 0.711) - 0.5) * 0.9,
      (fract(aSeed.z * 0.531 + aSeed.x * 0.293) - 0.5) * 0.7
    );
    // Tighter spatial scale — smaller eddies force visible ribbons faster
    // without touching time or velocity
    vec3 c1 = curl(inner * 0.62 + kt * 0.22) * 0.88;
    vec3 c2 = curl(inner * 1.28 + kt * 0.44 + 2.094) * 0.40;

    // Harmonic attractor — pull proportional to distance, flocks particles
    // into shared streams without aggressive vortex
    vec3 attractor = -inner * 0.15;

    vec3 knotPos = inner + c1 + c2 + attractor;
    float knotSpeed = clamp(length(c1)*0.65 + length(c2)*0.35, 0.0, 1.0);

    vec3 pos; float alpha;

    if (phase < 0.28) {
      float t = smoothstep(0.0, 1.0, phase / 0.28);
      pos = mix(aSeed, inner, t);
      alpha = smoothstep(0.0, 0.55, t) * 0.65;
    } else if (phase < 0.80) {
      float kf = smoothstep(0.0, 0.12, (phase - 0.28) / 0.52);
      pos = mix(inner, knotPos, kf);
      alpha = (mix(0.18, 0.90, knotSpeed)) * kf + 0.32 * (1.0 - kf);
    } else {
      float t = smoothstep(0.0, 1.0, (phase - 0.80) / 0.20);
      vec3 escDir = normalize(vec3(cos(aRand.z*6.2832), sin(aRand.z*6.2832), aRand.w*2.0-1.0));
      pos = knotPos + escDir * t * 3.8;
      alpha = 1.0 - t;
    }

    float yFade = smoothstep(-0.85, -0.15, pos.y) * (1.0 - smoothstep(0.55, 1.25, pos.y));
    float descentFade = mix(0.72, 1.0, smoothstep(-0.10, 0.35, pos.y));
    vAlpha = alpha * yFade * descentFade;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.0;
  }
`;

const FRAG = `
  varying float vAlpha;
  void main() {
    if (vAlpha <= 0.01) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
  }
`;

function FooterCanvas() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const THREE = window.THREE;
    if (!THREE || !ref.current) return;

    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    // ── 100k GPU particles with full lifecycle data ────────────────
    const N = 100000;
    const seeds = new Float32Array(N * 3);
    const rands = new Float32Array(N * 4);

    for (let i = 0; i < N; i++) {
      // Spawn positions: primarily at left/right edges
      const side = Math.random() > 0.5 ? 1 : -1;
      seeds[i * 3]     = side * (4.2 + Math.random() * 2.0);
      seeds[i * 3 + 1] = (Math.random() - 0.5) * 5.0;
      seeds[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      rands[i * 4]     = Math.random(); // phase offset
      rands[i * 4 + 1] = Math.random(); // speed multiplier
      rands[i * 4 + 2] = Math.random(); // escape theta
      rands[i * 4 + 3] = Math.random(); // escape z direction
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('aSeed',    new THREE.BufferAttribute(seeds, 3));
    geo.setAttribute('aRand',    new THREE.BufferAttribute(rands, 4));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms:       { uTime: { value: 0 } },
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const cloud = new THREE.Points(geo, mat);
    cloud.frustumCulled = false;
    cloud.scale.set(1.0, 0.48, 1.0);
    cloud.position.y = 0.40;
    scene.add(cloud);

    // ── Resize ────────────────────────────────────────────────────
    const resize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Tick ──────────────────────────────────────────────────────
    let rafId = null, running = false, t = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      t += 0.008;
      mat.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };

    // ── IntersectionObserver — pause when off-screen ──────────────
    const footer = canvas.closest('footer');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) {
          running = true; rafId = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && running) {
          running = false; cancelAnimationFrame(rafId);
        }
      });
    }, { threshold: 0.05 });
    if (footer) io.observe(footer);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect(); ro.disconnect();
      renderer.dispose(); geo.dispose(); mat.dispose();
    };
  }, []);

  return <canvas ref={ref} className="footer-canvas" aria-hidden="true" />;
}

function Footer() {
  const [resumeOpen, setResumeOpen] = React.useState(false);
  return (
    <>
    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    <footer id="contact">
      <FooterCanvas />
      <div className="wrap">
        <div className="footer-top">
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[ 05 — Get in Touch ]</div>
          <h2 className="reveal" style={{ animationDelay: '150ms' }}>Let's get in touch.</h2>
          <p className="reveal" style={{ animationDelay: '300ms' }}>Currently taking on a small number of Q3 engagements.
            I reply to every inbound within 24 hours.</p>
          <div className="reveal" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', animationDelay: '450ms' }}>
            <a className="btn btn-solid" href="mailto:ratidaraselia.ui@gmail.com">
              <Icon.Mail /> ratidaraselia.ui@gmail.com <span className="arrow"><Icon.Arrow size={11}/></span>
            </a>
            <a className="btn btn-ghost btn-tg" href="https://t.me/Bagratdaraselia" target="_blank" rel="noopener noreferrer">
              <Icon.Telegram /> Telegram <DiagArrow size={11} />
            </a>
          </div>
        </div>

        <div className="ident reveal">
          <Avatar size={44} />
          <div className="meta">
            <div className="n">Bagrat Daraselia</div>
            <div className="r">UI/UX Designer crafting clean & modern designs.</div>
          </div>
        </div>

        <div className="foot-cols reveal" style={{ animationDelay: '150ms' }}>
          <div className="col">
            <div className="h">/ SECTIONS</div>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#career">Career</a>
            <a href="#path">Path</a>
            <a href="#why-me">Why me</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="col">
            <div className="h">/ SOCIALS</div>
            <a href="https://dribbble.com/Ratidaraselia" target="_blank" rel="noopener noreferrer">Dribbble <span className="ic"><DiagArrow size={10} /></span></a>
            <a href="https://www.behance.net/ratidaraselia" target="_blank" rel="noopener noreferrer">Behance <span className="ic"><DiagArrow size={10} /></span></a>
            <a href="https://www.linkedin.com/in/rati-daraselia-7b9587214/" target="_blank" rel="noopener noreferrer">LinkedIn <span className="ic"><DiagArrow size={10} /></span></a>
            <a href="https://www.instagram.com/euhemerus.studio/" target="_blank" rel="noopener noreferrer">Instagram <span className="ic"><DiagArrow size={10} /></span></a>
            <a href="https://x.com/Rati538066" target="_blank" rel="noopener noreferrer">Twitter / X <span className="ic"><DiagArrow size={10} /></span></a>
          </div>
          <div className="col">
            <div className="h">{"/ ELSEWHERE"}</div>
            <a href="https://read.cv/" target="_blank" rel="noopener noreferrer">Read.cv <span className="ic"><DiagArrow size={10} /></span></a>
            <a href="#" onClick={(e) => { e.preventDefault(); setResumeOpen(true); }}>Resume PDF <span className="ic"><Icon.Download size={10}/></span></a>
          </div>
        </div>
      </div>

      <div className="signature reveal">
        <div className="sig-marquee">
          <div className="sig-track">
            <span className="sig-item">Let's set new standards together.</span>
            <span className="sig-item">Let's set new standards together.</span>
          </div>
        </div>
        <div className="sub">
          <span>© 2026 — All rights reserved</span>
          <span>© 2026</span>
          <span>Built from first principles · v2.4</span>
        </div>
      </div>
    </footer>
    </>
  );
}

Object.assign(window, { Nav, Hero, Marquee, UtilityRow, Projects, Career, Benefits, Footer });