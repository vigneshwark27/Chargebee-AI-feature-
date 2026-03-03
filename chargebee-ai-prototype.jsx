import { useState, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, stroke = "currentColor", fill = "none", strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const Icons = {
  dashboard:     () => <Icon d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"]} />,
  customers:     () => <Icon d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]} />,
  subscriptions: () => <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />,
  invoices:      () => <Icon d={["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"]} />,
  products:      () => <Icon d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z","M3 6h18","M16 10a4 4 0 0 1-8 0"]} />,
  contracts:     () => <Icon d={["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2","M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2","M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2","M12 12h.01","M12 16h.01"]} />,
  search:        () => <Icon d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0" />,
  bell:          () => <Icon d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]} />,
  upload:        () => <Icon d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"]} />,
  warning:       () => <Icon d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"]} stroke="#d97706" />,
  warningRed:    () => <Icon d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"]} stroke="#dc2626" />,
  check:         () => <Icon d="M20 6L9 17l-5-5" />,
  close:         () => <Icon d="M18 6L6 18M6 6l12 12" />,
  file:          () => <Icon d={["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6"]} />,
  sparkle:       () => <Icon d={["M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z","M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"]} fill="currentColor" stroke="none" />,
  externalLink:  () => <Icon d={["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6","M15 3h6v6","M10 14L21 3"]} />,
  plus:          () => <Icon d="M12 5v14M5 12h14" />,
  arrowRight:    () => <Icon d="M5 12h14M12 5l7 7-7 7" />,
  dot:           () => <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>,
  info:          () => <Icon d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 16v-4","M12 8h.01"]} />,
  eye:           () => <Icon d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"]} />,
  chevronRight:  () => <Icon d="M9 18l6-6-6-6" />,
  settings:      () => <Icon d={["M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z","M12 15a3 3 0 100-6 3 3 0 000 6z"]} />,
  panelRight:    () => <Icon d={["M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z","M15 3v18"]} />,
  calendar:      () => <Icon d={["M8 2v4","M16 2v4","M3 10h18","M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"]} />,
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --sw:224px;--hh:56px;--dw:440px;
    --navy:#0f172a;--navy-mid:#1e293b;--slate:#64748b;--slate-lt:#94a3b8;
    --border:#e2e8f0;--bg:#f8fafc;--white:#fff;
    --primary:#2563eb;--primary-lt:#eff6ff;--primary-dk:#1d4ed8;
    --amber:#d97706;--amber-bg:#fffbeb;--amber-bd:#fde68a;
    --red:#dc2626;--green:#059669;--green-bg:#ecfdf5;
    --ai:#0ea5e9;--ai-bg:#f0f9ff;
    --font:'DM Sans',sans-serif;--mono:'DM Mono',monospace;
    --r:8px;--rl:12px;
    --sh:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);
    --sxl:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.06);
  }
  body{font-family:var(--font);background:var(--bg);color:var(--navy);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}

  /* ── Sidebar ── */
  .sb{position:fixed;top:0;left:0;width:var(--sw);height:100vh;background:var(--navy);display:flex;flex-direction:column;z-index:50}
  .sb-logo{padding:0 20px;height:var(--hh);display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.06)}
  .lm{width:28px;height:28px;background:var(--primary);border-radius:7px;display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700}
  .ln{color:white;font-weight:600;font-size:15px;letter-spacing:-.3px;line-height:1.2}
  .ln span{color:var(--slate-lt);font-weight:400;font-size:11px;display:block}
  .sb-nav{flex:1;padding:12px 10px;overflow-y:auto}
  .nav-sec{font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);padding:14px 10px 6px}
  .ni{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;color:#94a3b8;cursor:pointer;font-size:13.5px;font-weight:500;transition:all .15s;user-select:none}
  .ni:hover{background:rgba(255,255,255,.06);color:white}
  .ni.active{background:rgba(37,99,235,.2);color:#93c5fd}
  .new-tag{font-size:9px;font-weight:700;text-transform:uppercase;background:var(--primary);color:white;padding:1px 5px;border-radius:3px;margin-left:auto}
  .sb-foot{padding:12px 10px;border-top:1px solid rgba(255,255,255,.06)}
  .user-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;cursor:pointer}
  .user-row:hover{background:rgba(255,255,255,.06)}
  .ava{width:28px;height:28px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0}
  .un{color:white;font-size:13px;font-weight:500}
  .ur{color:var(--slate-lt);font-size:11px}

  /* ── Header ── */
  .hdr{position:fixed;top:0;left:var(--sw);right:0;height:var(--hh);background:white;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:16px;z-index:40;transition:right .28s cubic-bezier(.4,0,.2,1)}
  .hdr.shifted{right:var(--dw)}
  .hdr-search{flex:1;max-width:320px;display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r);padding:7px 12px}
  .hdr-search input{border:none;background:none;outline:none;font-size:13px;font-family:var(--font);color:var(--navy);width:100%}
  .hdr-search input::placeholder{color:var(--slate-lt)}
  .hdr-r{margin-left:auto;display:flex;align-items:center;gap:8px}
  .ibu{width:34px;height:34px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:var(--slate);cursor:pointer;border:1px solid var(--border);background:white;transition:all .15s;position:relative}
  .ibu:hover{background:var(--bg);color:var(--navy)}
  .nd{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--red);border-radius:50%;border:1.5px solid white}
  .hdr-ava{width:32px;height:32px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;cursor:pointer}

  /* ── Main ── */
  .main{margin-left:var(--sw);margin-top:var(--hh);min-height:calc(100vh - var(--hh));transition:margin-right .28s cubic-bezier(.4,0,.2,1)}
  .main.shifted{margin-right:var(--dw)}
  .page{padding:28px 32px}
  .ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}
  .pt{font-size:20px;font-weight:700;letter-spacing:-.4px}
  .ps{font-size:13px;color:var(--slate);margin-top:2px}
  .bc{font-size:12px;color:var(--slate);margin-bottom:8px;display:flex;align-items:center;gap:5px}
  .bcl{color:var(--primary);cursor:pointer}
  .bcl:hover{text-decoration:underline}

  /* ── Buttons ── */
  .btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:var(--r);font-size:13.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:var(--font);white-space:nowrap}
  .bp{background:var(--primary);color:white}.bp:hover{background:var(--primary-dk)}
  .bo{background:white;color:var(--navy);border:1px solid var(--border)}.bo:hover{background:var(--bg)}
  .bg{background:transparent;color:var(--slate);border:none}.bg:hover{background:var(--bg);color:var(--navy)}
  .bsu{background:var(--green);color:white}.bsu:hover{background:#047857}
  .bsm{padding:5px 11px;font-size:12.5px}
  .blg{padding:10px 20px;font-size:14px}
  .btn:disabled{opacity:.5;cursor:not-allowed}

  /* View PDF button — compact, placed inline */
  .btn-view-pdf{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid #bfdbfe;background:var(--primary-lt);color:var(--primary);transition:all .15s;font-family:var(--font);white-space:nowrap}
  .btn-view-pdf:hover{background:#dbeafe}
  .btn-view-pdf.active{background:var(--primary);color:white;border-color:var(--primary)}

  /* ── Badges ── */
  .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:100px;font-size:11.5px;font-weight:600}
  .b-blue{background:var(--primary-lt);color:var(--primary)}
  .b-amb{background:var(--amber-bg);color:var(--amber)}
  .b-grn{background:var(--green-bg);color:var(--green)}
  .b-draft{background:#fef9c3;color:#92400e;border:1px solid var(--amber-bd)}
  .b-act{background:var(--green-bg);color:var(--green);border:1px solid #a7f3d0}

  /* ── Cards ── */
  .card{background:white;border:1px solid var(--border);border-radius:var(--rl)}
  .ch{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .cb{padding:20px}
  .ct{font-size:14px;font-weight:600}
  .cd{font-size:12.5px;color:var(--slate);margin-top:2px}

  /* ── Table ── */
  .tw{overflow-x:auto}
  table{width:100%;border-collapse:collapse}
  thead th{font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--slate);padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
  tbody td{padding:13px 16px;border-bottom:1px solid #f1f5f9;font-size:13.5px;vertical-align:middle}
  tbody tr:last-child td{border-bottom:none}
  tbody tr{transition:background .1s;cursor:pointer}
  tbody tr:hover{background:#f8fafc}

  /* ── Forms ── */
  .fg{margin-bottom:16px}
  .fl{display:block;font-size:12.5px;font-weight:600;color:var(--navy-mid);margin-bottom:5px}
  .fl .req{color:var(--red);margin-left:2px}
  .fi{width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:var(--r);font-size:13.5px;font-family:var(--font);color:var(--navy);background:white;outline:none;transition:border .15s,box-shadow .15s}
  .fi:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
  .fi.warn{border-color:var(--amber);background:var(--amber-bg)}
  .fi.warn:focus{box-shadow:0 0 0 3px rgba(217,119,6,.08)}
  .fi.err{border-color:var(--red)}
  .fi.miss{border-color:var(--red);border-style:dashed;background:#fef2f2}
  .fsel{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:32px;cursor:pointer}
  .fw{display:flex;align-items:flex-start;gap:6px;background:var(--amber-bg);border:1px solid var(--amber-bd);border-radius:5px;padding:6px 10px;margin-top:5px;font-size:12px;color:#92400e}
  .fwr{display:flex;align-items:flex-start;gap:6px;background:#fef2f2;border:1px solid #fecaca;border-radius:5px;padding:6px 10px;margin-top:5px;font-size:12px;color:#991b1b}
  .fe{font-size:12px;color:var(--red);margin-top:4px}
  .fh{font-size:12px;color:var(--slate);margin-top:4px}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}

  /* ── Section cards ── */
  .sc{background:white;border:1px solid var(--border);border-radius:var(--rl);margin-bottom:14px}
  .stl{font-size:13px;font-weight:700;padding:12px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;color:var(--navy)}
  .stl-left{display:flex;align-items:center;gap:8px}
  .sbdy{padding:18px}

  /* ── AI chip / notice ── */
  .ai-chip{display:inline-flex;align-items:center;gap:5px;background:var(--ai-bg);border:1px solid #bae6fd;border-radius:100px;padding:3px 9px;font-size:11px;font-weight:600;color:var(--ai)}
  .ai-notice{background:var(--ai-bg);border:1px solid #bae6fd;border-radius:var(--r);padding:10px 14px;display:flex;align-items:flex-start;gap:9px;font-size:12.5px;color:#0369a1;margin-bottom:16px}
  .draft-notice{background:#fef9c3;border:1px solid var(--amber-bd);border-radius:var(--r);padding:10px 14px;display:flex;align-items:center;gap:9px;font-size:12.5px;color:#92400e;font-weight:500;margin-bottom:16px}

  /* ── Stats ── */
  .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
  .stc{background:white;border:1px solid var(--border);border-radius:var(--rl);padding:18px 20px}
  .slb{font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--slate);margin-bottom:8px}
  .sv{font-size:26px;font-weight:700;letter-spacing:-.8px}
  .sd{font-size:12px;color:var(--slate);margin-top:4px}
  .sd.up{color:var(--green)}

  /* ── Detail page ── */
  .dg{display:grid;grid-template-columns:2fr 1fr;gap:20px}
  .dr{display:flex;justify-content:space-between;align-items:baseline;padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:13.5px}
  .dr:last-child{border-bottom:none}
  .dk{color:var(--slate)}.dv{font-weight:600}
  .cref{background:var(--bg);border:1px solid var(--border);border-radius:var(--r);padding:12px 14px;display:flex;align-items:center;gap:12px}
  .cref-icon{width:34px;height:34px;background:#fee2e2;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#dc2626;flex-shrink:0}

  /* ── Modal ── */
  .mo{position:fixed;inset:0;background:rgba(15,23,42,.45);backdrop-filter:blur(2px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn .15s ease}
  .md{background:white;border-radius:var(--rl);box-shadow:var(--sxl);width:520px;max-width:90vw;overflow:hidden;animation:slideUp .2s ease}
  .mh{padding:18px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .mtl{font-size:16px;font-weight:700;letter-spacing:-.3px}
  .mb{padding:22px 24px}
  .mf{padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}

  /* ── Dropzone ── */
  .dz{border:2px dashed var(--border);border-radius:var(--rl);padding:32px 24px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg)}
  .dz:hover,.dz.over{border-color:var(--primary);background:var(--primary-lt)}
  .dz-ico{width:44px;height:44px;background:var(--primary-lt);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:var(--primary)}
  .dz-file{display:flex;align-items:center;gap:10px;background:var(--primary-lt);border:1px solid #bfdbfe;border-radius:var(--r);padding:10px 14px;margin-top:10px}
  .dz-name{font-size:13px;font-weight:600;color:var(--primary);flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  /* ── Loading ── */
  .lw{display:flex;flex-direction:column;align-items:center;padding:44px 24px;gap:14px}
  .spin{width:38px;height:38px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}
  .spin-sm{width:13px;height:13px;border:2px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite;display:inline-block}
  .pb{width:220px;height:3px;background:var(--border);border-radius:2px;overflow:hidden}
  .pf{height:100%;background:var(--primary);border-radius:2px;animation:progress 2.5s ease-in-out forwards}

  /* ── PDF Drawer ── */
  .pdf-drawer{
    position:fixed;top:var(--hh);right:0;
    width:var(--dw);height:calc(100vh - var(--hh));
    background:white;border-left:1px solid var(--border);
    box-shadow:-6px 0 24px rgba(15,23,42,.08);
    z-index:38;display:flex;flex-direction:column;
    transform:translateX(100%);
    transition:transform .28s cubic-bezier(.4,0,.2,1);
  }
  .pdf-drawer.open{transform:translateX(0)}
  .pd-hdr{padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:10px;flex-shrink:0;background:white}
  .pd-title{font-size:12.5px;font-weight:600;color:var(--navy);line-height:1.3}
  .pd-meta{font-size:11px;color:var(--slate);margin-top:2px}
  .pd-legend{padding:7px 14px;border-bottom:1px solid var(--border);background:#fafafa;display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex-shrink:0}
  .li{display:flex;align-items:center;gap:4px;font-size:10.5px;color:var(--slate)}
  .ld{width:9px;height:9px;border-radius:2px;flex-shrink:0}
  .pd-body{flex:1;overflow-y:auto;padding:12px;background:#dde3ea}
  .pdf-pg{background:white;border-radius:6px;box-shadow:var(--sh);padding:24px 22px;font-size:11.5px;line-height:1.9;color:#374151;font-family:'Georgia',serif}

  /* PDF highlight classes */
  .hp{padding:1px 3px;border-radius:2px;cursor:help}
  .hp-p{background:#bbf7d0}
  .hp-d{background:#bfdbfe}
  .hp-q{background:#f5d0fe}
  .hp-s{background:#fef08a;outline:1.5px dashed #f59e0b;outline-offset:1px}
  .hp-m{background:#fecaca;outline:1.5px dashed #ef4444;outline-offset:1px}

  /* ── Success ── */
  .si{width:60px;height:60px;background:var(--green-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--green)}

  /* ── Divider ── */
  .div{height:1px;background:var(--border);margin:18px 0}
  .link{color:var(--primary);cursor:pointer}
  .link:hover{text-decoration:underline}

  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes progress{from{width:0}to{width:88%}}
  .fi-in{animation:fadeIn .2s ease}
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const CONTRACTS = [
  { id:1, name:"Acme Corp – Enterprise Agreement Q4 2025.pdf", customer:"Acme Corp",        status:"Completed",    uploaded:"Feb 28, 2026", subId:"SUB-4821" },
  { id:2, name:"TechNova – Growth Plan Amendment.pdf",         customer:"TechNova Inc.",     status:"Draft Created",uploaded:"Mar 2, 2026",  subId:null },
  { id:3, name:"BlueSky Solutions – Annual Contract.pdf",      customer:"BlueSky Solutions", status:"Processing",   uploaded:"Mar 4, 2026",  subId:null },
  { id:4, name:"GlobalRetail – Platform Subscription 2026.pdf",customer:"—",                status:"Draft Created",uploaded:"Mar 3, 2026",  subId:null },
];
const NAV = [
  { key:"dashboard",     label:"Dashboard",         icon:"dashboard" },
  { key:"customers",     label:"Customers",          icon:"customers" },
  { key:"subscriptions", label:"Subscriptions",      icon:"subscriptions" },
  { key:"invoices",      label:"Invoices",            icon:"invoices" },
  { key:"products",      label:"Products & Catalog",  icon:"products" },
  { key:"contracts",     label:"Contracts",           icon:"contracts", isNew:true },
];

// ── PDF Drawer ────────────────────────────────────────────────────────────────
function PdfDrawer({ open, onClose }) {
  return (
    <div className={`pdf-drawer${open ? " open" : ""}`}>
      <div className="pd-hdr">
        <div style={{ flex:1, minWidth:0 }}>
          <div className="pd-title">📄 Acme Corp – Enterprise Agreement Q4 2025.pdf</div>
          <div className="pd-meta">Source contract · Read-only · Mar 4, 2026</div>
        </div>
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <button className="btn bo bsm"><Icons.externalLink /></button>
          <button className="btn bg bsm" onClick={onClose} style={{ padding:"5px 6px" }}><Icons.close /></button>
        </div>
      </div>
      <div className="pd-legend">
        <span style={{ fontSize:10.5, fontWeight:600, color:"var(--slate)", textTransform:"uppercase", letterSpacing:".05em" }}>Key:</span>
        {[
          { bg:"#bbf7d0",                                  label:"Pricing" },
          { bg:"#bfdbfe",                                  label:"Dates" },
          { bg:"#f5d0fe",                                  label:"Quantity" },
          { bg:"#fef08a", border:"1.5px dashed #f59e0b",   label:"⚠ Uncertain" },
          { bg:"#fecaca", border:"1.5px dashed #ef4444",   label:"✕ Missing" },
        ].map(l => (
          <div key={l.label} className="li">
            <div className="ld" style={{ background:l.bg, outline:l.border }} />
            {l.label}
          </div>
        ))}
      </div>
      <div className="pd-body">
        <div className="pdf-pg">
          <div style={{ textAlign:"center", marginBottom:18, borderBottom:"2px solid #374151", paddingBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:13, letterSpacing:".05em", textTransform:"uppercase" }}>Master Subscription Agreement</div>
            <div style={{ fontSize:10, color:"#6b7280", marginTop:3 }}>Contract No. MSA-2026-10491</div>
          </div>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>1. Parties</p>
          <p style={{ marginBottom:14 }}>This Agreement is entered into as of <span className="hp hp-d" title="Extracted: start of term">January 1, 2026</span> between <strong>Acme Corp</strong> ("Customer") and BillFlow Inc. ("Vendor").</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>2. Subscription Services</p>
          <p style={{ marginBottom:14 }}>Customer subscribes to the <span className="hp hp-s" title="⚠ Uncertain — plan not found in catalog">Enterprise Growth Plan ⚠</span>. Term: <span className="hp hp-d" title="Start date">January 1, 2026</span> through <span className="hp hp-d" title="End date">December 31, 2026</span>.</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>3. Fees and Payment</p>
          <p style={{ marginBottom:14 }}>Customer shall pay <span className="hp hp-p" title="Unit price">$2,400 per month</span>, billed <span className="hp hp-s" title="⚠ Uncertain — monthly vs. upfront ambiguous">monthly ⚠</span>. Total: <span className="hp hp-p" title="TCV">$28,800 USD</span>. Adjustments require <span className="hp hp-d" title="Notice period">30 days</span> written notice.</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>4. Seats & Usage</p>
          <p style={{ marginBottom:14 }}>Covers <span className="hp hp-q" title="Seat count">25 user seats</span>. Overages at <span className="hp hp-s" title="⚠ Uncertain — per-seat rate unconfirmed">$96/seat/month ⚠</span>.</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>5. Discounts & Credits</p>
          <p style={{ marginBottom:14 }}>Vendor applies a <span className="hp hp-s" title="⚠ Uncertain — % or fixed amount?">10% annual commitment discount ⚠</span>. <span className="hp hp-m" title="✕ Missing — not stated in contract">Setup fee: not stated ✕</span>.</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>6. Renewal</p>
          <p style={{ marginBottom:14 }}>Auto-renews annually unless either party provides <span className="hp hp-d" title="Notice window">60 days</span> written notice before term end.</p>
          <p style={{ fontWeight:700, fontSize:12, marginBottom:8 }}>7. Termination</p>
          <p style={{ marginBottom:14 }}>Either party may terminate for convenience upon <span className="hp hp-d" title="Termination notice">30 days</span> written notice.</p>
          <div style={{ marginTop:28, paddingTop:12, borderTop:"1px solid #d1d5db", display:"flex", justifyContent:"space-between", fontSize:10 }}>
            <div><div style={{ fontWeight:700 }}>Acme Corp</div><div style={{ marginTop:18, borderTop:"1px solid #374151", width:110, paddingTop:3 }}>Authorized Signature</div></div>
            <div><div style={{ fontWeight:700 }}>BillFlow Inc.</div><div style={{ marginTop:18, borderTop:"1px solid #374151", width:110, paddingTop:3 }}>Authorized Signature</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,       setPage]       = useState("contracts");
  const [activeNav,  setActiveNav]  = useState("contracts");
  const [showUpload, setShowUpload] = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [dragOver,   setDragOver]   = useState(false);
  const [selFile,    setSelFile]    = useState(null);
  const [selCust,    setSelCust]    = useState("");
  const [pdfOpen,    setPdfOpen]    = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const fileRef = useRef();

  const [form, setForm] = useState({
    customer:"Acme Corp", plan:"Enterprise Growth Plan",
    qty:"25", freq:"Monthly",
    start:"2026-01-01", end:"2026-12-31",
    price:"2400.00", discount:"10",
    tcv:"25,920.00", currency:"USD", setup:"",
  });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const doUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setShowUpload(false);
      setUploading(false);
      setSelFile(null);
      setSelCust("");
      setPage("review");
      setActiveNav("contracts");
      setPdfOpen(true); // auto-open PDF on arrival
    }, 2800);
  };

  const doConfirm = () => {
    const e = {};
    if (!form.customer) e.customer = "Customer is required";
    if (!form.plan)     e.plan     = "Plan is required";
    if (!form.start)    e.start    = "Start date is required";
    if (Object.keys(e).length) { setFormErrors(e); return; }
    setPdfOpen(false);
    setPage("success");
  };

  const navTo = k => {
    setActiveNav(k);
    setPdfOpen(false);
    setPage(k === "dashboard" ? "dashboard" : "contracts");
  };

  return (
    <>
      <style>{css}</style>

      {/* Sidebar */}
      <aside className="sb">
        <div className="sb-logo">
          <div className="lm">B</div>
          <div className="ln">BillFlow<span>Subscription Platform</span></div>
        </div>
        <nav className="sb-nav">
          <div className="nav-sec">Main</div>
          {NAV.map(n => (
            <div key={n.key} className={`ni${activeNav === n.key ? " active" : ""}`} onClick={() => navTo(n.key)}>
              {Icons[n.icon]()} <span>{n.label}</span>
              {n.isNew && <span className="new-tag">New</span>}
            </div>
          ))}
          <div className="nav-sec">Settings</div>
          <div className="ni"><Icons.settings /><span>Settings</span></div>
        </nav>
        <div className="sb-foot">
          <div className="user-row">
            <div className="ava">SR</div>
            <div><div className="un">Sarah Roth</div><div className="ur">Billing Admin</div></div>
          </div>
        </div>
      </aside>

      {/* Header — no PDF toggle here, it lives in the form */}
      <header className={`hdr${pdfOpen ? " shifted" : ""}`}>
        <div className="hdr-search"><Icons.search /><input placeholder="Search customers, subscriptions, invoices…" /></div>
        <div className="hdr-r">
          <div className="ibu"><Icons.bell /><span className="nd" /></div>
          <div className="ibu"><Icons.info /></div>
          <div className="hdr-ava">SR</div>
        </div>
      </header>

      {/* PDF Drawer */}
      <PdfDrawer open={pdfOpen} onClose={() => setPdfOpen(false)} />

      {/* Main */}
      <main className={`main${pdfOpen ? " shifted" : ""}`}>
        {page === "dashboard"    && <DashboardPage    setPage={setPage} setActiveNav={setActiveNav} />}
        {page === "contracts"    && <ContractsPage    onUpload={() => setShowUpload(true)} onRow={c => { if (c.status !== "Processing") { setPage("review"); setActiveNav("contracts"); setPdfOpen(true); } }} />}
        {page === "review"       && <ReviewPage       form={form} upd={upd} errors={formErrors} onConfirm={doConfirm} onBack={() => { setPage("contracts"); setPdfOpen(false); }} pdfOpen={pdfOpen} setPdfOpen={setPdfOpen} />}
        {page === "success"      && <SuccessPage      onView={() => { setPage("subscription"); setActiveNav("subscriptions"); }} />}
        {page === "subscription" && <SubDetailPage    form={form} onBack={() => { setPage("contracts"); setActiveNav("contracts"); }} pdfOpen={pdfOpen} setPdfOpen={setPdfOpen} />}
      </main>

      {/* Upload modal */}
      {showUpload && (
        <UploadModal
          uploading={uploading} dragOver={dragOver} selFile={selFile}
          selCust={selCust} setSelCust={setSelCust} setDragOver={setDragOver}
          onFile={f => f && setSelFile(f)} fileRef={fileRef}
          onUpload={doUpload}
          onClose={() => { setShowUpload(false); setSelFile(null); setUploading(false); }}
        />
      )}
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function DashboardPage({ setPage, setActiveNav }) {
  return (
    <div className="page fi-in">
      <div className="ph">
        <div><div className="pt">Dashboard</div><div className="ps">Welcome back, Sarah.</div></div>
        <button className="btn bp"><Icons.plus /> New Subscription</button>
      </div>
      <div className="sg">
        {[
          { label:"Active Subscriptions", val:"1,284", delta:"+12 this month", up:true },
          { label:"MRR",                  val:"$94,200", delta:"+8.3% vs last month", up:true },
          { label:"Churn Rate",           val:"1.8%",   delta:"-0.2% improvement", up:true },
          { label:"Pending Drafts",       val:"7",      delta:"3 contracts pending review" },
        ].map(s => (
          <div className="stc" key={s.label}>
            <div className="slb">{s.label}</div>
            <div className="sv">{s.val}</div>
            <div className={`sd${s.up ? " up" : ""}`}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="ch">
          <div><div className="ct">Contracts Module</div><div className="cd">Convert signed PDFs into draft subscriptions with AI-assisted extraction</div></div>
          <button className="btn bp bsm" onClick={() => { setPage("contracts"); setActiveNav("contracts"); }}>Open Contracts →</button>
        </div>
        <div className="cb">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {[
              { icon:"upload",  t:"1. Upload PDF",        d:"Drag-and-drop your signed contract" },
              { icon:"sparkle", t:"2. AI Extraction",     d:"Terms extracted with skeptical highlights" },
              { icon:"check",   t:"3. Review & Activate", d:"Verify all fields, then confirm to go live" },
            ].map(s => (
              <div key={s.t} style={{ display:"flex", gap:12, padding:"14px 16px", background:"var(--bg)", borderRadius:"var(--r)", border:"1px solid var(--border)" }}>
                <div style={{ width:32, height:32, background:"var(--primary-lt)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--primary)", flexShrink:0 }}>{Icons[s.icon]()}</div>
                <div><div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{s.t}</div><div style={{ fontSize:12, color:"var(--slate)" }}>{s.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Contracts List ────────────────────────────────────────────────────────────
function ContractsPage({ onUpload, onRow }) {
  const SB = s => ({
    Processing:      <span className="badge b-amb"><Icons.dot />Processing</span>,
    "Draft Created": <span className="badge b-blue"><Icons.dot />Draft Created</span>,
    Completed:       <span className="badge b-grn"><Icons.dot />Completed</span>,
  }[s]);

  return (
    <div className="page fi-in">
      <div className="ph">
        <div>
          <div className="pt" style={{ display:"flex", alignItems:"center", gap:10 }}>
            Contracts <span className="ai-chip"><Icons.sparkle /> AI-Assisted</span>
          </div>
          <div className="ps">Upload a signed PDF to auto-generate a pre-filled draft subscription for review.</div>
        </div>
        <button className="btn bp" onClick={onUpload}><Icons.upload /> Upload Contract</button>
      </div>

      <div className="card">
        <div className="ch">
          <div><div className="ct">All Contracts</div><div className="cd">{CONTRACTS.length} contracts</div></div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn bo bsm">Filter</button>
            <button className="btn bo bsm">Export</button>
          </div>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr><th>Contract Name</th><th>Customer</th><th>Status</th><th>Uploaded</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {CONTRACTS.map(c => (
                <tr key={c.id} onClick={() => onRow(c)}>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:32, height:32, background:"#fee2e2", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", color:"#dc2626", flexShrink:0 }}><Icons.file /></div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:13 }}>{c.name}</div>
                        {c.subId && <div style={{ fontSize:11.5, color:"var(--slate)" }}>→ {c.subId}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ color:c.customer === "—" ? "var(--slate)" : undefined }}>{c.customer}</td>
                  <td>{SB(c.status)}</td>
                  <td style={{ color:"var(--slate)", fontFamily:"var(--mono)", fontSize:12.5 }}>{c.uploaded}</td>
                  <td>
                    {c.status === "Processing"
                      ? <span style={{ fontSize:12, color:"var(--slate)", display:"flex", alignItems:"center", gap:5 }}><span className="spin-sm" />Processing…</span>
                      : <button className="btn bo bsm" onClick={e => { e.stopPropagation(); onRow(c); }}>
                          {c.status === "Completed" ? <><Icons.eye /> View</> : <><Icons.arrowRight /> Review Draft</>}
                        </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Upload Modal ──────────────────────────────────────────────────────────────
function UploadModal({ uploading, dragOver, selFile, selCust, setSelCust, setDragOver, onFile, fileRef, onUpload, onClose }) {
  if (uploading) return (
    <div className="mo">
      <div className="md">
        <div className="mh"><div className="mtl">Processing Contract…</div></div>
        <div className="lw">
          <div className="spin" />
          <div style={{ fontWeight:600, fontSize:14 }}>Extracting subscription terms…</div>
          <div style={{ fontSize:13, color:"var(--slate)", textAlign:"center" }}>Reading pricing, dates, quantities and<br />customer details from the PDF.</div>
          <div className="pb"><div className="pf" /></div>
          <div style={{ fontSize:11.5, color:"var(--slate)" }}>Redirecting to draft review…</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mo" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="md fi-in">
        <div className="mh">
          <div>
            <div className="mtl">Upload Contract</div>
            <div style={{ fontSize:12.5, color:"var(--slate)", marginTop:2 }}>PDF will be analyzed to generate a pre-filled draft subscription</div>
          </div>
          <button className="btn bg bsm" onClick={onClose} style={{ padding:6 }}><Icons.close /></button>
        </div>
        <div className="mb">
          <div
            className={`dz${dragOver ? " over" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files[0]); }}
          >
            <div className="dz-ico"><Icons.upload /></div>
            <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>Drop your contract PDF here</div>
            <div style={{ fontSize:12.5, color:"var(--slate)" }}>or click to browse — PDF only, max 25 MB</div>
            <input ref={fileRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e => onFile(e.target.files[0])} />
          </div>
          {selFile
            ? <div className="dz-file"><Icons.file /><span className="dz-name">{selFile.name}</span><span style={{ fontSize:11.5, color:"var(--slate)" }}>{(selFile.size / 1024).toFixed(0)} KB</span></div>
            : <div className="dz-file" style={{ cursor:"pointer", justifyContent:"center", marginTop:10 }}
                onClick={() => onFile({ name:"Acme Corp – Enterprise Agreement Q4 2025.pdf", size:184320, type:"application/pdf" })}>
                <Icons.sparkle /><span className="dz-name" style={{ textAlign:"center" }}>Use sample contract for demo →</span>
              </div>
          }
          <div className="div" />
          <div className="fg" style={{ marginBottom:0 }}>
            <label className="fl">Link to Existing Customer <span style={{ color:"var(--slate)", fontWeight:400 }}>(optional)</span></label>
            <select className="fi fsel" value={selCust} onChange={e => setSelCust(e.target.value)}>
              <option value="">— Auto-detect from contract —</option>
              <option>Acme Corp</option><option>TechNova Inc.</option><option>BlueSky Solutions</option><option>GlobalRetail Ltd.</option>
            </select>
            <div className="fh">If blank, the customer name is extracted from the contract text.</div>
          </div>
        </div>
        <div className="mf">
          <button className="btn bo" onClick={onClose}>Cancel</button>
          <button className="btn bp" onClick={onUpload} disabled={!selFile}><Icons.sparkle /> Extract & Create Draft</button>
        </div>
      </div>
    </div>
  );
}

// ── Review Page ───────────────────────────────────────────────────────────────
function ReviewPage({ form, upd, errors, onConfirm, onBack, pdfOpen, setPdfOpen }) {
  return (
    <div className="fi-in">
      {/* Clean page header — no duplicate buttons */}
      <div style={{ padding:"16px 32px", borderBottom:"1px solid var(--border)", background:"white" }}>
        <div className="bc">
          <span className="bcl" onClick={onBack}>Contracts</span>
          <Icons.chevronRight />
          <span>Review Draft Subscription</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontWeight:700, fontSize:18, letterSpacing:"-.3px" }}>Review Draft Subscription</div>
          <span className="badge b-draft">
            <Icon d={["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4","M12 17h.01"]} size={11} stroke="#92400e" />
            Draft – Not Active
          </span>
        </div>
      </div>

      <div className="page" style={{ maxWidth:800 }}>

        {/* Single AI notice — concise */}
        <div className="ai-notice">
          <div style={{ flexShrink:0, color:"var(--ai)", marginTop:1 }}><Icons.sparkle /></div>
          <div>
            <strong>AI-extracted — verify before confirming.</strong> &nbsp;
            <span style={{ background:"#fef08a", padding:"0 4px", borderRadius:2, fontSize:12 }}>⚠ yellow</span> = uncertain &nbsp;
            <span style={{ background:"#fecaca", padding:"0 4px", borderRadius:2, fontSize:12 }}>✕ red</span> = missing. Use <em>View Contract PDF</em> (next to Customer) to cross-check.
          </div>
        </div>

        {/* Single draft notice */}
        <div className="draft-notice">
          <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" size={15} fill="#92400e" stroke="none" />
          Not billed until you click <strong>&nbsp;"Confirm & Create Subscription"&nbsp;</strong> below.
        </div>

        {/* ── Customer — with View Contract PDF button in header ── */}
        <div className="sc">
          <div className="stl">
            <div className="stl-left"><Icons.customers />Customer Information</div>
            {/* View Contract PDF lives HERE — right side of the section header */}
            <button
              className={`btn-view-pdf${pdfOpen ? " active" : ""}`}
              onClick={() => setPdfOpen(o => !o)}
            >
              <Icons.panelRight />
              {pdfOpen ? "Hide PDF" : "View Contract PDF"}
            </button>
          </div>
          <div className="sbdy">
            <div className="fg">
              <label className="fl">Customer <span className="req">*</span></label>
              <select className={`fi fsel${errors.customer ? " err" : ""}`} value={form.customer} onChange={e => upd("customer", e.target.value)}>
                <option value="">— Select customer —</option>
                <option>Acme Corp</option><option>TechNova Inc.</option><option>BlueSky Solutions</option>
              </select>
              {errors.customer
                ? <div className="fe">⚠ {errors.customer}</div>
                : <div className="fh" style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ color:"var(--green)" }}>✓</span> Customer matched. <span className="link" style={{ marginLeft:4, fontSize:12 }}>View →</span></div>
              }
            </div>
          </div>
        </div>

        {/* ── Plan ── */}
        <div className="sc">
          <div className="stl"><div className="stl-left"><Icons.subscriptions />Subscription Plan</div></div>
          <div className="sbdy">
            <div className="g2">
              <div className="fg">
                <label className="fl">Plan <span className="req">*</span></label>
                <input className={`fi warn${errors.plan ? " err" : ""}`} value={form.plan} onChange={e => upd("plan", e.target.value)} />
                <div className="fw"><Icons.warning /><span>Plan not found in catalog. <span className="link" style={{ fontSize:12 }}>Create Plan →</span></span></div>
              </div>
              <div className="fg">
                <label className="fl">Billing Frequency <span className="req">*</span></label>
                <select className="fi fsel warn" value={form.freq} onChange={e => upd("freq", e.target.value)}>
                  <option>Monthly</option><option>Quarterly</option><option>Annual</option>
                </select>
                <div className="fw"><Icons.warning /><span>Billing cadence ambiguous in §3 — confirm with customer.</span></div>
              </div>
            </div>
            <div className="g2">
              <div className="fg">
                <label className="fl">Quantity (Seats) <span className="req">*</span></label>
                <input className="fi" type="number" value={form.qty} onChange={e => upd("qty", e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Currency</label>
                <select className="fi fsel" value={form.currency} onChange={e => upd("currency", e.target.value)}>
                  <option>USD</option><option>EUR</option><option>GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pricing ── */}
        <div className="sc">
          <div className="stl"><div className="stl-left"><Icons.invoices />Pricing & Discounts</div></div>
          <div className="sbdy">
            <div className="g3">
              <div className="fg">
                <label className="fl">Unit Price / Month</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"var(--slate)", fontSize:13 }}>$</span>
                  <input className="fi" style={{ paddingLeft:22 }} value={form.price} onChange={e => upd("price", e.target.value)} />
                </div>
              </div>
              <div className="fg">
                <label className="fl">Discount %</label>
                <input className="fi warn" value={form.discount} onChange={e => upd("discount", e.target.value)} />
                <div className="fw"><Icons.warning /><span>Discount type unclear — % or fixed?</span></div>
              </div>
              <div className="fg">
                <label className="fl">Setup Fee</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"var(--slate)", fontSize:13 }}>$</span>
                  <input className="fi miss" style={{ paddingLeft:22 }} placeholder="Not found in contract" value={form.setup} onChange={e => upd("setup", e.target.value)} />
                </div>
                <div className="fwr"><Icons.warningRed /><span>Not mentioned in contract. Enter manually if applicable.</span></div>
              </div>
            </div>
            <div className="fg" style={{ marginBottom:0 }}>
              <label className="fl">Total Contract Value</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"var(--slate)", fontSize:13 }}>$</span>
                <input className="fi" style={{ paddingLeft:22, background:"var(--bg)", color:"var(--slate)" }} value={form.tcv} readOnly />
              </div>
              <div className="fh">$2,400 × 12 months × 90% (10% discount applied)</div>
            </div>
          </div>
        </div>

        {/* ── Dates ── */}
        <div className="sc">
          <div className="stl"><div className="stl-left"><Icons.calendar />Term & Renewal</div></div>
          <div className="sbdy">
            <div className="g2">
              <div className="fg">
                <label className="fl">Start Date <span className="req">*</span></label>
                <input className="fi" type="date" value={form.start} onChange={e => upd("start", e.target.value)} />
                {errors.start && <div className="fe">⚠ {errors.start}</div>}
              </div>
              <div className="fg">
                <label className="fl">End Date</label>
                <input className="fi" type="date" value={form.end} onChange={e => upd("end", e.target.value)} />
              </div>
            </div>
            <div className="fg" style={{ marginBottom:0 }}>
              <label className="fl">Auto-Renewal</label>
              <select className="fi fsel">
                <option>Yes – 60-day cancellation notice required</option>
                <option>No – manual renewal only</option>
              </select>
              <div className="fh">Extracted from §6. Verify with customer before activating.</div>
            </div>
          </div>
        </div>

        {/* ── Single action row at the bottom ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, paddingBottom:48 }}>
          <button className="btn bo" onClick={onBack}>← Discard Draft</button>
          <button className="btn bsu blg" onClick={onConfirm}>
            <Icons.check /> Confirm & Create Subscription
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Success ───────────────────────────────────────────────────────────────────
function SuccessPage({ onView }) {
  return (
    <div className="page fi-in" style={{ maxWidth:640, margin:"0 auto" }}>
      <div className="card" style={{ marginTop:48 }}>
        <div style={{ textAlign:"center", padding:"40px 32px 24px" }}>
          <div className="si"><Icon d="M20 6L9 17l-5-5" size={28} stroke="var(--green)" strokeWidth={2.5} /></div>
          <div style={{ fontSize:22, fontWeight:700, letterSpacing:"-.4px", marginBottom:8 }}>Subscription Created Successfully</div>
          <div style={{ fontSize:14, color:"var(--slate)", maxWidth:380, margin:"0 auto" }}>The draft has been confirmed and is now active. Billing begins January 1, 2026.</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:22 }}>
            <button className="btn bp blg" onClick={onView}>View Subscription →</button>
            <button className="btn bo blg">View Invoice</button>
          </div>
        </div>
        <div style={{ padding:"0 32px 32px" }}>
          <div className="div" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, textAlign:"center" }}>
            {[
              { label:"Subscription ID", val:"SUB-4822" },
              { label:"Status",          val:<span className="badge b-act"><Icons.dot />Active</span> },
              { label:"Next Billing",    val:"Feb 1, 2026" },
            ].map(r => (
              <div key={r.label} style={{ padding:"13px 12px", background:"var(--bg)", borderRadius:"var(--r)", border:"1px solid var(--border)" }}>
                <div style={{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em", color:"var(--slate)", marginBottom:6 }}>{r.label}</div>
                <div style={{ fontWeight:700, fontSize:14 }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Subscription Detail ───────────────────────────────────────────────────────
function SubDetailPage({ form, onBack, pdfOpen, setPdfOpen }) {
  return (
    <div className="page fi-in">
      <div className="bc">
        <span className="bcl" onClick={onBack}>Contracts</span>
        <Icons.chevronRight />
        <span className="bcl">Subscriptions</span>
        <Icons.chevronRight />
        <span>SUB-4822</span>
      </div>
      <div className="ph" style={{ marginTop:6 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div className="pt">SUB-4822 · Acme Corp</div>
            <span className="badge b-act"><Icons.dot />Active</span>
          </div>
          <div className="ps">Enterprise Growth Plan · Created from contract on Mar 4, 2026</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn bo">Pause</button>
          <button className="btn bo" style={{ color:"var(--red)", borderColor:"#fecaca" }}>Cancel</button>
        </div>
      </div>

      <div className="dg">
        <div>
          <div className="sc">
            <div className="stl"><div className="stl-left">Subscription Details</div></div>
            <div className="sbdy" style={{ padding:"8px 18px" }}>
              {[
                ["Customer",           "Acme Corp"],
                ["Plan",               form.plan],
                ["Quantity",           `${form.qty} seats`],
                ["Billing Frequency",  form.freq],
                ["Unit Price",         `$${form.price} / month`],
                ["Discount",           `${form.discount}% annual commitment`],
                ["Total MRR",          "$2,160.00"],
                ["Start Date",         "Jan 1, 2026"],
                ["End Date",           "Dec 31, 2026"],
                ["Auto-Renewal",       "Yes (60-day notice)"],
                ["Next Invoice",       "Feb 1, 2026"],
              ].map(([k, v]) => (
                <div className="dr" key={k}><span className="dk">{k}</span><span className="dv">{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sc" style={{ marginBottom:14 }}>
            <div className="stl"><div className="stl-left">Billing Summary</div></div>
            <div className="sbdy">
              <div style={{ fontSize:28, fontWeight:800, letterSpacing:"-1px", marginBottom:4 }}>
                $2,160<span style={{ fontSize:14, fontWeight:500, color:"var(--slate)" }}>/mo</span>
              </div>
              <div style={{ fontSize:12.5, color:"var(--slate)", marginBottom:14 }}>$25,920 total contract value</div>
              <div style={{ background:"var(--green-bg)", border:"1px solid #a7f3d0", borderRadius:"var(--r)", padding:"9px 12px", fontSize:13, color:"var(--green)", fontWeight:600 }}>
                ✓ First invoice generated Feb 1, 2026
              </div>
            </div>
          </div>

          {/* Source contract card — PDF button here too */}
          <div className="sc">
            <div className="stl"><div className="stl-left"><Icons.file />Source Contract</div></div>
            <div className="sbdy">
              <div className="cref">
                <div className="cref-icon"><Icons.file /></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Acme Corp – Enterprise Agreement Q4 2025.pdf</div>
                  <div style={{ fontSize:12, color:"var(--slate)", marginTop:2 }}>Uploaded Mar 4, 2026 · Read-only</div>
                </div>
                <button
                  className={`btn-view-pdf${pdfOpen ? " active" : ""}`}
                  onClick={() => setPdfOpen(o => !o)}
                >
                  <Icons.panelRight />
                  {pdfOpen ? "Hide" : "View PDF"}
                </button>
              </div>
              <div style={{ marginTop:10, padding:"9px 12px", background:"var(--ai-bg)", border:"1px solid #bae6fd", borderRadius:"var(--r)", fontSize:12, color:"#0369a1", display:"flex", gap:7, alignItems:"flex-start" }}>
                <Icons.sparkle /><span>Created via AI-assisted extraction. Verified by Sarah Roth on Mar 4, 2026.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
