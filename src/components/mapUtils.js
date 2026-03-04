/* ── Mexico map name-mapping helpers ───────────────────────────── */

// Canonical SVG names for the five coverage states
export const COVERAGE_STATES = new Set([
  'Coahuila',
  'Tamaulipas',
  'Nuevo León',
  'Ciudad de México',
  'Durango',
]);

// Maps display / translation names that differ from the SVG `name` attribute
const DISPLAY_TO_SVG = {
  'Mexico City': 'Ciudad de México',
};

const SVG_TO_DISPLAY = Object.fromEntries(
  Object.entries(DISPLAY_TO_SVG).map(([k, v]) => [v, k]),
);

/** Convert a UI display name to the canonical SVG name */
export function resolveToSvgName(displayName) {
  return DISPLAY_TO_SVG[displayName] || displayName;
}

/** Convert a canonical SVG name to the UI display name */
export function resolveToDisplayName(svgName) {
  return SVG_TO_DISPLAY[svgName] || svgName;
}
