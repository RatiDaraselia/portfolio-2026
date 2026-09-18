function useTheme() {
  const [theme, setTheme] = React.useState(
    () => typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") || "light"
  );
  React.useEffect(() => {
    const on = (e) => setTheme(e.detail.theme);
    window.addEventListener("themechange", on);
    return () => window.removeEventListener("themechange", on);
  }, []);
  return theme;
}
function ThemeToggle() {
  const theme = useTheme();
  const isLight = theme === "light";
  const next = isLight ? "dark" : "light";
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "nav-theme",
      onClick: () => window.__setTheme(next),
      "aria-label": `Switch to ${next} theme`,
      title: `Switch to ${next} theme`,
      "aria-pressed": isLight
    },
    isLight ? /* @__PURE__ */ React.createElement(Icon.Moon, { size: 15 }) : /* @__PURE__ */ React.createElement(Icon.Sun, { size: 15 })
  );
}
function DiagArrow({ size = 11 }) {
  return /* @__PURE__ */ React.createElement("span", { className: "diag-arrow" }, /* @__PURE__ */ React.createElement("span", { className: "da-out" }, /* @__PURE__ */ React.createElement(Icon.ArrowUpRight, { size })), /* @__PURE__ */ React.createElement("span", { className: "da-in" }, /* @__PURE__ */ React.createElement(Icon.ArrowUpRight, { size })));
}
function Nav({ active, onNav }) {
  const [cond, setCond] = React.useState(false);
  React.useEffect(() => {
    const on = () => setCond(window.scrollY > 60);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const items = [
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "career", label: "Career" },
    { id: "path", label: "Path" },
    { id: "why-me", label: "Why me" },
    { id: "contact", label: "Contact" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "nav-wrap" }, /* @__PURE__ */ React.createElement("div", { className: `nav-group ${cond ? "condensed" : ""}` }, /* @__PURE__ */ React.createElement("nav", { className: "nav", "aria-label": "Primary" }, items.map(
    (it) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: it.id,
        href: `#${it.id}`,
        className: `nav-link ${active === it.id ? "active" : ""}`,
        onClick: (e) => {
          e.preventDefault();
          onNav(it.id);
        }
      },
      it.label
    )
  )), /* @__PURE__ */ React.createElement("div", { className: "nav-theme-wrap" }, /* @__PURE__ */ React.createElement(ThemeToggle, null))));
}
function Avatar({ size = 40 }) {
  return /* @__PURE__ */ React.createElement("div", { className: "avatar", style: { width: size, height: size, flex: `0 0 ${size}px` }, "aria-hidden": true }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "assets/portrait.jpg",
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "60% 28%"
      }
    }
  ));
}
function Hero({ layout = "editorial" }) {
  const inner = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hero-top" }, /* @__PURE__ */ React.createElement(Avatar, { size: 88 }), /* @__PURE__ */ React.createElement("div", { className: "status" }, /* @__PURE__ */ React.createElement("span", { className: "design-pill" }, "Digital Product Designer"), /* @__PURE__ */ React.createElement("span", { className: "pulse" }), /* @__PURE__ */ React.createElement("span", null, "Available \xB7 Q3 '26"))), /* @__PURE__ */ React.createElement("h1", { className: "hero-title" }, "Bagrat ", /* @__PURE__ */ React.createElement("em", null, "Daraselia.")), /* @__PURE__ */ React.createElement("p", { className: "thesis" }, "Transforming complex product logic into surgical, scalable digital experiences \u2014 from dense SaaS dashboards to luxury editorial interfaces \u2014 with the precision of an engineer, the eye of an art director, and zero compromise."), /* @__PURE__ */ React.createElement("div", { className: "cta-row" }, /* @__PURE__ */ React.createElement("a", { className: "btn btn-solid", href: "mailto:ratidaraselia.ui@gmail.com" }, /* @__PURE__ */ React.createElement(Icon.Mail, null), " Get in touch ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, /* @__PURE__ */ React.createElement(Icon.Arrow, { size: 11 }))), /* @__PURE__ */ React.createElement("a", { className: "btn btn-ghost btn-tg", href: "https://t.me/Bagratdaraselia", target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement(Icon.Telegram, null), " Telegram ", /* @__PURE__ */ React.createElement(DiagArrow, { size: 11 }))));
  return /* @__PURE__ */ React.createElement("section", { className: "hero", "data-layout": layout, id: "about" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, layout === "split" ? /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement(Avatar, { size: 92 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "status", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { className: "design-pill" }, "Digital Product Designer"), /* @__PURE__ */ React.createElement("span", { className: "pulse" }), /* @__PURE__ */ React.createElement("span", null, "Available \xB7 Q3 '26")), /* @__PURE__ */ React.createElement("h1", { className: "hero-title", style: { marginTop: 0 } }, "Bagrat ", /* @__PURE__ */ React.createElement("em", null, "Daraselia.")), /* @__PURE__ */ React.createElement("p", { className: "thesis" }, "Transforming complex product logic into surgical, scalable digital experiences \u2014 from dense SaaS dashboards to luxury editorial interfaces \u2014 with the precision of an engineer, the eye of an art director, and zero compromise."), /* @__PURE__ */ React.createElement("div", { className: "cta-row" }, /* @__PURE__ */ React.createElement("a", { className: "btn btn-solid", href: "mailto:ratidaraselia.ui@gmail.com" }, /* @__PURE__ */ React.createElement(Icon.Mail, null), " Get in touch ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, /* @__PURE__ */ React.createElement(Icon.Arrow, { size: 11 }))), /* @__PURE__ */ React.createElement("a", { className: "btn btn-ghost btn-tg", href: "https://t.me/Bagratdaraselia", target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement(Icon.Telegram, null), " Telegram ", /* @__PURE__ */ React.createElement(DiagArrow, { size: 11 }))))) : inner));
}
function Marquee({ sep = "slash" }) {
  const items = [
    "Product Design",
    "Design Systems",
    "Vision OS",
    "SaaS Architecture",
    "Spatial UI",
    "Interaction Design",
    "Prototyping",
    "Figma Variables",
    "Information Design",
    "Motion",
    "Dev Handoff"
  ];
  const row = /* @__PURE__ */ React.createElement("div", { className: "chip" }, items.map(
    (it, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("span", null, it), /* @__PURE__ */ React.createElement("span", { className: "sep" }))
  ));
  return /* @__PURE__ */ React.createElement("div", { className: "marquee-sec", "aria-hidden": true }, /* @__PURE__ */ React.createElement("div", { className: "marquee-inner", "data-sep": sep }, row, row));
}
function UtilityRow() {
  const [t, setT] = React.useState(() => nowTbilisi());
  React.useEffect(() => {
    const id = setInterval(() => setT(nowTbilisi()), 1e3);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "utility-row" }, /* @__PURE__ */ React.createElement("span", null, "Tbilisi, Georgia \xB7 GMT+4"), /* @__PURE__ */ React.createElement("span", { className: "dots" }, /* @__PURE__ */ React.createElement("span", { className: "live-dot", "aria-hidden": true }), /* @__PURE__ */ React.createElement("span", null, t, " Local"))));
}
function nowTbilisi() {
  const d = /* @__PURE__ */ new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tbilisi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  return fmt.format(d);
}
const PROJECTS = [
  { id: "onyxbet", name: "OnyxBet", tag: "iGaming \xB7 Sportsbook", pill: "Concept", img: "assets/onyxbet-thumbnail-light.jpg", link: "https://dribbble.com/shots/27735762-OnyxBet-Mobile-Sportsbook" },
  { id: "garder", name: "Garderobe", tag: "E-commerce \xB7 Fashion", pill: "Case Study", img: "assets/garderobe-thumbnail-light.jpg", link: "https://www.behance.net/gallery/247598239/GARDEROBE-UXUI-Luxury-Fashion-E-Commerce-Project" },
  { id: "visionos", name: "Vision OS: Google Home UI Concept", tag: "Spatial \xB7 visionOS", pill: "Concept", img: "assets/visionOS-thumbnail.jpg", link: "https://dribbble.com/shots/26049461-Vision-OS-Google-Home-UI-Concept", wide: true },
  { id: "solvaer", name: "Solv\xE6r", tag: "Contemporary \xB7 ecommerce", pill: "Concept", img: "assets/solvaer-thumbnail-light.jpg", link: "https://dribbble.com/shots/26724768-Solv-r-Catalog-of-Contemporary-Collectible-Design-Pieces" },
  { id: "reading", name: "Digital Library iOS App", tag: "Publishing \xB7 E-Reader", pill: "Concept", img: "assets/reading-app-concept-ios-thumbnail.jpg", link: "https://dribbble.com/shots/26754431-Reading-App-Concept-IOS" },
  { id: "aquageo", name: "AquaGeo", tag: "Enterprise \xB7 GIS", pill: "Concept", glyph: "AQ", link: "#" },
  { id: "halcyon", name: "Halcyon", tag: "Fintech \xB7 Mobile", pill: "Concept", glyph: "HA", link: "#" }
];
function thumbSrc(project, theme) {
  return theme === "light" && project.imgLight ? project.imgLight : project.img;
}
function ProjectThumb({ project, variant, theme }) {
  if (project.img) {
    return /* @__PURE__ */ React.createElement("div", { className: "thumb-inner" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: thumbSrc(project, theme),
        alt: project.name,
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }
    ));
  }
  if (variant === "gradient") {
    return /* @__PURE__ */ React.createElement("div", { className: "thumb-inner" }, /* @__PURE__ */ React.createElement("div", { className: "thumb-grad" }, /* @__PURE__ */ React.createElement("div", { className: "glyph" }, project.glyph)));
  }
  if (variant === "block") {
    return /* @__PURE__ */ React.createElement("div", { className: "thumb-inner" }, /* @__PURE__ */ React.createElement("div", { className: "thumb-block" }, /* @__PURE__ */ React.createElement("div", { className: "glyph" }, project.glyph)));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "thumb-inner" }, /* @__PURE__ */ React.createElement("div", { className: "thumb-stripes" }, /* @__PURE__ */ React.createElement("div", { className: "glyph" }, project.glyph)));
}
function ProjectCard({ p, variant }) {
  const theme = useTheme();
  const ring = p.img ? " thumb-ring" : "";
  return /* @__PURE__ */ React.createElement("article", { className: `card reveal${p.wide ? " card-wide" : ""}` }, /* @__PURE__ */ React.createElement("a", { href: p.link, className: `thumb${ring}`, target: "_blank", rel: "noopener noreferrer", "aria-label": `${p.name}, open external` }, /* @__PURE__ */ React.createElement(ProjectThumb, { project: p, variant, theme }), /* @__PURE__ */ React.createElement("span", { className: "thumb-label" }, "View case \xB7 ", p.tag), /* @__PURE__ */ React.createElement("span", { className: "ext", "aria-hidden": true }, /* @__PURE__ */ React.createElement(Icon.ArrowUpRight, { size: 12 }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("div", { className: "t" }, p.name), /* @__PURE__ */ React.createElement("span", { className: "design-pill", style: { marginRight: 0 } }, p.pill)), /* @__PURE__ */ React.createElement("p", { className: "sub" }, p.tag)));
}
function Projects({ variant = "stripes", density = "regular", count = 4 }) {
  return /* @__PURE__ */ React.createElement("section", { className: "block", id: "portfolio" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("h2", null, "Latest product visions"), /* @__PURE__ */ React.createElement("div", { className: "meta" }, "[ 01 \u2014 Selected Works ]")), /* @__PURE__ */ React.createElement("div", { className: "project-grid", "data-density": density }, PROJECTS.slice(0, count).map(
    (p, i) => /* @__PURE__ */ React.createElement(ProjectCard, { key: p.id, p, variant })
  ))));
}
const CAREER = [
  { role: "Visual Designer", co: "AQUA GEO \u2014 FMCG / Beverage", when: "Mar 2026 \u2014 Present", type: "Contract" },
  { role: "Graphic Designer", co: "Cubicle \u2014 Design / Creative Agency", when: "Feb 2026 \u2014 Present", type: "Contract" },
  { role: "UI/UX Designer", co: "Dribbble \u2014 Various Freelance Projects", when: "Nov 2023 \u2014 Present", type: "Freelance" },
  { role: "Product Designer", co: "Garderobe \u2014 Fashion / Retail", when: "2025 \u2014 2026", type: "Contract" },
  { role: "UI/UX Designer", co: "Premium Jewelry Brand \u2014 E-commerce", when: "2024", type: "Freelance" },
  { role: "UI/UX Designer", co: "MASTERY\u2122 \u2014 Early-Stage AI Startup", when: "2022", type: "Equity" }
];
const GOOGLE_UX_COURSES = [
  { idx: "01", name: "Foundations of User Experience (UX) Design" },
  { idx: "02", name: "Start the UX Design Process: Empathize, Define, and Ideate" },
  { idx: "03", name: "Build Wireframes and Low-Fidelity Prototypes" },
  { idx: "04", name: "Conduct UX Research and Test Early Concepts" },
  { idx: "05", name: "Create High-Fidelity Designs and Prototypes in Figma" },
  { idx: "06", name: "Build Dynamic User Interfaces (UI) for Websites" },
  { idx: "07", name: "Design a User Experience for Social Good & Prepare for Jobs" },
  { idx: "08", name: "Accelerate Your Job Search with AI" }
];
const EDU = [
  { role: /* @__PURE__ */ React.createElement(React.Fragment, null, "Interaction Design", /* @__PURE__ */ React.createElement("br", null), "Foundation"), co: "UX Research & Strategy", when: "2026", type: "Certificate" },
  { role: "Google UX Design Professional", co: "Coursera \xB7 Google", when: "2026", type: "Certificate", subs: GOOGLE_UX_COURSES },
  { role: "Computer Science, B.Sc.", co: "SANGU \u2014 St. Andrew's University", when: "2018 \u2014 2022", type: "Education" }
];
function CoCell({ value }) {
  const sep = " \u2014 ";
  const idx = value.indexOf(sep);
  if (idx === -1) return /* @__PURE__ */ React.createElement("div", { className: "co" }, value);
  return /* @__PURE__ */ React.createElement("div", { className: "co" }, /* @__PURE__ */ React.createElement("div", { style: { color: "var(--fg-2)", lineHeight: 1.2 } }, value.slice(0, idx), " \u2014"), /* @__PURE__ */ React.createElement("div", { style: { color: "var(--fg-4)", fontSize: 12, lineHeight: 1.2 } }, value.slice(idx + sep.length)));
}
function SubList({ subs }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      container.querySelectorAll(".item-sub").forEach((row, i) => {
        row.style.animationDelay = `${i * 80}ms`;
        row.classList.add("sub-visible");
      });
      io.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    io.observe(container);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "item-subs", ref }, subs.map(
    (s) => /* @__PURE__ */ React.createElement("div", { className: "item-sub", key: s.idx }, /* @__PURE__ */ React.createElement("span", { className: "sub-name" }, s.name), /* @__PURE__ */ React.createElement("span", { className: "sub-idx" }, "[", s.idx, "]"))
  ));
}
function Career() {
  return /* @__PURE__ */ React.createElement("section", { className: "block", id: "career" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("h2", null, "Career"), /* @__PURE__ */ React.createElement("div", { className: "meta" }, "[ 02 \u2014 Professional Path ]")), /* @__PURE__ */ React.createElement("div", { className: "list", role: "list" }, CAREER.map(
    (r, i) => /* @__PURE__ */ React.createElement("div", { className: "item reveal", role: "listitem", key: i }, /* @__PURE__ */ React.createElement("div", { className: "role" }, r.role), /* @__PURE__ */ React.createElement(CoCell, { value: r.co }), /* @__PURE__ */ React.createElement("div", { className: "when" }, r.when), /* @__PURE__ */ React.createElement("div", { className: "type" }, r.type))
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 } }, /* @__PURE__ */ React.createElement("a", { className: "btn btn-sm", href: "mailto:ratidaraselia.ui@gmail.com" }, /* @__PURE__ */ React.createElement(Icon.Mail, null), " Get in touch ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, /* @__PURE__ */ React.createElement(Icon.Arrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { className: "btn btn-sm btn-tg", href: "https://t.me/Bagratdaraselia", target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement(Icon.Telegram, null), " Telegram ", /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("div", { style: { height: 208 } }), /* @__PURE__ */ React.createElement("div", { id: "path", className: "section-head reveal" }, /* @__PURE__ */ React.createElement("h2", null, "Path"), /* @__PURE__ */ React.createElement("div", { className: "meta" }, "[ 03 \u2014 Education & Certification ]")), /* @__PURE__ */ React.createElement("div", { className: "list", role: "list" }, EDU.map(
    (r, i) => /* @__PURE__ */ React.createElement("div", { className: "item reveal", role: "listitem", key: i }, /* @__PURE__ */ React.createElement("div", { className: "role" }, r.role), /* @__PURE__ */ React.createElement(CoCell, { value: r.co }), /* @__PURE__ */ React.createElement("div", { className: "when" }, r.when), /* @__PURE__ */ React.createElement("div", { className: "type" }, r.type), r.subs && /* @__PURE__ */ React.createElement(SubList, { subs: r.subs }))
  ))));
}
const BENEFITS = [
  { icon: /* @__PURE__ */ React.createElement(Icon.Scale, null), n: "01", t: "Scalability", d: "Multi-platform ecosystems engineered to grow \u2014 component architectures and token systems that hold structural integrity from landing page to full-scale admin console." },
  { icon: /* @__PURE__ */ React.createElement(Icon.Crosshair, null), n: "02", t: "Precision", d: "Mathematically governed output. Every grid unit, typographic ratio, and spacing decision is deliberate, systemic, and architecturally defensible \u2014 never eyeballed." },
  { icon: /* @__PURE__ */ React.createElement(Icon.Terminal, null), n: "03", t: "Developer-Ready", d: "Figma files built like codebases. Named components, bound variables, and auto-layout logic your engineers can implement without a single clarifying call." },
  { icon: /* @__PURE__ */ React.createElement(Icon.Schema, null), n: "04", t: "Systemic Logic", d: "Complex product flows made legible. User states, conditional paths, and edge cases \u2014 fully resolved and documented before implementation costs compound." }
];
function Benefits() {
  const gridRef = React.useRef(null);
  React.useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      grid.querySelectorAll(".benefit").forEach((card, i) => {
        card.style.animationDelay = `${i * 100}ms`;
        card.classList.add("benefit-visible");
      });
      io.disconnect();
    }, { threshold: 0.1 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("section", { className: "block", id: "why-me" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "section-head reveal" }, /* @__PURE__ */ React.createElement("h2", null, "Why me"), /* @__PURE__ */ React.createElement("div", { className: "meta" }, "[ 04 \u2014 Operating Principles ]")), /* @__PURE__ */ React.createElement("div", { className: "benefits", ref: gridRef }, BENEFITS.map(
    (b) => /* @__PURE__ */ React.createElement("div", { className: "benefit", key: b.n }, /* @__PURE__ */ React.createElement("div", { className: "num" }, b.n), /* @__PURE__ */ React.createElement("div", { className: "icon" }, b.icon), /* @__PURE__ */ React.createElement("h3", null, b.t), /* @__PURE__ */ React.createElement("p", null, b.d))
  ))));
}
function ResumeModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return /* @__PURE__ */ React.createElement("div", { className: "resume-modal-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "resume-modal-inner", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "resume-modal-frame" }, /* @__PURE__ */ React.createElement("iframe", { src: "assets/CV_EN.pdf", title: "Resume Preview" })), /* @__PURE__ */ React.createElement("div", { className: "resume-modal-hint" }, "Collapse the Document \u2014 ", /* @__PURE__ */ React.createElement("kbd", { className: "resume-kbd" }, "ESC"))));
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

  // Divergence-free 3D curl \u2014 produces organic swirling flow
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
    // Continuous horizontal drift \u2014 calm tempo, slight per-particle variance
    float driftSpeed = 0.045 + aRand.y * 0.030;
    float boxW = 8.0;
    float x = aSeed.x + uTime * driftSpeed;
    x = mod(x + boxW * 0.5, boxW) - boxW * 0.5;

    vec3 basePos = vec3(x, aSeed.y, aSeed.z);

    // 3D Curl noise \u2014 two octaves, slow time evolution
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
  uniform vec3  uColor;
  uniform float uAlpha;
  varying vec2  vNDC;
  varying float vRand;

  void main() {
    // Angular perimeter wobble \u2014 three octaves of trig noise around the rim,
    // drifting slowly so the boundary breathes and erodes organically
    float angle  = atan(vNDC.y, vNDC.x);
    float wobble = sin(angle * 3.0  + uTime * 0.10)        * 0.085
                 + sin(angle * 5.0  + uTime * 0.07 + 2.1)  * 0.050
                 + sin(angle * 11.0 + uTime * 0.16 + 4.3)  * 0.025;

    // Per-particle perimeter offset \u2014 each particle pushes its own fade
    // threshold in/out independently so the rim never reads as a single line
    float perVar = sin(uTime * (0.5 + vRand * 1.2) + vRand * 9.0) * 0.11;

    // Wide gradient mask \u2014 soft, eroded boundary instead of a sharp ellipse.
    // fadeStart at ~0.40 keeps a clear bright core; fadeEnd extends past 1.0
    // so wobble can pull the rim well past the canvas without revealing it
    float r = length(vNDC);
    float fadeStart = 0.40 + wobble * 0.6 + perVar * 0.4;
    float fadeEnd   = 0.95 + wobble + perVar;
    float mask = 1.0 - smoothstep(fadeStart, fadeEnd, r);

    // Per-particle shimmer
    float shim = 0.30 + 0.70 * (0.5 + 0.5 * sin(uTime * (0.7 + vRand * 3.2) + vRand * 6.2832));

    float final = mask * shim * uAlpha;
    if (final <= 0.008) discard;
    gl_FragColor = vec4(uColor, final);
  }
`;
function readFieldColor() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
  let m = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (m) {
    const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }
  m = raw.match(/[\d.]+/g);
  if (m && m.length >= 3) return [m[0] / 255, m[1] / 255, m[2] / 255];
  return [1, 1, 1];
}
function fieldAlpha(theme) {
  return theme === "light" ? 0.5 : 0.85;
}
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
      const N = 1e5;
      const seeds = new Float32Array(N * 3);
      const rands = new Float32Array(N * 4);
      for (let i = 0; i < N; i++) {
        seeds[i * 3] = (Math.random() - 0.5) * 7;
        seeds[i * 3 + 1] = (Math.random() + Math.random() - 1) * 1.8;
        seeds[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
        rands[i * 4] = Math.random();
        rands[i * 4 + 1] = Math.random();
        rands[i * 4 + 2] = Math.random();
        rands[i * 4 + 3] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 4));
      const theme0 = document.documentElement.getAttribute("data-theme") || "light";
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(...readFieldColor()) },
          uAlpha: { value: fieldAlpha(theme0) }
        },
        transparent: true,
        depthWrite: false,
        blending: theme0 === "light" ? THREE.NormalBlending : THREE.AdditiveBlending
      });
      const cloud = new THREE.Points(geo, mat);
      cloud.frustumCulled = false;
      scene.add(cloud);
      renderer.compile(scene, camera);
      const resize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      let rafId = null, running = false, t = 0;
      const tick = () => {
        rafId = requestAnimationFrame(tick);
        t += 8e-3;
        mat.uniforms.uTime.value = t;
        renderer.render(scene, camera);
      };
      const footer = canvas.closest("footer");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !running) {
            running = true;
            rafId = requestAnimationFrame(tick);
          } else if (!e.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(rafId);
          }
        });
      }, { threshold: 0.05 });
      if (footer) io.observe(footer);
      const onTheme = (e) => {
        const t2 = e.detail && e.detail.theme || "light";
        mat.uniforms.uColor.value.set(...readFieldColor());
        mat.uniforms.uAlpha.value = fieldAlpha(t2);
        mat.blending = t2 === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
        mat.needsUpdate = true;
        if (!running) renderer.render(scene, camera);
      };
      window.addEventListener("themechange", onTheme);
      dispose = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("themechange", onTheme);
        io.disconnect();
        ro.disconnect();
        renderer.dispose();
        geo.dispose();
        mat.dispose();
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
  return /* @__PURE__ */ React.createElement("canvas", { ref, className: "footer-canvas", "aria-hidden": "true" });
}
function Footer() {
  const [resumeOpen, setResumeOpen] = React.useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, resumeOpen && /* @__PURE__ */ React.createElement(ResumeModal, { onClose: () => setResumeOpen(false) }), /* @__PURE__ */ React.createElement("footer", { id: "contact" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "footer-top" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow reveal", style: { marginBottom: 36 } }, "[ 05 \u2014 Get in Touch ]"), /* @__PURE__ */ React.createElement("h2", { className: "reveal" }, "Let's get in touch."), /* @__PURE__ */ React.createElement("p", { className: "reveal" }, "Currently taking on a small number of Q3 engagements. I reply to every inbound within 24 hours."), /* @__PURE__ */ React.createElement("div", { className: "footer-cta-zone reveal" }, /* @__PURE__ */ React.createElement("div", { className: "cta-canvas-wrap", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(FooterCanvas, null)), /* @__PURE__ */ React.createElement("a", { className: "btn btn-solid", href: "mailto:ratidaraselia.ui@gmail.com" }, /* @__PURE__ */ React.createElement(Icon.Mail, null), " Get in touch ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, /* @__PURE__ */ React.createElement(Icon.Arrow, { size: 11 }))), /* @__PURE__ */ React.createElement("a", { className: "btn btn-tg-footer", href: "https://t.me/Bagratdaraselia", target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement(Icon.Telegram, null), " Telegram ", /* @__PURE__ */ React.createElement(DiagArrow, { size: 11 })))), /* @__PURE__ */ React.createElement("div", { className: "ident reveal" }, /* @__PURE__ */ React.createElement(Avatar, { size: 44 }), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, "Bagrat Daraselia"), /* @__PURE__ */ React.createElement("div", { className: "r" }, "Digital Product Designer. Precision-engineered, aesthetically ruthless."))), /* @__PURE__ */ React.createElement("div", { className: "foot-cols reveal" }, /* @__PURE__ */ React.createElement("div", { className: "col" }, /* @__PURE__ */ React.createElement("div", { className: "h" }, "/ SECTIONS"), /* @__PURE__ */ React.createElement("a", { href: "#about" }, "About ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#portfolio" }, "Portfolio ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#career" }, "Career ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#path" }, "Path ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#why-me" }, "Why me ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#contact" }, "Contact ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.ArrowElbowDownLeft, { size: 10 })))), /* @__PURE__ */ React.createElement("div", { className: "col" }, /* @__PURE__ */ React.createElement("div", { className: "h" }, "/ SOCIALS"), /* @__PURE__ */ React.createElement("a", { href: "https://dribbble.com/Ratidaraselia", target: "_blank", rel: "noopener noreferrer" }, "Dribbble ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "https://www.behance.net/ratidaraselia", target: "_blank", rel: "noopener noreferrer" }, "Behance ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "https://www.linkedin.com/in/rati-daraselia-7b9587214/", target: "_blank", rel: "noopener noreferrer" }, "LinkedIn ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/euhemerus.studio/", target: "_blank", rel: "noopener noreferrer" }, "Instagram ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "https://x.com/Rati538066", target: "_blank", rel: "noopener noreferrer" }, "Twitter / X ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 })))), /* @__PURE__ */ React.createElement("div", { className: "col" }, /* @__PURE__ */ React.createElement("div", { className: "h" }, "/ ELSEWHERE"), /* @__PURE__ */ React.createElement("a", { href: "https://github.com/RatiDaraselia", target: "_blank", rel: "noopener noreferrer" }, "GitHub ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "https://read.cv/", target: "_blank", rel: "noopener noreferrer" }, "Read.cv ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(DiagArrow, { size: 10 }))), /* @__PURE__ */ React.createElement("a", { href: "#", onClick: (e) => {
    e.preventDefault();
    setResumeOpen(true);
  } }, "Resume PDF ", /* @__PURE__ */ React.createElement("span", { className: "ic" }, /* @__PURE__ */ React.createElement(Icon.Download, { size: 10 })))))), /* @__PURE__ */ React.createElement("div", { className: "signature reveal" }, /* @__PURE__ */ React.createElement("div", { className: "sig-marquee" }, /* @__PURE__ */ React.createElement("div", { className: "sig-track" }, /* @__PURE__ */ React.createElement("span", { className: "sig-item" }, "Let's set new standards together."), /* @__PURE__ */ React.createElement("span", { className: "sig-item" }, "Let's set new standards together."))), /* @__PURE__ */ React.createElement("div", { className: "sub" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 \u2014 All rights reserved"), /* @__PURE__ */ React.createElement("span", null, "BAGRATTI.CO"), /* @__PURE__ */ React.createElement("span", null, "ENGINEERED WITH PRECISION \u2014 V2.4")))));
}
Object.assign(window, { Nav, Hero, Marquee, UtilityRow, Projects, Career, Benefits, Footer, ThemeToggle, useTheme });
