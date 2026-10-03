export const WHEEL_CENTER = 400;

export interface Point {
  x: number;
  y: number;
}

const round = (value: number): number => Math.round(value * 100) / 100;

/** Angles are in degrees: 0° points to the top and values grow clockwise. */
export function polarPoint(radius: number, angleDeg: number): Point {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: round(WHEEL_CENTER + radius * Math.cos(rad)),
    y: round(WHEEL_CENTER + radius * Math.sin(rad)),
  };
}

export function ringSectorPath(
  startDeg: number,
  endDeg: number,
  outerRadius: number,
  innerRadius: number,
): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const outerStart = polarPoint(outerRadius, startDeg);
  const outerEnd = polarPoint(outerRadius, endDeg);
  const innerEnd = polarPoint(innerRadius, endDeg);
  const innerStart = polarPoint(innerRadius, startDeg);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}
