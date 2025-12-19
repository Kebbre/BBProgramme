const BASE_COLORS = Object.freeze({
  accentPrimary: '#000000ff',
  accentGreen: '#ffffffff',
  accentPink: '#ff8fad',
  accentBlue: '#2B7A91',
  stageFill: '#D1A67D',
  bodyBackground: '#ffffffff',
  surfaceBase: '#ffffffff',
  surfaceAlt: '#ffffffff',
  borderDefault: '#8c8280',
  textPrimary: '#000000',
  textMuted: '#555555ff',
  stageIdentifier: '#ffd6d6',
  deadlineColor: '#c44f29',
  dangerText: '#c44f29',
  white: '#ffffff',
  solidBlack: '#000000',
  disabledSurface: '#ffffffff',
  standdownText: '#000000'
});

const ACCENT_LEGACY_VALUE = 'rgba(0,204,222,.24)';

const TRANSPARENT_COLORS = Object.freeze({
  accentLegacy: ACCENT_LEGACY_VALUE,
  blackAlpha08: 'rgba(0,0,0,.08)',
  blackAlpha90: 'rgba(0,0,0,.9)',
  inkAlpha05: 'rgba(15,23,42,.05)',
  shadowAlphaLight: 'rgba(15,23,42,.12)',
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

const TEXT_STYLES = Object.freeze({
  textTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: BASE_COLORS.textPrimary
  },
  textButton: {
    fontSize: '.95rem',
    fontWeight: 600,
    color: BASE_COLORS.textPrimary
  },
  textSmall: {
    fontSize: '.65rem',
    fontWeight: 450,
    color: BASE_COLORS.textMuted
  },
  textGeneral: {
    fontSize: '.8rem',
    fontWeight: 550,
    color: BASE_COLORS.textPrimary
  }
});

const TASK_COLOR_MAP = Object.freeze({
  'Bond Bryan Design': '#ccf5f2',
  'Bond Bryan review': '#e5f0cf',
  'CDP': ' #ffd6d6',
  'Client Comments': '#FFE5CC',
  'Delays': '#fffade',
  'Undefined': '#c0bdbdff'
});

const DEFAULT_SEGMENT_COLOR = '#ccf5f2';
const STAGE_COLOR = BASE_COLORS.stageFill;
const SINGLE_EVENT_COLOR = BASE_COLORS.accentGreen;
const SINGLE_EVENT_SELECTED_COLOR = BASE_COLORS.accentPink;

function toKebabCaseToken(key = '') {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

function toCssVariableName(key = '') {
  return `--color-${toKebabCaseToken(key)}`;
}

function toTextCssVariableName(styleKey = '', propertyKey = '') {
  return `--text-${toKebabCaseToken(styleKey)}-${toKebabCaseToken(propertyKey)}`;
}

const COLOR_GROUPS_FOR_CSS = [
  BASE_COLORS,
  TRANSPARENT_COLORS,
  SPECIAL_SURFACES,
  MINI_SEGMENT_COLORS
];

const COLOR_CSS_VARIABLE_MAP = COLOR_GROUPS_FOR_CSS.reduce((acc, group) => {
  Object.entries(group).forEach(([token, value]) => {
    acc[toCssVariableName(token)] = value;
  });
  return acc;
}, {});

const TYPOGRAPHY_VARIABLE_MAP = Object.entries(TEXT_STYLES).reduce(
  (acc, [styleName, styleValues]) => {
    Object.entries(styleValues).forEach(([property, value]) => {
      const cssVarName = toTextCssVariableName(styleName, property);
      acc[cssVarName] = value;
    });
    return acc;
  },
  {}
);

const CSS_VARIABLE_MAP = Object.freeze({
  ...COLOR_CSS_VARIABLE_MAP,
  ...TYPOGRAPHY_VARIABLE_MAP
});

function normaliseOverrideMap(overrides = {}) {
  return Object.entries(overrides).reduce((acc, [key, value]) => {
    if (value == null) return acc;
    const cssVarName = key.startsWith('--') ? key : toCssVariableName(key);
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
  TEXT_STYLES,
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
  TEXT_STYLES,
  CSS_VARIABLE_MAP,
  applyColorTheme
};
