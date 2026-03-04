import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import mxSvgRaw from '../assets/map/mx.svg?raw';
import { COVERAGE_STATES } from './mapUtils';

/* ── colours ──────────────────────────────────────────────────── */

const COLOR_ACTIVE   = 'rgba(37, 99, 235, 0.65)';
const COLOR_COVERAGE = 'rgba(37, 99, 235, 0.18)';
const COLOR_DEFAULT  = '#d1d5db';

function stateColor(name, hoveredState) {
  if (hoveredState && name === hoveredState) return COLOR_ACTIVE;
  if (COVERAGE_STATES.has(name)) return COLOR_COVERAGE;
  return COLOR_DEFAULT;
}

/* ── component ────────────────────────────────────────────────── */

export default function MexicoMap({ hoveredState, onStateHover }) {
  // Parse the raw SVG once and extract every <path> / <polygon> element
  const paths = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(mxSvgRaw, 'image/svg+xml');
    const elements = doc.querySelectorAll('path, polygon');
    return Array.from(elements).map((el) => ({
      tag: el.tagName,
      d: el.getAttribute('d'),
      points: el.getAttribute('points'),
      id: el.getAttribute('id'),
      name: el.getAttribute('name'),
    }));
  }, []);

  const isCoverage = (name) => COVERAGE_STATES.has(name);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 630"
      className="mexico-map-svg"
      style={{ width: '100%', height: 'auto' }}
    >
      <g stroke="#ffffff" strokeWidth="0.5">
        {paths.map((p) => {
          const fill = stateColor(p.name, hoveredState);
          const interactive = isCoverage(p.name);
          const key = p.id || p.name;
          const sharedProps = {
            fill,
            style: {
              transition: 'fill 0.25s ease',
              cursor: interactive ? 'pointer' : 'default',
            },
            ...(interactive && onStateHover
              ? {
                  onMouseEnter: () => onStateHover(p.name),
                  onMouseLeave: () => onStateHover(null),
                }
              : {}),
          };

          if (p.tag === 'polygon') {
            return <polygon key={key} {...sharedProps} points={p.points} />;
          }
          return <path key={key} {...sharedProps} d={p.d} />;
        })}
      </g>
    </svg>
  );
}

MexicoMap.propTypes = {
  hoveredState: PropTypes.string,
  onStateHover: PropTypes.func,
};

MexicoMap.defaultProps = {
  hoveredState: null,
  onStateHover: null,
};
