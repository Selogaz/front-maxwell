'use client';

import React, { useEffect, useState } from 'react';

interface ClassIconInlineProps {
  /** Path to the *traced* SVG file (vector, transparent background). */
  src: string;
  selected: boolean;
  className?: string;
}

// Module-scoped cache so we only fetch each SVG once across the page.
const svgCache = new Map<string, string>();

/**
 * Loads a traced class SVG, parses it once, and renders it inline so that
 * its `fill` colours can be conditionally swapped without losing the dark
 * accents. Selected state recolours the "main" shape to the cream gold
 * #FCE9CE used by `золотой_чар.svg`:
 *   - icons that ship only with `#151515` (e.g. воин, чар, волш) → swap that
 *     dark fill to gold (no other colour to keep)
 *   - icons that ship with `#ECECEC` + `#151515` (e.g. след, плут, пал, …) →
 *     swap only `#ECECEC` to gold and keep the dark accents intact
 *
 * The Figma exports also embed a leading bounding-box sub-path
 * (`M0 …V732.478…Z`) at the start of the first `<path d>`. With the default
 * `fill-rule="nonzero"` that turns the icon into a solid coloured square, so
 * we strip it before injecting the markup.
 */
const ClassIconInline: React.FC<ClassIconInlineProps> = ({ src, selected, className }) => {
  // Tick is bumped *only* when an async fetch resolves; the cached value is
  // read directly from `svgCache` during render so we never call setState
  // synchronously inside the effect body.
  const [, setTick] = useState(0);

  useEffect(() => {
    if (svgCache.has(src)) return;
    let cancelled = false;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        svgCache.set(src, text);
        if (!cancelled) setTick((t) => t + 1);
      })
      .catch(() => {
        if (!cancelled) setTick((t) => t + 1);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  const raw = svgCache.get(src);
  if (!raw) {
    return <span className={className} aria-hidden="true" />;
  }

  let html = raw;

  // 1. Strip the leading bounding-box sub-path that Figma exports prepend to
  //    every traced icon. It consists only of M/H/V/L commands (no curves)
  //    and a closing Z, so a tight character class matches it precisely
  //    without touching the actual icon paths that contain C/S/Q/T/A.
  html = html.replace(/d="M0[\d.\seE+\-HVLhvl]*Z/gi, 'd="');

// 2. Recolour the main fill on the selected state.
  if (selected) {
    if (/#ECECEC/i.test(html)) {
      // Multi-colour traced icon — keep #151515 / #6B6B6B / #C1C1C1 accents.
      html = html.replace(/#ECECEC/gi, '#FCE9CE');
    } else if (/#ABABAB/i.test(html)) {
      // Gray icon — swap to gold
      html = html.replace(/#ABABAB/gi, '#FCE9CE');
    } else if (/#262626/i.test(html)) {
      // Bonus box border/background — swap to gold
      html = html.replace(/#262626/gi, '#FCE9CE');
    } else {
      // Outline-only icon — repaint the single dark fill.
      html = html.replace(/#151515/gi, '#FCE9CE');
    }
  }

  // 3. Strip explicit width/height on the root <svg> so the wrapping span
  //    controls the rendered size. Two separate calls because String.replace
  //    with /g advances past the previous match in the *original* string and
  //    would skip the second attribute when written as one regex.
  html = html.replace(/(<svg[^>]*?)\swidth="[^"]*"/i, '$1');
  html = html.replace(/(<svg[^>]*?)\sheight="[^"]*"/i, '$1');
  html = html.replace(
    /<svg\s/i,
    '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" '
  );

  return (
    <span
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ClassIconInline;
