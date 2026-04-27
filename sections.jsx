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
          <span className="design-pill">Digital Product Designer</span>
          <span className="pulse" />
          <span>Available · Q3 '26</span>
        </div>
      </div>
      <h1 className="hero-title">
        Bagrat <em>Daraselia.</em>
      </h1>
      <p className="thesis">Transforming complex product logic into surgical, scalable digital experiences — from dense SaaS dashboards to luxury editorial interfaces — with the precision of an engineer, the eye of an art director, and zero compromise.</p>
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
                <span className="design-pill">Digital Product Designer</span><span className="pulse" /><span>Available · Q3 '26</span>
              </div>
              <h1 className="hero-title" style={{ marginTop: 0 }}>
                Bagrat <em>Daraselia.</em>
              </h1>
              <p className="thesis">Transforming complex product logic into surgical, scalable digital experiences — from dense SaaS dashboards to luxury editorial interfaces — with the precision of an engineer, the eye of an art director, and zero compromise.</p>
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
  { id: 'axiom', name: 'Axiom', tag: 'SaaS · Analytics', date: 'Aug 2024', img: 'assets/axiom-thumbnail.jpg', link: 'https://dribbble.com/shots/27310731-Axiom-Overview-Dashboard' },
  { id: 'garder', name: 'Garderobe', tag: 'E-commerce · Fashion', date: 'Jan 2026', img: 'assets/garderobe-thumbnail-light.jpg', link: 'https://www.behance.net/gallery/247598239/GARDEROBE-UXUI-Luxury-Fashion-E-Commerce-Project' },
  { id: 'visionos', name: 'Vision OS: Google Home UI Concept', tag: 'Spatial · visionOS', date: 'May 2025', img: 'assets/visionOS-thumbnail.jpg', link: 'https://dribbble.com/shots/26049461-Vision-OS-Google-Home-UI-Concept', wide: true },
  { id: 'solvaer', name: 'Solvær', tag: 'Spatial · visionOS', date: 'Oct 2025', img: 'assets/solvaer-thumbnail-light.jpg', link: 'https://dribbble.com/shots/26724768-Solv-r-Catalog-of-Contemporary-Collectible-Design-Pieces' },
  { id: 'nora', name: 'Nora', tag: 'Agent · Productivity', date: 'Aug 2025', img: 'assets/nora-thumbnail-light.jpg', link: 'https://dribbble.com/shots/26741553-nora-Collaborative-Workspace-and-Knowledge-Management-Tool' },
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
      <a href={p.link} className="thumb" target="_blank" rel="noopener noreferrer" aria-label={`${p.name}, open external`}>
        <ProjectThumb project={p} variant={variant} />
        <span className="thumb-label">View case · {p.tag}</span>
        <span className="ext" aria-hidden><Icon.ArrowUpRight size={12} /></span>
      </a>
      <div>
        <div className="row">
          <div className="t">{p.name}</div>
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
  { role: 'Graphic Designer',       co: 'Cubicle — Design / Creative Agency',  when: 'Feb 2026 — Present',  type: 'Contract'      },
  { role: 'Visual Designer',        co: 'AQUA GEO — FMCG / Beverage',          when: 'Mar 2026 — Present',  type: 'Contract'      },
  { role: 'Product Designer',       co: 'Garderobe — Fashion / Retail',         when: '2025 — Present',      type: 'Contract'      },
  { role: 'UI/UX Designer',         co: 'Dribbble — Various Freelance Projects', when: '2021 — Present',      type: 'Freelance'     },
  { role: 'UI/UX Designer',         co: 'Premium Jewelry Brand — E-commerce',   when: '2024',                type: 'Freelance'     },
  { role: 'UI/UX Designer',         co: 'MASTERY™ — Early-Stage AI Startup',    when: '2022',                type: 'Equity' },
  { role: 'Sales Manager',          co: 'ALTA — Consumer Electronics',          when: '2023 — 2024',         type: 'Full-time'     },
  { role: 'Electronics Specialist', co: 'zoommer — Consumer Electronics',       when: '2021 — 2023',         type: 'Full-time'     }];

const GOOGLE_UX_COURSES = [
  { idx: '01', name: 'Foundations of User Experience (UX) Design' },
  { idx: '02', name: 'Start the UX Design Process: Empathize, Define, and Ideate' },
  { idx: '03', name: 'Build Wireframes and Low-Fidelity Prototypes' },
  { idx: '04', name: 'Conduct UX Research and Test Early Concepts' },
  { idx: '05', name: 'Create High-Fidelity Designs and Prototypes in Figma' },
  { idx: '06', name: 'Build Dynamic User Interfaces (UI) for Websites' },
  { idx: '07', name: 'Design a User Experience for Social Good & Prepare for Jobs' },
  { idx: '08', name: 'Accelerate Your Job Search with AI' }];

const EDU = [
  { role: <>Interaction Design<br/>Foundation</>, co: 'UX Research & Strategy', when: '2026', type: 'Certificate' },
  { role: 'Google UX Design Professional', co: 'Coursera · Google', when: '2026', type: 'Certificate', subs: GOOGLE_UX_COURSES },
  { role: 'Computer Science, B.Sc.', co: 'SANGU — St. Andrew\'s University', when: '2018 — 2022', type: 'Education' }];


function CoCell({ value }) {
  const sep = ' — ';
  const idx = value.indexOf(sep);
  if (idx === -1) return <div className="co">{value}</div>;
  return (
    <div className="co">
      <div style={{ color:'var(--fg-2)', lineHeight:1.2 }}>{value.slice(0, idx)} —</div>
      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, lineHeight:1.2 }}>{value.slice(idx + sep.length)}</div>
    </div>
  );
}

function SubList({ subs }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      container.querySelectorAll('.item-sub').forEach((row, i) => {
        row.style.animationDelay = `${i * 80}ms`;
        row.classList.add('sub-visible');
      });
      io.disconnect();
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    io.observe(container);
    return () => io.disconnect();
  }, []);
  return (
    <div className="item-subs" ref={ref}>
      {subs.map((s) =>
        <div className="item-sub" key={s.idx}>
          <span className="sub-name">{s.name}</span>
          <span className="sub-idx">[{s.idx}]</span>
        </div>
      )}
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

        <div style={{ height: 208 }} />

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
              {r.subs && <SubList subs={r.subs} />}
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Benefits ──────────────────────────────────────────────────────
const BENEFITS = [
  { icon: <Icon.Scale />, n: '01', t: 'Scalability', d: 'Multi-platform ecosystems engineered to grow — component architectures and token systems that hold structural integrity from landing page to full-scale admin console.' },
  { icon: <Icon.Crosshair />, n: '02', t: 'Precision', d: 'Mathematically governed output. Every grid unit, typographic ratio, and spacing decision is deliberate, systemic, and architecturally defensible — never eyeballed.' },
  { icon: <Icon.Terminal />, n: '03', t: 'Developer-Ready', d: 'Figma files built like codebases. Named components, bound variables, and auto-layout logic your engineers can implement without a single clarifying call.' },
  { icon: <Icon.Schema />, n: '04', t: 'Systemic Logic', d: 'Complex product flows made legible. User states, conditional paths, and edge cases — fully resolved and documented before implementation costs compound.' }];


function Benefits() {
  const gridRef = React.useRef(null);
  React.useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      grid.querySelectorAll('.benefit').forEach((card, i) => {
        card.style.animationDelay = `${i * 100}ms`;
        card.classList.add('benefit-visible');
      });
      io.disconnect();
    }, { threshold: 0.1 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="block" id="why-me">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Why me</h2>
          <div className="meta">[ 04 — Operating Principles ]</div>
        </div>
        <div className="benefits" ref={gridRef}>
          {BENEFITS.map((b) =>
            <div className="benefit" key={b.n}>
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
  varying vec2  vNDC;
  varying float vRand;

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

  // Divergence-free 3D curl — produces organic swirling flow
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
    // Continuous horizontal drift — calm tempo, slight per-particle variance
    float driftSpeed = 0.045 + aRand.y * 0.030;
    float boxW = 8.0;
    float x = aSeed.x + uTime * driftSpeed;
    x = mod(x + boxW * 0.5, boxW) - boxW * 0.5;

    vec3 basePos = vec3(x, aSeed.y, aSeed.z);

    // 3D Curl noise — two octaves, slow time evolution
    // Particles riding the same curl current naturally trace shared contour lines
    float kt = uTime * 0.05;
    vec3 c1 = curl(basePos * 0.42 + vec3(kt,        kt * 0.7,  kt * 1.3))        * 0.55;
    vec3 c2 = curl(basePos * 1.10 + vec3(kt * 1.6 + 2.1, kt * 1.4, kt * 1.9))    * 0.20;

    vec3 pos = basePos + c1 + c2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vNDC  = gl_Position.xy / gl_Position.w;
    vRand = aRand.x;
    gl_PointSize = 1.0;
  }
`;

const FRAG = `
  uniform float uTime;
  varying vec2  vNDC;
  varying float vRand;

  void main() {
    // Angular perimeter wobble — three octaves of trig noise around the rim,
    // drifting slowly so the boundary breathes and erodes organically
    float angle  = atan(vNDC.y, vNDC.x);
    float wobble = sin(angle * 3.0  + uTime * 0.10)        * 0.085
                 + sin(angle * 5.0  + uTime * 0.07 + 2.1)  * 0.050
                 + sin(angle * 11.0 + uTime * 0.16 + 4.3)  * 0.025;

    // Per-particle perimeter offset — each particle pushes its own fade
    // threshold in/out independently so the rim never reads as a single line
    float perVar = sin(uTime * (0.5 + vRand * 1.2) + vRand * 9.0) * 0.11;

    // Wide gradient mask — soft, eroded boundary instead of a sharp ellipse.
    // fadeStart at ~0.40 keeps a clear bright core; fadeEnd extends past 1.0
    // so wobble can pull the rim well past the canvas without revealing it
    float r = length(vNDC);
    float fadeStart = 0.40 + wobble * 0.6 + perVar * 0.4;
    float fadeEnd   = 0.95 + wobble + perVar;
    float mask = 1.0 - smoothstep(fadeStart, fadeEnd, r);

    // Per-particle shimmer
    float shim = 0.30 + 0.70 * (0.5 + 0.5 * sin(uTime * (0.7 + vRand * 3.2) + vRand * 6.2832));

    float final = mask * shim * 0.85;
    if (final <= 0.008) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, final);
  }
`;

function FooterCanvas() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let dispose = null;
    const THREE = window.THREE;
    if (!THREE) return;

    const initWebGL = () => {
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
        // X uniform — horizontal drift+wrap fills it evenly across the canvas
        seeds[i * 3]     = (Math.random() - 0.5) * 7.0;
        // Y triangular (sum of two uniforms) — denser at center, sparser at
        // extremes, so particles thin out organically toward top/bottom
        seeds[i * 3 + 1] = (Math.random() + Math.random() - 1.0) * 1.8;
        seeds[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
        rands[i * 4]     = Math.random();
        rands[i * 4 + 1] = Math.random();
        rands[i * 4 + 2] = Math.random();
        rands[i * 4 + 3] = Math.random();
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
      scene.add(cloud);

      // Pre-compile shaders in background so they don't block main thread on first render
      renderer.compile(scene, camera);

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

      // ── Pause RAF when footer scrolls off-screen ──────────────────
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

      dispose = () => {
        cancelAnimationFrame(rafId);
        io.disconnect(); ro.disconnect();
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    };

    const requestIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    
    const idleId = requestIdle(initWebGL);

    return () => {
      cancelIdle(idleId);
      if (dispose) dispose();
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
      <div className="wrap">
        <div className="footer-top">
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[ 05 — Get in Touch ]</div>
          <h2 className="reveal" style={{ animationDelay: '150ms' }}>Let's get in touch.</h2>
          <p className="reveal" style={{ animationDelay: '300ms' }}>Currently taking on a small number of Q3 engagements.
            I reply to every inbound within 24 hours.</p>
          <div className="footer-cta-zone reveal" style={{ animationDelay: '450ms' }}>
            <div className="cta-canvas-wrap" aria-hidden="true"><FooterCanvas /></div>
            <a className="btn btn-solid" href="mailto:ratidaraselia.ui@gmail.com">
              <Icon.Mail /> Get in touch <span className="arrow"><Icon.Arrow size={11}/></span>
            </a>
            <a className="btn btn-tg-footer" href="https://t.me/Bagratdaraselia" target="_blank" rel="noopener noreferrer">
              <Icon.Telegram /> Telegram <DiagArrow size={11} />
            </a>
          </div>
        </div>

        <div className="ident reveal">
          <Avatar size={44} />
          <div className="meta">
            <div className="n">Bagrat Daraselia</div>
            <div className="r">Digital Product Designer. Precision-engineered, aesthetically ruthless.</div>
          </div>
        </div>

        <div className="foot-cols reveal" style={{ animationDelay: '150ms' }}>
          <div className="col">
            <div className="h">/ SECTIONS</div>
            <a href="#about">About <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
            <a href="#portfolio">Portfolio <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
            <a href="#career">Career <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
            <a href="#path">Path <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
            <a href="#why-me">Why me <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
            <a href="#contact">Contact <span className="ic"><Icon.ArrowElbowDownLeft size={10} /></span></a>
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
            <a href="https://github.com/RatiDaraselia" target="_blank" rel="noopener noreferrer">GitHub <span className="ic"><DiagArrow size={10} /></span></a>
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