const BASE_COLORS = Object.freeze({
  accentPrimary: '#000000ff',
  accentGreen: '#ffffffff',
  accentPink: '#ff8fad',
  stageFill: '#ffd6d6',
  bodyBackground: '#ffffffff',
  surfaceBase: '#ffffffff',
  surfaceAlt: '#ffffffff',
  borderDefault: '#8c8280',
  textPrimary: '#000000',
  textMuted: '#000000',
  stageIdentifier: '#ffd6d6',
  deadlineColor: '#c44f29',
  dangerText: '#c44f29',
  white: '#ffffff',
  solidBlack: '#000000',
  disabledSurface: '#ffffffff',
  standdownText: '#000000'
});

const TRANSPARENT_COLORS = Object.freeze({
  accentAlpha02: 'rgba(0,204,222,.02)',
  accentAlpha05: 'rgba(0,204,222,.05)',
  accentAlpha08: 'rgba(0,204,222,.08)',
  accentAlpha12: 'rgba(0,204,222,.12)',
  accentAlpha18: 'rgba(0,204,222,.18)',
  accentAlpha24: 'rgba(0,204,222,.24)',
  accentAlpha35: 'rgba(0,204,222,.35)',
  accentAlpha45: 'rgba(0,204,222,.45)',
  accentAlpha55: 'rgba(0,204,222,.55)',
  accentAlpha60: 'rgba(0,204,222,.6)',
  accentAlpha88: 'rgba(0,204,222,.88)',
  blackAlpha08: 'rgba(0,0,0,.08)',
  blackAlpha72: 'rgba(0,0,0,.72)',
  blackAlpha90: 'rgba(0,0,0,.9)',
  inkAlpha05: 'rgba(15,23,42,.05)',
  stageShadow: 'rgba(212,163,18,.25)',
  dangerAlpha12: 'rgba(220,38,38,.12)',
  deadlineFill: 'rgba(253,224,140,.28)',
  whiteAlpha25: 'rgba(255,255,255,.25)',
  whiteAlpha35: 'rgba(255,255,255,.35)',
  whiteAlpha90: 'rgba(255,255,255,.9)',
  slateAlpha01: 'rgba(107,114,128,.35)',
  navyAlpha08: 'rgba(31,45,61,.08)'
});

const SPECIAL_SURFACES = Object.freeze({
  neutral245: 'rgb(245,245,245)',
  standdownBackground: 'rgba(230,232,235,0.9)',
  gridDayBackground: 'rgba(240,243,248,.9)',
  surfaceOverlay: 'rgba(248,250,255,.9)',
  tableRowAlternate: 'rgba(248,250,255,.7)'
});

const MINI_SEGMENT_COLORS = Object.freeze({
  miniEmerald: 'rgba(46,160,67,.85)',
  miniAmber: 'rgba(191,135,0,.85)',
  miniRose: 'rgba(219,97,162,.85)',
  miniPurple: 'rgba(137,87,229,.85)',
  miniAqua: 'rgba(64,193,213,.85)',
  miniOrange: 'rgba(231,120,67,.85)'
});

const TASK_COLOR_MAP = Object.freeze({
  'Bond Bryan Design': '#ccf5f2',
  'Bond Bryan review': '#00ccde',
  'CDP': '#2b7a91',
  'Client Comments': '#d1c9ba',
  'Delays': '#b4b4b4ff',
  'Undefined': '#8c8280'
});

const DEFAULT_SEGMENT_COLOR = '#ccf5f2';
const STAGE_COLOR = BASE_COLORS.stageFill;
const SINGLE_EVENT_COLOR = BASE_COLORS.accentGreen;
const SINGLE_EVENT_SELECTED_COLOR = BASE_COLORS.accentPink;

function toCssVariableName(key = '') {
  return `--color-${String(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()}`;
}

const COLOR_GROUPS_FOR_CSS = [
  BASE_COLORS,
  TRANSPARENT_COLORS,
  SPECIAL_SURFACES,
  MINI_SEGMENT_COLORS
];

const CSS_VARIABLE_MAP = Object.freeze(
  COLOR_GROUPS_FOR_CSS.reduce((acc, group) => {
    Object.entries(group).forEach(([token, value]) => {
      acc[toCssVariableName(token)] = value;
    });
    return acc;
  }, {})
);

function normaliseOverrideMap(overrides = {}) {
  return Object.entries(overrides).reduce((acc, [key, value]) => {
    if (value == null) return acc;
    const cssVarName = key.startsWith('--color-') ? key : toCssVariableName(key);
    acc[cssVarName] = value;
    return acc;
  }, {});
}

function applyColorTheme(target = typeof document !== 'undefined' ? document.documentElement : null, overrides = null) {
  if (!target || !target.style) return;
  const normalisedOverrides = overrides ? normaliseOverrideMap(overrides) : null;
  Object.entries(CSS_VARIABLE_MAP).forEach(([cssVar, defaultValue]) => {
    const nextValue = normalisedOverrides?.[cssVar] ?? defaultValue;
    target.style.setProperty(cssVar, nextValue);
  });
}

const colorConstants = Object.freeze({
  TASK_COLOR_MAP,
  DEFAULT_SEGMENT_COLOR,
  STAGE_COLOR,
  SINGLE_EVENT_COLOR,
  SINGLE_EVENT_SELECTED_COLOR,
  BASE_COLORS,
  TRANSPARENT_COLORS,
  SPECIAL_SURFACES,
  MINI_SEGMENT_COLORS,
  CSS_VARIABLE_MAP,
  applyColorTheme
});

export default colorConstants;
export {
  TASK_COLOR_MAP,
  DEFAULT_SEGMENT_COLOR,
  STAGE_COLOR,
  SINGLE_EVENT_COLOR,
  SINGLE_EVENT_SELECTED_COLOR,
  BASE_COLORS,
  TRANSPARENT_COLORS,
  SPECIAL_SURFACES,
  MINI_SEGMENT_COLORS,
  CSS_VARIABLE_MAP,
  applyColorTheme
};
