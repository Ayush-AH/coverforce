const SPECTRUM = [
  [56, 189, 248],   // blue
  [168, 85, 247],   // purple
  [244, 114, 182],  // pink
  [239, 68, 68],    // red
] as const;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function spectrumAt(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = SPECTRUM.length - 1;
  const scaled = clamped * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;
  const from = SPECTRUM[index];
  const to = SPECTRUM[index + 1];
  const r = Math.round(lerp(from[0], to[0], localT));
  const g = Math.round(lerp(from[1], to[1], localT));
  const b = Math.round(lerp(from[2], to[2], localT));
  return `rgb(${r}, ${g}, ${b})`;
}

export function positionToSpectrumColor(lng: number, lat = 0): string {
  const lngT = (lng + 180) / 360;
  const latT = (lat + 90) / 180;
  const t = lngT * 0.82 + latT * 0.18;
  return spectrumAt(t);
}

export function featureCentroidLngLat(feature: {
  geometry: { type: string; coordinates: unknown };
}): { lat: number; lng: number } {
  let ring: number[][] = [];
  const { geometry } = feature;

  if (geometry.type === "Polygon") {
    ring = (geometry.coordinates as number[][][])[0];
  } else if (geometry.type === "MultiPolygon") {
    ring = (geometry.coordinates as number[][][][])[0][0];
  }

  if (!ring.length) return { lat: 0, lng: 0 };
  const lng = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length;
  const lat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length;
  return { lat, lng };
}

// kept for any legacy usage
export function featureCentroidLat(feature: {
  geometry: { type: string; coordinates: unknown };
}): number {
  return featureCentroidLngLat(feature).lat;
}
