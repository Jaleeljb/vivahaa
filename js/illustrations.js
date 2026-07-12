/* ==========================================================================
   VIVAHA — ILLUSTRATIONS
   Hand-built inline SVG scenes that sit on top of the existing .ph gradient
   backgrounds, in place of stock photography. Deliberately monochrome-ish
   (ivory/gold ink on whatever gradient variant the card already uses) so
   they read consistently on every .ph-1 / .ph-2 / .ph-3 / .ph-4 background.
   All viewBoxes are 100x100 so any illustration can drop into any aspect
   ratio container via preserveAspectRatio="xMidYMid slice".
   ========================================================================== */

const Illustrations = (() => {

  const INK = "#FBEFE1";     // primary line/fill (ivory)
  const GOLD = "#E3BE73";    // accent
  const GOLD_SOFT = "rgba(227,190,115,0.55)";
  const INK_SOFT = "rgba(251,239,225,0.4)";

  function svg(inner) {
    return `<svg class="ph-illustration" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  }

  // A small row of marigold-garland dots — reused across several scenes.
  function garland(x1, y, x2, sag = 10) {
    return `<path d="M${x1} ${y} Q ${(x1 + x2) / 2} ${y + sag} ${x2} ${y}" stroke="${GOLD}" stroke-width="1" fill="none" opacity="0.8"/>
      ${Array.from({ length: 7 }).map((_, i) => {
        const t = i / 6, xx = x1 + (x2 - x1) * t, yy = y + Math.sin(Math.PI * t) * sag;
        return `<circle cx="${xx.toFixed(1)}" cy="${(yy + 2).toFixed(1)}" r="1.6" fill="${GOLD}"/>`;
      }).join("")}`;
  }

  const scenes = {

    hero: () => svg(`
      <path d="M10 88 Q50 30 90 88 Z" fill="${INK_SOFT}"/>
      <path d="M22 88 V52 Q22 34 50 34 Q78 34 78 52 V88" stroke="${GOLD}" stroke-width="2" fill="none"/>
      <path d="M22 52 Q50 40 78 52" stroke="${GOLD}" stroke-width="1.2" fill="none" opacity="0.7"/>
      ${garland(14, 30, 86, 14)}
      <circle cx="50" cy="20" r="4" fill="${GOLD}" opacity="0.85"/>
      <path d="M42 76 q8 -14 16 0" stroke="${INK}" stroke-width="1.6" fill="none"/>
      <circle cx="43" cy="70" r="4.2" fill="${INK}"/>
      <circle cx="57" cy="70" r="4.2" fill="${INK}"/>
      <path d="M43 74 v8" stroke="${INK}" stroke-width="1.6"/>
      <path d="M57 74 v8" stroke="${INK}" stroke-width="1.6"/>
    `),

    palace: () => svg(`
      <rect x="18" y="55" width="64" height="33" fill="${INK_SOFT}"/>
      <path d="M18 55 L18 40 L26 55 Z M82 55 L82 40 L74 55 Z" fill="${INK_SOFT}"/>
      <path d="M35 55 V38 Q42 28 42 38 V55" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
      <path d="M58 55 V38 Q65 28 65 38 V55" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
      <circle cx="42" cy="26" r="2.4" fill="${GOLD}"/>
      <circle cx="65" cy="26" r="2.4" fill="${GOLD}"/>
      <path d="M46 55 V44 Q50 36 54 44 V55" fill="${INK}" opacity="0.9"/>
      <rect x="24" y="62" width="6" height="10" fill="${GOLD_SOFT}"/>
      <rect x="70" y="62" width="6" height="10" fill="${GOLD_SOFT}"/>
      ${garland(20, 33, 80, 8)}
      <path d="M10 88 H90" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>
    `),

    banquet: () => svg(`
      <path d="M50 14 L50 30" stroke="${GOLD}" stroke-width="1.2"/>
      <path d="M34 30 H66 L60 40 H40 Z" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="0.8"/>
      ${[38, 44, 50, 56, 62].map(x => `<circle cx="${x}" cy="35" r="1.4" fill="${GOLD}"/>`).join("")}
      <ellipse cx="50" cy="70" rx="30" ry="9" fill="${INK_SOFT}"/>
      <ellipse cx="50" cy="67" rx="30" ry="9" fill="none" stroke="${GOLD}" stroke-width="1"/>
      <path d="M26 67 V80 M74 67 V80" stroke="${INK}" stroke-width="1.2" opacity="0.6"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${32 + i * 7.2}" cy="67" r="1.6" fill="${INK}" opacity="0.7"/>`).join("")}
    `),

    resort: () => svg(`
      <path d="M0 82 H100" stroke="${GOLD}" stroke-width="0.8" opacity="0.5"/>
      <path d="M20 82 V54 Q20 46 26 44" stroke="${INK}" stroke-width="1.6" fill="none"/>
      <path d="M20 50 Q10 46 6 52 Q14 54 20 50 Z M20 48 Q28 42 34 46 Q26 50 20 48 Z M20 46 Q16 38 22 34 Q26 42 20 46 Z" fill="${INK}" opacity="0.85"/>
      <path d="M74 82 V58 Q74 50 80 48" stroke="${INK}" stroke-width="1.6" fill="none"/>
      <path d="M74 54 Q64 50 60 56 Q68 58 74 54 Z M74 52 Q82 46 88 50 Q80 54 74 52 Z" fill="${INK}" opacity="0.85"/>
      <ellipse cx="50" cy="86" rx="34" ry="6" fill="${INK_SOFT}"/>
      <path d="M38 78 Q50 70 62 78" stroke="${GOLD}" stroke-width="1.2" fill="none"/>
      <circle cx="50" cy="22" r="7" fill="${GOLD}" opacity="0.8"/>
    `),

    lawn: () => svg(`
      <path d="M14 86 H86" stroke="${GOLD}" stroke-width="0.8" opacity="0.5"/>
      <path d="M28 86 V50 Q28 34 50 34 Q72 34 72 50 V86" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
      ${garland(24, 32, 76, 10)}
      <path d="M20 86 V62 Q20 56 24 56 Q28 56 28 62 V86" fill="${INK_SOFT}"/>
      <path d="M72 86 V62 Q72 56 76 56 Q80 56 80 62 V86" fill="${INK_SOFT}"/>
      ${[18, 34, 50, 66, 82].map((x, i) => `<circle cx="${x}" cy="${20 + (i % 2) * 6}" r="1.3" fill="${GOLD}" opacity="0.8"/>`).join("")}
      <path d="M42 78 Q50 68 58 78" stroke="${INK}" stroke-width="1.4" fill="none"/>
    `),

    beach: () => svg(`
      <circle cx="76" cy="24" r="10" fill="${GOLD}" opacity="0.75"/>
      <path d="M0 62 Q25 56 50 62 T100 62" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.7"/>
      <path d="M0 70 Q25 64 50 70 T100 70" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.5"/>
      <path d="M0 78 H100 V100 H0 Z" fill="${INK_SOFT}"/>
      <path d="M30 78 V54 Q30 42 50 42 Q70 42 70 54 V78" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
      ${garland(26, 40, 74, 9)}
      <path d="M14 78 Q14 60 8 50 M14 78 Q14 60 20 50 M14 78 Q14 55 14 46" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.8"/>
    `),

    hotel: () => svg(`
      <rect x="30" y="16" width="40" height="70" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="1"/>
      ${[0, 1, 2, 3, 4].map(row => [0, 1, 2].map(col =>
        `<rect x="${36 + col * 11}" y="${24 + row * 12}" width="7" height="8" fill="${GOLD}" opacity="${(row + col) % 2 ? 0.9 : 0.5}"/>`
      ).join("")).join("")}
      <path d="M10 86 H90" stroke="${GOLD}" stroke-width="1" opacity="0.6"/>
      <path d="M22 86 V70 H30 V86 Z M70 86 V70 H78 V86 Z" fill="${INK}" opacity="0.6"/>
    `),

    floral: () => svg(`
      ${[[50, 46, 9], [30, 60, 6], [70, 60, 6], [36, 34, 5], [64, 34, 5]].map(([cx, cy, r]) => `
        <g>
          ${Array.from({ length: 6 }).map((_, i) => {
            const a = (Math.PI / 3) * i;
            const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
            return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(r * 0.62).toFixed(1)}" fill="${GOLD}" opacity="0.75"/>`;
          }).join("")}
          <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="${INK}"/>
        </g>`).join("")}
      <path d="M20 82 Q50 74 80 82" stroke="${GOLD}" stroke-width="1" fill="none" opacity="0.6"/>
    `),

    modernDecor: () => svg(`
      <path d="M50 20 V80" stroke="${GOLD}" stroke-width="1"/>
      <path d="M22 80 Q50 24 78 80" stroke="${INK}" stroke-width="1.8" fill="none"/>
      <path d="M32 80 Q50 40 68 80" stroke="${GOLD}" stroke-width="1" fill="none" opacity="0.7"/>
      <circle cx="50" cy="30" r="2" fill="${GOLD}"/>
      <rect x="46" y="80" width="8" height="6" fill="${INK_SOFT}"/>
    `),

    catering: () => svg(`
      <ellipse cx="50" cy="66" rx="30" ry="7" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="1"/>
      <path d="M26 64 Q50 30 74 64" fill="${INK}" opacity="0.85"/>
      <circle cx="50" cy="22" r="2" fill="${GOLD}"/>
      <path d="M44 24 Q42 16 46 12 M50 22 Q50 12 50 8 M56 24 Q58 16 54 12" stroke="${GOLD_SOFT}" stroke-width="1.4" fill="none"/>
      <path d="M20 66 H80" stroke="${GOLD}" stroke-width="1" opacity="0.6"/>
    `),

    photography: () => svg(`
      <rect x="24" y="38" width="52" height="36" rx="4" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="1.4"/>
      <circle cx="50" cy="56" r="12" fill="none" stroke="${INK}" stroke-width="2"/>
      <circle cx="50" cy="56" r="6" fill="${GOLD}" opacity="0.8"/>
      <rect x="40" y="30" width="20" height="8" rx="2" fill="${INK}" opacity="0.85"/>
      <circle cx="68" cy="46" r="2" fill="${GOLD}"/>
      <path d="M14 30 L20 22 L26 30" stroke="${GOLD}" stroke-width="1.2" fill="none" opacity="0.7"/>
    `),

    music: () => svg(`
      <circle cx="38" cy="58" r="16" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
      <circle cx="38" cy="58" r="4" fill="${INK}"/>
      <path d="M54 50 V26 L74 20 V44" stroke="${INK}" stroke-width="1.6" fill="none"/>
      <circle cx="50" cy="52" r="5" fill="${INK}" opacity="0.9"/>
      <circle cx="70" cy="46" r="5" fill="${INK}" opacity="0.9"/>
      <path d="M16 40 Q10 50 16 60 M84 40 Q90 50 84 60" stroke="${GOLD_SOFT}" stroke-width="1.4" fill="none"/>
    `),

    makeup: () => svg(`
      <ellipse cx="50" cy="46" rx="18" ry="22" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
      <ellipse cx="50" cy="46" rx="12" ry="15" fill="${INK_SOFT}"/>
      <rect x="46" y="70" width="8" height="16" fill="${INK}" opacity="0.7"/>
      <path d="M40 82 H60" stroke="${GOLD}" stroke-width="1.4"/>
      <circle cx="72" cy="30" r="3" fill="${GOLD}" opacity="0.8"/>
      <circle cx="28" cy="66" r="2.4" fill="${GOLD}" opacity="0.8"/>
    `),

    invitations: () => svg(`
      <rect x="20" y="32" width="60" height="42" rx="2" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="1.2"/>
      <path d="M20 34 L50 56 L80 34" stroke="${GOLD}" stroke-width="1.4" fill="none"/>
      <circle cx="50" cy="56" r="6" fill="${GOLD}" opacity="0.85"/>
      <path d="M47 56 q3 -4 6 0 q-3 4 -6 0 Z" fill="${INK}"/>
    `),

    mehendi: () => svg(`
      <path d="M50 20 Q30 40 34 62 Q36 78 50 84 Q64 78 66 62 Q70 40 50 20 Z" fill="${INK_SOFT}" stroke="${GOLD}" stroke-width="1.2"/>
      <path d="M50 30 Q42 44 44 58 M50 30 Q58 44 56 58" stroke="${GOLD}" stroke-width="1" fill="none" opacity="0.8"/>
      ${[[42, 40], [58, 40], [50, 50], [44, 60], [56, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${GOLD}"/>`).join("")}
      <path d="M38 74 Q50 80 62 74" stroke="${GOLD}" stroke-width="1" fill="none" opacity="0.7"/>
    `),

    sangeet: () => svg(`
      ${garland(10, 18, 90, 6)}
      <path d="M36 82 V58 Q36 50 42 50 Q40 60 44 68 Q40 76 36 82Z" fill="${INK}" opacity="0.9"/>
      <circle cx="41" cy="46" r="4.5" fill="${INK}" opacity="0.9"/>
      <path d="M64 82 V58 Q64 50 58 50 Q60 60 56 68 Q60 76 64 82Z" fill="${INK}" opacity="0.75"/>
      <circle cx="59" cy="46" r="4.5" fill="${INK}" opacity="0.75"/>
      <circle cx="20" cy="30" r="1.6" fill="${GOLD}"/><circle cx="80" cy="30" r="1.6" fill="${GOLD}"/>
      <circle cx="50" cy="24" r="1.6" fill="${GOLD}"/>
    `),

    ceremony: () => svg(`
      <path d="M50 60 Q44 48 50 38 Q56 48 50 60 Z" fill="${GOLD}" opacity="0.85"/>
      <path d="M50 60 Q46 52 50 46 Q54 52 50 60 Z" fill="${INK}"/>
      <ellipse cx="50" cy="66" rx="14" ry="4" fill="${INK_SOFT}"/>
      <circle cx="30" cy="58" r="5" fill="${INK}" opacity="0.85"/>
      <path d="M30 63 V80" stroke="${INK}" stroke-width="4" opacity="0.85"/>
      <circle cx="70" cy="58" r="5" fill="${INK}" opacity="0.7"/>
      <path d="M70 63 V80" stroke="${INK}" stroke-width="4" opacity="0.7"/>
      ${garland(16, 20, 84, 8)}
    `),

    reception: () => svg(`
      <path d="M18 40 Q50 18 82 40" stroke="${GOLD}" stroke-width="1.6" fill="none"/>
      ${garland(18, 40, 82, 12)}
      <path d="M40 78 L36 62 L44 62 Z" fill="none" stroke="${INK}" stroke-width="1.4"/>
      <path d="M60 78 L56 62 L64 62 Z" fill="none" stroke="${INK}" stroke-width="1.4"/>
      <circle cx="40" cy="60" r="1.6" fill="${GOLD}"/>
      <circle cx="60" cy="60" r="1.6" fill="${GOLD}"/>
      <path d="M14 82 H86" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>
    `),

    bridal: () => svg(`
      <path d="M30 34 Q50 24 70 34 L66 42 Q50 34 34 42 Z" fill="${GOLD}" opacity="0.85"/>
      <path d="M35 44 Q50 54 65 44 Q66 60 50 66 Q34 60 35 44 Z" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
      <circle cx="50" cy="52" r="3" fill="${INK}"/>
      <circle cx="26" cy="68" r="7" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="74" cy="68" r="7" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="26" cy="68" r="3" fill="${GOLD}" opacity="0.8"/>
      <circle cx="74" cy="68" r="3" fill="${GOLD}" opacity="0.8"/>
    `)
  };

  function get(key) {
    return (scenes[key] || scenes.floral)();
  }

  return { get };
})();
