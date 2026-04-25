// Tiny inline icon set — thin strokes to match the editorial style
const Icon = {
  Arrow: ({size=12}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  ),
  ArrowUpRight: ({size=12}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 11L11 5M6 5h5v5"/>
    </svg>
  ),
  Mail: ({size=13}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 5l5.5 4 5.5-4"/>
    </svg>
  ),
  Telegram: ({size=13}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M2 7.5l12-4-2 10-4-2-2 2.5L6 10"/>
    </svg>
  ),
  Copy: ({size=12}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="5" y="5" width="8" height="8" rx="1.2"/><path d="M3 10V3.5h7"/>
    </svg>
  ),
  Check: ({size=12}) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 8.5l3 3L13 5"/>
    </svg>
  ),
  // Benefit icons — all thin line
  Scale: ({size=22}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  Crosshair: ({size=22}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="8"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>
    </svg>
  ),
  Terminal: ({size=22}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 9l3 3-3 3M13 15h4"/>
    </svg>
  ),
  Schema: ({size=22}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <path d="M12 7v4M12 11L6 17M12 11l6 6"/>
    </svg>
  ),
  // Social glyphs (simple monograms)
  Dribbble: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="10" cy="10" r="8"/><path d="M3 7c4 0 10 0 14 6M2.5 13c4-3 10-3 14 3M7 2.5c2 3 4 10 2 15"/>
    </svg>
  ),
  Behance: ({size=14}) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 5h4.5a2 2 0 010 4H2zM2 9h5a2 2 0 010 4H2zM12 9h5a2 2 0 01-5 0v3a2 2 0 002 2h3M13 6h3"/>
    </svg>
  ),
};

Object.assign(window, { Icon });
