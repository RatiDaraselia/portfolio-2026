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
          <Icon.Telegram /> Telegram <span className="arrow"><Icon.ArrowUpRight size={11}/></span>
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
                  <Icon.Telegram /> Telegram <span className="arrow"><Icon.ArrowUpRight size={11}/></span>
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
          <h2 style={{ fontFamily: "\"Inter Tight\"" }}>Latest product visions</h2>
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
          <div className="meta" style={{ fontFamily: "\"JetBrains Mono\"" }}>[ 03 — Education & Certification ]</div>
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

function Footer() {
  const [resumeOpen, setResumeOpen] = React.useState(false);
  return (
    <>
    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    <footer id="contact" style={{ fontFamily: "Inter" }}>
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
              <Icon.Telegram /> Telegram <span className="arrow"><Icon.ArrowUpRight size={11}/></span>
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
            <a href="#">Dribbble <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
            <a href="#">Behance <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
            <a href="#">LinkedIn <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
            <a href="#">Instagram <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
            <a href="#">Twitter / X <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
          </div>
          <div className="col">
            <div className="h" style={{ fontFamily: "\"JetBrains Mono\"" }}>{"/ ELSEWHERE"}</div>
            <a href="#">Read.cv <span className="ic"><Icon.ArrowUpRight size={10}/></span></a>
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