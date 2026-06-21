// IDIRA — Managed Accounts / Risk Management Screen Builder
// Figma Plugin API (runs inside the Figma editor)

figma.showUI(__html__, { width: 300, height: 220 });

// ── DS Tokens (from project SCSS tokens) ─────────────────────────────────────

const T = {
  // backgrounds
  bgPage:    { r: 0.063, g: 0.102, b: 0.165 },   // #102A43 approx page bg
  bgDark:    { r: 0.071, g: 0.110, b: 0.173 },   // #17243B darker surface
  bgDarker:  { r: 0.090, g: 0.141, b: 0.231 },   // #172438 card bg
  bgNavy:    { r: 0.090, g: 0.141, b: 0.231 },   // navbar #17243B
  bgCard:    { r: 0.071, g: 0.110, b: 0.173 },
  // text
  textLight: { r: 1, g: 1, b: 1 },
  textMuted: { r: 0.569, g: 0.639, b: 0.749 },   // #91A3BF
  textIdle:  { r: 0.420, g: 0.506, b: 0.627 },   // #6B81A0
  // primary / accent
  primary:   { r: 0.522, g: 0.624, b: 1.0 },     // #859FFF
  // status
  critical:  { r: 0.949, g: 0.133, b: 0.404 },   // #F22268
  high:      { r: 1.0,   g: 0.620, b: 0.180 },   // #FF9E2E
  medium:    { r: 1.0,   g: 0.800, b: 0.200 },   // #FFCC33
  low:       { r: 0.310, g: 0.816, b: 0.639 },   // #4FD0A3
  success:   { r: 0.145, g: 0.776, b: 0.514 },
  // borders
  border:    { r: 0.157, g: 0.247, b: 0.404 },   // #283F67
  divider:   { r: 0.122, g: 0.188, b: 0.302 },
  // header
  header:    { r: 0.051, g: 0.082, b: 0.145 },   // #0D1525
};

const ALPHA = (c, a) => ({ ...c, a });
const SOLID = (c) => ({ type: 'SOLID', color: c });
const solidFill = (c) => [SOLID(c)];

// ── Helpers ───────────────────────────────────────────────────────────────────

function setPos(node, x, y) { node.x = x; node.y = y; }
function setSize(node, w, h) { node.resize(w, h); }

async function loadFont(family = 'Inter', style = 'Regular') {
  await figma.loadFontAsync({ family, style });
}

function text(content, opts = {}) {
  const t = figma.createText();
  t.characters = content;
  t.fontSize = opts.size || 13;
  t.fills = solidFill(opts.color || T.textLight);
  if (opts.weight === 600 || opts.bold) t.fontName = { family: 'Inter', style: 'SemiBold' };
  else if (opts.weight === 700) t.fontName = { family: 'Inter', style: 'Bold' };
  else t.fontName = { family: 'Inter', style: 'Regular' };
  if (opts.w) t.resize(opts.w, opts.h || opts.size * 1.4 || 18);
  return t;
}

function frame(name, w, h, fill) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = fill ? solidFill(fill) : [];
  f.clipsContent = true;
  return f;
}

function rect(name, w, h, fill, radius = 0) {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(w, h);
  r.fills = solidFill(fill);
  r.cornerRadius = radius;
  return r;
}

function hRule(w, color) {
  const r = figma.createRectangle();
  r.name = 'Divider';
  r.resize(w, 1);
  r.fills = solidFill(color || T.border);
  return r;
}

function pill(label, color, w) {
  const f = frame('Badge', w || 70, 20, { r: color.r * 0.15, g: color.g * 0.15, b: color.b * 0.15 });
  f.cornerRadius = 10;
  f.strokes = [SOLID(color)];
  f.strokeWeight = 1;
  const t2 = text(label, { size: 11, color, weight: 600 });
  f.appendChild(t2);
  t2.x = (f.width - t2.width) / 2;
  t2.y = 3;
  return f;
}

function badge(label, bgColor, textColor) {
  const f = frame('KPI', 0, 22, bgColor);
  f.cornerRadius = 4;
  const t2 = text(label, { size: 12, color: textColor || T.textLight, weight: 600 });
  f.resize(t2.width + 12, 22);
  f.appendChild(t2);
  t2.x = 6; t2.y = 3;
  return f;
}

// ── Section: Header Bar ───────────────────────────────────────────────────────

function buildHeader(parent, w) {
  const h = frame('Header', w, 56, T.header);
  h.strokes = [SOLID(T.border)];
  h.strokeAlign = 'INSIDE';

  // CyberArk brand text
  const brand = text('CyberArk  |  IDIRA', { size: 14, weight: 600, color: T.textLight });
  brand.x = 24; brand.y = 19;
  h.appendChild(brand);

  // Nav items
  const navItems = ['Dashboard', 'Detect & Respond', 'Access', 'Secrets', 'Compliance'];
  let nx = 220;
  navItems.forEach((label, i) => {
    const isActive = i === 1;
    const t2 = text(label, { size: 12, weight: isActive ? 600 : 400, color: isActive ? T.primary : T.textMuted });
    t2.x = nx; t2.y = 19;
    h.appendChild(t2);
    if (isActive) {
      const indicator = rect('Active', t2.width, 2, T.primary);
      indicator.x = nx; indicator.y = 54;
      h.appendChild(indicator);
    }
    nx += t2.width + 24;
  });

  // User avatar
  const avatar = frame('Avatar', 32, 32, T.primary);
  avatar.cornerRadius = 16;
  avatar.x = w - 56; avatar.y = 12;
  const initials = text('AM', { size: 12, weight: 600, color: T.textLight });
  avatar.appendChild(initials);
  initials.x = 8; initials.y = 7;
  h.appendChild(avatar);

  parent.appendChild(h);
  setPos(h, 0, 0);
  return h;
}

// ── Section: Sub Nav ─────────────────────────────────────────────────────────

function buildSubNav(parent, w, y) {
  const nav = frame('Sub Navigation', w, 44, T.bgDark);
  nav.strokes = [SOLID(T.border)];
  nav.strokeAlign = 'INSIDE';

  const items = ['Overview', 'Risk Management', 'Findings', 'Policies', 'Reports'];
  let nx = 24;
  items.forEach((label, i) => {
    const isActive = i === 1;
    const t2 = text(label, { size: 13, weight: isActive ? 600 : 400, color: isActive ? T.primary : T.textMuted });
    t2.x = nx; t2.y = 13;
    nav.appendChild(t2);
    if (isActive) {
      const indicator = rect('Active', t2.width + 16, 2, T.primary);
      indicator.x = nx - 8; indicator.y = 42;
      nav.appendChild(indicator);
    }
    nx += t2.width + 32;
  });

  // Action buttons
  const exportBtn = frame('Export', 80, 28, { r: 0, g: 0, b: 0 });
  exportBtn.fills = [];
  exportBtn.strokes = [SOLID(T.border)];
  exportBtn.strokeWeight = 1;
  exportBtn.cornerRadius = 6;
  exportBtn.x = w - 180; exportBtn.y = 8;
  const exportTxt = text('Export', { size: 12, color: T.textMuted });
  exportTxt.x = 18; exportTxt.y = 5;
  exportBtn.appendChild(exportTxt);
  nav.appendChild(exportBtn);

  const filterBtn = frame('Filter', 76, 28, T.primary);
  filterBtn.cornerRadius = 6;
  filterBtn.x = w - 92; filterBtn.y = 8;
  const filterTxt = text('+ Add filter', { size: 12, weight: 600, color: T.bgCard });
  filterTxt.x = 8; filterTxt.y = 5;
  filterBtn.appendChild(filterTxt);
  nav.appendChild(filterBtn);

  parent.appendChild(nav);
  setPos(nav, 0, y);
  return nav;
}

// ── Section: Page Title + KPIs ────────────────────────────────────────────────

function buildTitleKpi(parent, w, y) {
  const section = frame('Title + KPIs', w, 56, null);
  section.paddingLeft = 24; section.paddingRight = 24;

  const title = text('Risk Management', { size: 22, weight: 700, color: T.textLight });
  title.x = 24; title.y = 12;
  section.appendChild(title);

  // KPI pills
  const kpis = [
    { label: '12,456 Total findings', color: T.textMuted },
    { label: '267 Critical', color: T.critical },
    { label: '588 High', color: T.high },
    { label: '823 Medium', color: T.medium },
  ];
  let kx = 240;
  kpis.forEach(k => {
    const p = pill(k.label, k.color, k.label.length * 7 + 16);
    p.x = kx; p.y = 18;
    section.appendChild(p);
    kx += p.width + 10;
  });

  parent.appendChild(section);
  setPos(section, 0, y);
  setSize(section, w, 56);
  return section;
}

// ── Section: Risk Category Cards (bar chart cards) ────────────────────────────

function buildRiskCard(name, critPct, w) {
  const CARD_H = 130;
  const card = frame(name, w, CARD_H, T.bgDarker);
  card.cornerRadius = 8;
  card.strokes = [SOLID(T.border)];
  card.strokeWeight = 1;

  // Title
  const t2 = text(name, { size: 13, weight: 600, color: T.textLight });
  t2.x = 12; t2.y = 12;
  card.appendChild(t2);

  // Bar track
  const trackW = w - 24;
  const track = rect('Bar Track', trackW, 8, T.bgDark, 4);
  track.x = 12; track.y = 36;
  card.appendChild(track);

  // Critical bar
  const critW = Math.max(4, Math.round(trackW * critPct / 100));
  const critBar = rect('Critical Bar', critW, 8, T.critical, 4);
  critBar.x = 12; critBar.y = 36;
  card.appendChild(critBar);

  // High bar (partial)
  const highPct = critPct > 60 ? 20 : 40;
  const highW = Math.max(4, Math.round(trackW * highPct / 100));
  const highBar = rect('High Bar', highW, 8, T.high, 4);
  highBar.x = 12 + critW; highBar.y = 36;
  card.appendChild(highBar);

  // Pct label
  const pctLabel = text(`Critical — ${critPct}%`, { size: 12, color: T.textMuted });
  pctLabel.x = 12; pctLabel.y = 52;
  card.appendChild(pctLabel);

  // Stats row
  const stats = [
    { label: 'Critical', val: Math.round(1200 * critPct / 100), color: T.critical },
    { label: 'High',     val: Math.round(800 * highPct / 100),  color: T.high },
    { label: 'Medium',   val: Math.round(600 * (100 - critPct - highPct) / 100), color: T.medium },
  ];
  let sx = 12;
  stats.forEach(s => {
    const valT = text(String(s.val), { size: 16, weight: 700, color: s.color });
    valT.x = sx; valT.y = 76;
    card.appendChild(valT);
    const lbl = text(s.label, { size: 10, color: T.textMuted });
    lbl.x = sx; lbl.y = 96;
    card.appendChild(lbl);
    sx += 64;
  });

  return card;
}

function buildRiskCategories(parent, w, y) {
  const SECTION_H = 310;
  const section = frame('Risk Categories', w, SECTION_H, null);

  const sectionTitle = text('Risk breakdown by category', { size: 16, weight: 600, color: T.textLight });
  sectionTitle.x = 0; sectionTitle.y = 0;
  section.appendChild(sectionTitle);

  const categories = [
    { name: 'Users',               critPct: 18, row: 0 },
    { name: 'Cloud entitlements',  critPct: 37, row: 0 },
    { name: 'Cloud infra access',  critPct: 47, row: 0 },
    { name: 'Applications',        critPct: 79, row: 1 },
    { name: 'Secrets',             critPct: 45, row: 1 },
    { name: 'Workloads',           critPct: 11, row: 1 },
    { name: 'AI agents',           critPct: 64, row: 1 },
  ];

  // Row 0: 3 cards
  const row0 = categories.filter(c => c.row === 0);
  const row1 = categories.filter(c => c.row === 1);
  const gap = 12;
  const row0CardW = Math.floor((w - gap * 2) / 3);
  const row1CardW = Math.floor((w - gap * 3) / 4);

  row0.forEach((cat, i) => {
    const card = buildRiskCard(cat.name, cat.critPct, row0CardW);
    card.x = i * (row0CardW + gap);
    card.y = 36;
    section.appendChild(card);
  });

  row1.forEach((cat, i) => {
    const card = buildRiskCard(cat.name, cat.critPct, row1CardW);
    card.x = i * (row1CardW + gap);
    card.y = 36 + 130 + gap;
    section.appendChild(card);
  });

  parent.appendChild(section);
  setPos(section, 24, y);
  setSize(section, w - 48, SECTION_H);
  return section;
}

// ── Section: Progress Chart + KPI Tile ───────────────────────────────────────

function buildProgressChart(parent, w, y) {
  const CHART_H = 320;
  const section = frame('Progress Over Time + KPIs', w, CHART_H, null);

  // Chart area (left ~70%)
  const chartW = Math.round(w * 0.72);
  const chartArea = frame('Progress Chart', chartW, CHART_H, T.bgDarker);
  chartArea.cornerRadius = 8;
  chartArea.strokes = [SOLID(T.border)];
  chartArea.strokeWeight = 1;
  chartArea.x = 0; chartArea.y = 0;
  section.appendChild(chartArea);

  // Chart header
  const chartTitle = text('Progress over time', { size: 15, weight: 600, color: T.textLight });
  chartTitle.x = 16; chartTitle.y = 16;
  chartArea.appendChild(chartTitle);

  // Time filter chips
  const timeFilters = ['1W', '1M', '3M', '6M', '1Y'];
  let tfx = chartW - 160;
  timeFilters.forEach((f, i) => {
    const chip = frame('TimeChip', 28, 22, i === 1 ? T.primary : null);
    chip.cornerRadius = 4;
    if (i !== 1) { chip.strokes = [SOLID(T.border)]; chip.strokeWeight = 1; }
    chip.x = tfx; chip.y = 12;
    const ft = text(f, { size: 11, weight: i === 1 ? 600 : 400, color: i === 1 ? T.bgCard : T.textMuted });
    ft.x = 5; ft.y = 4;
    chip.appendChild(ft);
    chartArea.appendChild(chip);
    tfx += 32;
  });

  // Axes
  const axisY = rect('Y-axis', 1, CHART_H - 80, T.border);
  axisY.x = 48; axisY.y = 48;
  chartArea.appendChild(axisY);

  const axisX = rect('X-axis', chartW - 80, 1, T.border);
  axisX.x = 48; axisX.y = CHART_H - 32;
  chartArea.appendChild(axisX);

  // Y-axis labels
  const yLabels = ['5K', '4K', '3K', '2K', '1K', '0'];
  const yRange = CHART_H - 80;
  yLabels.forEach((l, i) => {
    const yt = text(l, { size: 10, color: T.textMuted });
    yt.x = 8; yt.y = 48 + Math.round(i * yRange / (yLabels.length - 1)) - 8;
    chartArea.appendChild(yt);
    // grid line
    const grid = rect('Grid', chartW - 80, 1, { r: 0.157, g: 0.247, b: 0.404 });
    grid.opacity = 0.4;
    grid.x = 48; grid.y = 48 + Math.round(i * yRange / (yLabels.length - 1));
    chartArea.appendChild(grid);
  });

  // X-axis labels
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const xStep = Math.floor((chartW - 80) / (months.length - 1));
  months.forEach((m, i) => {
    const xt = text(m, { size: 10, color: T.textMuted });
    xt.x = 48 + i * xStep - 8; xt.y = CHART_H - 22;
    chartArea.appendChild(xt);
  });

  // Chart lines (polyline approximation via rectangles — Figma plugin can't draw SVG paths directly)
  const lineData = [
    { label: 'Critical', color: T.critical, points: [0.72, 0.65, 0.60, 0.55, 0.48, 0.40] },
    { label: 'High',     color: T.high,     points: [0.55, 0.50, 0.48, 0.45, 0.42, 0.38] },
    { label: 'Medium',   color: T.medium,   points: [0.40, 0.38, 0.42, 0.40, 0.36, 0.30] },
    { label: 'Low',      color: T.low,      points: [0.20, 0.22, 0.20, 0.19, 0.18, 0.15] },
  ];

  const chartTop = 48;
  const chartBottom = CHART_H - 32;
  const chartLeft = 48;
  const chartRight = chartW - 16;
  const plotH = chartBottom - chartTop;
  const plotW = chartRight - chartLeft;

  lineData.forEach(series => {
    series.points.forEach((pt, i) => {
      if (i === series.points.length - 1) return;
      const x1 = chartLeft + i * xStep;
      const y1 = chartTop + Math.round((1 - pt) * plotH);
      const x2 = chartLeft + (i + 1) * xStep;
      const y2 = chartTop + Math.round((1 - series.points[i + 1]) * plotH);
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const seg = rect(`${series.label}-seg-${i}`, len, 2, series.color);
      seg.x = x1;
      seg.y = y1;
      seg.rotation = -(Math.atan2(dy, dx) * 180 / Math.PI);
      chartArea.appendChild(seg);
    });
    // dot at last point
    const lastPt = series.points[series.points.length - 1];
    const dotX = chartLeft + (series.points.length - 1) * xStep;
    const dotY = chartTop + Math.round((1 - lastPt) * plotH);
    const dot = rect(`${series.label}-dot`, 6, 6, series.color, 3);
    dot.x = dotX - 3; dot.y = dotY - 3;
    chartArea.appendChild(dot);
  });

  // Legend
  let lx = 48;
  lineData.forEach(series => {
    const dotLegend = rect(`legend-${series.label}`, 12, 3, series.color, 2);
    dotLegend.x = lx; dotLegend.y = CHART_H - 12;
    chartArea.appendChild(dotLegend);
    const lt = text(series.label, { size: 10, color: T.textMuted });
    lt.x = lx + 16; lt.y = CHART_H - 18;
    chartArea.appendChild(lt);
    lx += lt.width + 32;
  });

  // KPI tile (right side)
  const tileW = w - chartW - 12;
  const tile = frame('KPI Tile', tileW, CHART_H, T.bgDarker);
  tile.cornerRadius = 8;
  tile.strokes = [SOLID(T.border)];
  tile.strokeWeight = 1;
  tile.x = chartW + 12; tile.y = 0;
  section.appendChild(tile);

  // KPI metrics
  const metrics = [
    { val: '98%',  label: 'Findings remediated',      rating: 'Good',           ratingColor: T.success },
    { val: '86%',  label: 'Critical findings resolved', rating: 'Excellent',      ratingColor: T.primary },
    { val: '0%',   label: 'Expansion in Coverage',     rating: 'Need attention', ratingColor: T.high },
  ];

  let my = 20;
  metrics.forEach((m, i) => {
    const valT = text(m.val, { size: 28, weight: 700, color: i === 2 ? T.high : T.textLight });
    valT.x = 16; valT.y = my;
    tile.appendChild(valT);

    const lbl = text(m.label, { size: 11, color: T.textMuted, w: tileW - 32 });
    lbl.x = 16; lbl.y = my + 34;
    tile.appendChild(lbl);

    const ratingBadge = pill(m.rating, m.ratingColor, m.rating.length * 7 + 16);
    ratingBadge.x = 16; ratingBadge.y = my + 56;
    tile.appendChild(ratingBadge);

    my += 92;
    if (i < metrics.length - 1) {
      const sep = rect('sep', tileW - 32, 1, T.border);
      sep.x = 16; sep.y = my - 8;
      tile.appendChild(sep);
    }
  });

  parent.appendChild(section);
  setPos(section, 24, y);
  setSize(section, w - 48, CHART_H);
  return section;
}

// ── Section: Top 5 Risk Types Table ──────────────────────────────────────────

function buildRiskTable(parent, w, y) {
  const TABLE_H = 320;
  const section = frame('Top 5 Risk Types', w, TABLE_H, T.bgDarker);
  section.cornerRadius = 8;
  section.strokes = [SOLID(T.border)];
  section.strokeWeight = 1;

  // Table header row
  const tableTitle = text('Top 5 risk types', { size: 16, weight: 600, color: T.textLight });
  tableTitle.x = 20; tableTitle.y = 16;
  section.appendChild(tableTitle);

  const showAllBtn = frame('ShowAll', 80, 26, null);
  showAllBtn.strokes = [SOLID(T.border)];
  showAllBtn.strokeWeight = 1;
  showAllBtn.cornerRadius = 5;
  showAllBtn.x = w - 108; showAllBtn.y = 13;
  const showAllTxt = text('Show all →', { size: 12, weight: 600, color: T.primary });
  showAllTxt.x = 8; showAllTxt.y = 4;
  showAllBtn.appendChild(showAllTxt);
  section.appendChild(showAllBtn);

  // Column headers
  const cols = [
    { label: 'Risk Type',       w: 280 },
    { label: 'Category',        w: 140 },
    { label: 'Findings',        w: 100 },
    { label: 'Critical',        w: 100 },
    { label: 'Trend',           w: 160 },
    { label: 'SLA Status',      w: 120 },
  ];

  const HEADER_Y = 50;
  const COL_H = 36;
  const hdrBg = rect('Header BG', w, COL_H, T.bgDark);
  hdrBg.x = 0; hdrBg.y = HEADER_Y;
  section.appendChild(hdrBg);

  let cx = 20;
  cols.forEach(col => {
    const th = text(col.label, { size: 11, weight: 600, color: T.textMuted });
    th.x = cx; th.y = HEADER_Y + 10;
    section.appendChild(th);
    cx += col.w;
  });

  // Table rows
  const rows = [
    { type: 'Excessive privileges',   category: 'Users',              findings: '3,241', critical: '512',  trend: '+12%', sla: 'Overdue',   slaColor: T.critical },
    { type: 'Stale access',           category: 'Cloud entitlements', findings: '2,187', critical: '334',  trend: '-8%',  sla: 'On track',  slaColor: T.success },
    { type: 'Unencrypted secrets',    category: 'Secrets',            findings: '1,834', critical: '287',  trend: '+5%',  sla: 'At risk',   slaColor: T.high },
    { type: 'Privilege escalation',   category: 'Workloads',          findings: '1,620', critical: '241',  trend: '+22%', sla: 'Overdue',   slaColor: T.critical },
    { type: 'Shadow admin accounts',  category: 'Applications',       findings: '1,574', critical: '198',  trend: '-3%',  sla: 'On track',  slaColor: T.success },
  ];

  rows.forEach((row, ri) => {
    const ROW_Y = HEADER_Y + COL_H + ri * 46;
    const isEven = ri % 2 === 0;
    if (isEven) {
      const rowBg = rect('Row BG', w, 46, { r: 0.071, g: 0.110, b: 0.173 });
      rowBg.x = 0; rowBg.y = ROW_Y;
      section.appendChild(rowBg);
    }

    // Row divider
    const div = rect('Row Div', w, 1, T.divider);
    div.x = 0; div.y = ROW_Y;
    section.appendChild(div);

    const rowCols = [row.type, row.category, row.findings, row.critical];
    let rcx = 20;
    rowCols.forEach((val, ci) => {
      const isType = ci === 0;
      const td = text(val, { size: 13, weight: isType ? 500 : 400, color: isType ? T.textLight : T.textMuted });
      td.x = rcx; td.y = ROW_Y + 13;
      section.appendChild(td);
      rcx += cols[ci].w;
    });

    // Trend badge
    const trendUp = row.trend.startsWith('+');
    const trendBadge = badge(row.trend, trendUp ? { r: 0.949 * 0.15, g: 0.133 * 0.15, b: 0.404 * 0.15 } : { r: 0.145 * 0.15, g: 0.776 * 0.15, b: 0.514 * 0.15 }, trendUp ? T.critical : T.success);
    trendBadge.x = rcx; trendBadge.y = ROW_Y + 12;
    section.appendChild(trendBadge);
    rcx += cols[4].w;

    // SLA status pill
    const slaPill = pill(row.sla, row.slaColor, row.sla.length * 7 + 16);
    slaPill.x = rcx; slaPill.y = ROW_Y + 8;
    section.appendChild(slaPill);
  });

  parent.appendChild(section);
  setPos(section, 24, y);
  setSize(section, w - 48, TABLE_H);
  return section;
}

// ── Main Builder ──────────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'build') return;

  try {
    // Load all required font weights
    await Promise.all([
      loadFont('Inter', 'Regular'),
      loadFont('Inter', 'SemiBold'),
      loadFont('Inter', 'Bold'),
    ]);

    const SCREEN_W = 1440;
    const SCREEN_H = 960;

    // Root frame
    const screen = frame('Risk Management — IDIRA', SCREEN_W, SCREEN_H, T.bgPage);
    screen.cornerRadius = 0;

    // Build sections top-to-bottom
    buildHeader(screen, SCREEN_W);
    buildSubNav(screen, SCREEN_W, 56);
    buildTitleKpi(screen, SCREEN_W, 100);

    // Content area
    const CONTENT_Y = 160;
    const CONTENT_W = SCREEN_W;

    buildRiskCategories(screen, CONTENT_W, CONTENT_Y);
    buildProgressChart(screen, CONTENT_W, CONTENT_Y + 324);
    buildRiskTable(screen, CONTENT_W, CONTENT_Y + 324 + 344);

    // Place on canvas
    const cx = figma.viewport.center.x;
    const cy = figma.viewport.center.y;
    screen.x = cx - SCREEN_W / 2;
    screen.y = cy - SCREEN_H / 2;

    figma.currentPage.appendChild(screen);
    figma.viewport.scrollAndZoomIntoView([screen]);
    figma.ui.postMessage({ type: 'done' });

  } catch (err) {
    figma.ui.postMessage({ type: 'error', message: err.message });
  }
};
