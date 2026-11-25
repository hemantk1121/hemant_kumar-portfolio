export interface ParticleBustData {
  count: number;
  basePositions: Float32Array;
  scatterPositions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  brightness: Float32Array;
  phases: Float32Array;
}

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

function gauss2d(
  x: number,
  y: number,
  x0: number,
  y0: number,
  sx: number,
  sy: number
): number {
  const dx = (x - x0) / sx;
  const dy = (y - y0) / sy;
  return Math.exp(-0.5 * (dx * dx + dy * dy));
}

function fbm(x: number, y: number, z: number): number {
  return (
    0.5 * Math.sin(x * 8.1 + y * 6.3 + z * 5.2) +
    0.3 * Math.cos(x * 16.3 - y * 13.8 + z * 11.4) +
    0.2 * Math.sin(x * 29.1 + y * 24.2 - z * 19.7)
  );
}

/**
 * Generates an anatomically sculpted 3D abstract digital bust point-cloud
 * with organic stippled lidar density, lavender-violet rim highlights on the
 * head, and subtle warm chartreuse-gold illumination along the shoulders.
 */
export function generateParticleBust(densityScale = 1): ParticleBustData {
  const rand = createRng(20261125);
  const raw: number[] = []; // stride 8: x, y, z, r, g, b, size, brightness

  const pushPoint = (
    x: number,
    y: number,
    z: number,
    r: number,
    g: number,
    b: number,
    size: number,
    brightness: number
  ) => {
    raw.push(x, y, z, r, g, b, size, brightness);
  };

  const evalHeadSurface = (sx: number, sy: number, sz: number) => {
    let rx = 0.312;
    const ry = 0.442;
    let rz = 0.358;

    if (sy > 0) {
      const cranium = Math.sin(clamp(sy, 0, 1) * Math.PI);
      rx += cranium * 0.024;
      rz += cranium * 0.018;
    }

    // Sturdy, natural U-shaped jawline and rounded chin
    if (sy < 0.06) {
      const jawT = smoothstep(0.06, -0.98, sy);
      rx *= 1 - Math.pow(jawT, 2.45) * 0.2;
      const jawAngle =
        Math.exp(-Math.pow((sy + 0.52) / 0.24, 2)) *
        smoothstep(0.2, 0.78, Math.abs(sx));
      rx += jawAngle * 0.025;
      rz *= 1 - Math.pow(jawT, 2.2) * 0.15;
      const chinProj =
        smoothstep(-0.35, -0.86, sy) * smoothstep(0.15, 0.9, sz);
      rz += chinProj * 0.032;
    }

    let x = sx * rx;
    let y = 0.455 + sy * ry;
    let z = sz * rz;

    // Organic sculpted hair crown
    const hairline = 0.44 + 0.045 * Math.cos(sx * 3.6) - 0.04 * sx;
    const topHair = smoothstep(hairline - 0.05, hairline + 0.13, sy);
    const sideHair =
      smoothstep(0.58, 0.88, Math.abs(sx)) *
      smoothstep(-0.02, 0.38, sy) *
      smoothstep(-0.45, 0.55, sz);
    const hairW = Math.max(topHair, sideHair * 0.7);

    const wave = fbm(x * 4.2 + 0.4, y * 4.0, z * 3.8);
    if (hairW > 0.01) {
      const crownShape =
        0.048 + 0.03 * smoothstep(-0.35, 0.65, -sx) + 0.024 * wave;
      x += sx * hairW * crownShape * 1.12;
      y += Math.max(0, sy) * hairW * crownShape * 1.28;
      z += sz * hairW * crownShape * 0.85;
      const jit = (rand() - 0.5) * 0.02 * hairW;
      x += jit;
      y += jit * 0.9;
      z += jit;
    }

    // Subtle front facial relief (sculpted lidar topography)
    let noseHi = 0;
    let faceShadow = 0;
    if (sz > 0.1) {
      const fw = smoothstep(0.1, 0.5, sz);
      const brow = gauss2d(x, y, 0, 0.585, 0.165, 0.038) * 0.024;
      const eyeL = gauss2d(x, y, -0.108, 0.505, 0.05, 0.032);
      const eyeR = gauss2d(x, y, 0.108, 0.505, 0.05, 0.032);
      const eyes = (eyeL + eyeR) * -0.036;
      const noseB = gauss2d(x, y, 0, 0.445, 0.032, 0.095) * 0.062;
      const noseT = gauss2d(x, y, 0, 0.365, 0.04, 0.032) * 0.055;
      const cheek =
        (gauss2d(x, y, -0.155, 0.39, 0.075, 0.055) +
          gauss2d(x, y, 0.155, 0.39, 0.075, 0.055)) *
        0.026;
      const lips =
        gauss2d(x, y, 0, 0.258, 0.064, 0.016) * 0.024 +
        gauss2d(x, y, 0, 0.222, 0.058, 0.017) * 0.022 -
        gauss2d(x, y, 0, 0.24, 0.068, 0.008) * 0.015;
      const chin = gauss2d(x, y, 0, 0.095, 0.095, 0.05) * 0.028;

      z += fw * (brow + eyes + noseB + noseT + cheek + lips + chin);
      noseHi =
        fw *
        (gauss2d(x, y, 0, 0.415, 0.052, 0.115) * 0.42 +
          gauss2d(x, y, 0, 0.625, 0.145, 0.085) * 0.24 +
          gauss2d(x, y, -0.135, 0.4, 0.065, 0.055) * 0.16 +
          gauss2d(x, y, 0.135, 0.4, 0.065, 0.055) * 0.16);
      faceShadow =
        fw *
        (0.45 * (eyeL + eyeR) +
          0.22 * gauss2d(x, y, 0, 0.24, 0.068, 0.01) +
          0.16 * gauss2d(x, y, 0, 0.32, 0.045, 0.018));
    }

    return { x, y, z, hairW, wave, noseHi, faceShadow };
  };

  const golden = Math.PI * (3 - Math.sqrt(5));

  // 1A. Full 3D Head Shell
  const nHeadShell = Math.round(7800 * densityScale);
  for (let i = 0; i < nHeadShell; i++) {
    const u = clamp(1 - ((i + rand() * 0.9) / nHeadShell) * 2, -0.999, 0.999);
    const phi = Math.acos(u);
    const theta = golden * i + (rand() - 0.5) * 0.15;
    const sx = Math.sin(phi) * Math.sin(theta);
    const sy = Math.cos(phi);
    const sz = Math.sin(phi) * Math.cos(theta);
    if (sz < -0.52 && rand() < 0.72) continue;

    const { x, y, z, hairW, wave, noseHi, faceShadow } = evalHeadSurface(
      sx,
      sy,
      sz
    );
    if (hairW > 0.35 && wave < -0.2 && rand() < 0.44) continue;
    if (faceShadow > 0.16 && rand() < faceShadow * 0.6) continue;

    const ndotl = clamp(sx * -0.1 + sy * 0.22 + sz * 0.95, 0, 1);
    const rim = Math.pow(1 - clamp(Math.abs(sz), 0, 1), 1.6);
    const br = clamp(
      0.5 +
        0.5 * ndotl +
        0.34 * rim +
        noseHi -
        faceShadow * 0.4 +
        wave * 0.12 * hairW,
      0.24,
      1
    );

    const lav = clamp(0.08 + 0.8 * rim + 0.08 * hairW, 0, 1);
    const r = clamp(1 - 0.16 * lav, 0.8, 1);
    const g = clamp(1 - 0.25 * lav, 0.72, 1);
    const b = 1;
    pushPoint(x, y, z, r, g, b, 1.0 + rand() * 0.55, br);
  }

  // 1B. Front-Facing Area-Compensated High-Density Lidar Face Stipple
  const nFaceFill = Math.round(5200 * densityScale);
  for (let i = 0; i < nFaceFill; i++) {
    const a = rand() * Math.PI * 2;
    const rad = Math.sqrt(rand()) * 0.97;
    const sx = Math.cos(a) * rad;
    const sy = Math.sin(a) * rad;
    const sz = Math.sqrt(Math.max(0.01, 1 - sx * sx - sy * sy));

    const { x, y, z, hairW, wave, noseHi, faceShadow } = evalHeadSurface(
      sx,
      sy,
      sz
    );
    const stipple = fbm(x * 11.5, y * 11.5, z * 11.5);
    if (hairW > 0.25 && (wave < -0.15 || stipple < -0.24) && rand() < 0.54) {
      continue;
    }
    if (faceShadow > 0.15 && rand() < faceShadow * 0.7) continue;
    if (stipple < -0.35 && rand() < 0.36) continue;

    const ndotl = clamp(sx * -0.1 + sy * 0.22 + sz * 0.95, 0, 1);
    const rim = Math.pow(1 - clamp(sz, 0, 1), 1.8);
    const br = clamp(
      0.58 + 0.42 * ndotl + noseHi - faceShadow * 0.44 + 0.12 * stipple,
      0.28,
      1
    );

    const lav = clamp(0.04 + 0.72 * rim, 0, 1);
    const r = clamp(1 - 0.13 * lav, 0.84, 1);
    const g = clamp(1 - 0.2 * lav, 0.76, 1);
    const b = 1;
    pushPoint(x, y, z, r, g, b, 1.0 + rand() * 0.65, br);
  }

  // 2. Sculpted Rounded Ears
  const nEarSide = Math.round(300 * densityScale);
  for (const side of [-1, 1]) {
    for (let i = 0; i < nEarSide; i++) {
      const ang = rand() * Math.PI * 2;
      let rad = Math.sqrt(rand());
      if (rand() < 0.5) rad = 0.6 + 0.4 * rand();
      const ey = 0.405 + Math.sin(ang) * 0.094 * rad;
      const ez = -0.05 + Math.cos(ang) * 0.044 * rad - (ey - 0.405) * 0.14;
      const ex =
        side *
        (0.298 +
          0.042 * (0.35 + 0.65 * rad) * (0.65 + 0.35 * Math.abs(Math.cos(ang))));
      pushPoint(ex, ey, ez, 0.88, 0.82, 1, 1.0 + rand() * 0.4, 0.78 + 0.2 * rad);
    }
  }

  // 3. Seamless Continuous Neck + Trapezius + Shoulders + Upper Chest
  const nBody = Math.round(10800 * densityScale);
  for (let i = 0; i < nBody; i++) {
    const v = (i + rand()) / nBody;
    const y = 0.155 - v * 1.24;

    const tTrap = smoothstep(-0.12, -0.44, y);
    const tShld = smoothstep(-0.3, -0.76, y);
    const tArm = smoothstep(-0.7, -1.08, y);

    const rx =
      0.208 +
      smoothstep(0.14, -0.14, y) * 0.025 +
      Math.pow(tTrap, 1.15) * 0.33 +
      Math.pow(tShld, 0.88) * 0.45 +
      tArm * 0.09;
    const rz = 0.182 + smoothstep(0.1, -0.28, y) * 0.045 + tShld * 0.085;

    let sa: number;
    let ca: number;
    if (rand() < 0.65) {
      const u = rand() * 2 - 1;
      sa = u;
      ca = Math.sqrt(Math.max(0.001, 1 - u * u));
    } else if (rand() < 0.72) {
      const ang = (rand() - 0.5) * Math.PI * 1.15;
      sa = Math.sin(ang);
      ca = Math.cos(ang);
    } else {
      const ang = Math.PI + (rand() - 0.5) * Math.PI * 0.85;
      sa = Math.sin(ang);
      ca = Math.cos(ang);
    }

    const chestFlat = smoothstep(-0.2, -0.56, y);
    const x =
      Math.sign(sa) * Math.pow(Math.abs(sa), 1 - 0.14 * chestFlat) * rx;
    const zCenter = -0.055 + smoothstep(-0.16, -0.52, y) * 0.035;
    let z =
      zCenter +
      Math.sign(ca) * Math.pow(Math.abs(ca), 1 - 0.1 * chestFlat) * rz;

    if (y < -0.34) {
      z += 0.012 * fbm(x * 4.5, y * 4.5, z * 4.5);
    }

    const collarY = -0.48 + 0.24 * Math.min(1, Math.pow(x / 0.31, 2));
    const collarDist = Math.abs(y - collarY);
    const onCollar = collarDist < 0.024 && Math.abs(x) < 0.315 && ca > 0.35;

    const botFade = smoothstep(-1.08, -0.76, y);
    if (rand() > botFade * 0.94 + 0.06) continue;

    const chinShadow =
      smoothstep(-0.08, 0.14, y) * smoothstep(0, 0.92, ca) * 0.35;
    if (chinShadow > 0.2 && rand() < chinShadow * 0.4) continue;

    const ndotl = clamp(ca * 0.85 + 0.25, 0, 1);
    const rim = Math.pow(Math.abs(sa), 1.65);
    let br = clamp(
      (0.5 + 0.46 * ndotl + 0.28 * rim - chinShadow) * (0.24 + 0.76 * botFade),
      0.16,
      1
    );

    const normX = Math.abs(x) / Math.max(0.2, rx);
    const warm = clamp(
      smoothstep(-0.26, -0.74, y) * (0.28 + 0.78 * smoothstep(0.3, 0.92, normX)),
      0,
      1
    );
    const lav = clamp(
      smoothstep(-0.48, 0.08, y) * (0.14 + 0.65 * rim),
      0,
      1
    );

    let r = clamp(0.99 + 0.01 * warm - 0.12 * lav, 0.82, 1);
    let g = clamp(0.99 + 0.01 * warm - 0.18 * lav, 0.76, 1);
    let b = clamp(1 - 0.46 * warm + 0.02 * lav, 0.48, 1);

    if (onCollar) {
      br = Math.min(1, br + (1 - collarDist / 0.024) * 0.38);
      r = 1;
      g = 1;
      b = 0.98;
    }

    pushPoint(x, y, z, r, g, b, 1.0 + rand() * 0.55, br);
  }

  // 4. Organic Stippled Crewneck Collar Highlight
  const nCollar = Math.round(240 * densityScale);
  for (let i = 0; i < nCollar; i++) {
    const t = rand() * 2 - 1;
    const x = t * 0.295;
    const y = -0.48 + 0.24 * (t * t) + (rand() - 0.5) * 0.018;
    const z = 0.186 * Math.sqrt(Math.max(0, 1 - Math.pow(t * 0.76, 2))) + 0.018;
    pushPoint(x, y, z, 1, 1, 0.96, 1.15, 0.88);
  }

  const count = raw.length / 8;
  const basePositions = new Float32Array(count * 3);
  const scatterPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const brightness = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const o = i * 8;
    const x = raw[o];
    const y = raw[o + 1];
    const z = raw[o + 2];

    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;

    // Precompute organic 3D orbital scatter destination for scroll-driven dispersal
    const sTheta = rand() * Math.PI * 2;
    const sPhi = Math.acos(rand() * 2 - 1);
    const sRad = 1.15 + Math.pow(rand(), 0.65) * 2.4;
    scatterPositions[i * 3] = x * 1.4 + Math.sin(sPhi) * Math.cos(sTheta) * sRad * 1.55;
    scatterPositions[i * 3 + 1] = y * 1.2 + Math.cos(sPhi) * sRad * 1.15;
    scatterPositions[i * 3 + 2] = z + Math.sin(sPhi) * Math.sin(sTheta) * sRad * 0.95 - 0.35;

    colors[i * 3] = raw[o + 3];
    colors[i * 3 + 1] = raw[o + 4];
    colors[i * 3 + 2] = raw[o + 5];
    sizes[i] = raw[o + 6];
    brightness[i] = raw[o + 7];
    phases[i] = rand() * Math.PI * 2;
  }

  return {
    count,
    basePositions,
    scatterPositions,
    colors,
    sizes,
    brightness,
    phases,
  };
}
